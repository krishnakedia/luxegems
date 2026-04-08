import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const categories = await query(`
      SELECT c.*, 
             COUNT(p.p_id) as product_count
      FROM category c
      LEFT JOIN product p ON c.cat_id = p.p_catid AND p.p_status = 1
      WHERE c.cat_status = 1
      GROUP BY c.cat_id
      ORDER BY c.cat_seq, c.cat_id
    `);

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
