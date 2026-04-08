"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Filter, Grid3X3, Grid2X2, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { Select } from "@/components/ui/input";
import type { Product } from "@/types";

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
    p_description: "Exquisite gold-plated necklace set perfect for weddings and special occasions",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Necklaces",
    images: [{ pm_id: 1, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" }],
  },
  {
    p_id: 2,
    p_slid: "Admin",
    p_catid: "82",
    p_scatid: "",
    p_scname: "",
    p_name: "Pearl Necklace with Gold Clasp",
    p_code: "SH-1002",
    p_price: "2500",
    p_discount: "15",
    p_weight: 0,
    p_description: "Beautiful pearl necklace with elegant gold clasp",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Necklaces",
    images: [{ pm_id: 2, pm_pid: "2", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" }],
  },
  {
    p_id: 3,
    p_slid: "Admin",
    p_catid: "82",
    p_scatid: "",
    p_scname: "",
    p_name: "Kundan Necklace Set",
    p_code: "SH-1003",
    p_price: "4500",
    p_discount: "20",
    p_weight: 0,
    p_description: "Traditional Kundan necklace set with intricate work",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Necklaces",
    images: [{ pm_id: 3, pm_pid: "3", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" }],
  },
  {
    p_id: 4,
    p_slid: "Admin",
    p_catid: "82",
    p_scatid: "",
    p_scname: "",
    p_name: "Temple Jewelry Set",
    p_code: "SH-1004",
    p_price: "6500",
    p_discount: "10",
    p_weight: 0,
    p_description: "Beautiful temple jewelry set for traditional occasions",
    p_date: "2026-02-06",
    p_status: 1,
    category_name: "Necklaces",
    images: [{ pm_id: 4, pm_pid: "4", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" }],
  },
];

const collections = {
  wedding: {
    title: "Wedding Collection",
    description: "Exquisite jewelry for your special day",
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
  },
  "daily-wear": {
    title: "Daily Wear Collection",
    description: "Elegant pieces for everyday sophistication",
    heroImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200",
  },
  festive: {
    title: "Festive Collection",
    description: "Stunning jewelry for celebrations",
    heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200",
  },
  religious: {
    title: "Religious Collection",
    description: "Sacred jewelry for spiritual moments",
    heroImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200",
  },
};

export default function CollectionPage({ params }: { params: { collection: string } }) {
  const collection = collections[params.collection as keyof typeof collections] || collections.wedding;
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("featured");

  const sortedProducts = [...mockProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.p_price) - parseFloat(b.p_price);
      case "price-high":
        return parseFloat(b.p_price) - parseFloat(a.p_price);
      case "newest":
        return new Date(b.p_date).getTime() - new Date(a.p_date).getTime();
      case "name":
        return a.p_name.localeCompare(b.p_name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-80 bg-stone-900">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-light mb-2">{collection.title}</h1>
            <p className="text-stone-300">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-stone-200">
          <p className="text-stone-500">{sortedProducts.length} products</p>

          <div className="flex items-center gap-4">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: "featured", label: "Featured" },
                { value: "newest", label: "Newest First" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "name", label: "Name: A-Z" },
              ]}
              className="w-48"
            />

            <div className="flex items-center border border-stone-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 ${viewMode === "grid" ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 ${viewMode === "list" ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 mb-4">No products found in this collection.</p>
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.p_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.p_id} product={product} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
