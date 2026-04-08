import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface User {
  nu_id: number;
  nu_name: string;
  nu_number: string;
  nu_email: string;
  nu_pwd: string;
  nu_vpwd: string;
  nu_image: string;
  nu_status: number;
  nu_date: string;
  nu_address: string;
}

export async function GET() {
  try {
    const customers = await query<(Omit<User, 'nu_pwd' | 'nu_vpwd'> & { order_count?: number })[]>(`
      SELECT nu_id, nu_name, nu_number, nu_email, nu_image, nu_status, nu_date, nu_address,
             (SELECT COUNT(*) FROM \`order\` WHERE order_nuid = nu_id) as order_count
      FROM new_user
      ORDER BY nu_id DESC
    `);

    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    console.error("Customers fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}