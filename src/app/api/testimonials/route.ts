import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface ReviewWithProduct {
  re_id: number;
  re_pid: string;
  re_nuid: string;
  re_desc: string;
  re_title: string;
  re_name: string;
  re_image: string;
  re_status: string;
  re_date: string;
  product_name?: string;
}

export async function GET() {
  try {
    const reviews = await query<ReviewWithProduct[]>(`
      SELECT r.*, p.p_name as product_name
      FROM review r
      LEFT JOIN product p ON r.re_pid = p.p_id
      WHERE r.re_status = '1'
      ORDER BY r.re_id DESC
      LIMIT 20
    `);

    const testimonials = reviews.map(r => ({
      id: r.re_id,
      name: r.re_name,
      location: "Customer",
      text: r.re_desc,
      rating: 5,
      avatar: r.re_name.charAt(0),
      productName: r.product_name
    }));

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}