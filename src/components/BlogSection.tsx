"use client";

import Link from 'next/link';
import { bricolage_grotesque, inter } from '@/utils/fonts';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { MagicCard } from './magicui/magic-card';
import type { BlogPost } from '@/lib/blog';

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="w-5xl max-lg:w-full max-lg:px-20 max-sm:w-full max-sm:px-5 flex flex-col items-center py-16 mx-auto">
      <h2 className={`text-2xl font-bold mb-6 ${bricolage_grotesque} text-primary dark:text-primary-dark text-center`}>
        Blog
      </h2>
      <div className="flex flex-col gap-6 w-full">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <MagicCard className="cursor-pointer h-fit dark:shadow-2xl !bg-transparent border-none rounded-sm w-full">
              <div className="flex w-full px-10 py-7 gap-6">
                <div className="flex flex-row justify-between w-full items-start max-sm:flex-col">
                  <div className="flex flex-col">
                    <div className={`text-lg !leading-4 mb-1 max-sm:text-base font-semibold ${bricolage_grotesque}`}>
                      {post.title}
                    </div>
                    <p className={`text-sm max-sm:text-xs ${inter} text-neutral-500 dark:text-neutral-400 line-clamp-2`}>
                      {post.description}
                    </p>
                  </div>
                  <div className={`text-xs max-sm:text-[10px] max-sm:mt-1 ${inter} text-neutral-400 dark:text-neutral-500`}>
                    {post.date}
                  </div>
                </div>
              </div>
            </MagicCard>
          </Link>
        ))}
      </div>
      <Link
        href="/blog"
        className={`mt-8 flex items-center gap-2 text-sm py-2 px-6 rounded-md border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 ${bricolage_grotesque}`}
      >
        View More <ArrowRightIcon />
      </Link>
    </div>
  );
}
