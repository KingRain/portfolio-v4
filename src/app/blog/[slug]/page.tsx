import { notFound } from 'next/navigation';
import { getPost, getAllPosts } from '@/lib/blog';
import { BlogContent } from './BlogContent';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `Sam Joe | ${post.title}`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[860px] px-4 sm:px-6 pt-10 pb-16 bg-white dark:bg-black min-h-screen">
      <header className="mb-6">
        <h1 className="font-[family-name:var(--font-playfair)] text-[2rem] sm:text-[2.5rem] leading-[1.15] font-bold mb-3 text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-[0.85rem] text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </header>
      <BlogContent content={post.content} />
    </article>
  );
}
