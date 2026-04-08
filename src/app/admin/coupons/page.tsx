"use client";

import * as React from "react";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockCoupons = [
  { id: 1, code: "LUXE10", discount: "10%", maxAmount: 500, minOrder: 1000, used: 45, validUntil: "2026-04-30", status: "active" },
  { id: 2, code: "WEDDING20", discount: "20%", maxAmount: 2000, minOrder: 5000, used: 12, validUntil: "2026-05-31", status: "active" },
  { id: 3, code: "FESTIVE15", discount: "15%", maxAmount: 1000, minOrder: 2500, used: 28, validUntil: "2026-04-15", status: "expired" },
  { id: 4, code: "NEWUSER", discount: "25%", maxAmount: 750, minOrder: 0, used: 156, validUntil: "2026-06-30", status: "active" },
];

export default function CouponsPage() {
  const [search, setSearch] = React.useState("");

  const filteredCoupons = mockCoupons.filter(coupon =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Coupons & Offers</h1>
          <p className="text-stone-500 mt-1">Manage promotional coupons</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-full">
              <Tag className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Active Coupons</p>
              <p className="text-2xl font-semibold text-stone-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Tag className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Total Uses</p>
              <p className="text-2xl font-semibold text-stone-900">241</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Total Savings</p>
              <p className="text-2xl font-semibold text-stone-900">₹45,200</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200">
        <div className="p-4 border-b border-stone-200">
          <Input
            placeholder="Search coupons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Coupon Code</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Discount</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Min Order</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Max Amount</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Used</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Valid Until</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-stone-50">
                <td className="px-6 py-4">
                  <span className="font-medium text-stone-900">{coupon.code}</span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{coupon.discount}</td>
                <td className="px-6 py-4 text-sm text-stone-500">₹{coupon.minOrder}</td>
                <td className="px-6 py-4 text-sm text-stone-500">₹{coupon.maxAmount}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{coupon.used}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{coupon.validUntil}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                    coupon.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {coupon.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
