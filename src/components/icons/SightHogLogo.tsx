import { Crosshair } from "lucide-react";

export function SightHogLogo({ size = 48 }: { size?: number }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.45)]"
      style={{ width: size, height: size }}
    >
      <Crosshair
        className="text-white"
        style={{ width: size * 0.42, height: size * 0.42 }}
        strokeWidth={2.25}
      />
    </div>
  );
}
