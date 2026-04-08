"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "horizontal" | "compact" | "featured";
  className?: string;
}

export function ProductCard({
  product,
  variant = "default",
  className,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    setIsWishlisted(isInWishlist(product.p_id));
  }, [isInWishlist, product.p_id]);

  const originalPrice = parseFloat(product.p_price);
  const discount = parseFloat(product.p_discount);
  const discountedPrice = discount > 0 ? originalPrice - (originalPrice * discount) / 100 : originalPrice;

  const mainImage = product.images?.[0]?.pm_image || "/placeholder.jpg";
  const hoverImage = product.images?.[1]?.pm_image || mainImage;

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "group flex gap-6 bg-white border border-stone-200 p-4 transition-all duration-300 hover:border-amber-200 hover:shadow-lg",
          className
        )}
      >
        <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden bg-stone-50">
          <Image
            src={mainImage}
            alt={product.p_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge variant="discount" className="absolute top-3 left-3">
              {Math.round(discount)}% OFF
            </Badge>
          )}
        </div>
        <div className="flex flex-col justify-center flex-1">
          <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">
            {product.category_name || "Jewelry"}
          </p>
          <h3 className="text-lg font-medium text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
            {product.p_name}
          </h3>
          <p className="text-sm text-stone-500 mb-3 line-clamp-2">
            {product.p_description?.substring(0, 100) || "Premium quality jewelry"}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-stone-900">
              {formatPrice(discountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Button variant="default" size="sm" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/products/${product.p_id}`}
        className={cn(
          "block bg-white border border-stone-200 p-3 transition-all duration-300 hover:border-amber-200",
          className
        )}
      >
        <div className="relative aspect-square overflow-hidden bg-stone-50 mb-3">
          <Image
            src={mainImage}
            alt={product.p_name}
            fill
            className="object-cover transition-transform duration-300"
          />
        </div>
        <h3 className="text-sm font-medium text-stone-900 truncate">
          {product.p_name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-stone-900">
            {formatPrice(discountedPrice)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/products/${product.p_id}`}
        className={cn(
          "block relative overflow-hidden bg-stone-900 text-white group",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={mainImage}
            alt={product.p_name}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered && "scale-110 opacity-70"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-60"
            )}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <Sparkles className="h-5 w-5 text-amber-400 mb-2" />
              <p className="text-xs text-amber-400 uppercase tracking-widest mb-2">
                Featured
              </p>
              <h3 className="text-2xl font-light text-white mb-2">
                {product.p_name}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-xl font-light text-white">
                  {formatPrice(discountedPrice)}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="gold"
              size="icon"
              className={cn(
                "opacity-0 translate-y-4 transition-all duration-300",
                isHovered && "opacity-100 translate-y-0"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "group bg-white border border-stone-200 overflow-hidden transition-all duration-500 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50",
        className
      )}
    >
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden bg-stone-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={mainImage}
          alt={product.p_name}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isHovered && hoverImage !== mainImage && "opacity-0",
            isHovered && "scale-105"
          )}
        />
        {hoverImage !== mainImage && (
          <Image
            src={hoverImage}
            alt={product.p_name}
            fill
            className={cn(
              "object-cover transition-all duration-500 absolute inset-0",
              !isHovered && "opacity-0"
            )}
          />
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <Badge variant="discount">{Math.round(discount)}% OFF</Badge>
          )}
          {product.p_status === 1 && (
            <Badge variant="new">New</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (isWishlisted) {
              removeFromWishlist(product.p_id);
            } else {
              addToWishlist(product);
            }
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            "absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm transition-all duration-300",
            isWishlisted && "text-rose-500",
            !isHovered && "opacity-0 translate-x-2",
            isHovered && "opacity-100 translate-x-0"
          )}
        >
          <Heart
            className={cn("h-5 w-5", isWishlisted && "fill-current")}
          />
        </button>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
            !isHovered && "opacity-0 translate-y-4",
            isHovered && "opacity-100 translate-y-0"
          )}
        >
          <Button
            variant="default"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/90 backdrop-blur-sm border-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">
          {product.category_name || "Jewelry"}
        </p>
        <Link href={`/products/${product.p_id}`}>
          <h3 className="text-base font-medium text-stone-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
            {product.p_name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-stone-900">
            {formatPrice(discountedPrice)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
