"use client";

import * as React from "react";
import type { Product, CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.cp_pid === product.p_id.toString());
      if (existing) {
        return prev.map((item) =>
          item.cp_pid === product.p_id.toString()
            ? { ...item, cp_quantity: item.cp_quantity + quantity }
            : item
        );
      }
      const price = parseFloat(product.p_price);
      const discount = parseFloat(product.p_discount);
      const finalPrice = discount > 0 ? price - (price * discount) / 100 : price;
      return [
        ...prev,
        {
          cp_pid: product.p_id.toString(),
          cp_poprice: finalPrice.toString(),
          cp_quantity: quantity,
          cp_discount: product.p_discount,
          cp_total: (finalPrice * quantity).toString(),
          product,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.cp_pid !== productId.toString()));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.cp_pid === productId.toString()) {
          const price = parseFloat(item.cp_poprice);
          return { ...item, cp_quantity: quantity, cp_total: (price * quantity).toString() };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const getCartTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.cp_total), 0);
  };

  const getCartCount = () => {
    return items.reduce((sum, item) => sum + item.cp_quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
