"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-stone-200">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2 pl-4 border-l border-stone-200">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-amber-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-stone-900">Admin</p>
              <p className="text-xs text-stone-500">Administrator</p>
            </div>
          </div>

          <Link href="/admin/settings">
            <button className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg ml-2">
              <Settings className="h-5 w-5" />
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}