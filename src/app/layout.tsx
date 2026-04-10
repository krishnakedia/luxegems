import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/ui/layout-wrapper";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { SpeedInsights } from "@vercel/speed-insights/next";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LUXEGEMS - Premium Jewelry | Gold, Silver & Artificial Jewellery",
    template: "%s | LUXEGEMS",
  },
  description:
    "Discover exquisite jewelry at LUXEGEMS. Shop premium necklaces, earrings, rings, bracelets & more. Handcrafted with love. Free shipping across India. COD available.",
  keywords: [
    "jewelry",
    "jewellery",
    "gold jewellery",
    "silver jewellery",
    "artificial jewellery",
    "necklaces",
    "earrings",
    "rings",
    "bracelets",
    "bangles",
    "pendants",
    "wedding jewellery",
    "festive collection",
    "buy online jewellery India",
  ],
  authors: [{ name: "LUXEGEMS" }],
  creator: "LUXEGEMS",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LUXEGEMS",
    title: "LUXEGEMS - Premium Jewelry",
    description:
      "Discover exquisite jewelry at LUXEGEMS. Shop premium necklaces, earrings, rings, bracelets & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXEGEMS - Premium Jewelry",
    description:
      "Discover exquisite jewelry at LUXEGEMS. Shop premium necklaces, earrings, rings, bracelets & more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-stone-900">
        <CartProvider>
          <WishlistProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </WishlistProvider>
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
