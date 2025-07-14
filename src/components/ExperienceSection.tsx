"use client";

import React from "react";
import { bricolage_grotesque, inter } from "@/utils/fonts";
import Image from "next/image";
import { Link } from "@radix-ui/themes";
import { experienceData } from "@/utils/constant";
import { MagicCard } from "./magicui/magic-card";
import { I_Experience } from "@/types/project";

const ExperienceSection: React.FC = () => {
  return (
    <div className="w-5xl max-lg:w-full max-lg:px-20 max-sm:w-full max-sm:px-5 flex flex-col items-center mt-4 mx-auto">
      <span className="mb-3">
        <h2 className={`text-2xl font-bold mb-2 sm:mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark text-center`}>
          Experience
        </h2> 
      </span>
      {experienceData.map((exp: I_Experience, idx: number) => {
        return (
          <MagicCard
            key={idx}
            className="cursor-pointer h-fit dark:shadow-2xl !bg-transparent border-none rounded-sm w-full"
          >
            <div className="flex w-full px-8 max-sm:px-2 py-5 gap-6">
              {/* Logo div */}
              <div className="min-w-[70px] flex items-center justify-center">
                <Link href={exp.company_link} target="_blank">
                  <Image
                    src={exp.company_logo}
                    alt="company-logo"
                    width={70}
                    height={70}
                    className="rounded-full object-contain"
                  />
                </Link>
              </div>

              {/* Container for title+company and duration */}
              <div className="flex flex-row justify-between w-full items-start max-sm:flex-col">
                {/* Title and company div */}
                <div className="flex flex-col">
                  <div
                    className={`text-lg !leading-4 mb-1 max-sm:text-base font-semibold ${bricolage_grotesque}`}
                  >
                    {exp.job_title}
                  </div>
                  <h2 className={`text-sm max-sm:text-xs ${inter}`}>
                    {exp.company_name}
                  </h2>
                </div>

                {/* Duration div */}
                <div
                  className={`text-xs max-sm:text-[10px] max-sm:mt-1 ${inter}`}
                >
                  {exp.duration}
                </div>
              </div>
            </div>
          </MagicCard>
        );
      })}
    </div>
  );
};

export default ExperienceSection;
