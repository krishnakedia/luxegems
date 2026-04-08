import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog Details | LUXEGEMS",
  description: "Read our latest blog post.",
};

const blogPosts = [
  {
    id: 1,
    title: "The Art of Gold Plating: Everything You Need to Know",
    excerpt: "Discover the intricacies of gold plating and how to maintain your jewelry's shine for years to come.",
    content: `
      <p>Gold plating is a technique where a thin layer of gold is applied to the surface of another metal, typically silver or copper. This process has been used for centuries to create beautiful, affordable jewelry that mimics the look of solid gold.</p>
      
      <h2>Understanding Gold Plating</h2>
      <p>The thickness of the gold layer is measured in microns. Generally, gold plating can range from 0.5 to 2.5 microns. The thicker the gold layer, the more durable and long-lasting the plating will be.</p>
      
      <h2>Caring for Your Gold-Plated Jewelry</h2>
      <p>To maintain the shine and longevity of your gold-plated pieces:</p>
      <ul>
        <li>Avoid exposure to water, perfume, and cosmetics</li>
        <li>Store pieces separately to prevent scratching</li>
        <li>Clean gently with a soft, dry cloth</li>
        <li>Remove jewelry before sleeping or exercising</li>
      </ul>
      
      <p>With proper care, your gold-plated jewelry can maintain its beautiful appearance for many years.</p>
    `,
    date: "April 5, 2026",
    category: "Jewelry Care",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
    author: "LUXEGEMS Team",
  },
  {
    id: 2,
    title: "Wedding Jewelry Trends for 2026",
    excerpt: "From classic elegance to modern minimalism, explore the top wedding jewelry trends of the year.",
    content: `
      <p>As we move into 2026, wedding jewelry trends are evolving to reflect both tradition and modernity. Brides are looking for pieces that not only complement their attire but also hold personal significance.</p>
      
      <h2>Trending Styles</h2>
      <p>This year's top wedding jewelry trends include:</p>
      <ul>
        <li><strong>Minimalist Diamonds:</strong> Delicate pieces with subtle sparkle</li>
        <li><strong>Vintage-inspired:</strong> Art deco and vintage Victorian designs</li>
        <li><strong>Colored Gemstones:</strong> Sapphires, emeralds, and rubies making a comeback</li>
        <li><strong>Pearls:</strong> Classic elegance with modern interpretations</li>
      </ul>
      
      <h2>Choosing the Right Piece</h2>
      <p>When selecting wedding jewelry, consider your dress neckline, hairstyle, and personal style. The right piece can elevate your entire look and become a treasured heirloom.</p>
    `,
    date: "March 28, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200",
    author: "LUXEGEMS Team",
  },
  {
    id: 3,
    title: "How to Choose the Perfect Pendant for Your Neckline",
    excerpt: "A guide to selecting jewelry that complements your neckline and enhances your overall look.",
    content: `
      <p>Choosing the right pendant can transform your outfit and flatter your features. The key is to match the pendant length and style to your neckline.</p>
      
      <h2>Neckline Guide</h2>
      <ul>
        <li><strong>High neck:</strong> Opt for longer pendants that sit below the neckline</li>
        <li><strong>V-neck:</strong> Choose a pendant that follows the V shape</li>
        <li><strong>Round neck:</strong> Pendants that hit at the collarbone work best</li>
        <li><strong>Off-shoulder:</strong> Statement pieces work well with this style</li>
      </ul>
      
      <h2>Face Shape Considerations</h2>
      <p>Your face shape also plays a role in pendant selection. Round faces benefit from long, vertical pendants, while angular faces can pull off chunky, statement pieces.</p>
    `,
    date: "March 15, 2026",
    category: "Styling Tips",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200",
    author: "LUXEGEMS Team",
  },
  {
    id: 4,
    title: "Understanding the Different Types of Altars",
    excerpt: "Learn about various altar styles and how to choose the right one for your home or church.",
    content: `
      <p>Altars hold significant cultural and religious importance across various traditions. Understanding the different styles can help you make an informed choice.</p>
      
      <h2>Types of Altars</h2>
      <ul>
        <li><strong>Home Altars:</strong> Personal prayer spaces in residential settings</li>
        <li><strong>Church Altars:</strong> Central fixtures in religious buildings</li>
        <li><strong>Portable Altars:</strong> Mobile options for travel or small spaces</li>
        <li><strong>Decorative Altars:</strong> Ornamental pieces for display</li>
      </ul>
      
      <h2>Choosing Materials</h2>
      <p>Altars are commonly made from wood, metal, or stone. Each material offers different aesthetic and durability characteristics.</p>
    `,
    date: "March 1, 2026",
    category: "Religious Items",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200",
    author: "LUXEGEMS Team",
  },
  {
    id: 5,
    title: "Caring for Your Baptismal Jewelry",
    excerpt: "Essential tips for maintaining the beauty and significance of baptismal pieces.",
    content: `
      <p>Baptismal jewelry holds deep spiritual significance and often becomes a treasured family heirloom. Proper care ensures these pieces remain beautiful for generations.</p>
      
      <h2>Storage Tips</h2>
      <ul>
        <li>Store in a soft-lined jewelry box</li>
        <li>Keep away from direct sunlight</li>
        <li>Avoid exposure to moisture</li>
        <li>Keep pieces separate to prevent tangling</li>
      </ul>
      
      <h2>Cleaning Guidelines</h2>
      <p>Use gentle cleaning methods appropriate for the specific metal and gemstone. Professional cleaning is recommended for valuable pieces.</p>
    `,
    date: "February 20, 2026",
    category: "Jewelry Care",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
    author: "LUXEGEMS Team",
  },
  {
    id: 6,
    title: "The Symbolism Behind Mangalsutra",
    excerpt: "Explore the cultural significance and meaning of the sacred Mangalsutra.",
    content: `
      <p>The Mangalsutra is more than just a piece of jewelry; it's a sacred symbol of marriage in Hindu tradition. Understanding its significance adds depth to its beauty.</p>
      
      <h2>Historical Significance</h2>
      <p>The word "Mangalsutra" combines "Mangal" (auspicious) and "Sutra" (thread), symbolizing the bond of marriage. Traditionally, it's tied by the groom during the wedding ceremony.</p>
      
      <h2>Regional Variations</h2>
      <p>Different regions have unique styles, from the classic black bead designs of South India to the elaborate diamond pendants of North India.</p>
      
      <h2>Modern Interpretations</h2>
      <p>Contemporary Mangalsutras blend traditional elements with modern aesthetics, making them both meaningful and stylish.</p>
    `,
    date: "February 10, 2026",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200",
    author: "LUXEGEMS Team",
  },
];

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-80 bg-stone-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-light mb-4">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 text-stone-300">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="text-amber-600 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>

        <article className="prose prose-stone max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center">
              <span className="text-stone-600 font-medium">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-stone-900">{post.author}</p>
              <p className="text-sm text-stone-500">LUXEGEMS</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-stone-900 mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Facebook
            </button>
            <button className="px-4 py-2 bg-sky-500 text-white text-sm rounded hover:bg-sky-600">
              Twitter
            </button>
            <button className="px-4 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-800">
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}