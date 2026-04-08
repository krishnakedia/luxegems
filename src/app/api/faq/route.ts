import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

export async function GET() {
  try {
    const faqs = await query<Faq[]>(`
      SELECT pg_id as id, pg_name as question, pg_desc as answer 
      FROM create_page 
      WHERE pg_name = 'FAQ'
    `);

    const staticFaqs = [
      {
        id: 101,
        question: "How do I place an order?",
        answer: "Browse our collection, add items to your cart, and proceed to checkout. Fill in your shipping details and complete your purchase. You'll receive a confirmation email once your order is placed."
      },
      {
        id: 102,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery (COD). You can also pay directly via WhatsApp for convenient ordering."
      },
      {
        id: 103,
        question: "How long does delivery take?",
        answer: "Domestic orders are delivered within 5-7 business days. International orders may take 15-25 business days depending on customs clearance."
      },
      {
        id: 104,
        question: "Can I return an item?",
        answer: "Yes, most items can be returned within 7 days of delivery if they are in original condition with tags attached. Customized items cannot be returned."
      },
      {
        id: 105,
        question: "Do you offer international shipping?",
        answer: "Yes, we ship PAN India and to select international locations. For international orders, please contact us at shipping@luxegems.in."
      },
      {
        id: 106,
        question: "How do I track my order?",
        answer: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order on our Track Order page using your Order ID."
      },
      {
        id: 107,
        question: "Are your jewelry products genuine?",
        answer: "Yes, all our jewelry is made with genuine materials. We use high-quality metals and stones, and each product comes with authenticity certification."
      },
      {
        id: 108,
        question: "How do I care for my jewelry?",
        answer: "Store jewelry in a dry place, avoid exposure to chemicals and moisture, clean gently with a soft cloth, and remove before swimming or showering."
      },
      {
        id: 109,
        question: "Do you offer customization?",
        answer: "Yes, we offer customization for select jewelry pieces. Contact us at custom@luxegems.in to discuss your requirements."
      },
      {
        id: 110,
        question: "How can I contact customer support?",
        answer: "You can reach us at support@luxegems.in, call +91 98765 43210, or message us on WhatsApp."
      }
    ];

    if (faqs && faqs.length > 0) {
      return NextResponse.json({ success: true, data: [...faqs, ...staticFaqs] });
    }

    return NextResponse.json({ success: true, data: staticFaqs });
  } catch (error) {
    console.error("FAQ fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}