"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Filter, Grid3X3, Grid2X2, List, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { Select, Input } from "@/components/ui/input";
import type { Product, Category } from "@/types";

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
    p_description: "Exquisite gold-plated necklace set perfect for weddings and special occasions",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Necklaces",
    images: [{ pm_id: 1, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600", pm_status: "1" }],
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
    p_description: "Handcrafted silver altar set for religious ceremonies",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Altar Sets",
    images: [{ pm_id: 2, pm_pid: "2", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600", pm_status: "1" }],
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
    p_description: "Premium brass censor with decorative chain",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Censors",
    images: [{ pm_id: 3, pm_pid: "3", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600", pm_status: "1" }],
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
    p_description: "Beautiful crystal candlesticks for home decor",
    p_date: "2026-02-06",
    p_status: 1,
    category_name: "Candlesticks",
    images: [{ pm_id: 4, pm_pid: "4", pm_image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600", pm_status: "1" }],
  },
  {
    p_id: 5,
    p_slid: "Admin",
    p_catid: "84",
    p_scatid: "",
    p_scname: "",
    p_name: "First Communion Set",
    p_code: "22180",
    p_price: "9000",
    p_discount: "5",
    p_weight: 0,
    p_description: "Beautiful communion set for your special day",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Communion",
    images: [{ pm_id: 5, pm_pid: "5", pm_image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600", pm_status: "1" }],
  },
  {
    p_id: 6,
    p_slid: "Admin",
    p_catid: "82",
    p_scatid: "",
    p_scname: "",
    p_name: "Baptismal Shells - Premium",
    p_code: "22203",
    p_price: "2000",
    p_discount: "2",
    p_weight: 0,
    p_description: "Elegant baptismal shells for sacred ceremonies",
    p_date: "2026-02-07",
    p_status: 1,
    category_name: "Baptismal",
    images: [{ pm_id: 6, pm_pid: "6", pm_image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600", pm_status: "1" }],
  },
  {
    p_id: 7,
    p_slid: "Admin",
    p_catid: "83",
    p_scatid: "",
    p_scname: "",
    p_name: "Designer Altar Table",
    p_code: "AS-1002",
    p_price: "8596",
    p_discount: "6",
    p_weight: 0,
    p_description: "Designer altar table with intricate carvings",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Altar Sets",
    images: [{ pm_id: 7, pm_pid: "7", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600", pm_status: "1" }],
  },
  {
    p_id: 8,
    p_slid: "Admin",
    p_catid: "85",
    p_scatid: "",
    p_scname: "",
    p_name: "Antique Brass Censor",
    p_code: "CE-1001",
    p_price: "6500",
    p_discount: "8",
    p_weight: 0,
    p_description: "Antique style brass censor with premium finish",
    p_date: "2026-02-05",
    p_status: 1,
    category_name: "Censors",
    images: [{ pm_id: 8, pm_pid: "8", pm_image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600", pm_status: "1" }],
  },
];

const categories = [
  { id: 1, name: "Necklaces", count: 24 },
  { id: 2, name: "Earrings", count: 18 },
  { id: 3, name: "Rings", count: 12 },
  { id: 4, name: "Bracelets", count: 15 },
  { id: 5, name: "Baptismal", count: 8 },
  { id: 6, name: "Altar Sets", count: 10 },
  { id: 7, name: "Communion", count: 6 },
  { id: 8, name: "Censors", count: 9 },
];

const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 - ₹2,500", min: 1000, max: 2500 },
  { label: "₹2,500 - ₹5,000", min: 2500, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: 999999 },
];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<{ label: string; min: number; max: number } | null>(null);
  const [inStock, setInStock] = useState(false);

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.p_price);
    if (selectedCategory && product.category_name?.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (priceRange && (price < priceRange.min || price > priceRange.max)) {
      return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
      {/* Header */}
      <div className="bg-stone-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light text-stone-900 mb-2">Our Collection</h1>
          <p className="text-stone-500">
            Discover {filteredProducts.length} beautiful pieces
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-stone-200">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            {/* Active Filters */}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-2 px-3 py-1">
                {selectedCategory}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                />
              </Badge>
            )}
            {priceRange && (
              <Badge variant="secondary" className="gap-2 px-3 py-1">
                {priceRange.label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setPriceRange(null)}
                />
              </Badge>
            )}
          </div>

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

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.name.toLowerCase()}
                          onChange={(e) =>
                            setSelectedCategory(
                              e.target.checked ? cat.name.toLowerCase() : null
                            )
                          }
                          className="w-4 h-4 border-stone-300 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-sm text-stone-600 group-hover:text-stone-900">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={
                          priceRange?.min === range.min &&
                          priceRange?.max === range.max
                        }
                        onChange={() =>
                          setPriceRange({ label: range.label, min: range.min, max: range.max })
                        }
                        className="w-4 h-4 border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-stone-600 group-hover:text-stone-900">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Availability</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-stone-600 group-hover:text-stone-900">
                    In Stock Only
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-stone-500 mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange(null);
                    setInStock(false);
                  }}
                >
                  Clear Filters
                </Button>
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
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
