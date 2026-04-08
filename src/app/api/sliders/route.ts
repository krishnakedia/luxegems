import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface SliderImage {
  img_id: number;
  img_title: string;
  img_name: string;
  img_status: string;
  img_date: string;
}

export async function GET() {
  try {
    const sliders = await query<SliderImage[]>(`
      SELECT * FROM slider_img WHERE img_status = '1' ORDER BY img_id DESC
    `);

    return NextResponse.json({ success: true, data: sliders });
  } catch (error) {
    console.error("Sliders fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sliders" },
      { status: 500 }
    );
  }
}
