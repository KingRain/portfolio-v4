import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  published: boolean;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(postsDir);
  const posts = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace('.md', '');
      const source = fs.readFileSync(path.join(postsDir, f), 'utf-8');
      const { data, content } = matter(source);
      const date = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;
      return {
        slug,
        title: data.title,
        date,
        description: data.description,
        author: data.author,
        published: data.published !== false,
        content,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPost(slug: string): BlogPost | null {
  try {
    const source = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf-8');
    const { data, content } = matter(source);
    const date = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;
    return {
      slug,
      title: data.title,
      date,
      description: data.description,
      author: data.author,
      published: data.published !== false,
      content,
    };
  } catch {
    return null;
  }
}
