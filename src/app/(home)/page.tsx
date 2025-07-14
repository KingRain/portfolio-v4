import AboutmeSection from "@/components/AboutmeSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import { ProjectSection } from "@/components/ProjectSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectSection />
      <AboutmeSection />
      <ExperienceSection />
      <HighlightsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </>
  );
}
