"use client";

import * as React from "react";
import { Star, MessageSquare, User, CheckCircle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
  const [filter, setFilter] = React.useState("all");
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review => 
    filter === "all" || review.re_status === filter
  );

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc: number, r: any) => acc + (r.re_rating || 4), 0) / reviews.length).toFixed(1)
    : "0";

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
              <p className="text-2xl font-semibold text-stone-900">{avgRating}</p>
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
              <p className="text-2xl font-semibold text-stone-900">{reviews.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Approved</p>
              <p className="text-2xl font-semibold text-stone-900">
                {reviews.filter(r => r.re_status === "1").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-stone-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <XCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500">Pending</p>
              <p className="text-2xl font-semibold text-stone-900">
                {reviews.filter(r => r.re_status === "0").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "1", "0"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === f
                ? "bg-amber-600 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {f === "all" ? "All" : f === "1" ? "Approved" : "Pending"}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-white border border-stone-200">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.re_id} className="p-6 border-b border-stone-200 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-700 font-medium">
                        {review.re_name?.charAt(0) || "C"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{review.re_name}</p>
                      <p className="text-xs text-stone-500">{review.re_date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? "text-amber-500 fill-current" : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-medium text-stone-900 mb-1">{review.re_title}</h4>
                  <p className="text-stone-600 text-sm">{review.re_desc}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
}