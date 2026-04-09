import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | LUXEGEMS",
  description: "LUXEGEMS Terms & Conditions - Read our terms and conditions for using our website and services.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Terms & Conditions</h1>
          <p className="text-stone-300">Last updated: April 8, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-light text-stone-900 mb-2">Terms & Conditions</h1>
        <p className="text-stone-500 mb-8">Last updated: April 8, 2026</p>

        <div className="prose prose-stone max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Agreement to Terms</h2>
            <p className="text-stone-600 leading-relaxed">
              By accessing or using the LUXEGEMS website (luxegems.in) and services, 
              you agree to be bound by these Terms and Conditions. If you do not agree 
              to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Products & Pricing</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              All products displayed on our website are subject to availability. We reserve 
              the right to modify prices, descriptions, and availability without notice.
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Prices are in Indian Rupees (₹) and include applicable taxes</li>
              <li>We reserve the right to cancel orders with incorrect pricing</li>
              <li>Product images are for illustration purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Orders & Payment</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We accept the following payment methods:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
              <li>UPI (Google Pay, PhonePe, Paytm)</li>
              <li>Net Banking</li>
              <li>Cash on Delivery (COD) - limited to select locations</li>
            </ul>
            <p className="text-stone-600 leading-relaxed mt-4">
              All payments are processed through secure payment gateways. We do not store 
              your card details on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Shipping & Delivery</h2>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Free shipping on orders above ₹999</li>
              <li>Standard delivery: 3-7 business days</li>
              <li>Express delivery: 1-3 business days (additional charges apply)</li>
              <li>Delivery timelines are estimates and may vary during peak seasons</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Returns & Refunds</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We offer a 30-day return policy on most products. To be eligible for a return:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Product must be unused and in original packaging</li>
              <li>Proof of purchase is required</li>
              <li>Customized/personalized products cannot be returned</li>
            </ul>
            <p className="text-stone-600 leading-relaxed mt-4">
              Refunds will be processed within 7-10 business days after receiving the returned product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Intellectual Property</h2>
            <p className="text-stone-600 leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, 
              is the property of LUXEGEMS and protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Limitation of Liability</h2>
            <p className="text-stone-600 leading-relaxed">
              LUXEGEMS shall not be liable for any indirect, incidental, special, or consequential 
              damages arising out of the use of our products or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Governing Law</h2>
            <p className="text-stone-600 leading-relaxed">
              These Terms and Conditions are governed by the laws of India. Any disputes 
              shall be subject to the exclusive jurisdiction of the courts in New Delhi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Contact Us</h2>
            <p className="text-stone-600 leading-relaxed">
              For any questions regarding these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-stone-50">
              <p className="text-stone-700">
                <strong>LUXEGEMS</strong><br />
                Email: legal@luxegems.in<br />
                Phone: +91 8961941902
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
