"use client";

import { useState } from "react";
import { Save, Plus, Globe, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

const seoPages = [
  { id: 1, page: "Home Page", route: "/", title: "LUXEGEMS - Premium Jewelry | Gold, Silver & Artificial Jewellery", description: "Discover exquisite jewelry at LUXEGEMS. Shop premium necklaces, earrings, rings, bracelets & more." },
  { id: 2, page: "Products", route: "/products", title: "Shop Jewelry Online | Best Collection | LUXEGEMS", description: "Browse our collection of premium jewelry. Find necklaces, earrings, rings, bracelets and more." },
  { id: 3, page: "About Us", route: "/about", title: "About Us | LUXEGEMS - Our Story", description: "Learn about LUXEGEMS and our commitment to quality jewelry craftsmanship." },
  { id: 4, page: "Contact", route: "/contact", title: "Contact Us | LUXEGEMS", description: "Get in touch with LUXEGEMS. We're here to help with your jewelry needs." },
];

export default function AdminSEOPage() {
  const [selectedPage, setSelectedPage] = useState(seoPages[0]);
  const [formData, setFormData] = useState({
    title: selectedPage.title,
    description: selectedPage.description,
    keywords: "jewelry, jewellery, gold, silver, artificial",
    canonicalUrl: `https://luxegems.in${selectedPage.route}`,
    ogTitle: selectedPage.title,
    ogDescription: selectedPage.description,
  });

  const handlePageSelect = (page: typeof seoPages[0]) => {
    setSelectedPage(page);
    setFormData({
      title: page.title,
      description: page.description,
      keywords: "jewelry, jewellery, gold, silver, artificial",
      canonicalUrl: `https://luxegems.in${page.route}`,
      ogTitle: page.title,
      ogDescription: page.description,
    });
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">SEO Settings</h1>
          <p className="text-stone-500">Optimize your store for search engines</p>
        </div>
        <Button variant="gold" className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* SEO Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Overall Score</p>
              <p className="text-2xl font-semibold text-green-600">85/100</p>
            </div>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }} />
          </div>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Search className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Keywords</p>
              <p className="text-2xl font-semibold text-amber-600">12</p>
            </div>
          </div>
          <p className="text-xs text-stone-500">Add more keywords for better visibility</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Social Shares</p>
              <p className="text-2xl font-semibold text-blue-600">234</p>
            </div>
          </div>
          <p className="text-xs text-stone-500">Track your content performance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Page Selection */}
        <div className="bg-white border border-stone-200 p-4">
          <h2 className="text-lg font-medium text-stone-900 mb-4">Select Page</h2>
          <div className="space-y-2">
            {seoPages.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageSelect(page)}
                className={`w-full text-left p-3 rounded transition-colors ${
                  selectedPage.id === page.id
                    ? "bg-amber-50 border border-amber-200"
                    : "hover:bg-stone-50"
                }`}
              >
                <p className="font-medium text-stone-900">{page.page}</p>
                <p className="text-xs text-stone-500">{page.route}</p>
              </button>
            ))}
          </div>
        </div>

        {/* SEO Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic SEO */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Basic SEO</h2>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                placeholder="Enter SEO title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Meta Description
                </label>
                <textarea
                  className="flex min-h-[100px] w-full border-2 border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none transition-colors resize-none"
                  placeholder="Enter SEO description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <p className="mt-1 text-xs text-stone-500">
                  {formData.description.length}/160 characters recommended
                </p>
              </div>
              <Input
                label="Keywords"
                placeholder="jewelry, necklace, gold, silver, earrings"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              />
              <Input
                label="Canonical URL"
                placeholder="https://example.com/page"
                value={formData.canonicalUrl}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Social SEO */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Social Media (Open Graph)</h2>
            <div className="space-y-4">
              <Input
                label="OG Title"
                placeholder="Title for social sharing"
                value={formData.ogTitle}
                onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  OG Description
                </label>
                <textarea
                  className="flex min-h-[100px] w-full border-2 border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none transition-colors resize-none"
                  placeholder="Description for social sharing..."
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  OG Image
                </label>
                <div className="border-2 border-dashed border-stone-300 p-8 text-center">
                  <p className="text-sm text-stone-500">Upload OG Image (1200x630 recommended)</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white p-6 border border-stone-200">
            <h2 className="text-lg font-medium text-stone-900 mb-6">Search Preview</h2>
            <div className="border border-stone-200 p-4 rounded">
              <p className="text-lg text-blue-800 hover:underline mb-1 truncate">
                {formData.title || "Page Title"}
              </p>
              <p className="text-sm text-green-700 mb-1 truncate">
                https://luxegems.in{selectedPage.route}
              </p>
              <p className="text-sm text-stone-600 line-clamp-2">
                {formData.description || "Page description will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
