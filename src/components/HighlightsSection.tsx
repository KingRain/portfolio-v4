import { Code, Layers, LineChart, User } from "lucide-react";
import { bricolage_grotesque } from "@/utils/fonts";
import { Globe } from "@/components/magicui/globe";
import { GithubGraph } from "@/components/ui/github-stats";
import { Link } from "@radix-ui/themes";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShinyButton } from "@/components/magicui/shiny-button";

export default function HighlightsSection() {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:py-40">
      <div className="container mx-auto max-w-5xl flex justify-center">
        <div className="flex flex-col gap-8 sm:gap-10 items-center w-full">
          <div className="flex gap-3 sm:gap-4 flex-col items-center">
            <div>
              <h2
                className={`text-2xl font-bold mb-2 sm:mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark text-center`}
              >
                Highlights
              </h2>
            </div>
          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col relative overflow-hidden">
              <Code className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
              <h3 className={`text-xl tracking-tight ${bricolage_grotesque}`}>
              Recent Hackathon Wins
              </h3>
              <div className="mt-3 bg-gray-100/10 dark:bg-white/5 backdrop-blur-md rounded-lg p-4 text-black dark:text-white">
              <div className="flex items-center gap-2 mb-2">
              <h4 className={`text-base font-semibold ${bricolage_grotesque}`}>Hack-a-Addict • 1st Place</h4>
              </div>
              <p className={`text-sm text-gray-800 dark:text-gray-200 ${bricolage_grotesque}`}>
              Our team <span className="font-medium">Drag-on</span> (Noel, Basil & me) secured the top spot out of 50+ teams,
              winning <span className="font-semibold">₹1.5L</span> at a national hackathon hosted by IEEE & Lions Club.
              We built <span className="font-semibold">DragApp</span> – a comprehensive drug abuse prevention tool.
              </p>
                <div className="flex items-center gap-2 mt-3">
                <a 
                  href="https://play.google.com/store/apps/details?id=org.lionsclub.dragapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShinyButton className="text-xs sm:text-sm h-8 sm:h-auto px-3 sm:px-4">
                  View on Play Store
                  </ShinyButton>
                </a>
                </div>
              </div>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md aspect-square p-6 flex justify-between flex-col relative overflow-hidden">
              <LineChart className="w-8 h-8 stroke-1 z-10 relative" />
              <div className="flex flex-col z-10 relative items-center justify-center text-center">
                <NumberTicker
                  value={170}
                  className="whitespace-pre-wrap text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter bg-gradient-to-r from-black dark:from-white to-blue-600 dark:to-blue-300 text-transparent bg-clip-text"
                />
                <div className="flex flex-col mb-24">
                  <span
                    className={`text-xl tracking-tight bg-gradient-to-r from-black dark:from-white to-blue-500 dark:to-blue-200 text-transparent bg-clip-text ${bricolage_grotesque}`}
                  >
                    Users
                  </span>
                  <p
                    className={`text-muted-foreground text-sm ${bricolage_grotesque}`}
                  >
                    and counting
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2">
                <Globe />
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md aspect-square p-6 flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className={`text-xl tracking-tight mb-4 ${bricolage_grotesque} text-left w-full`}>
                  By the Numbers
                </h3>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col">
                    <NumberTicker
                      value={42}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span className={`text-xs ${bricolage_grotesque} text-muted-foreground`}>
                      Projects Built
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <NumberTicker
                      value={7}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span className={`text-xs ${bricolage_grotesque} text-muted-foreground`}>
                      Hackathons
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <NumberTicker
                      value={12}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span className={`text-xs ${bricolage_grotesque} text-muted-foreground`}>
                      Open Source Contributions
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <NumberTicker
                      value={15}
                      className="text-3xl font-medium tracking-tight"
                    />
                    <span className={`text-xs ${bricolage_grotesque} text-muted-foreground`}>
                      Technologies Mastered
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col hidden sm:flex">
              <Layers className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className={`text-xl tracking-tight ${bricolage_grotesque}`}>
                  GitHub Contributions
                </h3>
                <div className="mt-2 overflow-hidden">
                  <Link
                    href={"https://github.com/Kingrain"}
                    target="_blank"
                    className="block overflow-hidden"
                  >
                    <GithubGraph
                      username="Kingrain"
                      blockMargin={2}
                      colorPallete={[
                        "#e0f2fe", // lightest blue
                        "#bae6fd",
                        "#7dd3fc",
                        "#38bdf8",
                        "#0ea5e9", // darkest blue
                      ]}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
