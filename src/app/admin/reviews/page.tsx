"use client";

import * as React from "react";
import { Star, MessageSquare, User, CheckCircle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockReviews = [
  { id: 1, product: "Elegant Gold-Plated Necklace Set", customer: "John Doe", rating: 5, comment: "Beautiful necklace! Exactly as shown.", date: "2026-04-05", status: "approved" },
  { id: 2, product: "Traditional Silver Altar Set", customer: "Sarah Smith", rating: 4, comment: "Good quality but delivery was delayed.", date: "2026-04-04", status: "pending" },
  { id: 3, product: "Brass Censor with Chain", customer: "Mike Johnson", rating: 5, comment: "Excellent product, highly recommend!", date: "2026-04-03", status: "approved" },
  { id: 4, product: "Crystal Candlesticks Pair", customer: "Emily Brown", rating: 3, comment: "Okay product, but expected better packaging.", date: "2026-04-02", status: "pending" },
];

export default function ReviewsPage() {
  const [filter, setFilter] = React.useState("all");

  const filteredReviews = mockReviews.filter(review => 
    filter === "all" || review.status === filter
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Reviews</h1>
          <p className="text-stone-500 mt-1">Manage product reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-full">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Average Rating</p>
              <p className="text-2xl font-semibold text-stone-900">4.2</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Total Reviews</p>
              <p className="text-2xl font-semibold text-stone-900">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200">
        <div className="p-4 border-b border-stone-200 flex gap-2">
          {["all", "pending", "approved"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Product</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Rating</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Comment</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Date</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {filteredReviews.map((review) => (
              <tr key={review.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{review.product}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{review.customer}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-stone-300"}`}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500 max-w-xs truncate">{review.comment}</td>
                <td className="px-6 py-4 text-sm text-stone-500">{review.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                    review.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {review.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600">Approve</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Reject</Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">View</Button>
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
