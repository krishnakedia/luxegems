"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function SlidersPage() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSliders() {
      try {
        const res = await fetch("/api/sliders");
        const data = await res.json();
        if (data.success) {
          setSliders(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch sliders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSliders();
  }, []);

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
          <h1 className="text-2xl font-light text-stone-900">Sliders & Banners</h1>
          <p className="text-stone-500 mt-1">Manage home page sliders</p>
        </div>
        <Button variant="gold">
          <Plus className="h-4 w-4 mr-2" />
          Add Slider
        </Button>
      </div>

      <div className="bg-white border border-stone-200">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Order</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Title</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Image</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-stone-500">Date</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {sliders.map((slider) => (
              <tr key={slider.img_id} className="hover:bg-stone-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-stone-400 cursor-move" />
                    <span className="text-sm text-stone-600">{slider.img_id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-stone-900">{slider.img_title}</td>
                <td className="px-6 py-4">
                  <div className="w-20 h-12 bg-stone-100 relative overflow-hidden">
                    <Image
                      src={slider.img_name}
                      alt={slider.img_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={slider.img_status === "1" ? "success" : "error"}>
                    {slider.img_status === "1" ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">{slider.img_date?.split(' ')[0]}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
        
        {sliders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-500">No sliders found</p>
          </div>
        )}
      </div>
    </div>
  );
}