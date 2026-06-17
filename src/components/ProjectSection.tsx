"use client";

import React from "react";
import { bricolage_grotesque, inter } from "@/utils/fonts";
import Image from "next/image";
import { Badge, Link } from "@radix-ui/themes";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { BorderBeam } from "./ui/border-beam";
import { MagneticButton } from "./unlumen-ui/magnetic-button";
import { SightHogLogo } from "./icons/SightHogLogo";
import { BufferLogo } from "./icons/BufferLogo";

const CARD_HEIGHT = "h-[460px]";

interface Project {
  logo?: string;
  useSightHogLogo?: boolean;
  useBufferLogo?: boolean;
  title: string;
  description: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    useBufferLogo: true,
    title: "Buffer",
    description:
      "A command-driven workspace where notes, PDFs, and deep links live side by side. Terminal-first editor with a built-in PDF viewer, deep linking to specific pages, local-first speed via IndexedDB, and real-time collaboration built for people who think in commands, not clicks.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "IndexedDB",
      "PDF.js",
      "Tailwind CSS",
    ],
    liveUrl: "https://www.bufr.in/",
  },
  {
    useSightHogLogo: true,
    title: "SightHog",
    description:
      "Open-source, self-hosted browser telemetry and session replay SDK. Drop-in SDK captures rrweb replay, rage-clicks, Web Vitals, and network logs, shipping to your own Kafka, Postgres, and ClickHouse. ~6 kB gzipped, privacy-first masking, no per-seat SaaS fees.",
    techStack: [
      "TypeScript",
      "Next.js",
      "Go",
      "Kafka",
      "PostgreSQL",
      "ClickHouse",
      "rrweb",
      "Docker",
    ],
    githubUrl: "https://github.com/KingRain/SightHog",
    liveUrl: "https://sight-hog.vercel.app/",
  },
  {
    logo: "/WashioLogo.png",
    title: "Wash.io",
    description:
      "Wash.io is a convenient app that allows users to book time slots for using washing machines on their floor. Features include real-time availability tracking, notifications for cycle completion, and a conflict resolution system for scheduling overlaps.",
    techStack: ["Flutter", "Supabase", "Dart", "Firebase Auth", "REST API"],
    githubUrl: "https://github.com/KingRain/Washio",
    liveUrl: "https://washio.netlify.app/",
  },
  {
    logo: "/DragAppLogo.png",
    title: "DragApp",
    description:
      "A bilingual (English and Malayalam) platform addressing substance abuse among youth in Kerala. Built around Prevention, Cure, and Control frameworks, it features an AI-powered conversational assistant, anonymous reporting with location tracking, community resources, and a secure dashboard for law enforcement with real-time data visualization.",
    techStack: [
      "React Native",
      "Next.js",
      "Supabase",
      "Firebase",
      "Headless CMS",
      "Location APIs",
      "JWT Auth",
      "Expo",
    ],
    githubUrl: "https://github.com/kingrain",
    liveUrl: "https://dragapp.vercel.app/",
  },
  {
    logo: "/GeoshiftLogo.png",
    title: "Geoshift",
    description:
      "A Smart India Hackathon 2024 project that revolutionizes logistics management with real-time GPS tracking of transport vehicles, automated attendance via geofencing, optimized route planning, and a comprehensive dashboard for supervisors with detailed analytics and shift scheduling capabilities.",
    techStack: [
      "React Native",
      "Google Maps API",
      "Redux",
      "Node.js",
      "MongoDB",
    ],
    githubUrl: "https://github.com/KingRain/geoshift",
    liveUrl: "https://github.com/KingRain/geoshift",
  },
  {
    logo: "/AlgoscopeLogo.png",
    title: "AlgoScope",
    description:
      "An interactive algorithm visualizer with step-by-step animation of sorting, searching, and graph algorithms. Features include speed control, algorithm comparison, custom input datasets, and detailed explanation panels to enhance learning and understanding of computational processes.",
    techStack: ["React", "Tailwind CSS", "Canvas API", "TypeScript"],
    githubUrl: "https://github.com/KingRain/AlgoScope",
    liveUrl: "https://algo-scope.netlify.app/",
  },
  {
    logo: "/ThreadrLogo.png",
    title: "Threadr",
    description:
      "A responsive task management app with intuitive drag-and-drop functionality, customizable task categories, priority levels, due date reminders, and progress tracking. Supports offline mode with local storage sync and theme customization for personalized user experience.",
    techStack: ["React", "TypeScript", "Vite", "React DnD"],
    githubUrl: "https://github.com/KingRain/threadr",
    liveUrl: "https://github.com/KingRain/threadr",
  },
  {
    logo: "/ParsecLogo.png",
    title: "Parsec",
    description:
      "An automated architecture visualization tool that generates interactive dependency diagrams for large codebases. Features include real-time code analysis, module relationship mapping, circular dependency detection, and exportable documentation to simplify system understanding and maintenance.",
    techStack: ["TypeScript", "Static Analysis", "Node.js", "Express"],
    githubUrl: "https://github.com/KingRain/Parsec",
    liveUrl: "https://parsec-gamma.vercel.app",
  },
  {
    logo: "/ShareloadLogo.png",
    title: "Shareload",
    description:
      "A Chrome extension enabling remote download management across devices with queue prioritization, bandwidth allocation, completion notifications, and device synchronization. Allows users to initiate downloads from any device and have files appear on their designated target system.",
    techStack: [
      "JavaScript",
      "Chrome API",
      "WebSockets",
      "IndexedDB",
      "REST API",
    ],
    githubUrl: "https://github.com/KingRain/shareload-client/tree/dev",
    liveUrl: "https://github.com/KingRain/shareload-client/tree/dev",
  },
  {
    logo: "/RivixLogo.png",
    title: "Rivix",
    description:
      "An LLM wrapper for Llama 3.2 that provides structured code generation with syntax highlighting, contextual code completion, and interactive debugging suggestions. Features client-side processing for privacy, low-latency responses, and custom prompt templates for different programming tasks.",
    techStack: [
      "JavaScript",
      "Llama 3.2",
      "WebAssembly",
      "WebWorkers",
      "React",
    ],
    githubUrl: "https://github.com/KingRain/Rivix",
    liveUrl: "https://github.com/KingRain/Rivix",
  },
  {
    logo: "/DogeLogo.png",
    title: "Doge",
    description:
      "A multipurpose Discord bot serving 100+ servers with advanced moderation tools, customizable auto-responses, leveling systems, economy simulation with virtual currency, music playback, and API integrations for weather, memes, and gaming stats.",
    techStack: [
      "Discord.js",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "WebHooks",
    ],
    githubUrl: "https://github.com/KingRain/DogeDiscordBot",
    liveUrl: "https://github.com/KingRain/DogeDiscordBot",
  },
  {
    logo: "/DiscordScrapperLogo.png",
    title: "DiscordWebScrapper",
    description:
      "A real-time Discord data scraper with message archiving, user activity analytics, sentiment analysis, and customizable data extraction filters. Includes data visualization capabilities and export options for CSV, JSON, and Excel formats.",
    techStack: ["Python", "WebSocket", "BeautifulSoup", "Pandas"],
    githubUrl: "https://github.com/KingRain/DiscordWebScrapper",
    liveUrl: "https://github.com/KingRain/DiscordWebScrapper",
  },
];

