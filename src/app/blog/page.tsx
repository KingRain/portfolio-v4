import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { BackgroundBeams } from '@/components/ui/background-beams';

export const metadata = {
  title: 'Sam Joe | Blog',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen">
      <BackgroundBeams className="absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-[780px] px-4 sm:px-6 pt-16 pb-24">
        <h1 className="font-[family-name:var(--font-playfair)] text-[2rem] font-bold mb-2 text-neutral-900 dark:text-neutral-100">
          Blog
        </h1>
        <p className="text-[1rem] text-neutral-500 dark:text-neutral-400 mb-10">
          Thoughts, tutorials, and notes.
        </p>
        <div>
          {posts.map((post) => (
            <article key={post.slug} className="mb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="font-[family-name:var(--font-playfair)] text-[1.25rem] font-bold leading-[1.3] group-hover:underline mb-1 text-neutral-900 dark:text-neutral-100">
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
