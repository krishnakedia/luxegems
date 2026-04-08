import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LUXEGEMS",
  description: "LUXEGEMS Privacy Policy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-light mb-2">Privacy Policy</h1>
          <p className="text-stone-300">Last updated: April 8, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Introduction</h2>
            <p className="text-stone-600 leading-relaxed">
              At LUXEGEMS (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website luxegems.in or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Information We Collect</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We collect information you provide directly to us, such as:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Contact information (name, email address, phone number, shipping address)</li>
              <li>Payment information (credit/debit card details, UPI ID)</li>
              <li>Order history and preferences</li>
              <li>Communications and correspondence</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">How We Use Your Information</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your questions and requests</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Information Sharing</h2>
            <p className="text-stone-600 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to 
              third parties without your consent, except as described in this policy. 
              We may share information with service providers who assist us in operating 
              our website and conducting our business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Data Security</h2>
            <p className="text-stone-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect 
              your personal information against unauthorized access, alteration, disclosure, 
              or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Your Rights</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Under the Information Technology Act, 2000, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Cookies</h2>
            <p className="text-stone-600 leading-relaxed">
              We use cookies and similar tracking technologies to improve your browsing 
              experience on our website. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-stone-900 mb-4">Contact Us</h2>
            <p className="text-stone-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-stone-50">
              <p className="text-stone-700">
                <strong>LUXEGEMS</strong><br />
                Email: privacy@luxegems.in<br />
                Phone: +91 98765 43210<br />
                Address: 123 Jewelry Lane, Karol Bagh, New Delhi - 110005
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
