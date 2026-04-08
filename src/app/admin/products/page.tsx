"use client";

import { useState } from "react";
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

// Mock data
const mockProducts: Product[] = [
  {
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
    p_description: "",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Necklaces",
    stock: 15,
    images: [{ pm_id: 1, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100", pm_status: "1" }],
  },
  {
    p_id: 2,
    p_slid: "Admin",
    p_catid: "83",
    p_scatid: "",
    p_scname: "",
    p_name: "Traditional Silver Altar Set",
    p_code: "AS-1001",
    p_price: "5000",
    p_discount: "10",
    p_weight: 0,
    p_description: "",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Altar Sets",
    stock: 8,
    images: [{ pm_id: 2, pm_pid: "2", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=100", pm_status: "1" }],
  },
  {
    p_id: 3,
    p_slid: "Admin",
    p_catid: "85",
    p_scatid: "",
    p_scname: "",
    p_name: "Brass Censor with Chain",
    p_code: "CE-100",
    p_price: "6500",
    p_discount: "8",
    p_weight: 0,
    p_description: "",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Censors",
    stock: 5,
    images: [{ pm_id: 3, pm_pid: "3", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=100", pm_status: "1" }],
  },
  {
    p_id: 4,
    p_slid: "Admin",
    p_catid: "86",
    p_scatid: "",
    p_scname: "",
    p_name: "Crystal Candlesticks Pair",
    p_code: "CA-1001",
    p_price: "7000",
    p_discount: "15",
    p_weight: 0,
    p_description: "",
    p_date: "2026-02-06",
    p_status: 0,
    category_name: "Candlesticks",
    stock: 0,
    images: [{ pm_id: 4, pm_pid: "4", pm_image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=100", pm_status: "1" }],
  },
];

export default function AdminProductsPage() {
  const [products] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

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
                { value: "necklaces", label: "Necklaces" },
                { value: "earrings", label: "Earrings" },
                { value: "rings", label: "Rings" },
                { value: "bracelets", label: "Bracelets" },
                { value: "baptismal", label: "Baptismal" },
                { value: "altar-sets", label: "Altar Sets" },
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 border-stone-300 rounded text-amber-600 focus:ring-amber-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => (
                <tr key={product.p_id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.p_id)}
                      onChange={() => toggleSelect(product.p_id)}
                      className="w-4 h-4 border-stone-300 rounded text-amber-600 focus:ring-amber-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={product.images?.[0]?.pm_image || "/placeholder.jpg"}
                          alt={product.p_name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-stone-900">{product.p_name}</p>
                        <p className="text-xs text-stone-500">ID: #{product.p_id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-600">{product.p_code}</td>
                  <td className="px-4 py-3 text-sm text-stone-600">{product.category_name}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-stone-900">{formatPrice(parseFloat(product.p_price))}</p>
                      {parseFloat(product.p_discount) > 0 && (
                        <p className="text-xs text-stone-400 line-through">{formatPrice(parseFloat(product.p_price))}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${
                        (product.stock || 0) === 0 ? "text-red-600" : (product.stock || 0) <= 5 ? "text-orange-600" : "text-green-600"
                      }`}
                    >
                      {product.stock || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={product.p_status === 1 ? "success" : "error"}>
                      {product.p_status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/products/${product.p_id}`}
                        className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.p_id}/edit`}
                        className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No products found.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200">
          <p className="text-sm text-stone-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
