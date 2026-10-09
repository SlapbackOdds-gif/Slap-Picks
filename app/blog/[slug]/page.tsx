import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 py-14">
      <Link href="/blog" className="text-sm text-mist hover:text-white">
        ← Back to blog
      </Link>

      <span className="badge mt-6 w-fit bg-volt/15 text-volt">
        {post.tag}
      </span>
      <h1 className="mt-3 font-display text-3xl font-bold text-white">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-mist">
        {post.date} · {post.readMinutes} min read
      </p>

      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-mist">
        {post.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
