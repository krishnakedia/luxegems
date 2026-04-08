"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock data
const mockSliders = [
  {
    id: 1,
    title: "Home Banner 1",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200",
    link: "/",
    status: "active",
    type: "banner",
    order: 1,
  },
  {
    id: 2,
    title: "Home Banner 2",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=1200",
    link: "/products",
    status: "active",
    type: "banner",
    order: 2,
  },
  {
    id: 3,
    title: "Festive Sale Banner",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200",
    link: "/products?sale=true",
    status: "active",
    type: "promo",
    order: 3,
  },
  {
    id: 4,
    title: "New Arrivals",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
    link: "/products?sort=newest",
    status: "inactive",
    type: "promo",
    order: 4,
  },
];

export default function AdminSlidersPage() {
  const [sliders, setSliders] = useState(mockSliders);
  const [showModal, setShowModal] = useState(false);

  const toggleStatus = (id: number) => {
    setSliders(sliders.map((s) =>
      s.id === id
        ? { ...s, status: s.status === "active" ? "inactive" : "active" }
        : s
    ));
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Sliders & Banners</h1>
          <p className="text-stone-500">Manage homepage banners and promotional sliders</p>
        </div>
        <Button variant="gold" className="gap-2" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Add New Banner
        </Button>
      </div>

      {/* Banner Types */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 border border-stone-200 text-center">
          <p className="text-2xl font-semibold text-stone-900">{sliders.filter(s => s.type === "banner").length}</p>
          <p className="text-sm text-stone-500">Homepage Banners</p>
        </div>
        <div className="bg-white p-4 border border-stone-200 text-center">
          <p className="text-2xl font-semibold text-stone-900">{sliders.filter(s => s.type === "promo").length}</p>
          <p className="text-sm text-stone-500">Promotional Banners</p>
        </div>
        <div className="bg-white p-4 border border-stone-200 text-center">
          <p className="text-2xl font-semibold text-green-600">{sliders.filter(s => s.status === "active").length}</p>
          <p className="text-sm text-stone-500">Active Banners</p>
        </div>
        <div className="bg-white p-4 border border-stone-200 text-center">
          <p className="text-2xl font-semibold text-stone-900">{sliders.filter(s => s.status === "inactive").length}</p>
          <p className="text-sm text-stone-500">Inactive Banners</p>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sliders.map((slider) => (
          <div key={slider.id} className="bg-white border border-stone-200 overflow-hidden group">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={slider.image}
                alt={slider.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white rounded-full hover:bg-amber-50">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-amber-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-red-50 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant={slider.type === "banner" ? "secondary" : "gold"}>
                  {slider.type}
                </Badge>
                <Badge variant={slider.status === "active" ? "success" : "error"}>
                  {slider.status}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-stone-900">{slider.title}</h3>
                <button onClick={() => toggleStatus(slider.id)}>
                  {slider.status === "active" ? (
                    <ToggleRight className="h-6 w-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-stone-400" />
                  )}
                </button>
              </div>
              <p className="text-sm text-stone-500 truncate">{slider.link}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                <span className="text-xs text-stone-400">Order: {slider.order}</span>
                <div className="flex items-center gap-1 text-stone-400 cursor-move">
                  <GripVertical className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-stone-900">Add New Banner</h2>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Banner Title" placeholder="Enter banner title" />
              <Input label="Banner Link" placeholder="/products or https://..." />
              <Input label="Display Order" type="number" placeholder="1" />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Banner Type
                </label>
                <select className="flex h-11 w-full border-2 border-stone-200 bg-white px-4 py-2 text-sm focus:border-amber-600 focus:outline-none">
                  <option value="banner">Homepage Banner</option>
                  <option value="promo">Promotional Banner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-stone-300 p-8 text-center">
                  <Upload className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-sm text-stone-500">Drag and drop or click to upload</p>
                  <p className="text-xs text-stone-400 mt-1">Recommended size: 1920x600px</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="gold" className="flex-1">Save Banner</Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
