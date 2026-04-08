"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  ImagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const mockProduct: Product = {
  p_id: 1,
  p_slid: "Admin",
  p_catid: "82",
  p_scatid: "",
  p_scname: "",
  p_name: "Elegant Gold-Plated Necklace Set",
  p_code: "SH-1001",
  p_price: "1256",
  p_discount: "10",
  p_weight: 0,
  p_description: "Exquisite gold-plated necklace set perfect for weddings and special occasions. Features intricate design with high-quality finish.",
  p_date: "2026-02-05",
  p_status: 1,
  category_name: "Necklaces",
  stock: 15,
  images: [
    { pm_id: 1, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" },
    { pm_id: 2, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600", pm_status: "1" },
  ],
};

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState(mockProduct);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-light text-stone-900">Edit Product</h1>
            <p className="text-stone-500">Product ID: #{params.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/products/${params.id}`}>
            <Button variant="outline">View Product</Button>
          </Link>
          <Button variant="gold" onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <Input
                label="Product Name"
                value={product.p_name}
                onChange={(e) => setProduct({ ...product, p_name: e.target.value })}
                placeholder="Enter product name"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="SKU / Product Code"
                  value={product.p_code}
                  onChange={(e) => setProduct({ ...product, p_code: e.target.value })}
                  placeholder="SH-1001"
                />
                <Select
                  label="Category"
                  value={product.p_catid}
                  options={[
                    { value: "82", label: "Necklaces" },
                    { value: "83", label: "Altar Sets" },
                    { value: "84", label: "Earrings" },
                    { value: "85", label: "Rings" },
                    { value: "86", label: "Bracelets" },
                    { value: "87", label: "Baptismal" },
                  ]}
                />
              </div>
              <Textarea
                label="Description"
                value={product.p_description || ""}
                onChange={(e) => setProduct({ ...product, p_description: e.target.value })}
                placeholder="Enter product description"
                rows={4}
              />
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Pricing & Stock</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                label="Price (₹)"
                type="number"
                value={product.p_price}
                onChange={(e) => setProduct({ ...product, p_price: e.target.value })}
                placeholder="0"
              />
              <Input
                label="Discount (%)"
                type="number"
                value={product.p_discount || "0"}
                onChange={(e) => setProduct({ ...product, p_discount: e.target.value })}
                placeholder="0"
              />
              <Input
                label="Stock Quantity"
                type="number"
                value={product.stock?.toString() || "0"}
                placeholder="0"
              />
              <Input
                label="Weight (g)"
                type="number"
                value={product.p_weight?.toString() || "0"}
                placeholder="0"
              />
            </div>
            {product.p_discount && parseFloat(product.p_discount) > 0 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">
                  Final Price: <strong>{formatPrice(parseFloat(product.p_price) - (parseFloat(product.p_price) * parseFloat(product.p_discount) / 100))}</strong>
                </p>
              </div>
            )}
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Product Images</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {product.images?.map((img, index) => (
                <div key={img.pm_id} className="relative aspect-square border border-stone-200 rounded-lg overflow-hidden group">
                  <Image
                    src={img.pm_image}
                    alt={`Product ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 bg-amber-600 text-white text-xs px-2 py-0.5 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
              <label className="aspect-square border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors">
                <input type="file" className="hidden" accept="image/*" multiple />
                <div className="text-center">
                  <ImagePlus className="h-8 w-8 text-stone-400 mx-auto" />
                  <span className="text-xs text-stone-500 mt-1">Add Image</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Status</h2>
            <Select
              value={product.p_status?.toString() || "1"}
              options={[
                { value: "1", label: "Active" },
                { value: "0", label: "Inactive" },
              ]}
            />
            <p className="text-sm text-stone-500 mt-2">
              Inactive products will not be visible on the store.
            </p>
          </div>

          <div className="bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-medium text-stone-900 mb-4">Product Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">SKU</span>
                <span className="text-stone-900">{product.p_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Category</span>
                <span className="text-stone-900">{product.category_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Current Stock</span>
                <span className="text-stone-900">{product.stock || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Price</span>
                <span className="text-stone-900">{formatPrice(parseFloat(product.p_price))}</span>
              </div>
              {product.p_discount && parseFloat(product.p_discount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Discount</span>
                  <span className="text-green-600">{product.p_discount}%</span>
                </div>
              )}
              <div className="pt-3 border-t border-stone-100 flex justify-between">
                <span className="text-stone-500">Final Price</span>
                <span className="font-medium text-stone-900">
                  {formatPrice(
                    parseFloat(product.p_price) -
                      (parseFloat(product.p_price) * parseFloat(product.p_discount || "0")) / 100
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}