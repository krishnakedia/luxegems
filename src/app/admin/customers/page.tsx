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
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [newCustomer, setNewCustomer] = React.useState({ name: "", email: "", phone: "" });
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
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
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewCustomer({ name: "", email: "", phone: "" });
        fetchCustomers();
      } else {
        setError(data.error || "Failed to add customer");
      }
    } catch (err) {
      setError("Failed to add customer");
    } finally {
      setAdding(false);
    }
  };

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
        <Button variant="gold" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-medium mb-4">Add New Customer</h2>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <Input
                label="Full Name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                required
              />
              <Input
                label="Phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                required
              />
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="gold" disabled={adding} className="flex-1">
                  {adding ? "Adding..." : "Add Customer"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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