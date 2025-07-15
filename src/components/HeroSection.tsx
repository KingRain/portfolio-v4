'use client';

import { bricolage_grotesque } from "@/utils/fonts";
import { MorphingText } from "@/components/magicui/morphing-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Avatar from "../app/(home)/components/Avatar";
import HeroShapes from "./ui/HeroShapes";

export function HeroSection() {
  return (
    <div className="grid min-h-screen p-8 pb-20 relative font-[family-name:var(--font-geist-sans)] place-items-center">
      <HeroShapes />
      <div className="w-full flex flex-col items-center justify-center py-5 z-10 md:pt-0 max-md:pt-16">
      <div className="w-full md:w-2/3 flex flex-col items-center md:mt-28 max-md:mt-8">
        <div className="flex flex-col items-center w-full">
        <div className="flex justify-center w-full max-w-xs">
          <Avatar />
        </div>
        <div className="mt-4 px-4 md:px-0 w-full">
          <div className="text-center">
          <h1 className={`text-[2rem] md:text-[2.5rem] mt-2 font-bold tracking-tight text-center ${bricolage_grotesque}`}>
            Hi, I&apos;m Sam Joe
          </h1>
          <h1 className={`text-[1.2rem] md:text-[1.5rem] mt-1 font-bold tracking-tight text-center ${bricolage_grotesque}`}>
            I craft
            <br />
            <MorphingText texts={['efficient code', 'seamless UX', 'scalable products', 'clean design', 'modern solutions']} className="text-center" />
            <p className="-mt-8 text-center">with <em>precision</em> and <em>purpose</em>.</p>
            <br />
          </h1>
          </div>
        </div>
        </div>
        <div className="flex flex-row gap-2 justify-center mt-6 md:gap-7 w-full">
        <RainbowButton 
          className="z-20 text-sm px-4 py-1.5" 
          onClick={() => window.open("https://calendly.com/samjoe55555", "_blank")}
        >
          Book a meet
        </RainbowButton>
        <RainbowButton 
          className="z-20 text-sm px-4 py-1.5" 
          onClick={() => window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
          })}
        >
          Get in Touch
        </RainbowButton>
        </div>
      </div>
      </div>
    </div>
  );
}