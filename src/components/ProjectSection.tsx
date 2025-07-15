"use client";

import React, { useState } from "react";
import { bricolage_grotesque, inter } from "@/utils/fonts";
import Image from "next/image";
import { Badge, Link } from "@radix-ui/themes";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { BorderBeam } from "./ui/border-beam";

interface Project {
  logo: string;
  title: string;
  description: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
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

export function ProjectSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 bg-transparent">
      <h2
        className={`text-2xl font-bold mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark`}
      >
        Proof of Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        {displayedProjects.map((project, idx) => (
          <React.Fragment key={idx}>
            <div className="relative h-full bg-white dark:bg-black rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="flex flex-col items-start mb-4">
                <Link
                  href={project.liveUrl || project.githubUrl || "#"}
                  target="_blank"
                >
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                </Link>
                <div className="mt-3">
                  <Link
                    href={project.liveUrl || project.githubUrl || "#"}
                    target="_blank"
                    underline="none"
                  >
                    <h3
                      className={`text-xl font-bold tracking-tight text-primary dark:text-primary-dark ${bricolage_grotesque}`}
                    >
                      {project.title}
                    </h3>
                  </Link>
                </div>
              </div>

              <p
                className={`text-sm text-primary dark:text-primary-dark mb-4 ${inter}`}
              >
                {project.description}
              </p>

              <div className="flex gap-2 flex-wrap mb-4">
                {project.techStack?.map((tech, techIdx) => (
                  <Badge
                    key={techIdx}
                    color="gray"
                    variant="soft"
                    highContrast
                    className={`text-[10px] px-2 py-0.5 rounded-sm bg-gray-100 dark:bg-black border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors ${bricolage_grotesque}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank">
                    <button
                      className={`flex items-center text-xs py-1 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${bricolage_grotesque}`}
                    >
                      <GlobeIcon width={12} height={12} className="mr-1" />{" "}
                      Website
                    </button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank">
                    <button
                      className={`flex items-center text-xs py-1 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${bricolage_grotesque}`}
                    >
                      <GitHubLogoIcon width={12} height={12} className="mr-1" />{" "}
                      Source
                    </button>
                  </Link>
                )}
              </div>
              <BorderBeam size={250} duration={4} delay={idx * 3} />
            </div>
          </React.Fragment>
        ))}
      </div>

      {projects.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className={`mt-8 py-1 px-3 text-xs rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors z-100 relative ${bricolage_grotesque}`}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
