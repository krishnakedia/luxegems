import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Contact Us | LUXEGEMS",
  description: "Get in touch with LUXEGEMS. We're here to help with your jewelry needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Have a question or need assistance? We&apos;re here to help. 
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-light text-stone-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">Visit Our Store</h3>
                    <p className="text-stone-600">
                      123 Jewelry Lane, Karol Bagh<br />
                      New Delhi - 110005<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">Call Us</h3>
                    <p className="text-stone-600">
                      +91 98765 43210<br />
                      +91 11 2345 6789
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">Email Us</h3>
                    <p className="text-stone-600">
                      support@luxegems.in<br />
                      sales@luxegems.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">Business Hours</h3>
                    <p className="text-stone-600">
                      Monday - Saturday: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 aspect-video bg-stone-100 border border-stone-200 flex items-center justify-center">
                <p className="text-stone-500">Map Location</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 border border-stone-200">
              <h2 className="text-2xl font-light text-stone-900 mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="Enter first name" />
                  <Input label="Last Name" placeholder="Enter last name" />
                </div>
                <Input label="Email Address" type="email" placeholder="Enter email" />
                <Input label="Phone Number" type="tel" placeholder="Enter phone number" />
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Subject
                  </label>
                  <select className="flex h-11 w-full border-2 border-stone-200 bg-white px-4 py-2 text-sm text-stone-900 focus:border-amber-600 focus:outline-none">
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="return">Return/Exchange</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Textarea label="Message" placeholder="How can we help you?" />
                <Button variant="gold" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
