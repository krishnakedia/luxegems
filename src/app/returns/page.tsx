import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds | LUXEGEMS",
  description: "Learn about LUXEGEMS returns and refunds policy.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Returns & Refunds</h1>
          <p className="text-stone-300">Our return and refund policy</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-stone max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Return Policy</h2>
            <p className="text-stone-600 leading-relaxed">
              We want you to be completely satisfied with your purchase. If you're not 
              happy with your order, you can return most items within 7 days of delivery 
              for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Conditions for Returns</h2>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Items must be in original condition with all tags attached</li>
              <li>Jewelry must be unused and in original packaging</li>
              <li>Proof of purchase is required</li>
              <li>Customized or personalized items cannot be returned</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Refund Process</h2>
            <p className="text-stone-600 leading-relaxed">
              Once we receive your return, we will inspect it and process your refund 
              within 5-7 business days. The refund will be credited to your original 
              payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Exchange</h2>
            <p className="text-stone-600 leading-relaxed">
              If you'd like to exchange an item for a different size, color, or product, 
              please contact us at returns@luxegems.in and we'll assist you with the exchange.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Contact Us</h2>
            <p className="text-stone-600 leading-relaxed">
              For any queries related to returns and refunds, please contact us at 
              returns@luxegems.in or call +91 98765 43210.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
