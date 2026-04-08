"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Mail,
  Phone,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/input";
import { formatPrice, getOrderStatus } from "@/lib/utils";

const mockOrder = {
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
  shipping_address: "123, MG Road, Bangalore, Karnataka - 560001",
  billing_address: "123, MG Road, Bangalore, Karnataka - 560001",
  items: [
    {
      id: 1,
      name: "Elegant Gold-Plated Necklace Set",
      sku: "SH-1001",
      price: 1130,
      qty: 1,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100",
    },
    {
      id: 2,
      name: "Pearl Earrings",
      sku: "ER-1002",
      price: 1220,
      qty: 1,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100",
    },
  ],
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState(mockOrder.order_status);
  const [loading, setLoading] = useState(false);

  const statusInfo = getOrderStatus(orderStatus);

  const handleStatusUpdate = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getPaymentIcon = () => {
    if (mockOrder.order_type === "cod") {
      return <Banknote className="h-5 w-5" />;
    }
    return <CreditCard className="h-5 w-5" />;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-light text-stone-900">Order Details</h1>
            <p className="text-stone-500">Order ID: {mockOrder.order_uid}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-stone-900">Order Items</h2>
              <Badge variant={mockOrder.order_payment === "paid" ? "success" : "warning"}>
                {mockOrder.order_payment === "paid" ? "Paid" : "Unpaid"}
              </Badge>
            </div>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <div className="w-16 h-16 bg-white border border-stone-200 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-900">{item.name}</h3>
                    <p className="text-sm text-stone-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-stone-900">₹{item.price.toLocaleString()}</p>
                    <p className="text-sm text-stone-500">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-900">₹{parseFloat(mockOrder.order_total).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="text-stone-900">₹{parseFloat(mockOrder.order_dcharges).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-3 border-t border-stone-200">
                <span>Total</span>
                <span>₹{parseFloat(mockOrder.order_amount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Shipping Address</h2>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-stone-400 mt-0.5" />
              <div>
                <p className="font-medium text-stone-900">{mockOrder.customer_name}</p>
                <p className="text-stone-500 mt-1">{mockOrder.shipping_address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Order Status</h2>
            <div className={`inline-flex px-3 py-2 rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
              {statusInfo.label}
            </div>
            <div className="mt-4 space-y-2">
              <Select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                options={[
                  { value: "1", label: "Pending" },
                  { value: "2", label: "Processing" },
                  { value: "3", label: "Shipped" },
                  { value: "4", label: "Delivered" },
                  { value: "5", label: "Cancelled" },
                ]}
              />
              <Button variant="gold" className="w-full mt-2" onClick={handleStatusUpdate} disabled={loading}>
                {loading ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Customer Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                  <span className="text-stone-600 font-medium">
                    {mockOrder.customer_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-stone-900">{mockOrder.customer_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{mockOrder.customer_email}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{mockOrder.customer_phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Payment Info</h2>
            <div className="flex items-center gap-3 mb-3">
              {getPaymentIcon()}
              <span className="font-medium text-stone-900 capitalize">{mockOrder.order_type}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Status</span>
                <Badge variant={mockOrder.order_payment === "paid" ? "success" : "warning"}>
                  {mockOrder.order_payment}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Order Date</span>
                <span className="text-stone-900">{mockOrder.order_date}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Order Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-500" />
                <div>
                  <p className="text-sm font-medium text-stone-900">Order Placed</p>
                  <p className="text-xs text-stone-500">{mockOrder.order_date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}