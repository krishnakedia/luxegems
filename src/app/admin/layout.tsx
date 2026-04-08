import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { AdminFooter } from "@/components/admin/footer";

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
      <div className="lg:ml-72 min-h-screen flex flex-col">
        <AdminHeader />
        <main className="flex-1">
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
