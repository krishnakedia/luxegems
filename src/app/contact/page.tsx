import { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | LUXEGEMS",
  description: "Get in touch with LUXEGEMS. We're here to help with your jewelry needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
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

              <div className="mt-8 aspect-video bg-stone-100 border border-stone-200 flex items-center justify-center">
                <p className="text-stone-500">Map Location</p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}