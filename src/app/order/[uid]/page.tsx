"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Package, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: number;
  name: string;
  sku: string;
  price: number;
  qty: number;
  image: string;
}

interface OrderData {
  order_id: number;
  order_uid: string;
  order_total: string;
  order_amount: string;
  order_status: string;
  order_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  items: OrderItem[];
}

export default function OrderPage({ params }: { params: Promise<{ uid: string }> }) {
  const [order, setOrder] = React.useState<OrderData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { uid } = await params;
        const res = await fetch(`/api/orders/${uid}`);
        const data = await res.json();
        
        if (data.success) {
          setOrder(data.data);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-300 text-lg">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 flex items-center justify-center">
        <div className="text-center p-8 bg-stone-800/50 backdrop-blur-sm rounded-2xl border border-stone-700">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <Package className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-light text-white mb-4">Order Not Found</h1>
          <p className="text-stone-400 mb-6">{error || "Unable to find this order"}</p>
          <Link href="/">
            <Button variant="gold">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const statusColors: Record<string, string> = {
    "1": "bg-green-500",
    "2": "bg-blue-500",
    "3": "bg-amber-500",
    "unpaid": "bg-red-500",
    "paid": "bg-green-500",
    "pending": "bg-amber-500",
    "processing": "bg-blue-500",
    "shipped": "bg-purple-500",
    "delivered": "bg-green-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyMTUsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-6 shadow-2xl shadow-amber-500/30">
              <Check className="h-12 w-12 text-stone-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide">
              Thank You for Your Order
            </h1>
            <p className="text-stone-400 text-lg">Your luxury piece is being prepared with care</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-800/80 backdrop-blur-md rounded-2xl border border-stone-700 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-stone-700 bg-gradient-to-r from-amber-500/10 to-transparent">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-stone-400 text-sm uppercase tracking-wider mb-1">Order ID</p>
                  <p className="text-2xl font-semibold text-amber-400">{order.order_uid}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${statusColors[order.order_status] || "bg-amber-500"}`}></span>
                  <span className="text-stone-300 capitalize">{order.order_status || "Processing"}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-stone-700/30 rounded-xl p-5">
                  <h3 className="text-amber-400 font-medium mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Customer Details
                  </h3>
                  <div className="space-y-2 text-stone-300">
                    <p className="font-medium text-white text-lg">{order.customer_name}</p>
                    <p className="text-sm">{order.customer_email}</p>
                    <p className="text-sm">{order.customer_phone}</p>
                  </div>
                </div>

                <div className="bg-stone-700/30 rounded-xl p-5">
                  <h3 className="text-amber-400 font-medium mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                    {order.shipping_address}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-amber-400 font-medium mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-stone-700/20 rounded-xl">
                      <div className="w-20 h-20 bg-stone-700 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-stone-400 text-sm">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400 font-medium">{formatPrice(item.price)}</p>
                        <p className="text-stone-400 text-sm">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-700 pt-6">
                <div className="flex justify-between text-stone-400 mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-400 mb-4">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-white">
                  <span>Total</span>
                  <span className="text-amber-400">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://wa.me/919876543210"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              Contact us on WhatsApp
            </a>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/products" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}