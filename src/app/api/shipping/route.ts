import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, city, state, pincode } = body;

    const result = await query(
      `INSERT INTO shipping_details (spp_name, spp_email, spp_number, spp_address, spp_city, spp_state, spp_pin, spp_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
      [name, email, phone, address, city, state, pincode]
    );

    return NextResponse.json({
      success: true,
      data: { spp_id: (result as any).insertId }
    });
  } catch (error) {
    console.error("Shipping create error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create shipping address" },
      { status: 500 }
    );
  }
}