import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import { BlogSection } from '@/components/BlogSection';
import { SectionSkeleton } from '@/components/SectionSkeleton';
import { getAllPosts } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/magicui/grid-pattern';

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
        <HeroSection />
        <ProjectSection maxCount={4} />
        <AboutmeSection />
        <ExperienceSection />
        <HighlightsSection />
        <BlogSection posts={getAllPosts().slice(0, 3)} />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
