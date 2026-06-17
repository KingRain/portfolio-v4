"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ClippedCircleProps {
  circleSize?: number;
  circleClassName?: string;
}

export function ClippedCircle({
  circleSize = 800,
  circleClassName,
}: ClippedCircleProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      aria-hidden
    >
      <div
        className={cn(
          "absolute rounded-full",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-500 ease-out",
          "group-hover:scale-110",
          circleClassName,
        )}
        style={{ width: circleSize, height: circleSize }}
      />
    </div>
  );
}
