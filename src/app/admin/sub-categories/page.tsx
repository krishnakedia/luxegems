"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";

const mockSubCategories = [
  {
    sc_id: 1,
    sc_catid: "82",
    sc_name: "Gold Plated",
    sc_slug: "gold-plated",
    sc_status: "active",
    category_name: "Necklaces",
  },
  {
    sc_id: 2,
    sc_catid: "82",
    sc_name: "Kundan",
    sc_slug: "kundan",
    sc_status: "active",
    category_name: "Necklaces",
  },
  {
    sc_id: 3,
    sc_catid: "82",
    sc_name: "Pearl",
    sc_slug: "pearl",
    sc_status: "active",
    category_name: "Necklaces",
  },
  {
    sc_id: 4,
    sc_catid: "83",
    sc_name: "Silver",
    sc_slug: "silver",
    sc_status: "active",
    category_name: "Altar Sets",
  },
  {
    sc_id: 5,
    sc_catid: "84",
    sc_name: "Stud",
    sc_slug: "stud",
    sc_status: "active",
    category_name: "Earrings",
  },
  {
    sc_id: 6,
    sc_catid: "84",
    sc_name: "Jhumka",
    sc_slug: "jhumka",
    sc_status: "inactive",
    category_name: "Earrings",
  },
];

export default function AdminSubCategoriesPage() {
  const [subCategories] = useState(mockSubCategories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filteredSubCategories = subCategories.filter((sub) => {
    const matchesSearch = sub.sc_name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || sub.category_name?.toLowerCase() === category;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(subCategories.map((s) => s.category_name))];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Sub Categories</h1>
          <p className="text-stone-500">Manage product sub-categories</p>
        </div>
        <Button variant="gold" className="gap-2" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Add Sub Category
        </Button>
      </div>

      <div className="bg-white p-4 border border-stone-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search sub-categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "all", label: "All Categories" },
              ...categories.map((c) => ({ value: c.toLowerCase(), label: c })),
            ]}
            className="w-48"
          />
        </div>
      </div>

      <div className="bg-white border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Sub Category Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Parent Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSubCategories.map((sub) => (
                <tr key={sub.sc_id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 text-sm text-stone-500">#{sub.sc_id}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-stone-900">{sub.sc_name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-600">{sub.category_name}</td>
                  <td className="px-4 py-3 text-sm text-stone-500">{sub.sc_slug}</td>
                  <td className="px-4 py-3">
                    <Badge variant={sub.sc_status === "active" ? "success" : "error"}>
                      {sub.sc_status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
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

        {filteredSubCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No sub-categories found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-stone-900">Add Sub Category</h2>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-600 text-2xl">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <Select
                label="Parent Category"
                options={[
                  { value: "", label: "Select Category" },
                  { value: "82", label: "Necklaces" },
                  { value: "83", label: "Altar Sets" },
                  { value: "84", label: "Earrings" },
                  { value: "85", label: "Rings" },
                  { value: "86", label: "Bracelets" },
                ]}
              />
              <Input label="Sub Category Name" placeholder="Enter sub category name" />
              <Input label="Slug" placeholder="sub-category-slug" />
              <div className="flex gap-3 pt-4">
                <Button variant="gold" className="flex-1">Save</Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}