"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  Image,
  FileText,
  MessageSquare,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Globe,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const adminNav = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    children: [
      { title: "All Products", href: "/admin/products" },
      { title: "Add Product", href: "/admin/products/new" },
      { title: "Categories", href: "/admin/categories" },
      { title: "Sub Categories", href: "/admin/sub-categories" },
    ],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    children: [
      { title: "All Orders", href: "/admin/orders" },
      { title: "Pending Orders", href: "/admin/orders?status=pending" },
      { title: "Completed Orders", href: "/admin/orders?status=completed" },
    ],
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Coupons & Offers",
    href: "/admin/coupons",
    icon: Tag,
  },
  {
    title: "Sliders & Banners",
    href: "/admin/sliders",
    icon: Image,
  },
  {
    title: "SEO Settings",
    href: "/admin/seo",
    icon: Globe,
  },
  {
    title: "Pages",
    href: "/admin/pages",
    icon: FileText,
    children: [
      { title: "About Us", href: "/admin/pages/about" },
      { title: "Privacy Policy", href: "/admin/pages/privacy" },
      { title: "Terms", href: "/admin/pages/terms" },
      { title: "Contact", href: "/admin/pages/contact" },
    ],
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-stone-900 text-white"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-stone-900 text-white transition-all duration-300",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-stone-800">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-xl font-light tracking-wider">LUXE</span>
              <span className="text-xl font-extralight text-amber-500">GEMS</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-stone-800 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {adminNav.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.title ? null : item.title)
                    }
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2.5 text-sm transition-colors",
                      pathname.startsWith(item.href)
                        ? "bg-amber-600 text-white"
                        : "text-stone-400 hover:bg-stone-800 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded === item.title && "rotate-90"
                        )}
                      />
                    )}
                  </button>
                  {!collapsed && expanded === item.title && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block px-3 py-2 text-sm rounded transition-colors",
                            pathname === child.href
                              ? "text-amber-500"
                              : "text-stone-400 hover:text-white"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors",
                    pathname === item.href
                      ? "bg-amber-600 text-white"
                      : "text-stone-400 hover:bg-stone-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-400 hover:bg-stone-800 hover:text-white rounded transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
