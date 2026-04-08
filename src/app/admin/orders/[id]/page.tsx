"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
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
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/input";
import { formatPrice, getOrderStatus } from "@/lib/utils";

interface OrderItem {
  id: number;
  name: string;
  sku: string;
  price: number;
  qty: number;
  image: string;
}

interface OrderData {
  order_id: string;
  order_nuid: string;
  order_total: string;
  order_amount: string;
  order_uid: string;
  order_shipid: string;
  order_dcharges: string;
  order_type: string;
  order_status: string;
  order_payment: string;
  order_date: string;
  order_cty: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  billing_address: string;
  items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [orderStatus, setOrderStatus] = useState("1");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setOrder(json.data);
          setOrderStatus(json.data.order_status);
          
          const reviewUrl = `${window.location.origin}/review?order=${json.data.order_uid}`;
          const qrDataUrl = await QRCode.toDataURL(reviewUrl, {
            width: 150,
            margin: 1,
          });
          setQrCodeUrl(qrDataUrl);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoadingData(false);
      }
    }
    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const statusInfo = getOrderStatus(orderStatus);

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      await fetch(`/api/orders/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_status: orderStatus }),
      });
      if (order) {
        setOrder({ ...order, order_status: orderStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentIcon = () => {
    if (order?.order_type === "cod") {
      return <Banknote className="h-5 w-5" />;
    }
    return <CreditCard className="h-5 w-5" />;
  };

  if (loadingData) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-stone-500">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-stone-500">Order not found</div>
      </div>
    );
  }

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
            <p className="text-stone-500">Order ID: {order.order_uid}</p>
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
              <Badge variant={order.order_payment === "paid" ? "success" : "warning"}>
                {order.order_payment === "paid" ? "Paid" : "Unpaid"}
              </Badge>
            </div>
            <div className="space-y-4">
              {order.items.map((item) => (
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
                <span className="text-stone-900">₹{parseFloat(order.order_total).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="text-stone-900">₹{parseFloat(order.order_dcharges).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-3 border-t border-stone-200">
                <span>Total</span>
                <span>₹{parseFloat(order.order_amount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Shipping Address</h2>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-stone-400 mt-0.5" />
              <div>
                <p className="font-medium text-stone-900">{order.customer_name}</p>
                <p className="text-stone-500 mt-1">{order.shipping_address}</p>
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
                    {order.customer_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-stone-900">{order.customer_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{order.customer_email}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{order.customer_phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Payment Info</h2>
            <div className="flex items-center gap-3 mb-3">
              {getPaymentIcon()}
              <span className="font-medium text-stone-900 capitalize">{order.order_type}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Status</span>
                <Badge variant={order.order_payment === "paid" ? "success" : "warning"}>
                  {order.order_payment}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Order Date</span>
                <span className="text-stone-900">{order.order_date}</span>
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
                  <p className="text-xs text-stone-500">{order.order_date}</p>
                </div>
              </div>
            </div>
          </div>

          {qrCodeUrl && (
            <div className="bg-white border border-stone-200 p-6">
              <h2 className="text-lg font-medium text-stone-900 mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Add Review
              </h2>
              <p className="text-sm text-stone-500 mb-4">
                Scan this QR code to leave a review for your order
              </p>
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="Review QR Code" className="border-2 border-amber-200 rounded-lg" />
              </div>
              <Link
                href={`/review?order=${order.order_uid}`}
                className="block text-center text-sm text-amber-600 hover:underline mt-3"
              >
                Or click here to add review
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}