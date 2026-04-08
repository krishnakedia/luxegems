"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { generateInvoicePDF, generateWhatsAppMessage } from "@/lib/invoice";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "phone" && value.length >= 10) {
      fetchCustomerByPhone(value);
    }
  };

  const fetchCustomerByPhone = async (phone: string) => {
    try {
      const res = await fetch(`/api/customers?phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (data.success && data.data) {
        const customer = data.data;
        setFormData(prev => ({
          ...prev,
          firstName: customer.nu_name?.split(" ")[0] || "",
          lastName: customer.nu_name?.split(" ").slice(1).join(" ") || "",
          email: customer.nu_email || prev.email,
          address: customer.nu_address || prev.address,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch customer:", error);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      const newOrderId = `ODR${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setOrderId(newOrderId);
      
      const customerRes = await fetch(`/api/customers?phone=${encodeURIComponent(formData.phone)}`);
      const customerData = await customerRes.json();
      let customerId = customerData.data?.nu_id;
      
      if (!customerId) {
        const createCustomerRes = await fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          }),
        });
        const createCustomerData = await createCustomerRes.json();
        customerId = createCustomerData.data?.id;
      }
      
      const shippingRes = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        }),
      });
      const shippingData = await shippingRes.json();
      
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: customerId,
          items: items,
          shipping_address: shippingData.data || {},
          payment_method: "whatsapp",
          subtotal,
          shipping_charges: shipping,
          discount: 0,
          total,
        }),
      });
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        throw new Error("Failed to create order");
      }
      
      const invoiceData = {
        orderId: newOrderId,
        orderUid: orderData.data?.order_uid || newOrderId,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        items: items,
        shippingDetails: {
          spp_name: `${formData.firstName} ${formData.lastName}`,
          spp_email: formData.email,
          spp_number: formData.phone,
          spp_address: formData.address,
          spp_city: formData.city,
          spp_state: formData.state,
          spp_pin: formData.pincode,
        } as any,
        subtotal,
        shipping,
        total,
      };

      const pdf = generateInvoicePDF(invoiceData);
      const pdfBlob = pdf.output("blob");
      const pdfBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(pdfBlob);
      });

      const orderLink = `${window.location.origin}/order/${orderData.data?.order_uid || newOrderId}`;
      const whatsappUrl = generateWhatsAppMessage(invoiceData, pdfBase64, orderLink);
      
      window.open(whatsappUrl, "_blank");
      
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-light text-stone-900 mb-4">Your cart is empty</h1>
          <p className="text-stone-500 mb-6">Add some items to your cart first</p>
          <Link href="/products">
            <Button variant="gold">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-white border border-stone-200 p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-light text-stone-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-stone-600 mb-2">
              Thank you for your purchase. Your order has been sent via WhatsApp.
            </p>
            <p className="text-stone-500 mb-6">
              Order ID: <span className="font-medium text-amber-600">{orderId}</span>
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/track-order">
                <Button variant="outline">Track Order</Button>
              </Link>
              <Link href="/products">
                <Button variant="gold">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/cart" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8">
          <ArrowLeft className="h-5 w-5" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-light text-stone-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-200 p-6">
              <h2 className="text-xl font-medium text-stone-900 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="col-span-2"
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="col-span-2"
                />
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House no., Street, Area"
                  className="col-span-2"
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
                <Select
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Select State" },
                    { value: "delhi", label: "Delhi" },
                    { value: "maharashtra", label: "Maharashtra" },
                    { value: "karnataka", label: "Karnataka" },
                    { value: "tamilnadu", label: "Tamil Nadu" },
                    { value: "gujarat", label: "Gujarat" },
                    { value: "rajasthan", label: "Rajasthan" },
                  ]}
                />
                <Input
                  label="PIN Code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter PIN code"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.cp_pid} className="flex gap-4">
                    <div className="w-16 h-16 bg-stone-50 overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product?.images?.[0]?.pm_image || "/placeholder.jpg"}
                        alt={item.product?.p_name || "Product"}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">
                        {item.product?.p_name}
                      </p>
                      <p className="text-sm text-stone-500">Qty: {item.cp_quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-stone-900">
                      {formatPrice(parseFloat(item.cp_total))}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 py-4 border-t border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="flex justify-between py-4 border-t border-stone-200">
                <span className="font-medium text-stone-900">Total</span>
                <span className="text-lg font-semibold text-stone-900">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="w-full gap-2 mt-6"
                onClick={handlePlaceOrder}
                disabled={loading || !formData.firstName || !formData.lastName || !formData.phone || !formData.address}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Order via WhatsApp
                  </>
                )}
              </Button>
              
              <p className="text-xs text-stone-500 text-center mt-4">
                Your order details will be sent via WhatsApp with invoice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
