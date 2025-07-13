'use client';

import React, { useState } from 'react';
import { bricolage_grotesque, inter } from "@/utils/fonts";
import Image from "next/image";
import { Badge, Link } from '@radix-ui/themes';
import { GitHubLogoIcon, GlobeIcon } from '@radix-ui/react-icons';
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
    logo: '/DiscordAvatar.png',
    title: "Washio",
    description: "Washio is a laundry service app that connects users with local laundromats for easy pickup and delivery.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/washio",
    liveUrl: "https://washio.com"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "Project Two",
    description: "A modern web application built with React and Next.js, featuring server-side rendering and responsive design.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project-two",
    liveUrl: "https://project-two.com"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "Project Three",
    description: "An e-commerce platform with real-time inventory management and secure payment processing.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe API"],
    githubUrl: "https://github.com/yourusername/project-three"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "Project Four",
    description: "A data visualization dashboard providing insights and analytics for business intelligence.",
    techStack: ["D3.js", "React", "Python", "Flask"],
    liveUrl: "https://project-four.com"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "AI Image Generator",
    description: "A web application that uses AI to generate images from text prompts, leveraging the latest in diffusion models.",
    techStack: ["Python", "PyTorch", "React", "FastAPI"],
    githubUrl: "https://github.com/yourusername/ai-image-gen",
    liveUrl: "https://ai-image-gen.com"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "Crypto Portfolio Tracker",
    description: "A comprehensive cryptocurrency portfolio tracking application with real-time price updates and performance analytics.",
    techStack: ["React", "Node.js", "CoinGecko API", "Chart.js"],
    githubUrl: "https://github.com/yourusername/crypto-tracker"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "Smart Home Dashboard",
    description: "A centralized dashboard for controlling and monitoring smart home devices with customizable automation workflows.",
    techStack: ["Vue.js", "MQTT", "Express", "WebSockets"],
    liveUrl: "https://smart-home-dash.com"
  },
  {
    logo: '/DiscordAvatar.png',
    title: "Recipe Finder App",
    description: "An application that helps users find recipes based on ingredients they have at home, with filtering options for dietary restrictions.",
    techStack: ["React Native", "GraphQL", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/recipe-finder",
    liveUrl: "https://recipe-finder-app.com"
  }
];

export function ProjectSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 bg-transparent">
      <h2 className={`text-2xl font-bold mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark`}>Proof of Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
      {displayedProjects.map((project, idx) => (
        <React.Fragment key={idx}>
        <div className="relative h-full bg-white dark:bg-black rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col items-start mb-4">
            <Link href={project.liveUrl || project.githubUrl || "#"} target='_blank'>
              <Image
          src={project.logo}
          alt={`${project.title} logo`}
          width={48}
          height={48}
          className='rounded-full border-2 border-gray-200 dark:border-gray-700'
              />
            </Link>
            <div className="mt-3">
              <Link
          href={project.liveUrl || project.githubUrl || "#"}
          target='_blank'
          underline='none'
              >
          <h3 className={`text-xl font-bold tracking-tight text-primary dark:text-primary-dark ${bricolage_grotesque}`}>
            {project.title}
          </h3>
              </Link>
            </div>
          </div>

          <p className={`text-sm text-primary dark:text-primary-dark mb-4 ${inter}`}>
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

          <div className='flex gap-3'>
          {project.liveUrl && (
            <Link href={project.liveUrl} target='_blank'>
            <button className={`flex items-center text-xs py-1 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${bricolage_grotesque}`}>
              <GlobeIcon width={12} height={12} className="mr-1" /> Website
            </button>
            </Link>
          )}
          {project.githubUrl && (
            <Link href={project.githubUrl} target='_blank'>
            <button className={`flex items-center text-xs py-1 px-3 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ${bricolage_grotesque}`}>
              <GitHubLogoIcon width={12} height={12} className="mr-1" /> Source
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
