"use client";

import { useState } from "react";
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

// Mock data
const mockOrders = [
  {
    order_id: "ODR001",
    order_nuid: "4",
    order_total: "2500",
    order_amount: "2350",
    order_uid: "ODR0002",
    order_shipid: "1",
    order_dcharges: "100",
    order_type: "online",
    order_status: "1",
    order_payment: "unpaid",
    order_date: "2026-04-08",
    order_cty: 1,
    customer_name: "Priya Sharma",
    customer_email: "priya@example.com",
    customer_phone: "9876543210",
    items_count: 2,
  },
  {
    order_id: "ODR002",
    order_nuid: "1",
    order_total: "4500",
    order_amount: "4200",
    order_uid: "ODR0003",
    order_shipid: "2",
    order_dcharges: "150",
    order_type: "online",
    order_status: "3",
    order_payment: "paid",
    order_date: "2026-04-08",
    order_cty: 1,
    customer_name: "Anita Desai",
    customer_email: "anita@example.com",
    customer_phone: "9876543211",
    items_count: 3,
  },
  {
    order_id: "ODR003",
    order_nuid: "16",
    order_total: "1800",
    order_amount: "1700",
    order_uid: "ODR0004",
    order_shipid: "3",
    order_dcharges: "50",
    order_type: "online",
    order_status: "1",
    order_payment: "unpaid",
    order_date: "2026-04-07",
    order_cty: 2,
    customer_name: "Rahul Kumar",
    customer_email: "rahul@example.com",
    customer_phone: "9876543212",
    items_count: 1,
  },
  {
    order_id: "ODR004",
    order_nuid: "5",
    order_total: "3200",
    order_amount: "3000",
    order_uid: "ODR0005",
    order_shipid: "4",
    order_dcharges: "100",
    order_type: "cod",
    order_status: "4",
    order_payment: "paid",
    order_date: "2026-04-07",
    order_cty: 3,
    customer_name: "Maria Fernandes",
    customer_email: "maria@example.com",
    customer_phone: "9876543213",
    items_count: 4,
  },
];

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [type, setType] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_uid.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_phone.includes(search);
    
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

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Orders</h1>
          <p className="text-stone-500">Manage and track customer orders</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "All", count: statusCounts.all },
          { key: "pending", label: "Pending", count: statusCounts.pending, color: "yellow" },
          { key: "processing", label: "Processing", count: statusCounts.processing, color: "blue" },
          { key: "shipped", label: "Shipped", count: statusCounts.shipped, color: "purple" },
          { key: "delivered", label: "Delivered", count: statusCounts.delivered, color: "green" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatus(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              status === tab.key
                ? "bg-stone-900 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 border border-stone-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by order ID, customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            options={[
              { value: "all", label: "All Payment" },
              { value: "paid", label: "Paid" },
              { value: "unpaid", label: "Unpaid" },
            ]}
            className="w-40"
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

      {/* Orders Table */}
      <div className="bg-white border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((order) => {
                const statusInfo = getOrderStatus(order.order_status);
                return (
                  <tr key={order.order_id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-amber-600">{order.order_uid}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-stone-900">{order.customer_name}</p>
                        <p className="text-xs text-stone-500">{order.customer_email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-600">{order.items_count} items</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-stone-900">{formatPrice(parseFloat(order.order_amount))}</p>
                        {parseFloat(order.order_dcharges) > 0 && (
                          <p className="text-xs text-stone-400">+ {formatPrice(parseFloat(order.order_dcharges))} shipping</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={order.order_payment === "paid" ? "success" : "warning"}
                        >
                          {order.order_payment === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                        <span className="text-xs text-stone-500 uppercase">{order.order_type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-500">{order.order_date}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/orders/${order.order_id}`}
                          className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded">
                          <Package className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No orders found.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
