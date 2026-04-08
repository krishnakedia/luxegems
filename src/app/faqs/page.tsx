import { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQs | LUXEGEMS",
  description: "Frequently Asked Questions about LUXEGEMS jewelry products, orders, and services.",
};

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse our collection, add items to your cart, and proceed to checkout. Fill in your shipping details and complete your purchase. You'll receive a confirmation email once your order is placed."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery (COD). You can also pay directly via WhatsApp for convenient ordering."
  },
  {
    question: "How long does delivery take?",
    answer: "Domestic orders are delivered within 5-7 business days. International orders may take 15-25 business days depending on customs clearance."
  },
  {
    question: "Can I return an item?",
    answer: "Yes, most items can be returned within 7 days of delivery if they are in original condition with tags attached. Customized items cannot be returned."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship PAN India and to select international locations. For international orders, please contact us at shipping@luxegems.in."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order on our Track Order page using your Order ID."
  },
  {
    question: "Are your jewelry products genuine?",
    answer: "Yes, all our jewelry is made with genuine materials. We use high-quality metals and stones, and each product comes with authenticity certification."
  },
  {
    question: "How do I care for my jewelry?",
    answer: "Store jewelry in a dry place, avoid exposure to chemicals and moisture, clean gently with a soft cloth, and remove before swimming or showering."
  },
  {
    question: "Do you offer customization?",
    answer: "Yes, we offer customization for select jewelry pieces. Contact us at custom@luxegems.in to discuss your requirements."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us at support@luxegems.in, call +91 98765 43210, or message us on WhatsApp."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Frequently Asked Questions</h1>
          <p className="text-stone-300">Find answers to common questions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-white border border-stone-200">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <span className="text-lg font-medium text-stone-900">{faq.question}</span>
                <ChevronDown className="h-5 w-5 text-stone-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 p-6 bg-amber-50 border border-amber-200">
          <h3 className="text-lg font-medium text-stone-900 mb-2">Still have questions?</h3>
          <p className="text-stone-600 mb-4">Can't find the answer you're looking for? Contact our support team.</p>
          <a href="/contact" className="text-amber-700 font-medium hover:underline">Contact Us →</a>
        </div>
      </div>
    </div>
  );
}
