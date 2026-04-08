"use client";

import { useState, useEffect } from "react";
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

export default function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const [subCategoriesRes, categoriesRes] = await Promise.all([
          fetch("/api/sub-categories"),
          fetch("/api/categories")
        ]);
        
        const subCategoriesData = await subCategoriesRes.json();
        if (subCategoriesData.success) {
          setSubCategories(subCategoriesData.data);
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

  const filteredSubCategories = subCategories.filter(subCat => {
    const matchesSearch = subCat.scat_name?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || subCat.scat_catid === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Sub Categories</h1>
          <p className="text-stone-500 mt-1">Manage product sub-categories</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Add Sub Category
        </Button>
      </div>

      <div className="bg-white border border-stone-200">
        <div className="p-4 border-b border-stone-200">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search sub-categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: "all", label: "All Categories" },
                ...categories.map((c) => ({ value: c.cat_id, label: c.cat_name }))
              ]}
              className="w-40"
            />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Sub Category Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Parent Category</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredSubCategories.map((subCat) => (
              <tr key={subCat.scat_id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm text-stone-500">{subCat.scat_id}</td>
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{subCat.scat_name}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{subCat.category_name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${subCat.scat_status === '1' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {subCat.scat_status === '1' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredSubCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No sub-categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}