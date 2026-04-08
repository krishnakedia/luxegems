import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return NextResponse.json({ 
      success: true, 
      message: "Database connected successfully",
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: "Database connection failed",
      details: error.message 
    }, { status: 503 });
  }
}