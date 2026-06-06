"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type PixelPattern =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "diagonal"
  | "ascend"
  | "edges"
  | "spiral"
  | "cursor"
  | "random";

export interface PixelBackgroundProps {
  children: React.ReactNode;
  className?: string;
  canvasClassName?: string;
  gap?: number;
  speed?: number;
  pattern?: PixelPattern;
  darkColors?: string;
  lightColors?: string;
  opacity?: number;
}

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.random(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.random(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  private random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const offset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  if (value <= 0 || reducedMotion) return 0;
  if (value >= 100) return 100 * 0.001;
  return value * 0.001;
}

function getOrigin(
  pattern: PixelPattern,
  width: number,
  height: number,
  cursor?: { x: number; y: number }
) {
  switch (pattern) {
    case "top":
      return { x: width / 2, y: 0 };
    case "bottom":
      return { x: width / 2, y: height };
    case "left":
      return { x: 0, y: height / 2 };
    case "right":
      return { x: width, y: height / 2 };
    case "diagonal":
      return { x: 0, y: 0 };
    case "ascend":
      return { x: width, y: height };
    case "cursor":
      return cursor ?? { x: width / 2, y: height / 2 };
    case "center":
    default:
      return { x: width / 2, y: height / 2 };
  }
}

function getDelay(
  pattern: PixelPattern,
  x: number,
  y: number,
  width: number,
  height: number,
  origin: { x: number; y: number }
) {
  if (pattern === "random") {
    return Math.random() * Math.sqrt(width * width + height * height);
  }
  if (pattern === "edges") {
    const edgeDist = Math.min(x, y, width - x, height - y);
    return edgeDist;
  }
  if (pattern === "spiral") {
    const dx = x - origin.x;
    const dy = y - origin.y;
    const angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist + ((angle + Math.PI) / (2 * Math.PI)) * 40;
  }
  const dx = x - origin.x;
  const dy = y - origin.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function PixelBackground({
  children,
  className,
  canvasClassName,
  gap = 5,
  speed = 35,
  pattern = "center",
  darkColors = "#2a2a2a,#3b3b3b,#525252",
  lightColors = "#d4d4d4,#bdbdbd,#a3a3a3",
  opacity = 1,
}: PixelBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pixelsRef = React.useRef<Pixel[]>([]);
  const animationRef = React.useRef<number | null>(null);
  const timePreviousRef = React.useRef(0);
  const cursorRef = React.useRef<{ x: number; y: number } | null>(null);
  const isDarkRef = React.useRef(false);
  const reducedMotionRef = React.useRef(false);

  const initPixels = React.useCallback(
    (cursor?: { x: number; y: number }) => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      const ctx = canvas.getContext("2d");
      if (!ctx || width <= 0 || height <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDark = document.documentElement.classList.contains("dark");
      isDarkRef.current = isDark;
      const colors = (isDark ? darkColors : lightColors).split(",").map((c) => c.trim());
      const origin = getOrigin(pattern, width, height, cursor);
      const effectiveSpeed = getEffectiveSpeed(speed, reducedMotionRef.current);

      const pixels: Pixel[] = [];
      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const delay = reducedMotionRef.current
            ? 0
            : getDelay(pattern, x, y, width, height, origin);
          pixels.push(
            new Pixel(canvas, ctx, x, y, color, effectiveSpeed, delay)
          );
        }
      }
      pixelsRef.current = pixels;
    },
    [gap, speed, pattern, darkColors, lightColors]
  );

  const animate = React.useCallback((method: "appear" | "disappear") => {
    const tick = () => {
      animationRef.current = requestAnimationFrame(tick);

      const now = performance.now();
      if (timePreviousRef.current === 0) timePreviousRef.current = now;
      const elapsed = now - timePreviousRef.current;
      if (elapsed < 1000 / 60) return;
      timePreviousRef.current = now - (elapsed % (1000 / 60));

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.globalAlpha = opacity;

      let allIdle = true;
      for (const pixel of pixelsRef.current) {
        if (method === "appear") pixel.appear();
        else pixel.disappear();
        if (!pixel.isIdle) allIdle = false;
      }

      ctx.globalAlpha = 1;
      if (allIdle && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    timePreviousRef.current = 0;
    animationRef.current = requestAnimationFrame(tick);
  }, [opacity]);

  React.useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    initPixels();
    const resizeObserver = new ResizeObserver(() => initPixels(cursorRef.current ?? undefined));
    const container = containerRef.current;
    if (container) resizeObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      initPixels(cursorRef.current ?? undefined);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initPixels]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pattern === "cursor") {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        cursorRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
        initPixels(cursorRef.current);
      }
    }
    animate("appear");
  };

  const handleMouseLeave = () => {
    cursorRef.current = null;
    animate("disappear");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pattern !== "cursor") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          canvasClassName
        )}
        aria-hidden
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
