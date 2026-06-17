---
title: "How PostHog Handles Millions of Events: What I Learned Building a Mini-Replica From Scratch"
date: 2026-06-01
description: "A deep dive into PostHog's event ingestion pipeline — Kafka, ClickHouse, and the Luhn algorithm."
author: Sam Joe Chalissery
published: true
source: "https://medium.com/@samjoe.txt/how-posthog-handles-millions-of-events-what-i-learned-building-a-mini-replica-from-scratch-5ebef59af78a"
---

Did you know that companies are tracking your every move the second you land on their homepage?

Every button you hover over, the exact image that caught your eye for three seconds, and the precise moment you got frustrated and closed the tab. It's all being logged. You might have wondered, *"Wait, isn't that illegal? Are they literally recording everything I do?"*… Well, the answer is legally "no" (thanks to privacy policies), but technically? ***YES***.

<p align="center">
  <img src="/blog-images/cat-stare.gif" alt="Cat staring" />
</p>

The crazy part is how easy it is to set up. Just paste in a small JavaScript snippet in the website's code and bam you're done!
To most users, it feels invasive, but for developers, it's just another dev tool to help them improve the site.

## What is PostHog?

[PostHog](https://posthog.com/) is an open-source, all-in-one tool that helps you do exactly what I said above and more. It offers session replays, web analytics, deployment and experimentation tools and a lot of other cool stuff.

Okay, it's gonna get a bit technical from here. Stay with me now.

<p align="center">
  <img src="/blog-images/stay-with-me.gif" alt="Stay with me" />
</p>

Remember the JavaScript snippet I mentioned above? In the developer world, it's called an SDK (Software Development Kit). It sits in the background of the website, packages all user actions into a JSON file, and fires them off as HTTP POST requests to the backend server.

An action would look like this:

```json
{
  "event": "button_clicked",
  "properties": {
    "current_url": "https://bufr.in/pricing",
    "button_name": "Join the beta",
    "browser": "Chrome"
  },
  "timestamp": "2026-05-29T07:27:00Z"
}
```

Now imagine thousands of websites tracking millions of user interactions at the same time. The number of requests the backend receives is insane 💀

To handle this, PostHog deploys high-performance Rust microservices at the front gate to handle these incoming requests.

<p align="center">
  <img src="/blog-images/flow-diagram.png" alt="Simplified flow of data" />
</p>
<p align="center"><em>A simplified flow of data</em></p>

## How Can Rust Microservices Be That Fast?

The Rust service has only one aim: respond with a `200 OK` as fast as possible.

To do this, it avoids all heavy lifting:

- **No database lookups** for user details.
- **Minimal validation:** It only checks the JSON structure of the request and ensures it contains a valid project ID.
- **Statelessness:** It doesn't remember anything between requests.

## Apache Kafka: The Massive Buffer

> [**Kafka**](https://kafka.apache.org/) acts as a highly scalable, resilient conveyor belt between systems. It safely writes all those incoming events directly to a physical disk in an "append-only log," allowing downstream services to pull data and process events at their own pace. If a worker crashes? No problem. The data just sits safely in Kafka until the worker restarts. Absolutely zero data is lost.

But you might be wondering: *"Wait, Kafka writes everything to a physical hard drive? Isn't disk I/O incredibly slow?"*

It usually is, but Kafka uses two brilliant architectural techniques to tackle that:

- **Sequential I/O:** Instead of searching around the disk to modify or insert data in random spots, Kafka only writes to the very end of the file. Sequential disk access is shockingly fast.
- **Zero-Copy Principle:** Normally, when a database sends data over the network, it has to copy that data from the disk to the OS kernel, then up to the application, then back down to the network buffer, and finally out to the network card. Kafka bypasses the application layer entirely. It tells the operating system, *"Take this data from the disk and send it directly to the network socket."* Skipping those middle steps prevents major memory copies, resulting in massive CPU savings and blazing speed.

Moving on, let's talk about what happens to this data we have stored in Kafka. We are now moving on to the ingestion system. The data is filtered based on events, and sensitive information is stripped and user identity and session identity is attached to this and sent to ClickHouse.

<p align="center">
  <img src="/blog-images/kafka-cluster.png" alt="Kafka Cluster" />
</p>
<p align="center"><em>A rough representation of how a Kafka Cluster would look like</em></p>

Now what the heck is ClickHouse?? 😭

<p align="center">
  <img src="/blog-images/clickhouse-intake.png" alt="ClickHouse intake" />
</p>

## ClickHouse: The Cooler Database

> [**ClickHouse**](https://clickhouse.com/) is a blazingly fast, open-source columnar database built for real-time analytical processing (OLAP). It achieves unparalleled query performance by storing data in columns and utilizing hardware-level vectorization, allowing you to generate reports on billions of rows in milliseconds.

Traditional databases like PostgreSQL are great for looking up a single user's profile. But if you ask PostgreSQL to count the number of times a million users clicked a specific button over the last 30 days, it will choke. ClickHouse is designed to answer that exact question instantly.

Okay so this part is really cool, you gotta pay attention.

You might be wondering again, *"How is this blazingly fast, bro? It's just a normal database…"* Let's look at a quick example. Imagine you have a table with 6 columns (User, Time, Action, Device, Country, Browser), and you want to get the total count of "Views" on your site.

<p align="center">
  <img src="/blog-images/columnar-storage-1.png" alt="Columnar storage example" />
</p>
<p align="center">
  <img src="/blog-images/columnar-storage-2.png" alt="Columnar storage result" />
</p>

The database completely ignores the other 5 columns. It goes straight to the "Action" column and pulls only that data. Your disk I/O cost drops to a fraction of what it was. Reading 1 column instead of 6 means a massive, instant speedup.

### Why Not Use ClickHouse for Everything?

1. **The "Reconstructing the user" problem**: The user's data would be split across multiple columns and stitching them back would cost a lot of resources.
2. **Nightmare of updating and deleting**: ClickHouse is designed to be immutable — updates and deletes are expensive.
3. **Transactions and money**: It's just not possible.

## Building a PostHog Clone

<p align="center">
  <img src="/blog-images/orange-cat.gif" alt="Orange cat" />
</p>

Okay, so all that theory is cool and all, but I would like to see it for myself and actually get a session replay of a real person using a website I've built. So, the scope of the project will be to build an SDK in TypeScript, set up an ingestion system in Golang, save all the data in ClickHouse, and finally, render all that data and analysis on a beautiful Next.js dashboard.

### Step 1: Collect User Interactions

So first step: collect user interactions and package them into a JSON file.

To do this, I used an open-source package called [`rrweb`](https://rrweb.com/). Instead of recording your entire screen, it simply watches for **DOM changes** — mouse movements, button clicks, typing in input fields — all converted into JSON events and sent to the backend.

To keep performance smooth, data is batched and sent only when hitting a `maxBatchSize` of 500 events, or at regular time intervals.

```typescript
// packages/sdk/src/batcher.ts

export class Batcher {
  private events: unknown[] = [];
  private interactions: InteractionEvent[] = [];
  private telemetry: TelemetryLog[] = [];

  constructor(options: BatcherOptions) {
    this.flushIntervalMs = options.flushIntervalMs;
    this.maxBatchSize = options.maxBatchSize ?? DEFAULT_MAX_BATCH_SIZE;
    this.onFlush = options.onFlush;
  }

  start(): void {
    this.timer = setInterval(() => this.flush(false), this.flushIntervalMs);
  }

  addEvent(event: unknown): void {
    this.events.push(event);
    if (this.events.length >= this.maxBatchSize) {
      this.flush(false);
    }
  }

  flush(useBeacon: boolean): void {
    if (this.events.length === 0 && this.interactions.length === 0
        && this.telemetry.length === 0) return;
    const events = this.events;
    // ... reset buffers ...
    this.onFlush(events, interactions, telemetry, useBeacon);
  }
}
```

On flush, the payload goes out like this:

```json
{
  "sessionId": "...",
  "events": [ /* rrweb replay blobs */ ],
  "interactions": [ /* clicks, scrolls */ ],
  "telemetry": [ /* console, network, vitals */ ]
}
```

### Step 2: Ingestion with Go + Kafka

Now, this flood of data is received by **Apache Kafka**. From there, three parallel consumers continuously pull data from this buffer and feed it into **ClickHouse**.

But here's the catch: instead of sending every single event straight to ClickHouse one by one, the Go server holds the events in memory for a few seconds (or until the buffer hits a certain size). Once that bucket is full, it flushes all 10,000 events into ClickHouse in one massive bulk insert.

```go
func (w *ClickHouseWriter) FlushTelemetryLogs(ctx context.Context, rows []TelemetryLogRow) error {
  // ...
  batch, err := w.conn.PrepareBatch(ctx, `
    INSERT INTO sighthog.telemetry_logs (
      session_id, type, sub_type, message, metadata, timestamp
    )
  `)
  // ...
  for _, row := range rows {
    if err := batch.Append(
      row.SessionID,
      row.Type,
      row.SubType,
      row.Message,
      row.Metadata,
      row.Timestamp,
    ); err != nil {
      // ...
    }
  }
}
```

*Boom.* ClickHouse is happy, disk I/O is happy, and our events are safely stored in columns.

<p align="center">
  <img src="/blog-images/dj-khaled.gif" alt="DJ Khaled" />
</p>

### Step 3: SeaweedFS for Heavy Replay Data

Okay, I gotta confess. We haven't actually been sticking to a single database.

ClickHouse alone can't handle everything. Raw `rrweb` outputs are massive — mountains of DOM content. Storing all that unstructured data in a columnar database would defeat the purpose.

Instead, [**SeaweedFS**](https://seaweedfs.org/) is used — an open-source object storage system built to hold massive files, videos, and images cheaply and securely.

### Step 4: The Next.js Dashboard

I wanted to make a dashboard that feels like home for developers. Think of it like your browser's DevTools panel but with a built-in time machine on the left.

So, when you click on a session, the frontend fires off requests to both systems simultaneously:

- **ClickHouse**: "Give me all the telemetry logs, console errors, and rage clicks for `session_id=123`."
- **SeaweedFS** (S3-compatible): "Hand over the heavy JSON file with all the rrweb DOM mutations."

Both respond in milliseconds. ClickHouse telemetry is stitched into a technical timeline on the right; the SeaweedFS JSON array feeds the player on the left.

<div style="padding:53.33% 0 0 0;position:relative;margin:2rem 0;"><iframe src="https://player.vimeo.com/video/1197459523?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:0.5rem;" title="demo-video-sighthog-1780336261417"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
<p align="center"><em>Demo Video of SightHog dashboard</em></p>

## The Privacy Landmine

Now, there is some crucial stuff happening under the hood that you wouldn't notice unless you looked closely.

When tracking DOM changes and inputs, you inevitably run into a massive privacy issue: credit card numbers and government IDs. You absolutely cannot send that raw data to your backend.

Your first instinct might be to just write a regex to look for 16-digit numbers and mask them with asterisks.

```javascript
const isCreditCard = /^\d{16}$/.test(text);
```

Nah, that won't do it. You'd end up masking other random information like product serial numbers or package tracking IDs.

That's where the [**Luhn algorithm**](https://en.wikipedia.org/wiki/Luhn_algorithm) comes in — a mathematical checksum algorithm baked into almost every credit card, IMEI number, and national provider identifier in the world.

## Conclusion

<p align="center">
  <img src="/blog-images/cat-scuba.gif" alt="Cat scuba" />
</p>

If you made it all the way down here, thank you so much for reading ❤

If there is one major takeaway from this entire experiment, it is that engineering is all about choosing the right tool for the specific job.

More than anything, I realized that building actual products is the absolute best way to learn how real-world tech fits together.

- **Project**: [Sighthog](https://sight-hog.vercel.app/) — full documentation and setup guide available.
- **GitHub**: [https://github.com/KingRain/sighthog](https://github.com/KingRain/sighthog)

That is all for today gang, cheers. o/
