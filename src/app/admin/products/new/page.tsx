"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, X, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";

export default function AdminProductForm() {
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200",
  ]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-stone-100 rounded transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-light text-stone-900">Add New Product</h1>
            <p className="text-stone-500">Create a new product in your store</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <Input
                label="Product Name"
                placeholder="Enter product name"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="SKU / Product Code"
                  placeholder="e.g., NG-001"
                />
                <Input
                  label="Product Weight (g)"
                  type="number"
                  placeholder="0.000"
                />
              </div>
              <Textarea
                label="Description"
                placeholder="Enter product description..."
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Pricing</h2>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Price (₹)"
                type="number"
                placeholder="0"
              />
              <Input
                label="Discount (%)"
                type="number"
                placeholder="0"
              />
              <Input
                label="Cost Price (₹)"
                type="number"
                placeholder="0"
              />
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Stock Quantity"
                type="number"
                placeholder="0"
              />
              <Input
                label="Low Stock Alert"
                type="number"
                placeholder="5"
              />
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white p-6 border border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-stone-900">Product Variants</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Variant
              </Button>
            </div>
            <p className="text-sm text-stone-500">
              Add variants like size, color, or material for this product.
            </p>
          </div>

          {/* SEO */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">SEO Settings</h2>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                placeholder="Enter SEO title"
              />
              <Textarea
                label="Meta Description"
                placeholder="Enter SEO description..."
              />
              <Input
                label="Keywords"
                placeholder="jewelry, necklace, gold"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Status</h2>
            <Select
              options={[
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
                { value: "scheduled", label: "Scheduled" },
              ]}
            />
          </div>

          {/* Categories */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Category</h2>
            <Select
              options={[
                { value: "", label: "Select Category" },
                { value: "necklaces", label: "Necklaces" },
                { value: "earrings", label: "Earrings" },
                { value: "rings", label: "Rings" },
                { value: "bracelets", label: "Bracelets" },
                { value: "baptismal", label: "Baptismal" },
                { value: "altar-sets", label: "Altar Sets" },
              ]}
            />
          </div>

          {/* Images */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Product Images</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-stone-100 border border-stone-200 overflow-hidden group"
                >
                  <Image
                    src={img}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 p-1 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-amber-600 text-white text-[10px]">
                      Main
                    </span>
                  )}
                </div>
              ))}
              <button className="aspect-square border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-400 hover:border-amber-400 hover:text-amber-600 transition-colors">
                <Upload className="h-5 w-5 mb-1" />
                <span className="text-xs">Add</span>
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Upload product images. First image will be the main image.
            </p>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 border border-stone-200">
            <div className="space-y-3">
              <Button variant="gold" className="w-full">
                Publish Product
              </Button>
              <Button variant="outline" className="w-full">
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
