import InteractiveScrambledText from "@/components/ui/interactive-scrambled-text";
import { bricolage_grotesque } from "@/utils/fonts";

const AboutmeSection = () => {
  return (
    <section className="bg-transparent py-12 flex justify-center items-center">
      <div className="w-full max-w-5xl px-4">
        <h2
          className={`text-2xl font-bold mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark text-center`}
        >
          About Me
        </h2>
        <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-lg">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <InteractiveScrambledText
              radius={120}
              duration={1.5}
              speed={0.4}
              scrambleChars={".:"}
            >
              Hey, I’m Sam Joe Chalissery, a 19-year-old developer who writes
              code like it’s second nature. I started off building Discord bots
              during lockdown, and these days I’m deep into full-stack
              development, automation, and exploring the world of Web3 and
              blockchain. I’m currently studying Computer Science, but most of
              what I know comes from diving into real projects and learning by
              building. I love taking bold ideas and turning them into software
              that actually solves problems. Got something cool in mind? Let’s
              build it.
            </InteractiveScrambledText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutmeSection;
