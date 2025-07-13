"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 3,
  className,
  children,
}: ShineBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Colors with transparent sections for smooth looping
  const gradientString = "#0066ff, transparent 30%, #00ff66 50%, transparent 70%, #0066ff";

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const style = document.createElement('style');
    const animationName = `shine-${Math.random().toString(36).substring(2, 9)}`;
    
    style.textContent = `
      @keyframes ${animationName} {
        0% { background-position: 0% 0%; }
        50% { background-position: 100% 100%; }
        100% { background-position: 0% 0%; }
      }
    `;
    
    document.head.appendChild(style);
    container.style.setProperty('--animation-name', animationName);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden p-[2px] rounded-xl",
        className
      )}
      style={{
        background: `linear-gradient(45deg, ${gradientString})`,
        backgroundSize: "200% 200%",
        animation: `var(--animation-name, shine) ${duration}s ease-in-out infinite`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <div 
        className="h-full w-full rounded-xl bg-background dark:bg-gray-900"
        style={{
          padding: `${borderWidth}px`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

