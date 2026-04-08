import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  ArrowRight,
  DollarSign,
  Clock,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Mock data for dashboard
const stats = {
  totalProducts: 56,
  productsGrowth: 12,
  totalOrders: 234,
  ordersGrowth: 8,
  totalCustomers: 128,
  customersGrowth: 15,
  totalRevenue: 456780,
  revenueGrowth: 23,
};

const recentOrders = [
  { id: "ODR001", customer: "Priya Sharma", amount: 2500, status: "Processing", date: "2026-04-08" },
  { id: "ODR002", customer: "Anita Desai", amount: 4500, status: "Shipped", date: "2026-04-08" },
  { id: "ODR003", customer: "Rahul Kumar", amount: 1800, status: "Pending", date: "2026-04-07" },
  { id: "ODR004", customer: "Maria Fernandes", amount: 3200, status: "Delivered", date: "2026-04-07" },
  { id: "ODR005", customer: "John Dsouza", amount: 5600, status: "Processing", date: "2026-04-07" },
];

const lowStockProducts = [
  { id: 1, name: "Gold Necklace Set", stock: 3 },
  { id: 2, name: "Silver Earrings", stock: 2 },
  { id: 3, name: "Pearl Ring", stock: 1 },
  { id: 4, name: "Crystal Bracelet", stock: 4 },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Dashboard</h1>
          <p className="text-stone-500">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-500">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {stats.productsGrowth}%
            </span>
          </div>
          <h3 className="text-3xl font-semibold text-stone-900 mb-1">{stats.totalProducts}</h3>
          <p className="text-sm text-stone-500">Total Products</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {stats.ordersGrowth}%
            </span>
          </div>
          <h3 className="text-3xl font-semibold text-stone-900 mb-1">{stats.totalOrders}</h3>
          <p className="text-sm text-stone-500">Total Orders</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {stats.customersGrowth}%
            </span>
          </div>
          <h3 className="text-3xl font-semibold text-stone-900 mb-1">{stats.totalCustomers}</h3>
          <p className="text-sm text-stone-500">Total Customers</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {stats.revenueGrowth}%
            </span>
          </div>
          <h3 className="text-3xl font-semibold text-stone-900 mb-1">{formatPrice(stats.totalRevenue)}</h3>
          <p className="text-sm text-stone-500">Total Revenue</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-stone-200">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-lg font-medium text-stone-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 text-sm font-medium text-amber-600">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-stone-900">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-stone-900">{formatPrice(order.amount)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white border border-stone-200">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-lg font-medium text-stone-900">Low Stock Alert</h2>
            <span className="flex items-center text-sm text-red-600">
              <Clock className="h-4 w-4 mr-1" />
              {lowStockProducts.length} items
            </span>
          </div>
          <div className="p-6 space-y-4">
            {lowStockProducts.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-500">ID: #{item.id}</p>
                </div>
                <div
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    item.stock <= 2 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.stock} left
                </div>
              </div>
            ))}
            <Link
              href="/admin/products?filter=low-stock"
              className="block text-center py-2 text-sm text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-300 rounded transition-colors"
            >
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/products/new"
          className="flex flex-col items-center justify-center p-6 bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-center"
        >
          <Package className="h-8 w-8 text-amber-600 mb-3" />
          <span className="text-sm font-medium text-stone-900">Add Product</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex flex-col items-center justify-center p-6 bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-center"
        >
          <ShoppingBag className="h-8 w-8 text-amber-600 mb-3" />
          <span className="text-sm font-medium text-stone-900">View Orders</span>
        </Link>
        <Link
          href="/admin/sliders"
          className="flex flex-col items-center justify-center p-6 bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-center"
        >
          <Eye className="h-8 w-8 text-amber-600 mb-3" />
          <span className="text-sm font-medium text-stone-900">Banners</span>
        </Link>
        <Link
          href="/admin/seo"
          className="flex flex-col items-center justify-center p-6 bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all text-center"
        >
          <TrendingUp className="h-8 w-8 text-amber-600 mb-3" />
          <span className="text-sm font-medium text-stone-900">SEO Settings</span>
        </Link>
      </div>
    </div>
  );
}
