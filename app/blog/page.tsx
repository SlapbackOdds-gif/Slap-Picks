import Link from "next/link";
import { POSTS } from "@/lib/posts";
import SectionHeading from "@/components/SectionHeading";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <SectionHeading
        eyebrow="Blog"
        title="Analysis & Best Practices"
        description="Everything from your existing blog, structured to live alongside the odds board."
      />

      <div className="space-y-5">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card card-hover flex flex-col gap-2 p-5"
          >
            <span className="badge w-fit bg-volt/15 text-volt">
              {post.tag}
            </span>
            <h2 className="font-display text-lg font-bold text-white">
              {post.title}
            </h2>
            <p className="text-sm text-mist">{post.excerpt}</p>
            <p className="text-xs text-mist">
              {post.date} · {post.readMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
