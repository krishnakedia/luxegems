import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface ContactMessage {
  ct_id?: number;
  ct_name: string;
  ct_email: string;
  ct_phone: bigint;
  ct_comment: string;
  ct_status?: number;
  ct_date?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, lastName, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const fullName = `${name} ${lastName || ""}`.trim();
    
    await query(
      `INSERT INTO contact (ct_name, ct_email, ct_phone, ct_comment, ct_status, ct_date) 
       VALUES (?, ?, ?, ?, 1, NOW())`,
      [fullName, email, BigInt(phone || 0), message]
    );

    return NextResponse.json({ 
      success: true, 
      message: "Your message has been sent successfully. We'll get back to you soon!" 
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await query<ContactMessage[]>(
      `SELECT * FROM contact ORDER BY ct_id DESC LIMIT 100`
    );
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Contact messages fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    await query(
      `UPDATE contact SET ct_status = ? WHERE ct_id = ?`,
      [status, parseInt(id)]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update message" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }

    await query(`DELETE FROM contact WHERE ct_id = ?`, [parseInt(id)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}