import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | LUXEGEMS",
    template: "%s | LUXEGEMS Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100">
      <AdminSidebar />
      <main className="lg:ml-72 min-h-screen">
        {children}
      </main>
    </div>
  );
}
