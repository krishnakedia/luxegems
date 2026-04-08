"use client";

import * as React from "react";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CouponsPage() {
  const [search, setSearch] = React.useState("");
  const [coupons, setCoupons] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCoupons() {
      try {
        const res = await fetch("/api/coupons");
        const data = await res.json();
        if (data.success) {
          setCoupons(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoupons();
  }, []);

  const filteredCoupons = coupons.filter(coupon =>
    coupon.cc_code?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-stone-900">{coupons.length}</p>
              <p className="text-sm text-stone-500">Total Coupons</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Tag className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900">
                {coupons.filter(c => c.cc_status === "1").length}
              </p>
              <p className="text-sm text-stone-500">Active</p>
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
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Code</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Discount</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Max Amount</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Valid From</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Valid Until</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredCoupons.map((coupon) => (
              <tr key={coupon.cc_id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{coupon.cc_code}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{coupon.cc_amount}%</td>
                <td className="px-6 py-4 text-sm text-stone-600">₹{coupon.cc_maxamount}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{coupon.cc_fdate}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{coupon.cc_tdate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${coupon.cc_status === "1" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {coupon.cc_status === "1" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCoupons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No coupons found</p>
          </div>
        )}
      </div>
    </div>
  );
}