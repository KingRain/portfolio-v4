"use client";

import { useState, useCallback, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { LinkPreview } from '@/components/ui/link-preview';
import { CodeBlock } from '@/components/ui/code-block';
import { X } from 'lucide-react';

function ImagePreview({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[101]"
        aria-label="Close preview"
      >
        <X className="h-6 w-6" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

const components: Partial<Components> = {
  a: ({ href, children }) => (
    <LinkPreview url={href || '#'} className="underline underline-offset-4 decoration-blue-500/50 dark:decoration-blue-400/50 hover:decoration-blue-500 dark:hover:decoration-blue-400 transition-colors">
      {children}
    </LinkPreview>
  ),
  img: function BlogImage({ src, alt }) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <span className="block text-center my-6 cursor-zoom-in" onClick={() => setOpen(true)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt || ''} className="inline-block max-w-full rounded-lg transition-opacity hover:opacity-90" />
        </span>
        {open && src && <ImagePreview src={String(src)} alt={alt || ''} onClose={() => setOpen(false)} />}
      </>
    );
  },
  p: ({ children }) => (
    <p className="mb-4 text-[1.125rem] leading-[1.7] font-[family-name:var(--font-geist-sans)] tracking-[-0.003em] text-neutral-800 dark:text-neutral-200">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 className="font-[family-name:var(--font-playfair)] text-[2.25rem] leading-[1.2] font-bold mt-10 mb-2 text-neutral-900 dark:text-neutral-100">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-[family-name:var(--font-playfair)] text-[1.625rem] leading-[1.3] font-bold mt-8 mb-2 text-neutral-900 dark:text-neutral-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-[family-name:var(--font-playfair)] text-[1.375rem] leading-[1.4] font-bold mt-6 mb-1 text-neutral-900 dark:text-neutral-100">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-[family-name:var(--font-playfair)] text-[1.125rem] leading-[1.4] font-bold mt-5 mb-1 text-neutral-900 dark:text-neutral-100">
      {children}
    </h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-[3px] border-neutral-300 dark:border-neutral-600 pl-5 my-6 italic text-neutral-600 dark:text-neutral-400">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 pl-6 text-[1.125rem] leading-[1.7] font-[family-name:var(--font-geist-sans)] tracking-[-0.003em] text-neutral-800 dark:text-neutral-200 list-disc space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 pl-6 text-[1.125rem] leading-[1.7] font-[family-name:var(--font-geist-sans)] tracking-[-0.003em] text-neutral-800 dark:text-neutral-200 list-decimal space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="mb-1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-neutral-900 dark:text-neutral-100">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  hr: () => (
    <hr className="my-12 border-0 border-t border-neutral-200 dark:border-neutral-800" />
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-left text-[1rem] leading-[1.6] border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b-2 border-neutral-200 dark:border-neutral-700">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="py-3 px-4 font-semibold text-neutral-900 dark:text-neutral-100">{children}</th>
  ),
  td: ({ children }) => (
    <td className="py-3 px-4 border-b border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">{children}</td>
  ),
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    if (match) {
      return <CodeBlock language={match[1]} filename={`code.${match[1]}`} code={codeString} />;
    }

    return (
      <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[0.9em] font-[family-name:var(--font-geist-mono)] text-pink-600 dark:text-pink-400" {...props}>
        {children}
      </code>
    );
  },
};

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
