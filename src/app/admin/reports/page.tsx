"use client";

import * as React from "react";
import { BarChart3, TrendingUp, TrendingDown, Package, Users, DollarSign } from "lucide-react";
import { Select } from "@/components/ui/input";

export default function ReportsPage() {
  const [period, setPeriod] = React.useState("month");

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Reports</h1>
          <p className="text-stone-500 mt-1">Analytics and insights</p>
        </div>
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          options={[
            { value: "today", label: "Today" },
            { value: "week", label: "This Week" },
            { value: "month", label: "This Month" },
            { value: "year", label: "This Year" },
          ]}
          className="w-40"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-stone-900 mt-1">₹2,45,000</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>12% from last month</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Total Orders</p>
              <p className="text-2xl font-semibold text-stone-900 mt-1">156</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>8% from last month</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Customers</p>
              <p className="text-2xl font-semibold text-stone-900 mt-1">89</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>15% from last month</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">Avg Order Value</p>
              <p className="text-2xl font-semibold text-stone-900 mt-1">₹1,571</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-full">
              <BarChart3 className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
            <TrendingDown className="h-4 w-4" />
            <span>3% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 p-6">
          <h2 className="text-lg font-medium text-stone-900 mb-4">Sales Overview</h2>
          <div className="h-64 flex items-center justify-center bg-stone-50">
            <p className="text-stone-500">Sales chart will appear here</p>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6">
          <h2 className="text-lg font-medium text-stone-900 mb-4">Top Products</h2>
          <div className="h-64 flex items-center justify-center bg-stone-50">
            <p className="text-stone-500">Top products chart will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
