import Link from "next/link";
import { Mail, Phone, MapPin, Gem } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Necklaces", href: "/products?category=necklaces" },
    { label: "Earrings", href: "/products?category=earrings" },
    { label: "Rings", href: "/products?category=rings" },
    { label: "Bracelets", href: "/products?category=bracelets" },
    { label: "Bangles", href: "/products?category=bangles" },
    { label: "All Products", href: "/products" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Track Order", href: "/track-order" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns & Exchange", href: "/returns" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Gem className="h-8 w-8 text-amber-500" />
              <div>
                <span className="text-2xl font-light tracking-widest text-white">
                  LUXE
                </span>
                <span className="text-2xl font-extralight tracking-widest text-amber-500">
                  GEMS
                </span>
              </div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Discover exquisite jewelry crafted with passion and precision. 
              Each piece tells a story of elegance, tradition, and timeless beauty.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="px-3 py-2 bg-stone-800 hover:bg-amber-600 transition-colors text-xs font-medium">
                FB
              </a>
              <a href="#" className="px-3 py-2 bg-stone-800 hover:bg-amber-600 transition-colors text-xs font-medium">
                X
              </a>
              <a href="#" className="px-3 py-2 bg-stone-800 hover:bg-amber-600 transition-colors text-xs font-medium">
                IG
              </a>
              <a href="#" className="px-3 py-2 bg-stone-800 hover:bg-amber-600 transition-colors text-xs font-medium">
                YT
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wide">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wide">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wide">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4 tracking-wide">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-stone-400">
                  147, A/14, Girish Ghosh Road Belur Howrah-711202
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-stone-400">+91 8961941902</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-stone-400">kediakrishna65@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} LUXEGEMS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-stone-500 hover:text-amber-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Secure Payment:</span>
              <div className="flex gap-1">
                <div className="w-10 h-6 bg-stone-800 rounded flex items-center justify-center text-[8px] text-stone-400">
                  UPI
                </div>
                <div className="w-10 h-6 bg-stone-800 rounded flex items-center justify-center text-[8px] text-stone-400">
                  Visa
                </div>
                <div className="w-10 h-6 bg-stone-800 rounded flex items-center justify-center text-[8px] text-stone-400">
                  MC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
