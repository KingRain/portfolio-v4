import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'blog');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  published: boolean;
  content: string;
}

function readPost(file: string): BlogPost | null {
  const source = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const { data, content } = matter(source);
  const date = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;
  const slug = data.slug || slugify(data.title);
  return {
    slug,
    title: data.title,
    date,
    description: data.description,
    author: data.author,
    published: data.published !== false,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(postsDir);
  const posts = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => readPost(f))
    .filter((p): p is BlogPost => p !== null && p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPost(slug: string): BlogPost | null {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const post = readPost(file);
    if (post && post.slug === slug) return post;
  }
  return null;
}
