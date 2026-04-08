"use client";

import * as React from "react";
import type { Product } from "@/types";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = React.createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.p_id === product.p_id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.p_id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return items.some((item) => item.p_id === productId);
  };

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = React.useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}