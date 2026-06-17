"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface TiltProps extends HTMLMotionProps<"div"> {
  rotationFactor?: number;
  springOptions?: { stiffness: number; damping: number; mass: number };
}

export function Tilt({
  children,
  rotationFactor = 11,
  springOptions = { stiffness: 200, damping: 20, mass: 1 },
  className,
  ...props
}: TiltProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springOptions);
  const springY = useSpring(mouseY, springOptions);

  const rotateX = useTransform(springY, [-0.5, 0.5], [rotationFactor, -rotationFactor]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-rotationFactor, rotationFactor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
