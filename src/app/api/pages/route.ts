import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface CmsPage {
  pg_id: number;
  pg_name: string;
  pg_title: string;
  pg_desc: string;
  pg_status: string;
  pg_date: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const includeAll = searchParams.get("all") === "1";

    if (slug) {
      const page = await query<CmsPage[]>(
        "SELECT * FROM create_page WHERE LOWER(pg_name) = LOWER(?) AND pg_status = '1'",
        [slug]
      );
      return NextResponse.json({ success: true, data: page[0] || null });
    }

    const sql = includeAll
      ? "SELECT * FROM create_page ORDER BY pg_id"
      : "SELECT * FROM create_page WHERE pg_status = '1' ORDER BY pg_id";
    
    const pages = await query<CmsPage[]>(sql);

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("Pages fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
