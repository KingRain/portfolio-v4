"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  spotlight?: boolean;
  spotlightRadius?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
  spotlight = false,
  spotlightRadius = 350,
}: BorderBeamProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("absolute inset-0 rounded-[inherit] overflow-hidden", className)}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      onMouseEnter={spotlight ? () => setIsHovering(true) : undefined}
      onMouseLeave={spotlight ? () => setIsHovering(false) : undefined}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
          style={{
            maskImage: useMotionTemplate`
              radial-gradient(
                ${spotlightRadius}px circle at ${mouseX}px ${mouseY}px,
                white,
                transparent 80%
              )
            `,
          }}
        >
          {isHovering && (
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              dotSize={3}
            />
          )}
        </motion.div>
      )}

      <div
        style={
          {
            "--size": size,
            "--duration": duration,
            "--anchor": anchor,
            "--border-width": borderWidth,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "--delay": `-${delay}s`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
          "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
          "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        )}
      />
    </div>
  );
};
