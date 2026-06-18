import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getAllPosts } from '@/lib/blog';
import { BlogContent } from './BlogContent';
import { bricolage_grotesque } from '@/utils/fonts';

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
  };

  return (
    <article className="mx-auto max-w-[860px] px-4 sm:px-6 pt-10 pb-16 bg-white dark:bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-6">
        <Link href="/blog" className={`${bricolage_grotesque} inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-6 transition-colors`}>
          ← Back to Blog
        </Link>
      </div>
      <header className="mb-6">
        <h1 className={`${bricolage_grotesque} text-[2rem] sm:text-[2.5rem] leading-[1.15] font-bold mb-3 text-neutral-900 dark:text-neutral-100`}>
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-[0.85rem] text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-700 dark:text-neutral-300">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </header>
      <BlogContent content={post.content} />

      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <Link href="/blog" className={`${bricolage_grotesque} inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors`}>
          ← Back to Blog
        </Link>
        <Link href="/" className={`${bricolage_grotesque} inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors`}>
          Home →
        </Link>
      </div>
    </article>
  );
}
