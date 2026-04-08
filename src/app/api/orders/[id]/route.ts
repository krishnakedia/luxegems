import { NextResponse } from "next/server";
import { query, getOne } from "@/lib/db";

interface OrderRow {
  order_id: number;
  order_uid: string;
  order_nuid: string;
  order_total: string;
  order_amount: string;
  order_shipid: string;
  order_dcharges: string;
  order_type: string;
  order_status: string;
  order_payment: string;
  order_date: string;
  customer_name: string | null;
  nu_email: string | null;
  nu_number: string | null;
  spp_address: string | null;
  spp_city: string | null;
  spp_state: string | null;
  spp_pin: string | null;
  spp_name: string | null;
  ship_phone: string | null;
  spp_email: string | null;
  customer_phone: string | null;
}

interface CartDetailRow {
  cd_id: number;
  cd_coid: string;
  cd_pid: string;
  cd_price: string;
  cd_qty: string;
  cd_netprice: string;
  p_name: string | null;
  p_code: string | null;
  pm_image: string | null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await getOne<OrderRow>(`
      SELECT o.*, 
             nu.nu_name as customer_name, nu.nu_email, nu.nu_number,
             sd.spp_address, sd.spp_city, sd.spp_state, sd.spp_pin, sd.spp_name, sd.spp_number as ship_phone
      FROM \`order\` o
      LEFT JOIN new_user nu ON o.order_nuid = nu.nu_id
      LEFT JOIN shipping_details sd ON o.order_shipid = sd.spp_id
      WHERE o.order_id = ? OR o.order_uid = ?
    `, [id, id]);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const items = await query<CartDetailRow[]>(`
      SELECT cd.*, p.p_name, p.p_code, pm.pm_image
      FROM cart_details cd
      LEFT JOIN product p ON cd.cd_pid = p.p_id
      LEFT JOIN product_image pm ON p.p_id = pm.pm_pid AND pm.pm_status = '1'
      WHERE cd.cd_coid = ?
      GROUP BY cd.cd_id
    `, [order.order_id]);

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        customer_name: order.customer_name || order.spp_name || "Guest",
        customer_email: order.nu_email || order.spp_email || "",
        customer_phone: order.customer_phone || order.ship_phone || "",
        shipping_address: order.spp_address || "",
        items: items.map((item: any, idx: number) => ({
          id: item.cd_id || idx,
          name: item.p_name || "Product",
          sku: item.p_code || "",
          price: parseFloat(item.cd_netprice || item.cd_price || "0"),
          qty: parseInt(item.cd_qty || "1"),
          image: item.pm_image || "/placeholder.jpg",
        })),
      },
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { order_status } = body;

    await query(
      "UPDATE `order` SET order_status = ? WHERE order_id = ? OR order_uid = ?",
      [order_status, id, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
