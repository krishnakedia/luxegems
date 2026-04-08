import { NextResponse } from "next/server";
import { query, getOne } from "@/lib/db";

interface BlogPost {
  bl_id: number;
  bl_img: string;
  bl_title: string;
  bl_content: string;
  date: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const blogPost = await getOne<BlogPost>(
        "SELECT * FROM blog WHERE bl_id = ?",
        [id]
      );
      return NextResponse.json({ success: true, data: blogPost });
    }

    const blogPosts = await query<BlogPost[]>(`
      SELECT * FROM blog ORDER BY bl_id DESC
    `);

    return NextResponse.json({ success: true, data: blogPosts });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}