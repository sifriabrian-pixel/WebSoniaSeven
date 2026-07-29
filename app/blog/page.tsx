import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import SectionDivider from "@/components/SectionDivider";
import { SITE_URL } from "@/lib/seo";

const TITLE = "Blog";
const DESCRIPTION =
  "Recursos y guías sobre el mercado inmobiliario en Asunción y Central, Paraguay.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: "Seven by Sonia García",
    locale: "es_PY",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <h1 className="font-serif text-3xl text-navy">Blog</h1>
      <SectionDivider center={false} />

      {posts.length === 0 ? (
        <p className="mt-6 text-text/60">
          Muy pronto vamos a compartir acá recursos y guías sobre el mercado
          inmobiliario en Asunción y Central.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              {post.date && (
                <p className="text-xs text-text/50">{post.date}</p>
              )}
              <h2 className="mt-2 font-serif text-xl text-navy">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-text/70">{post.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
