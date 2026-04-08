"use client";

import * as React from "react";
import { Search, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = React.useState("");
  const [searched, setSearched] = React.useState(false);

  const mockOrder = {
    orderId: "ODR123456",
    date: "April 5, 2026",
    status: "shipped",
    estimatedDelivery: "April 10, 2026",
    items: [
      { name: "Elegant Gold-Plated Necklace Set", qty: 1, price: 1256 },
    ],
    total: 1256,
    trackingSteps: [
      { status: "orderplaced", label: "Order Placed", date: "April 5, 2026", completed: true },
      { status: "confirmed", label: "Order Confirmed", date: "April 5, 2026", completed: true },
      { status: "processing", label: "Processing", date: "April 6, 2026", completed: true },
      { status: "shipped", label: "Shipped", date: "April 7, 2026", completed: true },
      { status: "delivered", label: "Delivered", date: "Expected April 10, 2026", completed: false },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "orderplaced": return <Package className="h-5 w-5" />;
      case "confirmed": return <CheckCircle className="h-5 w-5" />;
      case "processing": return <Clock className="h-5 w-5" />;
      case "shipped": return <Truck className="h-5 w-5" />;
      case "delivered": return <CheckCircle className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="bg-stone-900 text-white py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-light mb-4">Track Your Order</h1>
            <p className="text-stone-300">Enter your order ID to track the status of your order</p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex gap-4">
            <Input
              placeholder="Enter Order ID (e.g., ODR123456)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
            />
            <Button variant="gold" onClick={() => setSearched(true)}>
              <Search className="h-4 w-4 mr-2" />
              Track
            </Button>
          </div>
        </div>

        {/* Order Status */}
        {searched && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-stone-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-stone-500">Order ID</p>
                  <p className="text-lg font-medium text-stone-900">{mockOrder.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500">Order Date</p>
                  <p className="text-lg font-medium text-stone-900">{mockOrder.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200">
                <div>
                  <p className="text-sm text-amber-700">Status</p>
                  <p className="text-lg font-medium text-amber-800">Shipped</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-amber-700">Estimated Delivery</p>
                  <p className="text-lg font-medium text-amber-800">{mockOrder.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="bg-white border border-stone-200 p-6">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Order Progress</h2>
              <div className="space-y-6">
                {mockOrder.trackingSteps.map((step, index) => (
                  <div key={step.status} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500 text-white" : "bg-stone-200 text-stone-400"
                    }`}>
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? "text-stone-900" : "text-stone-400"}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-stone-500">{step.date}</p>
                    </div>
                    {index < mockOrder.trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.completed ? "bg-green-500" : "bg-stone-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
