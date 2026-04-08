"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import type { Product } from "@/types";

const wishlistItems: Product[] = [
  {
    p_id: 1,
    p_slid: "Admin",
    p_catid: "82",
    p_scatid: "",
    p_scname: "",
    p_name: "Elegant Gold-Plated Necklace Set",
    p_code: "SH-1001",
    p_price: "1256",
    p_discount: "10",
    p_weight: 0,
    p_description: "Exquisite gold-plated necklace set perfect for weddings and special occasions",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Necklaces",
    images: [{ pm_id: 1, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" }],
  },
  {
    p_id: 2,
    p_slid: "Admin",
    p_catid: "83",
    p_scatid: "",
    p_scname: "",
    p_name: "Traditional Silver Altar Set",
    p_code: "AS-1001",
    p_price: "5000",
    p_discount: "10",
    p_weight: 0,
    p_description: "Handcrafted silver altar set for religious ceremonies",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Altar Sets",
    images: [{ pm_id: 2, pm_pid: "2", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600", pm_status: "1" }],
  },
];

export default function WishlistPage() {
  const [items, setItems] = React.useState(wishlistItems);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.p_id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light text-stone-900 mb-8">My Wishlist</h1>
          <div className="bg-white border border-stone-200 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-stone-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-stone-400" />
            </div>
            <h2 className="text-xl font-medium text-stone-900 mb-2">Your wishlist is empty</h2>
            <p className="text-stone-500 mb-6">Save items you love by clicking the heart icon</p>
            <Link href="/products">
              <Button variant="gold">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light text-stone-900 mb-8">My Wishlist ({items.length})</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div key={product.p_id} className="relative group">
              <ProductCard product={product} />
              <button
                onClick={() => removeItem(product.p_id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
