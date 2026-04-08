import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface SettingsRow {
  s_id: number;
  s_key: string;
  s_value: string;
}

export async function GET() {
  try {
    const settings = await query<SettingsRow[]>("SELECT s_key, s_value FROM site_settings");
    
    const settingsObj: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObj[s.s_key] = s.s_value;
    });

    return NextResponse.json({ success: true, data: settingsObj });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const allowedKeys = [
      "store_name", "store_email", "store_phone", "store_phone_2", "store_address", "gst_number",
      "free_shipping_above", "default_shipping_charge", "express_shipping_charge", "delivery_days",
      "cod_enabled", "upi_enabled", "cards_enabled",
      "order_email_enabled", "order_status_enabled", "low_stock_alert",
      "social_facebook", "social_instagram", "social_twitter", "social_youtube", "social_linkedin"
    ];

    for (const [key, value] of Object.entries(body)) {
      if (allowedKeys.includes(key)) {
        const stringValue = typeof value === "boolean" ? (value ? "1" : "0") : String(value);
        await query(
          "INSERT INTO site_settings (s_key, s_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE s_value = ?",
          [key, stringValue, stringValue]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings save error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save settings" },
      { status: 500 }
    );
  }
}