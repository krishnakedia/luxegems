import { NextResponse } from "next/server";
import { query, getOne } from "@/lib/db";

interface Vendor {
  v_id: number;
  v_name: string;
  v_email: string;
  v_pho: string;
  v_gst: string;
  v_address: string;
  v_cmpny: string;
  v_status: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    if (action === "login") {
      const vendor = await getOne<Vendor>(
        `SELECT * FROM vendor WHERE v_email = ? AND v_status = 1`,
        [email]
      );

      if (!vendor) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }

      const token = Buffer.from(JSON.stringify({ 
        id: vendor.v_id, 
        email: vendor.v_email,
        name: vendor.v_name 
      })).toString("base64");

      return NextResponse.json({
        success: true,
        data: { token, vendor }
      });
    }

    const { name, phone, company, address, gst } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingVendor = await getOne<Vendor>(
      `SELECT * FROM vendor WHERE v_email = ?`,
      [email]
    );

    if (existingVendor) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }
    
    await query(
      `INSERT INTO vendor (v_name, v_email, v_pho, v_gst, v_address, v_cmpny, v_status) 
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [name || company, email, phone || "", gst || "", address || "", company || ""]
    );

    return NextResponse.json({
      success: true,
      message: "Vendor registered successfully",
    });
  } catch (error) {
    console.error("Vendor error:", error);
    return NextResponse.json(
      { success: false, error: "Operation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const vendors = await query<Vendor[]>(
      `SELECT * FROM vendor ORDER BY v_id DESC`
    );
    return NextResponse.json({ success: true, data: vendors });
  } catch (error) {
    console.error("Vendors fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}