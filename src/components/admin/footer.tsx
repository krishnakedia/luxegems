"use client";

import * as React from "react";

export function AdminFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white py-4 px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} LUXEGEMS Admin Panel. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}