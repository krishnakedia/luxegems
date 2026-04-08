"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

// Mock product data
const mockProduct: Product = {
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
  p_description: `<p>Experience timeless elegance with our exquisite Gold-Plated Necklace Set. This stunning piece is crafted with meticulous attention to detail, featuring intricate patterns that reflect traditional artistry.</p>
  <p><strong>Features:</strong></p>
  <ul>
    <li>Premium quality gold plating that lasts</li>
    <li>Intricate floral and geometric patterns</li>
    <li>Comes with matching earrings</li>
    <li>Adjustable chain length</li>
    <li>Secure lobster clasp closure</li>
  </ul>
  <p><strong>Occasions:</strong> Perfect for weddings, festivals, celebrations, and special occasions.</p>`,
  p_date: "2026-02-05",
  p_status: 1,
  category_name: "Necklaces",
  stock: 15,
  rating: 4.5,
  review_count: 23,
  images: [
    { pm_id: 1, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800", pm_status: "1" },
    { pm_id: 2, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800", pm_status: "1" },
    { pm_id: 3, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800", pm_status: "1" },
    { pm_id: 4, pm_pid: "1", pm_image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800", pm_status: "1" },
  ],
};

const reviews = [
  {
    id: 1,
    name: "Priya S.",
    date: "2026-03-15",
    rating: 5,
    title: "Absolutely Beautiful!",
    content: "This necklace exceeded my expectations. The quality is amazing and it looks even better in person. Perfect for my sister's wedding.",
  },
  {
    id: 2,
    name: "Anita M.",
    date: "2026-03-10",
    rating: 4,
    title: "Great Value for Money",
    content: "Beautiful design and good quality. The gold plating is holding up well after multiple uses.",
  },
];

export default function ProductDetailPage() {
  const [product] = useState<Product>(mockProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const originalPrice = parseFloat(product.p_price);
  const discount = parseFloat(product.p_discount);
  const discountedPrice = discount > 0 ? originalPrice - (originalPrice * discount) / 100 : originalPrice;
  const savings = originalPrice - discountedPrice;

  const images = product.images || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-stone-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-amber-700">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-amber-700">Products</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category_name?.toLowerCase()}`} className="hover:text-amber-700">
              {product.category_name}
            </Link>
            <span>/</span>
            <span className="text-stone-900">{product.p_name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-stone-50 overflow-hidden border border-stone-200">
              <Image
                src={images[selectedImage]?.pm_image || "/placeholder.jpg"}
                alt={product.p_name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge variant="discount" className="absolute top-4 left-4">
                  {Math.round(discount)}% OFF
                </Badge>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={img.pm_id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 border-2 overflow-hidden transition-colors ${
                    selectedImage === index ? "border-amber-600" : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <Image
                    src={img.pm_image}
                    alt={`${product.p_name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-amber-600 uppercase tracking-wider mb-2">
                {product.category_name}
              </p>
              <h1 className="text-3xl font-light text-stone-900 mb-4">
                {product.p_name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-amber-500 fill-current"
                          : "text-stone-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-stone-600 ml-2">
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-semibold text-stone-900">
                  {formatPrice(discountedPrice)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-xl text-stone-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                    <Badge variant="success">Save {formatPrice(savings)}</Badge>
                  </>
                )}
              </div>

              {/* SKU */}
              <p className="text-sm text-stone-500">
                SKU: <span className="font-medium text-stone-700">{product.p_code}</span>
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-stone-300 py-2 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" className="flex-1 sm:flex-none">
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "text-rose-500 border-rose-300" : ""}
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-stone-200">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-stone-900">Free Shipping</p>
                  <p className="text-xs text-stone-500">Orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-stone-900">Secure Payment</p>
                  <p className="text-xs text-stone-500">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-stone-900">Easy Returns</p>
                  <p className="text-xs text-stone-500">30 day policy</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-medium text-stone-900 mb-4">Description</h2>
              <div
                className="prose prose-stone max-w-none text-stone-600"
                dangerouslySetInnerHTML={{ __html: product.p_description }}
              />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-16 border-t border-stone-200">
          <h2 className="text-2xl font-light text-stone-900 mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-stone-100 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-amber-700">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{review.name}</p>
                      <p className="text-xs text-stone-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-amber-500 fill-current" : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-medium text-stone-900 mb-2">{review.title}</h3>
                <p className="text-stone-600">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
