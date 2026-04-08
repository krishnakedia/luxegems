"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();

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
                onClick={() => removeFromWishlist(product.p_id)}
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
