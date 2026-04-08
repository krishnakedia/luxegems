import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

export function calculateDiscount(price: number, discount: number): number {
  return Math.round(price - (price * discount) / 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateOrderId(): string {
  return "ORD" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function getImageUrl(image: string): string {
  if (!image) return "/placeholder.jpg";
  if (image.startsWith("http")) return image;
  return `/uploads/${image}`;
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function getStockStatus(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: "Out of Stock", color: "text-red-600" };
  if (stock <= 5) return { label: `Only ${stock} left`, color: "text-orange-600" };
  return { label: "In Stock", color: "text-green-600" };
}

export function getOrderStatus(status: string): { label: string; color: string; bgColor: string } {
  const statuses: Record<string, { label: string; color: string; bgColor: string }> = {
    "1": { label: "Pending", color: "text-yellow-700", bgColor: "bg-yellow-100" },
    "2": { label: "Processing", color: "text-blue-700", bgColor: "bg-blue-100" },
    "3": { label: "Shipped", color: "text-purple-700", bgColor: "bg-purple-100" },
    "4": { label: "Delivered", color: "text-green-700", bgColor: "bg-green-100" },
    "5": { label: "Cancelled", color: "text-red-700", bgColor: "bg-red-100" },
  };
  return statuses[status] || { label: "Unknown", color: "text-gray-700", bgColor: "bg-gray-100" };
}

export function getPaymentStatus(payment: string): { label: string; color: string } {
  if (payment === "paid") return { label: "Paid", color: "text-green-600" };
  return { label: "Unpaid", color: "text-orange-600" };
}

export const jewelleryCategories = [
  { id: 1, name: "Necklaces", icon: "Gem", slug: "necklaces" },
  { id: 2, name: "Earrings", icon: "Sparkles", slug: "earrings" },
  { id: 3, name: "Rings", icon: "Circle", slug: "rings" },
  { id: 4, name: "Bracelets", icon: "Link", slug: "bracelets" },
  { id: 5, name: "Bangles", icon: "CircleDot", slug: "bangles" },
  { id: 6, name: "Pendants", icon: "Star", slug: "pendants" },
  { id: 7, name: "Mangalsutra", icon: "Heart", slug: "mangalsutra" },
  { id: 8, name: "Baptismal", icon: "Cross", slug: "baptismal" },
  { id: 9, name: "Altar Sets", icon: "Crown", slug: "altar-sets" },
  { id: 10, name: "Communion", icon: "Sun", slug: "communion" },
  { id: 11, name: "Censors", icon: "Flame", slug: "censors" },
  { id: 12, name: "Candlesticks", icon: "Flame", slug: "candlesticks" },
];
