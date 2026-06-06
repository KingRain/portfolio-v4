"use client";

import { useCallback, useEffect, useState } from "react";
import { bricolage_grotesque } from "@/utils/fonts";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { cn } from "@/lib/utils";

export type HighlightSlide = {
  tag: string;
  title: string;
  description: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

const AUTO_ADVANCE_MS = 7000;

type HighlightsCarouselProps = {
  slides: HighlightSlide[];
};

export default function HighlightsCarousel({ slides }: HighlightsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      setActiveIndex(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[activeIndex];

  return (
    <div className="mt-3">
      <div className="relative overflow-hidden rounded-lg bg-gray-100/10 p-4 backdrop-blur-md dark:bg-white/5">
        <div
          key={activeIndex}
          className="animate-in fade-in slide-in-from-right-2 duration-300"
        >
          <span
            className={cn(
              "mb-2 inline-block rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-200",
              bricolage_grotesque
            )}
          >
            {slide.tag}
          </span>
          <h4
            className={cn(
              "text-base font-semibold text-black dark:text-white",
              bricolage_grotesque
            )}
          >
            {slide.title}
          </h4>
          <div
            className={cn(
              "mt-2 text-sm text-gray-800 dark:text-gray-200",
              bricolage_grotesque
            )}
          >
            {slide.description}
          </div>
          {slide.ctaLabel && slide.ctaHref && (
            <div className="mt-3">
              <ShinyButton
                className="h-8 px-3 text-xs sm:h-auto sm:px-4 sm:text-sm"
                onClick={() => window.open(slide.ctaHref, "_blank", "noopener,noreferrer")}
              >
                {slide.ctaLabel}
              </ShinyButton>
            </div>
          )}
        </div>

      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to ${item.title}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex
                  ? "w-6 bg-black dark:bg-white"
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
