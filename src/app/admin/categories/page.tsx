"use client";

import * as React from "react";
import Link from "next/link";
import { Package, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

const mockCategories = [
  { id: 1, name: "Necklaces", products: 24, status: "active" },
  { id: 2, name: "Earrings", products: 18, status: "active" },
  { id: 3, name: "Rings", products: 12, status: "active" },
  { id: 4, name: "Bracelets", products: 15, status: "active" },
  { id: 5, name: "Baptismal", products: 8, status: "active" },
  { id: 6, name: "Altar Sets", products: 10, status: "active" },
  { id: 7, name: "Communion", products: 6, status: "active" },
  { id: 8, name: "Censors", products: 9, status: "active" },
];

export default function CategoriesPage() {
  const [search, setSearch] = React.useState("");

  const filteredCategories = mockCategories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Categories</h1>
          <p className="text-stone-500 mt-1">Manage product categories</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-white border border-stone-200">
        <div className="p-4 border-b border-stone-200">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              className="w-40"
            />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Category Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Products</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm text-stone-500">{category.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{category.products}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
