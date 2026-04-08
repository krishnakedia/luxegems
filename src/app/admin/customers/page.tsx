"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Search, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

export default function CustomersPage() {
  const [search, setSearch] = React.useState("");
  const [customers, setCustomers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/customers");
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(cust =>
    cust.nu_name?.toLowerCase().includes(search.toLowerCase()) ||
    cust.nu_email?.toLowerCase().includes(search.toLowerCase())
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
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Email</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Phone</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Orders</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Joined</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.nu_id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm text-stone-500">{customer.nu_id}</td>
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{customer.nu_name}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{customer.nu_email}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{customer.nu_number}</td>
                <td className="px-6 py-4 text-sm text-stone-600">{customer.order_count || 0}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{customer.nu_date?.split(' ')[0]}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${customer.nu_status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {customer.nu_status === 1 ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
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
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No customers found</p>
          </div>
        )}
      </div>
    </div>
  );
}