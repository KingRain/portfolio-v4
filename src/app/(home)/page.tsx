import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import { SectionSkeleton } from '@/components/SectionSkeleton';

const ProjectSection = dynamic(
  () => import('@/components/ProjectSection').then((m) => ({ default: m.ProjectSection })),
  { loading: () => <SectionSkeleton height="h-96" /> }
);

const AboutmeSection = dynamic(() => import('@/components/AboutmeSection'), {
  loading: () => <SectionSkeleton />,
});

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  loading: () => <SectionSkeleton height="h-80" />,
});

const HighlightsSection = dynamic(() => import('@/components/HighlightsSection'), {
  loading: () => <SectionSkeleton height="h-[500px]" />,
});

const SkillsSection = dynamic(() => import('@/components/SkillsSection'), {
  loading: () => <SectionSkeleton />,
});

const EducationSection = dynamic(() => import('@/components/EducationSection'), {
  loading: () => <SectionSkeleton />,
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <SectionSkeleton height="h-80" /> },
);

const Footer = dynamic(() => import('@/components/Footer'));

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
