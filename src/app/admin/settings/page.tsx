"use client";

import { useState, useEffect } from "react";
import { Save, Store, Truck, CreditCard, Bell, Shield, Globe, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

interface SettingsData {
  store_name: string;
  store_email: string;
  store_phone: string;
  store_phone_2: string;
  store_address: string;
  gst_number: string;
  free_shipping_above: string;
  default_shipping_charge: string;
  express_shipping_charge: string;
  delivery_days: string;
  cod_enabled: boolean;
  upi_enabled: boolean;
  cards_enabled: boolean;
  order_email_enabled: boolean;
  order_status_enabled: boolean;
  low_stock_alert: boolean;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  social_youtube: string;
  social_linkedin: string;
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    store_name: "LUXEGEMS",
    store_email: "kediakrishna65@gmail.com",
    store_phone: "7003813603",
    store_phone_2: "8961941902",
    store_address: "147, A/14, Girish Ghosh Road Belur Howrah-711202",
    gst_number: "07AABCU9603R1ZM",
    free_shipping_above: "999",
    default_shipping_charge: "99",
    express_shipping_charge: "199",
    delivery_days: "3-7 business days",
    cod_enabled: true,
    upi_enabled: true,
    cards_enabled: true,
    order_email_enabled: true,
    order_status_enabled: true,
    low_stock_alert: true,
    social_facebook: "",
    social_instagram: "",
    social_twitter: "",
    social_youtube: "",
    social_linkedin: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.data) {
          setSettings((prev) => ({ ...prev, ...data.data }));
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-stone-500">Loading settings...</div>
      </div>
    );
  }

  const tabs = [
    { key: "general", label: "General", icon: Store },
    { key: "contact", label: "Contact Info", icon: Globe },
    { key: "social", label: "Social Media", icon: Link2 },
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
        <Button variant="gold" className="gap-2" onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
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
                <Input 
                  label="Store Name" 
                  value={settings.store_name} 
                  onChange={(e) => updateSetting("store_name", e.target.value)} 
                />
                <Input 
                  label="GST Number" 
                  value={settings.gst_number} 
                  onChange={(e) => updateSetting("gst_number", e.target.value)} 
                />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <Input 
                  label="Primary Phone" 
                  value={settings.store_phone} 
                  onChange={(e) => updateSetting("store_phone", e.target.value)} 
                />
                <Input 
                  label="Secondary Phone" 
                  value={settings.store_phone_2} 
                  onChange={(e) => updateSetting("store_phone_2", e.target.value)} 
                />
                <Input 
                  label="Email Address" 
                  type="email" 
                  value={settings.store_email} 
                  onChange={(e) => updateSetting("store_email", e.target.value)} 
                />
                <Textarea 
                  label="Store Address" 
                  value={settings.store_address} 
                  onChange={(e) => updateSetting("store_address", e.target.value)} 
                />
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="bg-white p-6 border border-stone-200">
              <h2 className="text-lg font-medium text-stone-900 mb-6">Social Media Links</h2>
              <div className="space-y-6">
                <Input 
                  label="Facebook" 
                  placeholder="https://facebook.com/yourpage"
                  value={settings.social_facebook} 
                  onChange={(e) => updateSetting("social_facebook", e.target.value)} 
                />
                <Input 
                  label="Instagram" 
                  placeholder="https://instagram.com/yourpage"
                  value={settings.social_instagram} 
                  onChange={(e) => updateSetting("social_instagram", e.target.value)} 
                />
                <Input 
                  label="Twitter/X" 
                  placeholder="https://twitter.com/yourpage"
                  value={settings.social_twitter} 
                  onChange={(e) => updateSetting("social_twitter", e.target.value)} 
                />
                <Input 
                  label="YouTube" 
                  placeholder="https://youtube.com/yourchannel"
                  value={settings.social_youtube} 
                  onChange={(e) => updateSetting("social_youtube", e.target.value)} 
                />
                <Input 
                  label="LinkedIn" 
                  placeholder="https://linkedin.com/company/yourcompany"
                  value={settings.social_linkedin} 
                  onChange={(e) => updateSetting("social_linkedin", e.target.value)} 
                />
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
