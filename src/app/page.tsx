import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Truck, RefreshCw, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { query } from "@/lib/db";
import type { Product, Category } from "@/types";

async function getProducts(limit: number = 8) {
  try {
    const products = await query<Product[]>(`
      SELECT p.*, c.cat_name as category_name,
             (SELECT pm_image FROM product_image WHERE pm_pid = p.p_id LIMIT 1) as main_image
      FROM product p
      LEFT JOIN category c ON p.p_catid = c.cat_id
      WHERE p.p_status = 1
      ORDER BY p.p_id DESC LIMIT ?
    `, [limit]);
    
    const productsWithImages = await Promise.all(
      (products as Product[]).map(async (product) => {
        const images = await query<{ pm_id: number; pm_pid: string; pm_image: string; pm_status: string }[]>(
          "SELECT pm_id, pm_pid, pm_image, pm_status FROM product_image WHERE pm_pid = ? LIMIT 4",
          [product.p_id]
        );
        return { ...product, images };
      })
    );
    
    return productsWithImages;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await query<(Category & { product_count?: number })[]>(`
      SELECT c.*, COUNT(p.p_id) as product_count
      FROM category c
      LEFT JOIN product p ON c.cat_id = p.p_catid AND p.p_status = 1
      WHERE c.cat_status = 1
      GROUP BY c.cat_id
      ORDER BY c.cat_seq, c.cat_id
    `);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getTestimonials() {
  try {
    const reviews = await query<any[]>(`
      SELECT r.re_id, r.re_name, r.re_desc
      FROM review r
      WHERE r.re_status = '1'
      ORDER BY r.re_id DESC
      LIMIT 6
    `);
    
    return reviews.map(r => ({
      id: r.re_id,
      name: r.re_name,
      location: "Customer",
      text: r.re_desc,
      rating: 5,
      avatar: r.re_name.charAt(0),
    }));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

async function getSliders() {
  try {
    const sliders = await query<any[]>(`
      SELECT * FROM slider_img WHERE img_status = '1' ORDER BY img_id DESC
    `);
    return sliders;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return [];
  }
}

export default async function HomePage() {
  const [products, categories, testimonials, sliders] = await Promise.all([
    getProducts(8),
    getCategories(),
    getTestimonials(),
    getSliders()
  ]);

  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={sliders[0]?.img_name || "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920"}
            alt="Luxury Jewelry"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-amber-500 text-sm uppercase tracking-widest">
                New Collection 2026
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              Timeless
              <br />
              <span className="text-gradient-gold font-serif italic">
                Elegance
              </span>
            </h1>
            <p className="text-lg text-stone-300 mb-8 max-w-md leading-relaxed">
              Discover our exquisite collection of handcrafted jewelry. 
              Each piece is a testament to craftsmanship and beauty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link href="/products">
                  Shop Collection
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-stone-900">
                <Link href="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Explore our curated collections designed for every occasion and celebration
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.cat_id}
                href={`/products?category=${category.cat_name.toLowerCase()}`}
                className="group relative aspect-square overflow-hidden"
              >
                <Image
                  src={category.cat_image}
                  alt={category.cat_name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-light text-white group-hover:text-amber-400 transition-colors">
                    {category.cat_name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-amber-600 text-sm uppercase tracking-widest mb-2 block">
                Handpicked for You
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900">
                Featured Collection
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.p_id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="gold" className="mb-4">Limited Time Offer</Badge>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Festive Season
                <br />
                <span className="italic font-serif text-amber-400">Collection</span>
              </h2>
              <p className="text-stone-400 mb-8 max-w-md">
                Celebrate the festive season with our exclusive collection. 
                Up to 30% off on selected items. Free shipping on orders above ₹999.
              </p>
              <Button variant="gold" size="lg" asChild>
                <Link href="/products?sale=true">
                  Shop Festive Sale
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400"
                    alt="Festive Collection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"
                    alt="Festive Collection"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-amber-600 text-sm uppercase tracking-widest mb-2 block">
                Just Arrived
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/products?sort=newest"
              className="hidden md:flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.p_id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-stone-200 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-medium text-stone-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-stone-500">On orders above ₹999</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-stone-200 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-medium text-stone-900 mb-1">Secure Payment</h3>
              <p className="text-sm text-stone-500">100% secure checkout</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-stone-200 rounded-full flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-medium text-stone-900 mb-1">Easy Returns</h3>
              <p className="text-sm text-stone-500">30 day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-stone-200 rounded-full flex items-center justify-center">
                <Gem className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-medium text-stone-900 mb-1">Premium Quality</h3>
              <p className="text-sm text-stone-500">Handcrafted with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm uppercase tracking-widest mb-2 block">
              What Our Customers Say
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">
              Loved by Thousands
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-stone-200 p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-amber-700">
                    {testimonial.avatar}
                  </span>
                </div>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className="h-4 w-4 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 mb-4 italic">"{testimonial.text}"</p>
                <h4 className="font-medium text-stone-900">{testimonial.name}</h4>
                <p className="text-sm text-stone-500">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-amber-100 mb-8">
              Subscribe to get exclusive offers, new arrivals, and styling tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              <Button
                variant="secondary"
                size="lg"
                className="bg-stone-900 text-white hover:bg-stone-800 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-amber-200 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