function ProjectLogo({ project }: { project: Project }) {
  if (project.useBufferLogo) {
    return <BufferLogo size={48} />;
  }

  if (project.useSightHogLogo) {
    return <SightHogLogo size={48} />;
  }

  if (!project.logo) {
    return null;
  }

  return (
    <Image
      src={project.logo}
      alt={`${project.title} logo`}
      width={48}
      height={48}
      className="rounded-full border-2 border-gray-200 dark:border-gray-700 object-contain"
    />
  );
}

export function ProjectSection() {
  const displayedProjects = projects;

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 bg-transparent">
      <h2
        className={`text-2xl font-bold mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark`}
      >
        Proof of Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        {displayedProjects.map((project, idx) => (
          <div key={idx} className={`${CARD_HEIGHT} w-full rounded-xl group/spotlight`}>
            <div
              className={`relative flex ${CARD_HEIGHT} w-full flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl`}
            >
              <div className="relative z-10 flex flex-1 flex-col pointer-events-none">
                <div className="flex flex-col items-start mb-3">
                  <Link
                    href={project.liveUrl || project.githubUrl || "#"}
                    target="_blank"
                    className="pointer-events-auto"
                  >
                    <ProjectLogo project={project} />
                  </Link>
                  <div className="mt-3">
                    <Link
                      href={project.liveUrl || project.githubUrl || "#"}
                      target="_blank"
                      underline="none"
                      className="pointer-events-auto"
                    >
                      <h3
                        className={`text-xl font-bold tracking-tight text-primary dark:text-primary-dark ${bricolage_grotesque}`}
                      >
                        {project.useSightHogLogo ? (
                          <>
                            <span>Sight</span>
                            <span className="text-orange-500">Hog</span>
                          </>
                        ) : (
                          project.title
                        )}
                      </h3>
                    </Link>
                  </div>
                </div>

                <p
                  className={`mb-3 line-clamp-5 flex-1 text-sm text-primary dark:text-primary-dark ${inter}`}
                >
                  {project.description}
                </p>

                <div className="mb-4 flex h-14 shrink-0 flex-wrap content-start gap-1.5 overflow-hidden">
                  {project.techStack?.map((tech, techIdx) => (
                    <Badge
                      key={techIdx}
                      size="1"
                      color="gray"
                      variant="soft"
                      highContrast
                      className={`shrink-0 whitespace-nowrap rounded-sm border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs leading-tight dark:border-gray-700 dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors ${bricolage_grotesque}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex gap-3 pointer-events-auto">
                  {project.liveUrl && (
                    <MagneticButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                      className={`flex items-center text-xs py-1 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 ${bricolage_grotesque}`}
                    >
                      <GlobeIcon width={12} height={12} className="mr-1" /> Website
                    </MagneticButton>
                  )}
                  {project.githubUrl && (
                    <MagneticButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className={`flex items-center text-xs py-1 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 ${bricolage_grotesque}`}
                    >
                      <GitHubLogoIcon width={12} height={12} className="mr-1" />{" "}
                      Source
                    </MagneticButton>
                  )}
                </div>
              </div>
              <BorderBeam size={250} duration={4} delay={idx * 3} spotlight spotlightRadius={350} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
