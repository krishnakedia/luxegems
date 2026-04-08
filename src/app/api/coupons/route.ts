import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Coupon {
  cc_id: number;
  cc_fdate: string;
  cc_tdate: string;
  cc_code: string;
  cc_amount: string;
  cc_maxamount: string;
  cc_status: string;
  cc_cdate: string;
}

export async function GET() {
  try {
    const coupons = await query<Coupon[]>(`
      SELECT * FROM coupon_code WHERE cc_status = '1' ORDER BY cc_id DESC
    `);

    return NextResponse.json({ success: true, data: coupons });
  } catch (error) {
    console.error("Coupons fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}