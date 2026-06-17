"use client";

import React from 'react';
import { HiHome } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiFileText } from 'react-icons/fi';
import { BsFileText, BsNewspaper } from 'react-icons/bs';

import { Dock, type DockItem } from "@/components/magicui/dock";
import { ThemeToggle, useThemeToggle } from './ThemeToggle';

export type IconProps = React.HTMLAttributes<SVGElement>;

const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export function DockNav() {
  const toggleTheme = useThemeToggle();

  const items: DockItem[] = [
    { icon: <HiHome />, label: "Home", href: "/" },
    { icon: <BsFileText />, label: "Projects", href: "/projects" },
    { icon: <BsNewspaper />, label: "Blog", href: "/blog" },
    { icon: <FiFileText />, label: "Resume", onClick: () => window.open("/SamJoe_Resume.pdf", "_blank", "noopener noreferrer"), separator: true },
    { icon: <FiGithub />, label: "GitHub", onClick: () => window.open("https://github.com/KingRain", "_blank", "noopener noreferrer") },
    { icon: <FiLinkedin />, label: "LinkedIn", onClick: () => window.open("https://www.linkedin.com/in/samjoe404/", "_blank", "noopener noreferrer") },
    { icon: <XIcon />, label: "X", onClick: () => window.open("https://x.com/httperr0r_", "_blank", "noopener noreferrer"), separator: true },
    { icon: <ThemeToggle />, label: "Theme", onClick: toggleTheme },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <Dock items={items} />
    </div>
  );
}
