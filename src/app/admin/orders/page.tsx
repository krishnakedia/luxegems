"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  Package,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { formatPrice, getOrderStatus } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_uid?.toLowerCase().includes(search.toLowerCase()) ||
      order.shipping?.spp_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.shipping?.spp_number?.includes(search);
    
    let matchesStatus = true;
    if (status !== "all") {
      const statusMap: Record<string, string> = {
        pending: "1",
        processing: "2",
        shipped: "3",
        delivered: "4",
      };
      matchesStatus = order.order_status === statusMap[status];
    }
    
    const matchesPayment = payment === "all" || order.order_payment === payment;
    const matchesType = type === "all" || order.order_type === type;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesType;
  });

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.order_status === "1").length,
    processing: orders.filter((o) => o.order_status === "2").length,
    shipped: orders.filter((o) => o.order_status === "3").length,
    delivered: orders.filter((o) => o.order_status === "4").length,
  };

  const getStatusIcon = (orderStatus: string) => {
    switch (orderStatus) {
      case "1": return <Clock className="h-4 w-4" />;
      case "2": return <Package className="h-4 w-4" />;
      case "3": return <Truck className="h-4 w-4" />;
      case "4": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (orderStatus: string) => {
    const labels: Record<string, string> = {
      "1": "Pending",
      "2": "Processing",
      "3": "Shipped",
      "4": "Delivered",
    };
    return labels[orderStatus] || "Unknown";
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Orders</h1>
          <p className="text-stone-500">Manage customer orders</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(statusCounts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setStatus(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              status === key
                ? "bg-amber-600 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 border border-stone-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by Order ID, Customer Name, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              options={[
                { value: "all", label: "All Payment" },
                { value: "paid", label: "Paid" },
                { value: "unpaid", label: "Unpaid" },
              ]}
              className="w-32"
            />
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { value: "all", label: "All Type" },
                { value: "online", label: "Online" },
                { value: "cod", label: "COD" },
              ]}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Order ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Items</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Total</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Payment</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Date</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredOrders.map((order) => (
              <tr key={order.order_id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm font-medium text-stone-900">
                  {order.order_uid}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      {order.shipping?.spp_name || "N/A"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {order.shipping?.spp_number || ""}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-600">
                  {order.items?.length || 0} items
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-stone-900">
                    ₹{formatPrice(order.order_total)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.order_status)}
                    <span className="text-sm">
                      {getStatusLabel(order.order_status)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={order.order_payment === "paid" ? "success" : "warning"}>
                    {order.order_payment}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {order.order_date?.split(' ')[0]}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/orders/${order.order_id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}