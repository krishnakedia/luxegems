import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { query } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog | LUXEGEMS",
  description: "Latest trends, tips, and news about jewelry from LUXEGEMS.",
};

interface BlogPost {
  bl_id: number;
  bl_img: string;
  bl_title: string;
  bl_content: string;
  date: string;
}

async function getBlogPosts() {
  try {
    const posts = await query<BlogPost[]>(`
      SELECT * FROM blog ORDER BY bl_id DESC
    `);
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  const formattedPosts = blogPosts.map(post => ({
    id: post.bl_id,
    title: post.bl_title,
    excerpt: post.bl_content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    date: post.date,
    category: "Blog",
    image: post.bl_img,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Blog</h1>
          <p className="text-stone-300">Latest news, trends, and tips</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {formattedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formattedPosts.map((post) => (
              <article key={post.id} className="bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-48 bg-stone-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-amber-600 font-medium uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="text-xs text-stone-400">•</span>
                      <span className="text-xs text-stone-400">{post.date}</span>
                    </div>
                    <h2 className="text-lg font-medium text-stone-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-stone-500 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500">No blog posts available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
