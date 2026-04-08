# Quick Customization Guide

## Change Store Name (LUXEGEMS → Your Brand)

### Step 1: Edit Navigation
**File:** `src/components/ui/navigation.tsx`

Find and replace:
```tsx
<span className="text-2xl font-light tracking-widest text-stone-900">
  LUXE
</span>
<span className="text-2xl font-extralight tracking-widest text-amber-600">
  GEMS
</span>
```

### Step 2: Edit Footer
**File:** `src/components/ui/footer.tsx`

Same changes as navigation.

### Step 3: Edit SEO
**File:** `src/app/layout.tsx`

```tsx
title: {
  default: "YOUR BRAND - Premium Jewelry | ...",
  template: "%s | YOUR BRAND",
},
```

---

## Change Colors

### Primary Accent Color (Gold/Amber)
**File:** `src/app/globals.css`

Search for `amber` and replace with your color:
- `amber-600` → `violet-600` (purple)
- `amber-500` → `pink-500` (pink)
- `amber-400` → `blue-400` (blue)

### Background Colors
```css
body {
  background: #ffffff;  /* White background */
  color: #171717;       /* Dark text */
}
```

---

## Change Images

### Hero Image (Homepage)
**File:** `src/app/page.tsx`

Find the Image with `alt="Luxury Jewelry"` and replace the `src` URL.

### Category Images
Same file, find category cards section.

### Product Images
For database products, add images to `product_image` table.

For mock data, edit the `images` array:
```tsx
images: [{ 
  pm_image: "https://your-image-url.jpg",
  pm_status: "1" 
}],
```

---

## Add New Page

1. Create folder: `src/app/my-page/`
2. Create file: `src/app/my-page/page.tsx`
3. Add content:

```tsx
export default function MyPage() {
  return <div><h1>My New Page</h1></div>;
}
```

4. Add to navigation if needed.

---

## Change Payment Methods

**File:** `src/app/checkout/page.tsx`

Find the payment section and modify:
```tsx
<label className="flex items-center gap-4 p-4 border...">
  <input type="radio" name="payment" value="upi" />
  <Smartphone className="h-6 w-6" />
  <div>
    <p className="font-medium">UPI</p>
    <p className="text-sm">Google Pay, PhonePe, Paytm</p>
  </div>
</label>
```

---

## Change Currency Format

**File:** `src/lib/utils.ts`

```tsx
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",  // Change to USD, EUR, etc.
    minimumFractionDigits: 0,
  }).format(numPrice);
}
```

Also update ₹ symbol in:
- `src/app/checkout/page.tsx`
- `src/app/cart/page.tsx`
- `src/app/admin/...` (admin pages)

---

## Change Shipping Settings

**File:** `src/lib/utils.ts`

```tsx
// Find this function and update the value
export const defaultShippingCharge = 99;  // ₹99 shipping
export const freeShippingThreshold = 999; // Free above ₹999
```

---

## Add New Category

1. **Database:** Insert into `category` table
2. **Navigation:** Edit `src/components/ui/navigation.tsx`
3. **Footer:** Edit `src/components/ui/footer.tsx`
4. **Homepage:** Edit category list in `src/app/page.tsx`

---

## Modify Product Card Styles

**File:** `src/components/ui/product-card.tsx`

Key CSS classes to modify:
- `group` - Adds hover effects
- `hover:border-amber-200` - Border on hover
- `hover:shadow-xl` - Shadow on hover
- `transition-all duration-500` - Animation speed

---

## Change Font Family

**File:** `src/app/layout.tsx`

```tsx
import { Playfair_Display, Inter } from "next/font/google";

// Serif for headings (e.g., Playfair, Merriweather)
const playfair = Playfair_Display({ subsets: ["latin"] });

// Sans-serif for body (e.g., Inter, Open Sans)  
const inter = Inter({ subsets: ["latin"] });
```

Available Google Fonts: https://fonts.google.com

---

## Add Social Media Links

**File:** `src/components/ui/footer.tsx`

```tsx
<div className="flex items-center gap-2">
  <a href="YOUR_FACEBOOK_URL" className="...">FB</a>
  <a href="YOUR_INSTAGRAM_URL" className="...">IG</a>
  <a href="YOUR_TWITTER_URL" className="...">X</a>
</div>
```

---

## Change API Endpoints

**Products API:** `src/app/api/products/route.ts`

Modify SQL query to add/remove fields:
```sql
SELECT p.*, c.cat_name as category_name,
       (SELECT pm_image FROM product_image WHERE pm_pid = p.p_id LIMIT 1) as main_image
FROM product p
LEFT JOIN category c ON p.p_catid = c.cat_id
WHERE p.p_status = 1
```

---

## Quick Copy-Paste Snippets

### Add a New Button
```tsx
import { Button } from "@/components/ui/button";
<Button variant="gold" size="lg">Click Me</Button>
```

### Add a Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Add a Badge
```tsx
import { Badge } from "@/components/ui/badge";
<Badge variant="gold">New</Badge>
```

### Format Price
```tsx
import { formatPrice } from "@/lib/utils";
<span>{formatPrice(999)}</span>  // Output: ₹999
```

### Link to Product
```tsx
import Link from "next/link";
<Link href={`/products/${product.id}`}>View Product</Link>
```

---

## File Reference Guide

| What You Want | File to Edit |
|--------------|--------------|
| Store name/logo | `navigation.tsx`, `footer.tsx`, `layout.tsx` |
| Colors | `globals.css` |
| Fonts | `layout.tsx` |
| Homepage content | `page.tsx` |
| Products page | `products/page.tsx` |
| Product card | `product-card.tsx` |
| Cart page | `cart/page.tsx` |
| Checkout page | `checkout/page.tsx` |
| Admin sidebar | `admin/sidebar.tsx` |
| Admin dashboard | `admin/page.tsx` |
| Database connection | `db.ts` |
| Price formatting | `utils.ts` |
| API routes | `app/api/...` |
