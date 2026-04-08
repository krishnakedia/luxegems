import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { generateOrderId } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit") || "50";
    const offset = searchParams.get("offset") || "0";

    let sql = `
      SELECT o.*, nu.nu_name as customer_name, nu.nu_email, nu.nu_number,
             sd.spp_address, sd.spp_city, sd.spp_state, sd.spp_pin
      FROM \`order\` o
      LEFT JOIN new_user nu ON o.order_nuid = nu.nu_id
      LEFT JOIN shipping_details sd ON o.order_shipid = sd.spp_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      sql += " AND o.order_status = ?";
      params.push(status);
    }

    sql += " ORDER BY o.order_id DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const orders = await query(sql, params);

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      items,
      shipping_address,
      payment_method,
      subtotal,
      shipping_charges,
      discount,
      total,
    } = body;

    const order_uid = generateOrderId();

    const result = await query(`
      INSERT INTO \`order\` (
        order_nuid, order_total, order_amount, order_uid, order_shipid,
        order_dcharges, order_type, order_status, order_payment, order_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      user_id || "guest",
      subtotal,
      total,
      order_uid,
      shipping_address.spp_id || null,
      shipping_charges,
      payment_method,
      "1",
      payment_method === "cod" ? "unpaid" : "paid",
    ]);

    return NextResponse.json({
      success: true,
      data: {
        order_id: (result as any).insertId,
        order_uid,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
