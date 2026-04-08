"use client";

import * as React from "react";
import { Search, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TrackingOrder {
  order_id: string;
  order_date: string;
  order_status: string;
  order_amount: string;
  customer_name: string;
  items: { name: string; qty: number; price: number }[];
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = React.useState("");
  const [order, setOrder] = React.useState<TrackingOrder | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSearch = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setOrder(json.data);
      } else {
        setError("Order not found. Please check your Order ID.");
      }
    } catch (err) {
      setError("Failed to fetch order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      "1": "Pending",
      "2": "Processing",
      "3": "Shipped",
      "4": "Delivered",
      "5": "Cancelled",
    };
    return labels[status] || "Unknown";
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: "1", label: "Order Placed" },
      { key: "2", label: "Processing" },
      { key: "3", label: "Shipped" },
      { key: "4", label: "Delivered" },
    ];
    const currentIndex = steps.findIndex(s => s.key === status);
    return steps.map((step, idx) => ({
      ...step,
      completed: idx <= currentIndex,
    }));
  };

  const getStatusIcon = (completed: boolean, key: string) => {
    if (!completed) return <Clock className="h-5 w-5" />;
    if (key === "4") return <CheckCircle className="h-5 w-5" />;
    if (key === "3") return <Truck className="h-5 w-5" />;
    return <CheckCircle className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-stone-900 text-white py-16 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-light mb-4">Track Your Order</h1>
            <p className="text-stone-300">Enter your order ID to track the status of your order</p>
          </div>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <div className="flex gap-4">
            <Input
              placeholder="Enter Order ID (e.g., ODR0001)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button variant="gold" onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Searching..." : "Track"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-center">
              {error}
            </div>
          </div>
        )}

        {order && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-stone-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-stone-500">Order ID</p>
                  <p className="text-lg font-medium text-stone-900">{order.order_id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500">Order Date</p>
                  <p className="text-lg font-medium text-stone-900">
                    {new Date(order.order_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200">
                <div>
                  <p className="text-sm text-amber-700">Status</p>
                  <p className="text-lg font-medium text-amber-800">
                    {getStatusLabel(order.order_status)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-amber-700">Total Amount</p>
                  <p className="text-lg font-medium text-amber-800">
                    ₹{parseFloat(order.order_amount).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-6">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Order Progress</h2>
              <div className="space-y-6">
                {getStatusSteps(order.order_status).map((step, index, arr) => (
                  <div key={step.key} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500 text-white" : "bg-stone-200 text-stone-400"
                    }`}>
                      {getStatusIcon(step.completed, step.key)}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? "text-stone-900" : "text-stone-400"}`}>
                        {step.label}
                      </p>
                      {step.completed && (
                        <p className="text-sm text-stone-500">
                          {index === 0 && new Date(order.order_date).toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </div>
                    {index < arr.length - 1 && (
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
