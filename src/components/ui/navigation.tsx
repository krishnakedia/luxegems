"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const staticCategories = [
  { name: "Necklaces", href: "/products?category=necklaces" },
  { name: "Earrings", href: "/products?category=earrings" },
  { name: "Rings", href: "/products?category=rings" },
  { name: "Bracelets", href: "/products?category=bracelets" },
  { name: "Baptismal", href: "/products?category=baptismal" },
  { name: "Altar Sets", href: "/products?category=altar-sets" },
  { name: "Communion", href: "/products?category=communion" },
  { name: "Censors", href: "/products?category=censors" },
];

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/products",
  },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Wedding Collection", href: "/collections/wedding" },
      { label: "Daily Wear", href: "/collections/daily-wear" },
      { label: "Festive Collection", href: "/collections/festive" },
      { label: "Religious Collection", href: "/collections/religious" },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "FAQs",
    href: "/faqs",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [categories, setCategories] = React.useState(staticCategories);
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = getCartCount();
  const wishlistCount = wishlistItems.length;

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          const cats = data.data.slice(0, 8).map((c: any) => ({
            name: c.cat_name,
            href: `/products?category=${c.cat_name.toLowerCase()}`
          }));
          setCategories(cats);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const shopNavItem: NavItem = {
    label: "Shop",
    href: "/products",
    children: categories.map((cat) => ({ label: cat.name, href: cat.href })),
  };

  const updatedNavItems = navItems.map(item => 
    item.label === "Shop" ? shopNavItem : item
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <span className="text-2xl font-light tracking-widest text-stone-900">
                LUXE
              </span>
              <span className="text-2xl font-extralight tracking-widest text-amber-600">
                GEMS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {updatedNavItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium tracking-wide text-stone-700 hover:text-amber-700 transition-colors",
                    pathname === item.href && "text-amber-700"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-4 w-56">
                    <div className="bg-white border border-stone-200 shadow-xl py-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm text-stone-700 hover:text-amber-700 hover:bg-stone-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-stone-700 hover:text-amber-700 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              className="p-2.5 text-stone-700 hover:text-amber-700 transition-colors relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge variant="gold" className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
            <Link
              href="/cart"
              className="p-2.5 text-stone-700 hover:text-amber-700 transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge variant="gold" className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>
            {/* <Link
              href="/account"
              className="p-2.5 text-stone-700 hover:text-amber-700 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link> */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-stone-700"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-stone-200 py-6">
            <nav className="flex flex-col gap-2">
              {updatedNavItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-3 text-base font-medium text-stone-700 hover:text-amber-700",
                      pathname === item.href && "text-amber-700"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm text-stone-500 hover:text-amber-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
