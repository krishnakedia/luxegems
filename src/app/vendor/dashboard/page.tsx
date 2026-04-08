import type { Metadata } from "next";
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Vendor Dashboard | LUXEGEMS",
  robots: { index: false, follow: false },
};

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-stone-900">Vendor Dashboard</h1>
            <p className="text-sm text-stone-500">Manage your products and orders</p>
          </div>
          <Button variant="gold" asChild>
            <Link href="/vendor/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-stone-200 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+12%</span>
            </div>
            <h3 className="text-2xl font-semibold text-stone-900">24</h3>
            <p className="text-sm text-stone-500">Total Products</p>
          </div>

          <div className="bg-white border border-stone-200 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+8%</span>
            </div>
            <h3 className="text-2xl font-semibold text-stone-900">15</h3>
            <p className="text-sm text-stone-500">Total Orders</p>
          </div>

          <div className="bg-white border border-stone-200 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+23%</span>
            </div>
            <h3 className="text-2xl font-semibold text-stone-900">₹45,680</h3>
            <p className="text-sm text-stone-500">Total Revenue</p>
          </div>

          <div className="bg-white border border-stone-200 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+15%</span>
            </div>
            <h3 className="text-2xl font-semibold text-stone-900">₹1,903</h3>
            <p className="text-sm text-stone-500">Avg. Order Value</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 rounded-lg">
            <div className="px-6 py-4 border-b border-stone-200">
              <h2 className="text-lg font-medium text-stone-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { id: "ODR001", product: "Gold Necklace Set", amount: "₹12,500", status: "Pending" },
                  { id: "ODR002", product: "Diamond Earrings", amount: "₹8,200", status: "Shipped" },
                  { id: "ODR003", product: "Silver Bracelet", amount: "₹3,500", status: "Delivered" },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                    <div>
                      <p className="font-medium text-stone-900">{order.id}</p>
                      <p className="text-sm text-stone-500">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-stone-900">{order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Orders
              </Button>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg">
            <div className="px-6 py-4 border-b border-stone-200">
              <h2 className="text-lg font-medium text-stone-900">Top Products</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Gold Necklace Set", sales: 12, revenue: "₹1,50,000" },
                  { name: "Diamond Earrings", sales: 8, revenue: "₹65,600" },
                  { name: "Pearl Ring", sales: 6, revenue: "₹24,000" },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-stone-900">{product.name}</p>
                        <p className="text-sm text-stone-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <span className="font-medium text-stone-900">{product.revenue}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}