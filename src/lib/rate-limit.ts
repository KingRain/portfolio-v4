import { NextRequest } from 'next/server';

class InMemoryRateLimiter {
  private store = new Map<string, number[]>();

  constructor() {
    // Run cleanup periodically in environments that support it
    if (typeof setInterval !== 'undefined') {
      const interval = setInterval(() => this.prune(), 5 * 60 * 1000);
      if (interval && typeof interval.unref === 'function') {
        interval.unref();
      }
    }
  }

  /**
   * Check if request limit has been exceeded for a key.
   * @param key Unique key to rate limit (e.g., IP or email)
   * @param limit Maximum number of requests allowed in the window
   * @param windowMs Window size in milliseconds
   */
  public check(
    key: string,
    limit: number,
    windowMs: number
  ): {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number; // timestamp in ms when the earliest slot frees up
  } {
    const now = Date.now();
    const timestamps = this.store.get(key) || [];

    // Filter out expired timestamps
    const validTimestamps = timestamps.filter((timestamp) => now - timestamp < windowMs);

    if (validTimestamps.length >= limit) {
      // Find the earliest timestamp that will expire first
      const oldestValid = validTimestamps[0];
      const resetTime = oldestValid + windowMs;
      return {
        success: false,
        limit,
        remaining: 0,
        reset: resetTime,
      };
    }

    // Add the new request timestamp
    validTimestamps.push(now);
    this.store.set(key, validTimestamps);

    return {
      success: true,
      limit,
      remaining: limit - validTimestamps.length,
      reset: now + windowMs,
    };
  }

  /**
   * Prune expired entries to prevent memory leaks.
   */
  private prune() {
    const now = Date.now();
    // Use an arbitrary maximum safety window (e.g., 24 hours) to clear dead entries
    const safetyWindow = 24 * 60 * 60 * 1000;
    for (const [key, timestamps] of this.store.entries()) {
      const valid = timestamps.filter((t) => now - t < safetyWindow);
      if (valid.length === 0) {
        this.store.delete(key);
      } else {
        this.store.set(key, valid);
      }
    }
  }
}

export const rateLimiter = new InMemoryRateLimiter();

/**
 * Helper to securely get the client's IP address.
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return (req as { ip?: string }).ip || '127.0.0.1';
}
