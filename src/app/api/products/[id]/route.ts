import { NextResponse } from "next/server";
import { query, getOne } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await getOne(`
      SELECT p.*, c.cat_name as category_name
      FROM product p
      LEFT JOIN category c ON p.p_catid = c.cat_id
      WHERE p.p_id = ?
    `, [id]);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const images = await query(`
      SELECT * FROM product_image WHERE pm_pid = ? AND pm_status = 1
    `, [id]);

    const colors = await query(`
      SELECT * FROM product_color WHERE pclr_pid = ? AND pclr_status = 1
    `, [id]);

    const sizes = await query(`
      SELECT * FROM product_size WHERE ps_pid = ? AND ps_status = 1
    `, [id]);

    const reviews = await query(`
      SELECT r.*, nu.nu_name as user_name
      FROM review r
      LEFT JOIN new_user nu ON r.re_nuid = nu.nu_id
      WHERE r.re_pid = ? AND r.re_status = 1
      ORDER BY r.re_id DESC
      LIMIT 5
    `, [id]);

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        images,
        colors,
        sizes,
        reviews,
      },
    });
  } catch (error) {
    console.error("Product fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
