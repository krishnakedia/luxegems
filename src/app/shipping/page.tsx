import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Information | LUXEGEMS",
  description: "Learn about LUXEGEMS shipping policies, delivery times, and shipping charges.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Shipping Information</h1>
          <p className="text-stone-300">Everything you need to know about delivery</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-stone max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Delivery Timeline</h2>
            <p className="text-stone-600 leading-relaxed">
              We strive to deliver your orders within 5-7 business days for domestic orders. 
              International orders may take 15-25 business days depending on customs clearance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Shipping Charges</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We offer FREE shipping on all orders above ₹5000. For orders below ₹5000, 
              a shipping charge of ₹150 applies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Shipping Partners</h2>
            <p className="text-stone-600 leading-relaxed">
              We partner with trusted logistics providers to ensure safe and timely delivery 
              of your orders. You will receive a tracking number via email once your order is shipped.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Delivery Areas</h2>
            <p className="text-stone-600 leading-relaxed">
              We deliver PAN India. For international delivery, please contact us at 
              shipping@luxegems.in for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Order Tracking</h2>
            <p className="text-stone-600 leading-relaxed">
              You can track your order using the tracking link sent to your registered 
              email or by visiting our Track Order page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
