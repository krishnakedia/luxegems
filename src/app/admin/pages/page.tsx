"use client";

import * as React from "react";
import { FileText, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CmsPage {
  pg_id: number;
  pg_name: string;
  pg_title: string;
  pg_status: string;
  pg_date: string;
}

export default function PagesPage() {
  const [search, setSearch] = React.useState("");
  const [pages, setPages] = React.useState<CmsPage[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch("/api/pages?all=1");
        const json = await res.json();
        if (json.success && json.data) {
          setPages(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPages();
  }, []);

  const filteredPages = pages.filter(page =>
    page.pg_title?.toLowerCase().includes(search.toLowerCase()) ||
    page.pg_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-stone-500">Loading pages...</div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Pages</h1>
          <p className="text-stone-500 mt-1">Manage website pages</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Create Page
        </Button>
      </div>

      <div className="bg-white border border-stone-200">
        <div className="p-4 border-b border-stone-200">
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Title</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Slug</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Last Updated</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredPages.map((page) => (
              <tr key={page.pg_id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{page.pg_title}</td>
                <td className="px-6 py-4 text-sm text-stone-500">/{page.pg_name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                    page.pg_status === "1" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {page.pg_status === "1" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {page.pg_date ? new Date(page.pg_date).toLocaleDateString("en-IN") : "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <a href={`/${page.pg_name}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </a>
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
