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

export default function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const resolvedParams = React.use(params);
  const collection = collections[resolvedParams.collection as keyof typeof collections] || collections.wedding;
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("featured");

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?limit=50");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.p_price) - parseFloat(b.p_price);
      case "price-high":
        return parseFloat(b.p_price) - parseFloat(a.p_price);
      case "newest":
        return new Date(b.p_date).getTime() - new Date(a.p_date).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80 bg-stone-900">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-light mb-4">{collection.title}</h1>
            <p className="text-stone-300 max-w-xl mx-auto">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-stone-500">
            {loading ? "Loading..." : `${sortedProducts.length} products found`}
          </p>

          <div className="flex items-center gap-4">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: "featured", label: "Featured" },
                { value: "newest", label: "Newest First" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-500">Loading products...</p>
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.p_id} product={product} variant={viewMode === "list" ? "horizontal" : "default"} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500">No products found in this collection.</p>
            <Link href="/products" className="text-amber-600 hover:underline mt-4 inline-block">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}