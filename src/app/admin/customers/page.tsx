"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Search, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", orders: 5, total: 12500, joined: "2025-12-01", status: "active" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", phone: "+91 98765 43211", orders: 3, total: 8500, joined: "2026-01-15", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+91 98765 43212", orders: 1, total: 2500, joined: "2026-02-20", status: "inactive" },
  { id: 4, name: "Emily Brown", email: "emily@example.com", phone: "+91 98765 43213", orders: 8, total: 22000, joined: "2025-10-10", status: "active" },
];

export default function CustomersPage() {
  const [search, setSearch] = React.useState("");

  const filteredCustomers = mockCustomers.filter(cust =>
    cust.name.toLowerCase().includes(search.toLowerCase()) ||
    cust.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Customers</h1>
          <p className="text-stone-500 mt-1">Manage your customers</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="bg-white border border-stone-200">
        <div className="p-4 border-b border-stone-200">
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Phone</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Orders</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Total Spent</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Joined</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm text-stone-500">#{customer.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-stone-900">{customer.name}</p>
                    <p className="text-sm text-stone-500">{customer.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{customer.phone}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{customer.orders}</td>
                <td className="px-6 py-4 text-sm text-stone-500">₹{customer.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{customer.joined}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                    customer.status === "active" ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-700"
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
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
