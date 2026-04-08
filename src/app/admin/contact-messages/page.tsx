"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Eye, Trash2, Check, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactMessage {
  ct_id: number;
  ct_name: string;
  ct_email: string;
  ct_phone: number;
  ct_comment: string;
  ct_status: number;
  ct_date: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: number) => {
    try {
      await fetch(`/api/contact?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchMessages();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      fetchMessages();
      setSelectedMessage(null);
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.ct_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.ct_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.ct_comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "read") return matchesSearch && msg.ct_status === 1;
    if (filter === "unread") return matchesSearch && msg.ct_status === 0;
    return matchesSearch;
  });

  const unreadCount = messages.filter(m => m.ct_status === 0).length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-stone-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-stone-900">Contact Messages</h1>
          <p className="text-stone-500">{unreadCount} unread messages</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === "read" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("read")}
          >
            Read
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              No messages found
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.ct_id}
                onClick={() => setSelectedMessage(message)}
                className={`bg-white border p-4 rounded-lg cursor-pointer transition-all ${
                  selectedMessage?.ct_id === message.ct_id
                    ? "border-amber-500 shadow-md"
                    : "border-stone-200 hover:border-amber-300"
                } ${message.ct_status === 0 ? "border-l-4 border-l-amber-500" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-stone-900">{message.ct_name}</h3>
                    <p className="text-sm text-stone-500">{message.ct_email}</p>
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(message.ct_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-stone-600 mt-2 line-clamp-2">
                  {message.ct_comment}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs text-stone-500">
                    <Phone className="h-3 w-3" />
                    {message.ct_phone}
                  </span>
                  {message.ct_status === 0 && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedMessage && (
          <div className="bg-white border border-stone-200 rounded-lg p-6 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-stone-900">Message Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-stone-500 uppercase">Name</label>
                <p className="text-stone-900">{selectedMessage.ct_name}</p>
              </div>
              
              <div>
                <label className="text-xs text-stone-500 uppercase">Email</label>
                <p className="text-stone-900">{selectedMessage.ct_email}</p>
              </div>

              <div>
                <label className="text-xs text-stone-500 uppercase">Phone</label>
                <p className="text-stone-900">{selectedMessage.ct_phone}</p>
              </div>

              <div>
                <label className="text-xs text-stone-500 uppercase">Date</label>
                <p className="text-stone-900">
                  {new Date(selectedMessage.ct_date).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-xs text-stone-500 uppercase">Message</label>
                <p className="text-stone-900 whitespace-pre-wrap">{selectedMessage.ct_comment}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-200">
                {selectedMessage.ct_status === 0 && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(selectedMessage.ct_id, 1)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark as Read
                  </Button>
                )}
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => deleteMessage(selectedMessage.ct_id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}