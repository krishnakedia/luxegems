"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Heart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const [couponCode, setCouponCode] = React.useState("");
  const [couponApplied, setCouponApplied] = React.useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;
  const cartCount = getCartCount();

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "LUXE10") {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-stone-900 mb-2">Your cart is empty</h2>
          <p className="text-stone-500 mb-6">Add some beautiful pieces to your cart</p>
          <Button variant="gold" asChild>
            <Link href="/products">
              Start Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light text-stone-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = parseFloat(item.cp_poprice);
              const discount = parseFloat(item.cp_discount);
              const itemTotal = parseFloat(item.cp_total);

              return (
                <div
                  key={item.cp_pid}
                  className="flex gap-6 p-4 bg-white border border-stone-200"
                >
                  <Link href={`/products/${item.cp_pid}`} className="flex-shrink-0">
                    <div className="w-32 h-32 bg-stone-50 overflow-hidden">
                      <Image
                        src={item.product?.images?.[0]?.pm_image || "/placeholder.jpg"}
                        alt={item.product?.p_name || "Product"}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${item.cp_pid}`}
                          className="font-medium text-stone-900 hover:text-amber-700"
                        >
                          {item.product?.p_name}
                        </Link>
                        <p className="text-sm text-stone-500 mt-1">
                          SKU: {item.product?.p_code}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(parseInt(item.cp_pid))}
                        className="text-stone-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-300">
                          <button
                            onClick={() => updateQuantity(parseInt(item.cp_pid), item.cp_quantity - 1)}
                            className="px-3 py-2 text-stone-600 hover:bg-stone-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center">{item.cp_quantity}</span>
                          <button
                            onClick={() => updateQuantity(parseInt(item.cp_pid), item.cp_quantity + 1)}
                            className="px-3 py-2 text-stone-600 hover:bg-stone-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button className="text-stone-500 hover:text-amber-600">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-stone-900">
                          {formatPrice(itemTotal)}
                        </p>
                        {discount > 0 && (
                          <p className="text-sm text-stone-400 line-through">
                            {formatPrice(price * item.cp_quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-4">
              <Link href="/products">
                <Button variant="outline" className="gap-2">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="text-sm font-medium text-stone-700 mb-2 block">
                  Apply Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 h-11 border-2 border-stone-200 px-4 text-sm focus:border-amber-600 focus:outline-none"
                    disabled={couponApplied}
                  />
                  <Button
                    variant="outline"
                    onClick={applyCoupon}
                    disabled={couponApplied || !couponCode}
                  >
                    Apply
                  </Button>
                </div>
                {couponApplied && (
                  <div className="flex items-center gap-2 mt-2 text-green-600">
                    <Tag className="h-4 w-4" />
                    <span className="text-sm">LUXE10 applied - 10% off!</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pb-6 border-b border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between py-6">
                <span className="text-lg font-medium text-stone-900">Total</span>
                <span className="text-xl font-semibold text-stone-900">
                  {formatPrice(total)}
                </span>
              </div>

              <Link href="/checkout">
                <Button variant="gold" size="lg" className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <p className="text-xs text-stone-500 text-center mt-4">
                Shipping calculated at checkout
                {shipping > 0 && " • Add ₹" + (999 - subtotal) + " more for FREE shipping"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
