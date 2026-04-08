import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { generateOrderId } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit") || "50";
    const offset = searchParams.get("offset") || "0";

    await query(
      `DELETE FROM \`order\` WHERE order_status IN ('1', 'pending') AND order_date < DATE_SUB(NOW(), INTERVAL 1 MONTH)`
    );

    let sql = `
      SELECT o.*, nu.nu_name as customer_name, nu.nu_email, nu.nu_number,
             sd.spp_address, sd.spp_city, sd.spp_state, sd.spp_pin, sd.spp_name as shipping_name, sd.spp_number as shipping_phone
      FROM \`order\` o
      LEFT JOIN new_user nu ON o.order_nuid = nu.nu_id
      LEFT JOIN shipping_details sd ON o.order_shipid = sd.spp_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== "all") {
      const statusMap: Record<string, string> = {
        pending: "1",
        processing: "2",
        shipped: "3",
        delivered: "4",
      };
      const dbStatus = statusMap[status] || status;
      sql += " AND o.order_status = ?";
      params.push(dbStatus);
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

    const order_uid = `ODR${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

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
      shipping_address.spp_id || shipping_address.spp_id || null,
      shipping_charges,
      payment_method,
      "1",
      payment_method === "cod" ? "unpaid" : "paid",
    ]);

    const orderId = (result as any).insertId;

    if (items && items.length > 0) {
      for (const item of items) {
        await query(
          `INSERT INTO cart_details (cd_coid, cd_pid, cd_price, cd_qty, cd_netprice)
           VALUES (?, ?, ?, ?, ?)`,
          [
            orderId,
            item.cp_pid,
            item.cp_poprice || item.cp_price || 0,
            item.cp_quantity || 1,
            item.cp_total || 0,
          ]
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        order_id: orderId,
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
