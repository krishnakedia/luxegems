import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import crypto from "crypto";

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (phone) {
      const customers = await query<Omit<User, 'nu_pwd' | 'nu_vpwd'>[]>(
        "SELECT nu_id, nu_name, nu_number, nu_email, nu_address FROM new_user WHERE nu_number = ?",
        [phone]
      );
      return NextResponse.json({ success: true, data: customers[0] || null });
    }

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

export async function POST(request: Request) {
  try {
    const { name, email, phone, password, address } = await request.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().replace(/\s+/g, " ");
    const trimmedEmail = email?.trim().toLowerCase() || "";
    const trimmedPhone = phone.trim();

    const existing = await query<any[]>(
      "SELECT nu_id FROM new_user WHERE nu_number = ?",
      [trimmedPhone]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Customer with this phone already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = crypto.createHash('sha256').update(trimmedPhone).digest('hex');

    const result = await query(
      `INSERT INTO new_user (nu_name, nu_email, nu_number, nu_pwd, nu_vpwd, nu_status, nu_date, nu_address)
       VALUES (?, ?, ?, ?, ?, 1, NOW(), ?)`,
      [trimmedName, trimmedEmail, trimmedPhone, hashedPassword, hashedPassword, address || ""]
    );

    return NextResponse.json({
      success: true,
      data: { id: (result as any).insertId }
    });
  } catch (error) {
    console.error("Add customer error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add customer" },
      { status: 500 }
    );
  }
}