"use client";

import { Badge } from "@radix-ui/themes";
import React, { JSX } from "react";
import { bricolage_grotesque } from "@/utils/fonts";

import { 
    SiJavascript, 
    SiTypescript, 
    SiNextdotjs, 
    SiReact, 
    SiMongodb, 
    SiPostgresql, 
    SiSupabase, 
    SiMysql, 
    SiDocker, 
    SiServerless as SiAmazonaws, 
    SiRedux, 
    SiTailwindcss, 
    SiNodedotjs, 
    SiExpress, 
    SiGit,
    SiPython,
    SiCplusplus,
} from "react-icons/si";

const IconForSkill = ({ skill }: { skill: string }) => {
    const iconMap: Record<string, JSX.Element> = {
        "JavaScript": <SiJavascript />,
        "TypeScript": <SiTypescript />,
        "Next.js": <SiNextdotjs />,
        "React": <SiReact />,
        "MongoDB": <SiMongodb />,
        "PostgreSQL": <SiPostgresql />,
        "Supabase": <SiSupabase />,
        "MySQL": <SiMysql />,
        "Docker": <SiDocker />,
        "AWS": <SiAmazonaws />,
        "Redux": <SiRedux />,
        "Tailwind CSS": <SiTailwindcss />,
        "Node.js": <SiNodedotjs />,
        "Express.js": <SiExpress />,
        "Git": <SiGit />,
        "Python": <SiPython />,
        "C++": <SiCplusplus />,
    };

    return iconMap[skill] || null;
};

const SkillsSection = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full mx-auto max-w-5xl h-full p-4">
            <h2
                className={`${bricolage_grotesque} text-3xl font-bold mb-6 text-center`}
            >
                Skills
            </h2>

            <div className="flex w-full flex-col max-lg:flex-row max-sm:flex-row gap-3 max-sm:gap-2 lg:flex-row mt-4 flex-wrap justify-center items-center">
                {data.map((skill, idx) => (
                    <Badge
                        key={idx}
                        className={`
                            text-xs max-sm:text-[10px] py-1 px-2 cursor-pointer
                            bg-black dark:bg-white text-white dark:text-black
                            border border-gray-200 dark:border-gray-700
                            hover:bg-gray-800 dark:hover:bg-gray-200
                            rounded-sm transition-colors ${bricolage_grotesque}
                            flex items-center gap-1.5
                        `}
                    >
                        <IconForSkill skill={skill} />
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default SkillsSection;

const data: string[] = ["JavaScript", "TypeScript", "Next.js", "React", "Python", "C++", "MongoDB", "PostgreSQL", "Supabase", "MySQL", "Docker", "AWS", "Redux", "Tailwind CSS", "Node.js", "Express.js", "Git"];
