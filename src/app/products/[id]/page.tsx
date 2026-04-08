"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setProduct(data.data);
          
          const reviewsRes = await fetch(`/api/reviews?productId=${params.id}`);
          const reviewsData = await reviewsRes.json();
          if (reviewsData.success) {
            setReviews(reviewsData.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-stone-500">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-stone-900 mb-4">Product not found</h2>
          <Link href="/products" className="text-amber-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.p_id);

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
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-stone-100 overflow-hidden">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]?.pm_image || "/placeholder.jpg"}
                  alt={product.p_name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400">
                  No Image
                </div>
              )}
              {discount > 0 && (
                <Badge variant="discount" className="absolute top-4 left-4">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={img.pm_id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 border-2 ${
                      selectedImage === index ? "border-amber-500" : "border-transparent"
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
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-light text-stone-900 mb-4">{product.p_name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-amber-600 text-sm uppercase tracking-widest">
                {product.category_name}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 4.5)
                        ? "text-amber-500 fill-current"
                        : "text-stone-300"
                    }`}
                  />
                ))}
                <span className="text-stone-500 text-sm ml-2">
                  {product.rating || 4.5} ({product.review_count || reviews.length || 0} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-medium text-stone-900">
                ₹{discountedPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-stone-500 line-through ml-3">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 ml-2">
                    Save ₹{savings.toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <div className="space-y-3 mb-8 text-sm">
              <p className="flex items-center gap-2">
                <span>SKU:</span>
                <span className="font-medium text-stone-700">{product.p_code}</span>
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-600">In Stock ({product.stock || 10} available)</span>
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-stone-100"
                >
                  -
                </button>
                <span className="px-4 py-3 border-x border-stone-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="px-4 py-3 hover:bg-stone-100"
                >
                  +
                </button>
              </div>
              <Button
                variant="gold"
                size="lg"
                className="flex-1"
                onClick={() => {
                  addToCart(product, quantity);
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2000);
                }}
              >
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => isWishlisted ? removeFromWishlist(product.p_id) : addToWishlist(product)}
                className={isWishlisted ? "text-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-stone-50">
                <Truck className="h-6 w-6 mx-auto text-amber-600 mb-2" />
                <span className="text-xs text-stone-600">Free Shipping</span>
              </div>
              <div className="text-center p-4 bg-stone-50">
                <Shield className="h-6 w-6 mx-auto text-amber-600 mb-2" />
                <span className="text-xs text-stone-600">Secure Payment</span>
              </div>
              <div className="text-center p-4 bg-stone-50">
                <RefreshCw className="h-6 w-6 mx-auto text-amber-600 mb-2" />
                <span className="text-xs text-stone-600">Easy Returns</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-stone-900 mb-4">Description</h3>
              <div
                className="prose prose-stone max-w-none text-stone-600"
                dangerouslySetInnerHTML={{ __html: product.p_description || "" }}
              />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light text-stone-900 mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.re_id} className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-700 font-medium">
                        {review.re_name?.charAt(0) || "C"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{review.re_name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < 4 ? "text-amber-500 fill-current" : "text-stone-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-stone-500 ml-2">{review.re_date}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-stone-900 mb-2">{review.re_title}</h4>
                  <p className="text-stone-600">{review.re_desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
