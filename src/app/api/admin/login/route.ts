import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import crypto from "crypto";

interface AdminUser {
  a_id: number;
  a_name: string;
  a_email: string;
  a_password: string;
  a_role: string;
}

function md5(text: string): string {
  return crypto.createHash("md5").update(text).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const users = await query<AdminUser[]>(
      "SELECT * FROM admin WHERE a_email = ? AND a_status = 1",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = users[0];
    
    let isValidPassword = false;
    if (user.a_password.startsWith('$2')) {
      isValidPassword = password === user.a_password;
    } else {
      isValidPassword = md5(password) === user.a_password || password === user.a_password;
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = Buffer.from(
      JSON.stringify({ id: user.a_id, email: user.a_email, role: user.a_role })
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      data: {
        id: user.a_id,
        name: user.a_name,
        email: user.a_email,
        role: user.a_role,
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}