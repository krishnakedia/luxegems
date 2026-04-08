import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { query, getOne } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog Details | LUXEGEMS",
  description: "Read our latest blog post.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

interface BlogPost {
  bl_id: number;
  bl_img: string;
  bl_title: string;
  bl_content: string;
  date: string;
}

async function getBlogPost(id: string) {
  try {
    const post = await getOne<BlogPost>(
      "SELECT * FROM blog WHERE bl_id = ?",
      [id]
    );
    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-80 bg-stone-900">
        <Image
          src={post.bl_img}
          alt={post.bl_title}
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-light mb-4">{post.bl_title}</h1>
            <div className="flex items-center justify-center gap-4 text-stone-300">
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="text-amber-600 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        <article className="prose prose-stone max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.bl_content }} />
        </article>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center">
              <span className="text-stone-600 font-medium">
                L
              </span>
            </div>
            <div>
              <p className="font-medium text-stone-900">LUXEGEMS</p>
              <p className="text-sm text-stone-500">LUXEGEMS</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-stone-900 mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white text-sm rounded hover:bg-sky-600">
              Twitter
            </button>
            <button className="px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800">
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
