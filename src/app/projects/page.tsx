import { ProjectSection } from "@/components/ProjectSection";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function Projects() {
  return (
    <div className="relative">
      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "fixed inset-0 h-full w-full skew-y-12"
        )}
        width={30}
        height={30}
      />
      <div className="relative z-10">
        <ProjectSection />
      </div>
    </div>
  );
} 