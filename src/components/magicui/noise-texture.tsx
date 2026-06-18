"use client";

import { cn } from "@/lib/utils";

interface NoiseTextureProps extends React.ComponentProps<"svg"> {
  frequency?: number;
  octaves?: number;
  slope?: number;
  noiseOpacity?: number;
}

export function NoiseTexture({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <filter id="noise-texture">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values={`1 0 0 0 0
                   0 1 0 0 0
                   0 0 1 0 0
                   0 0 0 ${slope} 0`}
        />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#noise-texture)"
        opacity={noiseOpacity}
      />
    </svg>
  );
}
