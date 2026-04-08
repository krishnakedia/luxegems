"use client";

import { useState, useEffect } from "react";
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

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string }>({ id: "" });

  useEffect(() => {
    params.then((p) => setResolvedParams(p));
  }, [params]);

  useEffect(() => {
    if (!resolvedParams.id) return;
    async function fetchData() {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`/api/products/${resolvedParams.id}`),
          fetch("/api/categories"),
        ]);
        const productJson = await productRes.json();
        const categoriesJson = await categoriesRes.json();

        if (productJson.success && productJson.data) {
          setProduct(productJson.data);
        }

        if (categoriesJson.success && categoriesJson.data) {
          setCategories(
            categoriesJson.data.map((c: any) => ({
              value: c.cat_id.toString(),
              label: c.cat_name,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoadingData(false);
      }
    }
    fetchData();
  }, [resolvedParams.id]);

  const handleSave = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await fetch(`/api/products/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-stone-500">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-stone-500">Product not found</div>
      </div>
    );
  }

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
            <p className="text-stone-500">Product ID: #{resolvedParams.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/products/${resolvedParams.id}`}>
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
                  options={categories}
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
              onChange={(e) => setProduct({ ...product, p_status: parseInt(e.target.value) })}
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