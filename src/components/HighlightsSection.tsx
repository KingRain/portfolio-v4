import { Code, Layers, LineChart, User } from "lucide-react";
import { bricolage_grotesque } from "@/utils/fonts";
import { Globe } from "@/components/magicui/globe";
import { Link } from "@radix-ui/themes";
import { NumberTicker } from "@/components/magicui/number-ticker";
import GitHubContributions from "@/components/GitHubContributions";
import HighlightsCarousel, {
  type HighlightSlide,
} from "@/components/HighlightsCarousel";

const highlightSlides: HighlightSlide[] = [
  {
    tag: "New Article",
    title: "How PostHog Handles Millions of Events",
    description: (
      <>
        Wrote about building{" "}
        <span className="font-semibold">SightHog</span> — a mini replica of
        PostHog&apos;s ingestion pipeline with Kafka, ClickHouse, and rrweb
        replay — and what I learned about scaling event analytics from scratch.
      </>
    ),
    ctaLabel: "Read Article",
    ctaHref: "https://sight-hog.vercel.app/docs",
  },
  {
    tag: "Hackathon Win",
    title: "Hack-a-Addict • 1st Place",
    description: (
      <>
        Team <span className="font-medium">Drag-on</span> (Noel, Basil & me) took
        1st of 50+ teams and won <span className="font-semibold">₹1.5L</span> at
        a national hackathon by IEEE & Lions Club. We built{" "}
        <span className="font-semibold">DragApp</span> — a drug abuse prevention
        platform.
      </>
    ),
    ctaLabel: "View on Play Store",
    ctaHref:
      "https://play.google.com/store/apps/details?id=org.lionsclub.dragapp",
  },
  {
    tag: "Hackathon Win",
    title: "Smart India Hackathon 2025 • Winner",
    description: (
      <>
        Team <span className="font-medium">Devillum</span> won SIH 2025 under PS
        ID 25233 (NTRO) at IIT Jammu — building a solution for national
        technical research with Niranjan, Pranathi, Sarah, Noel, and Vishnu.
      </>
    ),
    ctaLabel: "Read on LinkedIn",
    ctaHref:
      "https://www.linkedin.com/posts/samjoe404_still-feels-unreal-but-here-we-are-our-activity-7404433484024315904-6p1f",
  },
  {
    tag: "Product Launch",
    title: "Buffer Beta is Live",
    description: (
      <>
        Shipped the beta for my first B2C SaaS —{" "}
        <span className="font-semibold">Buffer</span>, a command-driven workspace
        for notes, PDFs, and deep links. Built for people who think in commands,
        not clicks.
      </>
    ),
    ctaLabel: "Try Buffer",
    ctaHref: "https://www.bufr.in/",
  },
];

export default function HighlightsSection() {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:py-40">
      <div className="container mx-auto max-w-5xl flex justify-center">
        <div className="flex flex-col gap-8 sm:gap-10 items-center w-full">
          <div className="flex gap-3 sm:gap-4 flex-col items-center">
            <div>
              <h2
                className={`text-2xl font-bold mb-2 sm:mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark text-center`}
              >
                Highlights
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col relative overflow-hidden">
              <Code className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className={`text-xl tracking-tight ${bricolage_grotesque}`}>
                  Recent Highlights
                </h3>
                <HighlightsCarousel slides={highlightSlides} />
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md aspect-square p-6 flex justify-between flex-col relative overflow-hidden">
              <LineChart className="w-8 h-8 stroke-1 z-10 relative" />
              <div className="flex flex-col z-10 relative items-center justify-center text-center">
                <NumberTicker
                  value={200}
                  className="whitespace-pre-wrap text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter bg-gradient-to-r from-black dark:from-white to-blue-600 dark:to-blue-300 text-transparent bg-clip-text"
                />
                <div className="flex flex-col mb-24">
                  <span
                    className={`text-xl tracking-tight bg-gradient-to-r from-black dark:from-white to-blue-500 dark:to-blue-200 text-transparent bg-clip-text ${bricolage_grotesque}`}
                  >
                    Users
                  </span>
                  <p
                    className={`text-muted-foreground text-sm ${bricolage_grotesque}`}
                  >
                    and counting
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2">
                <Globe />
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md aspect-square p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-8 h-8 stroke-1" />
                <h3
                  className={`text-xl tracking-tight ${bricolage_grotesque} text-left`}
                >
                  By the Numbers
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center text-center mt-14">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col">
                    <NumberTicker
                      value={53}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span
                      className={`text-xs ${bricolage_grotesque} text-muted-foreground`}
                    >
                      Projects Built
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <NumberTicker
                      value={9}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span
                      className={`text-xs ${bricolage_grotesque} text-muted-foreground`}
                    >
                      Hackathons
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <NumberTicker
                      value={12}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span
                      className={`text-xs ${bricolage_grotesque} text-muted-foreground`}
                    >
                      Open Source Contributions
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <NumberTicker
                      value={15}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span
                      className={`text-xs ${bricolage_grotesque} text-muted-foreground`}
                    >
                      Technologies Mastered
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto justify-between flex-col">
              <Layers className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
              <h3 className={`text-xl tracking-tight ${bricolage_grotesque}`}>
                GitHub Contributions
              </h3>
              <div className="mt-2 overflow-hidden">
                <Link
                href={"https://github.com/KingRain"}
                target="_blank"
                className="block overflow-hidden"
                >
                <GitHubContributions />
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
