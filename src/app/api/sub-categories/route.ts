import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface SubCategory {
  scat_id: number;
  scat_catid: string;
  scat_name: string;
  scat_image: string;
  scat_status: string;
  scat_date: string;
  category_name?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    let sql = `
      SELECT sc.*, c.cat_name as category_name
      FROM sub_category sc
      LEFT JOIN category c ON sc.scat_catid = c.cat_id
      WHERE sc.scat_status = '1'
    `;
    const params: any[] = [];

    if (categoryId) {
      sql += " AND sc.scat_catid = ?";
      params.push(categoryId);
    }

    sql += " ORDER BY sc.scat_id DESC";

    const subCategories = await query<SubCategory[]>(sql, params);

    return NextResponse.json({ success: true, data: subCategories });
  } catch (error) {
    console.error("Sub-categories fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sub-categories" },
      { status: 500 }
    );
  }
}