import fs from "fs";
import path from "path";

/**
 * Estructura mínima para un blog simple basado en archivos Markdown con
 * frontmatter (title/excerpt/date) en `content/blog/*.md`. No requiere
 * dependencias adicionales; el día que se necesite renderizado Markdown
 * más completo, se puede sumar `@next/mdx` sin cambiar esta interfaz.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { data, content: match[2].trim() };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md");
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title ?? file,
      excerpt: data.excerpt ?? "",
      date: data.date ?? "",
      content,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}
