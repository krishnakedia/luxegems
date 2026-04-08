"use client";

import { useState } from "react";
import { Save, Store, Truck, CreditCard, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { key: "general", label: "General", icon: Store },
    { key: "shipping", label: "Shipping", icon: Truck },
    { key: "payment", label: "Payment", icon: CreditCard },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Settings</h1>
          <p className="text-stone-500">Manage your store settings</p>
        </div>
        <Button variant="gold" className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  activeTab === tab.key
                    ? "bg-amber-50 text-amber-700 border-l-2 border-amber-600"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "general" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">General Settings</h2>
              <div className="space-y-6">
                <Input label="Store Name" defaultValue="LUXEGEMS" />
                <Input label="Store Email" type="email" defaultValue="support@luxegems.in" />
                <Input label="Store Phone" defaultValue="+91 98765 43210" />
                <Textarea label="Store Address" defaultValue="123 Jewelry Lane, Karol Bagh, New Delhi - 110005" />
                <Input label="GST Number" defaultValue="07AABCU9603R1ZM" />
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Shipping Settings</h2>
              <div className="space-y-6">
                <Input label="Free Shipping Above (₹)" type="number" defaultValue="999" />
                <Input label="Default Shipping Charge (₹)" type="number" defaultValue="99" />
                <Input label="Express Shipping Charge (₹)" type="number" defaultValue="199" />
                <Input label="Estimated Delivery Days" defaultValue="3-7 business days" />
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Payment Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">Cash on Delivery</p>
                    <p className="text-sm text-stone-500">Allow COD orders</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">UPI Payments</p>
                    <p className="text-sm text-stone-500">Accept UPI payments</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">Credit/Debit Cards</p>
                    <p className="text-sm text-stone-500">Accept card payments</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5" />
                </div>
                <Input label="Currency" defaultValue="INR - Indian Rupee" disabled />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">Order Confirmation Email</p>
                    <p className="text-sm text-stone-500">Send email on new order</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">Order Status Updates</p>
                    <p className="text-sm text-stone-500">Send updates to customers</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">Low Stock Alerts</p>
                    <p className="text-sm text-stone-500">Alert when stock is low</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-5 w-5" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm New Password" type="password" />
                <div className="pt-4">
                  <h3 className="font-medium text-stone-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-stone-600">Enable 2FA for admin login</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
