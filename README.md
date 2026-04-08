# LUXEGEMS - Jewelry E-Commerce Template

A premium, fully-responsive jewelry e-commerce platform built with Next.js 16, Tailwind CSS, and MySQL.

## Quick Links
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customization Guide](#customization-guide)
- [Database Setup](#database-setup)
- [Components](#components)
- [Pages](#pages)
- [Admin Panel](#admin-panel)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [FAQ](#faq)

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- XAMPP (for MySQL database)
- Code editor (VS Code recommended)

### Installation

1. **Navigate to project folder:**
   ```bash
   cd home-holly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
home-holly/
├── src/
│   ├── app/                    # All pages (Next.js App Router)
│   │   ├── page.tsx            # Homepage
│   │   ├── products/            # Products listing page
│   │   │   └── [id]/          # Product detail page
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/            # Checkout page
│   │   ├── about/              # About us page
│   │   ├── contact/            # Contact page
│   │   ├── privacy-policy/     # Privacy page
│   │   ├── terms-conditions/   # Terms page
│   │   ├── admin/              # Admin panel
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── products/       # Product management
│   │   │   ├── orders/         # Order management
│   │   │   ├── seo/            # SEO settings
│   │   │   ├── sliders/        # Banner management
│   │   │   └── settings/       # Store settings
│   │   └── api/                # API routes
│   │       ├── products/       # Products API
│   │       ├── categories/     # Categories API
│   │       └── orders/         # Orders API
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # UI components
│   │   │   ├── button.tsx      # Buttons
│   │   │   ├── card.tsx        # Cards
│   │   │   ├── badge.tsx       # Badges/Tags
│   │   │   ├── input.tsx       # Form inputs
│   │   │   ├── dialog.tsx      # Modal dialogs
│   │   │   ├── navigation.tsx  # Header/Navbar
│   │   │   ├── footer.tsx     # Footer
│   │   │   └── product-card.tsx # Product display
│   │   └── admin/              # Admin components
│   │       └── sidebar.tsx     # Admin sidebar
│   │
│   ├── lib/                    # Utility functions
│   │   ├── utils.ts            # Helper functions
│   │   └── db.ts              # Database connection
│   │
│   └── types/                  # TypeScript types
│       └── index.ts            # All type definitions
│
├── public/                     # Static files (images, etc.)
├── .env.local                 # Environment variables
├── next.config.ts              # Next.js config
└── package.json               # Dependencies
```

---

## Customization Guide

### 1. Changing Brand Name & Logo

**To change the store name "LUXEGEMS":**

1. **Header/Navigation** - Open `src/components/ui/navigation.tsx`:
   ```tsx
   // Change these lines:
   <span className="text-2xl font-light tracking-widest text-stone-900">
     LUXE  // Change to your brand name
   </span>
   <span className="text-2xl font-extralight tracking-widest text-amber-600">
     GEMS   // Change to your brand name
   </span>
   
   // Change the Sparkles icon to your logo:
   import { YourLogo } from "lucide-react";
   <YourLogo className="h-8 w-8 text-amber-600" />
   ```

2. **Footer** - Open `src/components/ui/footer.tsx`:
   ```tsx
   // Same changes as navigation
   ```

3. **SEO Title** - Open `src/app/layout.tsx`:
   ```tsx
   export const metadata: Metadata = {
     title: {
       default: "YOUR BRAND NAME - Premium Jewelry | Gold, Silver & Artificial Jewellery",
       template: "%s | YOUR BRAND NAME",
     },
     // ... other metadata
   };
   ```

### 2. Changing Colors

The theme uses a **stone** color palette (warm grays) with **amber** (gold) accents.

**To change colors, edit `src/app/globals.css`:**

```css
/* Main accent color (currently amber/gold) */
--color-accent: #d97706;  /* Change to your preferred color */

/* Background colors */
--color-background: #ffffff;
--color-foreground: #171717;
```

**In Tailwind classes:**
- `text-amber-600` / `bg-amber-600` → Change to `text-violet-600` etc.
- `text-stone-900` → Change to `text-slate-900` etc.

**Color meanings in the template:**
| Color | Usage |
|-------|-------|
| `stone` | Backgrounds, text, borders |
| `amber` | Primary accent, CTAs, highlights |
| `rose` | Discount badges, hearts |
| `green` | Success, in-stock |
| `red` | Errors, out-of-stock |

### 3. Changing Fonts

**Open `src/app/layout.tsx`:**

```tsx
import { Playfair_Display, Inter } from "next/font/google";

// Choose fonts from https://fonts.google.com
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",  // Serif font for headings
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",  // Sans-serif for body text
});
```

**Apply fonts in `globals.css`:**
```css
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), serif;
}
```

### 4. Adding/Changing Product Images

**Image locations:**
- `public/uploads/` - Uploaded product images
- Unsplash URLs - Used for mock data

**To use local images:**
1. Add images to `public/uploads/` folder
2. Reference as: `/uploads/your-image.jpg`

**For external images (Unsplash, etc.):**
Update `next.config.ts`:
```ts
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "your-cdn.com",  // Add your image CDN
    },
  ],
},
```

### 5. Changing Products Data

**Option A: Using Mock Data (Current)**
Edit the mock data arrays at the top of each page file:
```tsx
const mockProducts: Product[] = [
  {
    p_id: 1,
    p_name: "Your Product Name",  // Change product name
    p_price: "999",              // Price in INR
    p_discount: "10",             // Discount percentage
    // ... other fields
  },
];
```

**Option B: Using Database**
See [Database Setup](#database-setup) section.

---

## Database Setup

### 1. Import Your Database

1. Open **phpMyAdmin** (http://localhost/phpmyadmin)
2. Click "Import" tab
3. Select your SQL file: `kashiad32ssas_home_holly.sql`
4. Click "Go"

### 2. Configure Connection

**Open `src/.env.local`:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root          # Your MySQL username
DB_PASSWORD=           # Your MySQL password (empty for XAMPP default)
DB_NAME=kashiad32ssas_home_holly
```

### 3. Using the Database

The template is set up to work with your existing database structure:

**Fetch Products:**
```typescript
// src/app/api/products/route.ts
const products = await query(`
  SELECT p.*, c.cat_name as category_name
  FROM product p
  LEFT JOIN category c ON p.p_catid = c.cat_id
`);
```

**Key Tables:**
| Table | Purpose |
|-------|---------|
| `product` | Product details |
| `product_image` | Product images |
| `category` | Product categories |
| `order` | Customer orders |
| `new_user` | Customer accounts |
| `review` | Product reviews |
| `coupon_code` | Discount coupons |

---

## Components

### Button Component

**Location:** `src/components/ui/button.tsx`

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

// Variants
<Button variant="default">Default</Button>
<Button variant="gold">Gold (Primary)</Button>
<Button variant="secondary">Dark</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Medium</Button>
<Button size="lg">Large</Button>

// As Link
<Button asChild><Link href="/products">Shop Now</Link></Button>
```

### Card Component

**Location:** `src/components/ui/card.tsx`

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card hover glow>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content here
  </CardContent>
</Card>
```

### Badge Component

**Location:** `src/components/ui/badge.tsx`

**Usage:**
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="gold">Gold</Badge>
<Badge variant="discount">20% OFF</Badge>
<Badge variant="success">In Stock</Badge>
<Badge variant="error">Out of Stock</Badge>
```

### Input Components

**Location:** `src/components/ui/input.tsx`

**Usage:**
```tsx
import { Input, Textarea, Select } from "@/components/ui/input";

<Input 
  label="Email" 
  type="email" 
  placeholder="Enter email"
  error="Invalid email"  // Shows error message
/>

<Textarea 
  label="Message" 
  placeholder="Your message"
/>

<Select 
  label="Category"
  options={[
    { value: "1", label: "Necklaces" },
    { value: "2", label: "Earrings" },
  ]}
/>
```

### Product Card

**Location:** `src/components/ui/product-card.tsx`

**Usage:**
```tsx
import { ProductCard } from "@/components/ui/product-card";

<ProductCard 
  product={productData}  // Product object
  variant="default"      // default | horizontal | compact | featured
/>
```

---

## Pages

### Creating a New Page

1. Create a folder in `src/app/`
2. Add a `page.tsx` file
3. Add metadata for SEO:

```tsx
// src/app/my-new-page/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Brand Name",
  description: "Page description for search engines",
};

export default function MyNewPage() {
  return (
    <div>
      <h1>My Page Content</h1>
    </div>
  );
}
```

### Homepage (`/`)

**File:** `src/app/page.tsx`

Contains:
- Hero section with background image
- Category grid
- Featured products section
- Banner/promotion section
- New arrivals
- Features grid
- Testimonials
- Newsletter signup

### Products Page (`/products`)

**File:** `src/app/products/page.tsx`

Features:
- Product grid/list view toggle
- Category filters
- Price range filters
- Sort options
- Pagination

### Product Detail (`/products/[id]`)

**File:** `src/app/products/[id]/page.tsx`

Features:
- Image gallery with thumbnails
- Product info (name, price, rating)
- Quantity selector
- Add to cart/wishlist
- Product description
- Customer reviews

### Cart (`/cart`)

**File:** `src/app/cart/page.tsx`

Features:
- Cart items list
- Quantity update
- Remove items
- Coupon code
- Order summary
- Proceed to checkout

### Checkout (`/checkout`)

**File:** `src/app/checkout/page.tsx`

Features:
- Shipping address form
- Indian states dropdown
- Payment method selection (UPI, COD, Cards, Net Banking)
- Order confirmation

---

## Admin Panel

**URL:** http://localhost:3000/admin

### Dashboard (`/admin`)

Overview with:
- Total products, orders, customers, revenue
- Recent orders table
- Low stock alerts
- Quick action buttons

### Products Management (`/admin/products`)

- View all products in table
- Search by name/SKU
- Filter by category/status
- Bulk delete
- Add new product
- Edit existing product

### Add/Edit Product (`/admin/products/new`)

Fields:
- Product name
- SKU code
- Price & discount
- Category selection
- Stock quantity
- Product images (multiple)
- Description
- SEO meta tags

### Orders (`/admin/orders`)

- View all orders
- Filter by status (Pending, Processing, Shipped, Delivered)
- Filter by payment status
- Order details view
- Update order status

### SEO Settings (`/admin/seo`)

- Per-page SEO configuration
- Meta title & description
- Keywords
- Open Graph (social sharing) settings
- Search preview

### Sliders/Banners (`/admin/sliders`)

- View all banners
- Add new banner
- Upload images
- Set links
- Toggle active/inactive
- Drag to reorder

### Settings (`/admin/settings`)

- General: Store name, email, phone, address
- Shipping: Free shipping threshold, charges
- Payment: Enable/disable payment methods
- Notifications: Email alerts
- Security: Password change, 2FA

---

## API Routes

### Products API

**GET `/api/products`**
```bash
# Get all products
curl http://localhost:3000/api/products

# Filter by category
curl "http://localhost:3000/api/products?category=necklaces"

# Pagination
curl "http://localhost:3000/api/products?limit=10&offset=0"
```

**GET `/api/products/[id]`**
```bash
# Get single product
curl http://localhost:3000/api/products/1
```

### Categories API

**GET `/api/categories`**
```bash
curl http://localhost:3000/api/categories
```

### Orders API

**GET `/api/orders`**
```bash
# All orders
curl http://localhost:3000/api/orders

# Filter by status
curl "http://localhost:3000/api/orders?status=1"
```

**POST `/api/orders`**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "1",
    "items": [...],
    "shipping_address": {...},
    "payment_method": "upi",
    "total": 2500
  }'
```

---

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
5. Deploy

### Database for Production

For production, use a cloud database like:
- **PlanetScale** (MySQL, free tier)
- **Railway** (MySQL, pay-as-you-go)
- **AWS RDS** (MySQL)

Update `.env.local` with cloud database credentials.

---

## FAQ

### Q: How do I add a new product category?

1. Add to database: `category` table
2. Update navigation: `src/components/ui/navigation.tsx`
3. Update footer: `src/components/ui/footer.tsx`

### Q: How do I change the hero image?

Open `src/app/page.tsx` and find:
```tsx
<Image
  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920"
  alt="Luxury Jewelry"
  fill
  className="object-cover"
/>
```
Replace the URL with your image.

### Q: How do I enable Cash on Delivery?

1. Go to `/admin/settings`
2. Navigate to "Payment" tab
3. Enable "Cash on Delivery"

### Q: How do I add a coupon code?

1. Go to `/admin/coupons`
2. Click "Add Coupon"
3. Enter code, discount amount, validity dates

### Q: How do I change the currency?

All prices use INR. To change:

1. `src/lib/utils.ts`:
```tsx
export function formatPrice(price: number | string): string {
  // Change "en-IN" and "INR" to your locale
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",  // Change to your currency
    minimumFractionDigits: 0,
  }).format(numPrice);
}
```

2. Update all ₹ symbols in the code to your currency symbol

### Q: How do I add more payment methods?

1. Edit `src/app/checkout/page.tsx`
2. Add new payment option in the payment methods section
3. Create API endpoint for payment processing

### Q: How do I customize the email templates?

Email templates are not yet implemented. You'll need to:
1. Install an email service like Resend, SendGrid, or Nodemailer
2. Create API routes for sending emails
3. Trigger emails on order placement, status updates, etc.

### Q: How do I add more languages?

1. Install next-intl: `npm install next-intl`
2. Follow their [documentation](https://next-intl-docs.vercel.app/)
3. Wrap content with translation components

### Q: How do I add a blog?

1. Create `src/app/blog/page.tsx`
2. Add blog posts to database
3. Create individual blog pages: `/blog/[slug]`
4. Add to navigation

---

## Troubleshooting

### "Cannot connect to database"
- Check XAMPP MySQL is running
- Verify credentials in `.env.local`
- Check database name matches exactly

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and reinstall

### Build errors
- Check TypeScript types are correct
- Run `npm run lint` to see warnings

### Images not loading
- Check image URLs are correct
- Verify images are in `public/` folder
- Check `next.config.ts` for remote patterns

---

## Support

For issues or questions:
1. Check this documentation
2. Search for similar issues online
3. Consult Next.js documentation: https://nextjs.org/docs

---

**Last Updated:** April 2026  
**Version:** 1.0.0  
**Compatible with:** Next.js 16+, React 18+, Node.js 18+
