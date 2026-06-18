"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { bricolage_grotesque } from "@/utils/fonts";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export function MobileNav() {
  const [visible, setVisible] = useState(false);
  const lastScroll = useRef(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 80 && y > lastScroll.current ? false : y > 80);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-4 py-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg transition-all duration-300 w-fit md:hidden ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="flex items-center gap-1">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`px-2.5 py-1 text-xs ${bricolage_grotesque} text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors`}
          >
            {link.label}
          </Link>
        ))}
        <button onClick={toggleTheme} className="p-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </div>
  );
}
