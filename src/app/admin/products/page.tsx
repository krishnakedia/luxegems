"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories")
        ]);
        
        const productsData = await productsRes.json();
        if (productsData.success) {
          setProducts(productsData.data);
        }
        
        const categoriesData = await categoriesRes.json();
        if (categoriesData.success) {
          setCategories(categoriesData.data);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.p_name.toLowerCase().includes(search.toLowerCase()) ||
      product.p_code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category_name?.toLowerCase() === category;
    const matchesStatus = status === "all" || (status === "active" ? product.p_status === 1 : product.p_status === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.p_id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Products</h1>
          <p className="text-stone-500">Manage your product inventory</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="gold" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 border border-stone-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "all", label: "All Categories" },
                ...categories.map((c) => ({ value: c.cat_name.toLowerCase(), label: c.cat_name }))
              ]}
              className="w-40"
            />
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              className="w-32"
            />
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-amber-50 p-4 mb-6 flex items-center justify-between">
          <span className="text-sm text-amber-800">
            {selectedProducts.length} product(s) selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-stone-300"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-stone-500">Product</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-stone-500">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-stone-500">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-stone-500">Stock</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredProducts.map((product) => {
              const mainImage = product.images?.[0]?.pm_image || "/placeholder.jpg";
              const price = parseFloat(product.p_price);
              const discount = parseFloat(product.p_discount || "0");
              const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

              return (
                <tr key={product.p_id} className="hover:bg-stone-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.p_id)}
                      onChange={() => toggleSelect(product.p_id)}
                      className="w-4 h-4 rounded border-stone-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-stone-100 rounded relative flex-shrink-0">
                        <Image
                          src={mainImage}
                          alt={product.p_name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{product.p_name}</p>
                        <p className="text-xs text-stone-500">SKU: {product.p_code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-stone-600">
                    {product.category_name || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <span className="font-medium text-stone-900">
                        {formatPrice(discountedPrice)}
                      </span>
                      {discount > 0 && (
                        <span className="ml-2 text-xs text-stone-500 line-through">
                          {formatPrice(price)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-stone-600">
                    {product.stock || 0}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={product.p_status === 1 ? "success" : "error"}>
                      {product.p_status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/products/${product.p_id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product.p_id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}