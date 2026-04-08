"use client";

import * as React from "react";
import { FileText, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockPages = [
  { id: 1, title: "About Us", slug: "about", status: "published", lastUpdated: "2026-04-01" },
  { id: 2, title: "Contact Us", slug: "contact", status: "published", lastUpdated: "2026-04-01" },
  { id: 3, title: "Privacy Policy", slug: "privacy-policy", status: "published", lastUpdated: "2026-04-08" },
  { id: 4, title: "Terms & Conditions", slug: "terms-conditions", status: "published", lastUpdated: "2026-04-08" },
  { id: 5, title: "Refund Policy", slug: "refund-policy", status: "published", lastUpdated: "2026-04-08" },
  { id: 6, title: "Shipping Policy", slug: "shipping", status: "published", lastUpdated: "2026-04-08" },
  { id: 7, title: "FAQs", slug: "faqs", status: "published", lastUpdated: "2026-04-05" },
  { id: 8, title: "Blog", slug: "blog", status: "draft", lastUpdated: "2026-04-03" },
];

export default function PagesPage() {
  const [search, setSearch] = React.useState("");

  const filteredPages = mockPages.filter(page =>
    page.title.toLowerCase().includes(search.toLowerCase())
  );

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
              <tr key={page.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{page.title}</td>
                <td className="px-6 py-4 text-sm text-stone-500">/{page.slug}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                    page.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{page.lastUpdated}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <a href={`/${page.slug}`} target="_blank">
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
