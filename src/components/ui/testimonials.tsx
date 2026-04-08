"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  productName?: string;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.success && data.data?.length > 0) {
          setTestimonials(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="py-20 bg-stone-50">
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-stone-200 p-8 text-center animate-pulse">
                <div className="w-16 h-16 mx-auto mb-4 bg-stone-200 rounded-full" />
                <div className="h-4 bg-stone-200 w-24 mx-auto mb-4 rounded" />
                <div className="h-16 bg-stone-100 rounded mb-4" />
                <div className="h-4 bg-stone-200 w-32 mx-auto rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-600 text-sm uppercase tracking-[0.3em] mb-4 block font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900">
            What Our Customers Say
          </h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto">
            Discover why thousands of customers trust LUXEGEMS for their jewelry needs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 p-8 md:p-12 border border-stone-100">
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0">
                          {testimonial.productName ? (
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-stone-100">
                              <Image
                                src="/placeholder-jewelry.jpg"
                                alt={testimonial.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
                              <span className="text-3xl font-light text-amber-700">
                                {testimonial.avatar}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <Quote className="h-10 w-10 text-amber-200 mb-4" />
                          
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-amber-500">★</span>
                            ))}
                          </div>
                          
                          <p className="text-lg text-stone-600 italic leading-relaxed mb-6">
                            "{testimonial.text}"
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-stone-900 text-lg">
                                {testimonial.name}
                              </h4>
                              <p className="text-stone-500 text-sm">
                                {testimonial.location}
                              </p>
                            </div>
                            {testimonial.productName && (
                              <div className="text-right">
                                <p className="text-xs text-stone-400 uppercase tracking-wider">
                                  Purchased
                                </p>
                                <p className="text-sm text-amber-600 font-medium">
                                  {testimonial.productName}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-stone-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-stone-600" />
                </button>
              </>
            )}
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex ? "bg-amber-500 w-8" : "bg-stone-300"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}