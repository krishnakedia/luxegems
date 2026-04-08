import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit") || "50";
    const offset = searchParams.get("offset") || "0";

    let sql = `
      SELECT p.*, c.cat_name as category_name,
             (SELECT pm_image FROM product_image WHERE pm_pid = p.p_id LIMIT 1) as main_image
      FROM product p
      LEFT JOIN category c ON p.p_catid = c.cat_id
      WHERE p.p_status = 1
    `;
    const params: any[] = [];

    if (category) {
      sql += " AND LOWER(c.cat_name) = ?";
      params.push(category.toLowerCase());
    }

    sql += " ORDER BY p.p_id DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const products = await query(sql, params);

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
