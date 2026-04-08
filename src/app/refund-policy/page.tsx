import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | LUXEGEMS",
  description: "LUXEGEMS Refund Policy - Learn about our refund and return procedures.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Refund Policy</h1>
          <p className="text-stone-300">Our refund and cancellation policy</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-stone max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Cancellation Policy</h2>
            <p className="text-stone-600 leading-relaxed">
              You can cancel your order within 24 hours of placing it, provided it has not 
              been shipped yet. Once the order is shipped, cancellation is not possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Refund Eligibility</h2>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Full refund for damaged or defective items</li>
              <li>Full refund if the order is not delivered within the estimated time</li>
              <li>Partial refund for used items (case-by-case basis)</li>
              <li>No refund for custom-made or personalized items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Refund Timeline</h2>
            <p className="text-stone-600 leading-relaxed">
              Once your refund request is approved, the amount will be credited to your 
              original payment method within 5-7 business days. For COD orders, the 
              refund will be processed via bank transfer within 10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Non-Refundable Items</h2>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Customized or personalized jewelry</li>
              <li>Earrings (for hygiene reasons)</li>
              <li>Items purchased on sale or with special discounts</li>
              <li>Shipping charges (unless the issue is on our part)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">How to Request a Refund</h2>
            <p className="text-stone-600 leading-relaxed">
              To request a refund, please contact us at refunds@luxegems.in with your 
              order ID and reason for refund. Our team will review your request and 
              respond within 24-48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
