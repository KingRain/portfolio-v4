import AboutmeSection from "@/components/AboutmeSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectSection } from "@/components/ProjectSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <AboutmeSection />
      <ExperienceSection />
      <EducationSection />
    </>
  );
}
