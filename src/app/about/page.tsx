import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gem, Award, Heart, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | LUXEGEMS - Premium Jewelry",
  description: "Learn about LUXEGEMS and our commitment to quality jewelry craftsmanship. Our story, mission, and values.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
              Our Story
            </h1>
            <p className="text-lg text-stone-300 leading-relaxed">
              For over two decades, LUXEGEMS has been crafting exquisite jewelry 
              that celebrates life&apos;s most precious moments. Our journey began 
              with a simple vision: to create jewelry that tells stories.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 text-sm uppercase tracking-widest mb-2 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-6">
                Crafting Beauty,<br />
                <span className="italic font-serif text-amber-600">Creating Memories</span>
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                At LUXEGEMS, we believe that every piece of jewelry should be more 
                than just an accessory. It should be a reflection of your personality, 
                a symbol of your achievements, and a treasured memory waiting to be made.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Our master artisans combine traditional craftsmanship with contemporary 
                design, using only the finest materials to create pieces that will 
                be cherished for generations.
              </p>
              <Button variant="gold" asChild>
                <Link href="/products">
                  Explore Our Collection
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800"
                alt="Jewelry craftsmanship"
                width={600}
                height={700}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Gem className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-3xl font-semibold text-stone-900 mb-1">20+</p>
              <p className="text-sm text-stone-500">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-3xl font-semibold text-stone-900 mb-1">10,000+</p>
              <p className="text-sm text-stone-500">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-3xl font-semibold text-stone-900 mb-1">500+</p>
              <p className="text-sm text-stone-500">Unique Designs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-3xl font-semibold text-stone-900 mb-1">500+</p>
              <p className="text-sm text-stone-500">Cities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm uppercase tracking-widest mb-2 block">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-stone-900">
              Meet the Artisans
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="h-24 w-24 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-1">Master Craftsmen</h3>
              <p className="text-sm text-stone-500">Traditional Techniques</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="h-24 w-24 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-1">Design Team</h3>
              <p className="text-sm text-stone-500">Creative Excellence</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="h-24 w-24 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-900 mb-1">Quality Control</h3>
              <p className="text-sm text-stone-500">Perfection in Every Piece</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            Browse our collection and discover jewelry that speaks to you.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/products">
              Shop Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
