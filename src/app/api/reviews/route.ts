import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Review {
  re_id: number;
  re_pid: string;
  re_nuid: string;
  re_desc: string;
  re_title: string;
  re_name: string;
  re_image: string;
  re_status: string;
  re_date: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    let sql = `
      SELECT r.*, p.p_name as product_name
      FROM review r
      LEFT JOIN product p ON r.re_pid = p.p_id
      WHERE r.re_status = '1'
    `;
    const params: any[] = [];

    if (productId) {
      sql += " AND r.re_pid = ?";
      params.push(productId);
    }

    sql += " ORDER BY r.re_id DESC";

    const reviews = await query<Review[]>(sql, params);

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}