import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import SectionDivider from "@/components/SectionDivider";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      locale: "es_PY",
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      {post.date && <p className="text-xs text-text/50">{post.date}</p>}
      <h1 className="mt-2 font-serif text-3xl text-navy">{post.title}</h1>
      <SectionDivider center={false} />

      <div className="mt-6 space-y-4 leading-relaxed text-text/80">
        {post.content.split(/\n\s*\n/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
