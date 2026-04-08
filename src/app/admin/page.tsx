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
import { query } from "@/lib/db";

async function getDashboardStats() {
  try {
    const [products, orders, customers] = await Promise.all([
      query<any[]>("SELECT COUNT(*) as count FROM product WHERE p_status = 1"),
      query<any[]>("SELECT COUNT(*) as count FROM `order`"),
      query<any[]>("SELECT COUNT(*) as count FROM new_user WHERE nu_status = 1"),
    ]);

    const totalProducts = (products[0] as any)?.count || 0;
    const totalOrders = (orders[0] as any)?.count || 0;
    const totalCustomers = (customers[0] as any)?.count || 0;

    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: totalOrders * 2500,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: 0,
    };
  }
}

async function getRecentOrders() {
  try {
    const orders = await query<any[]>(`
      SELECT o.*, s.spp_name, s.spp_number
      FROM \`order\` o
      LEFT JOIN shipping_details s ON o.order_shipid = s.spp_id
      ORDER BY o.order_id DESC
      LIMIT 5
    `);
    return orders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
}

async function getLowStockProducts() {
  try {
    const products = await query<any[]>(`
      SELECT p.p_id, p.p_name, COALESCE(SUM(s.qty), 0) as stock
      FROM product p
      LEFT JOIN stock s ON p.p_id = s.p_id
      WHERE p.p_status = 1
      GROUP BY p.p_id
      HAVING stock < 5
      ORDER BY stock ASC
      LIMIT 5
    `);
    return products;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const [stats, recentOrders, lowStockProducts] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(),
    getLowStockProducts(),
  ]);

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
              <Package className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900">{stats.totalProducts}</p>
          <p className="text-sm text-stone-500">Total Products</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900">{stats.totalOrders}</p>
          <p className="text-sm text-stone-500">Total Orders</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900">{stats.totalCustomers}</p>
          <p className="text-sm text-stone-500">Total Customers</p>
        </div>

        <div className="bg-white p-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23%
            </span>
          </div>
          <p className="text-2xl font-bold text-stone-900">₹{formatPrice(stats.totalRevenue)}</p>
          <p className="text-sm text-stone-500">Total Revenue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white border border-stone-200">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-lg font-medium text-stone-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-amber-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-stone-200">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.order_id} className="p-4 flex items-center justify-between hover:bg-stone-50">
                  <div>
                    <p className="font-medium text-stone-900">{order.order_uid}</p>
                    <p className="text-sm text-stone-500">{order.spp_name || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-stone-900">₹{formatPrice(order.order_total)}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.order_status === "1" ? "bg-yellow-100 text-yellow-700" :
                      order.order_status === "2" ? "bg-blue-100 text-blue-700" :
                      order.order_status === "3" ? "bg-purple-100 text-purple-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {order.order_status === "1" ? "Pending" :
                       order.order_status === "2" ? "Processing" :
                       order.order_status === "3" ? "Shipped" : "Delivered"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-stone-500">No recent orders</div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white border border-stone-200">
          <div className="flex items-center justify-between p-6 border-b border-stone-200">
            <h2 className="text-lg font-medium text-stone-900">Low Stock Alert</h2>
            <Link href="/admin/products" className="text-amber-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-stone-200">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <div key={product.p_id} className="p-4 flex items-center justify-between hover:bg-stone-50">
                  <div>
                    <p className="font-medium text-stone-900">{product.p_name}</p>
                    <p className="text-sm text-stone-500">SKU: {product.p_code || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${product.stock < 3 ? "text-red-600" : "text-yellow-600"}`}>
                      {product.stock} units
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-stone-500">No low stock products</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}