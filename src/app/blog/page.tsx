import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { NoiseTexture } from '@/components/magicui/noise-texture';
import { cn } from '@/lib/utils';
import { bricolage_grotesque } from '@/utils/fonts';

export const metadata = {
  title: 'Sam Joe | Blog',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen">
      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "fixed inset-0 h-full w-full skew-y-12"
        )}
        width={30}
        height={30}
      />
      <NoiseTexture noiseOpacity={0.4} />
      <div className="relative z-10 mx-auto max-w-[780px] px-4 sm:px-6 pt-16 pb-24">
        <Link href="/" className={`${bricolage_grotesque} inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-6 transition-colors`}>
          ← Back to Home
        </Link>
        <h1 className={`${bricolage_grotesque} text-[2rem] font-bold mb-2 text-neutral-900 dark:text-neutral-100`}>
          Blog
        </h1>
        <p className={`${bricolage_grotesque} text-[1rem] text-neutral-500 dark:text-neutral-400 mb-10`}>
          Thoughts, tutorials, and notes.
        </p>
        <div>
          {posts.map((post) => (
            <article key={post.slug} className="mb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className={`${bricolage_grotesque} text-[1.25rem] font-bold leading-[1.3] group-hover:underline mb-1 text-neutral-900 dark:text-neutral-100`}>
                  {post.title}
                </h2>
                <p className="text-[0.85rem] text-neutral-500 dark:text-neutral-400 mb-1">
                  {post.date}
                </p>
                <p className="text-[0.95rem] leading-[1.6] text-neutral-600 dark:text-neutral-400">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
