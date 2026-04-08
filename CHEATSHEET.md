# Component Cheatsheet

## Button
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Default Button</Button>
<Button variant="gold">Gold Button</Button>
<Button variant="secondary">Dark Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>

<Button size="sm">Small</Button>
<Button size="default">Medium</Button>
<Button size="lg">Large</Button>

<Button asChild><a href="/link">Link Button</a></Button>
```

## Card
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <p>Footer content</p>
  </CardFooter>
</Card>

<Card hover>With hover effect</Card>
<Card glow>With glow effect</Card>
```

## Badge
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="gold">Gold</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="discount">20% OFF</Badge>
<Badge variant="new">New</Badge>
<Badge variant="bestseller">Bestseller</Badge>

<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>
```

## Input
```tsx
import { Input, Textarea, Select } from "@/components/ui/input";

<Input label="Email" type="email" placeholder="Enter email" />
<Input label="Password" type="password" error="Invalid password" />

<Textarea label="Message" placeholder="Your message" />
<Textarea label="Description" error="Too short" />

<Select 
  label="Category"
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>
```

## Product Card
```tsx
import { ProductCard } from "@/components/ui/product-card";

<ProductCard product={productData} />

<ProductCard product={productData} variant="default" />
<ProductCard product={productData} variant="horizontal" />
<ProductCard product={productData} variant="compact" />
<ProductCard product={productData} variant="featured" />
```

## Dialog/Modal
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content here</p>
  </DialogContent>
</Dialog>
```

---

# Utility Functions

## formatPrice
```tsx
import { formatPrice } from "@/lib/utils";

formatPrice(1256)        // ₹1,256
formatPrice("1256.50")   // ₹1,257
formatPrice(999999)      // ₹9,99,999
```

## cn (classnames)
```tsx
import { cn } from "@/lib/utils";

cn("text-red-500", condition && "font-bold")
// Returns: "text-red-500 font-bold" or "text-red-500"
```

## slugify
```tsx
import { slugify } from "@/lib/utils";

slugify("Hello World")    // "hello-world"
slugify("Product Name!")  // "product-name"
```

## getStockStatus
```tsx
import { getStockStatus } from "@/lib/utils";

getStockStatus(0)   // { label: "Out of Stock", color: "text-red-600" }
getStockStatus(3)   // { label: "Only 3 left", color: "text-orange-600" }
getStockStatus(10)  // { label: "In Stock", color: "text-green-600" }
```

## getOrderStatus
```tsx
import { getOrderStatus } from "@/lib/utils";

getOrderStatus("1") // Pending
getOrderStatus("2") // Processing
getOrderStatus("3") // Shipped
getOrderStatus("4") // Delivered
getOrderStatus("5") // Cancelled
```

---

# Tailwind CSS Quick Reference

## Colors
| Color | Classes |
|-------|---------|
| White | `bg-white`, `text-white` |
| Black | `bg-black`, `text-black` |
| Gray | `bg-gray-500`, `text-gray-500` |
| Stone | `bg-stone-500`, `text-stone-500` |
| Amber | `bg-amber-500`, `text-amber-500` |
| Red | `bg-red-500`, `text-red-500` |
| Green | `bg-green-500`, `text-green-500` |
| Blue | `bg-blue-500`, `text-blue-500` |

## Sizes (100 = 25rem/400px)
| Class | Value |
|-------|-------|
| `w-1` to `w-96` | Width |
| `h-1` to `h-96` | Height |
| `p-1` to `p-8` | Padding |
| `m-1` to `m-8` | Margin |
| `text-xs` to `text-5xl` | Font size |
| `rounded-sm` to `rounded-full` | Border radius |

## Flexbox
```tsx
<div className="flex">Flex container</div>
<div className="flex-col">Column flex</div>
<div className="items-center">Center vertically</div>
<div className="justify-center">Center horizontally</div>
<div className="justify-between">Space between</div>
<div className="gap-4">Gap between items</div>
```

## Grid
```tsx
<div className="grid grid-cols-2">2 columns</div>
<div className="grid grid-cols-3">3 columns</div>
<div className="grid grid-cols-4">4 columns</div>
<div className="grid-cols-1 md:grid-cols-2">Responsive</div>
```

## Spacing
| Class | Value |
|-------|-------|
| `p-4` | padding: 1rem |
| `px-4` | padding-left/right: 1rem |
| `py-4` | padding-top/bottom: 1rem |
| `m-4` | margin: 1rem |
| `mx-auto` | margin-left/right: auto |
| `mt-4` | margin-top: 1rem |

## Typography
```tsx
<p className="text-sm">Small text</p>
<p className="text-lg">Large text</p>
<p className="font-bold">Bold</p>
<p className="font-light">Light</p>
<p className="text-center">Center align</p>
<p className="uppercase">UPPERCASE</p>
<p className="tracking-widest">Letter spacing</p>
```

## Effects
```tsx
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
<div className="rounded">Border radius</div>
<div className="rounded-full">Circle/Pill shape</div>
<div className="opacity-50">50% opacity</div>
<div className="grayscale">Grayscale filter</div>
```

## Responsive
| Prefix | Breakpoint |
|--------|-------------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

---

# Icon Reference

All icons from `lucide-react`:

```tsx
import { 
  ShoppingBag, Heart, User, Search, Menu, X,
  Plus, Minus, Trash2, Edit, Eye,
  ChevronDown, ChevronRight, ChevronLeft,
  ArrowRight, ArrowLeft, Check,
  Star, Sparkles, Gem, Crown,
  Truck, Shield, RefreshCw,
  Mail, Phone, MapPin, Clock,
  Settings, LogOut, Dashboard
} from "lucide-react";

// Usage
<ShoppingBag className="h-6 w-6" />
<Heart className="h-5 w-5 text-red-500" />
```

Full icon list: https://lucide.dev/icons

---

# Database Tables Reference

| Table | Fields | Purpose |
|-------|---------|---------|
| `product` | p_id, p_name, p_price, p_discount, p_description, p_catid | Products |
| `product_image` | pm_id, pm_pid, pm_image | Product images |
| `category` | cat_id, cat_name, cat_image | Categories |
| `order` | order_id, order_nuid, order_total, order_status | Orders |
| `new_user` | nu_id, nu_name, nu_email, nu_number | Customers |
| `shipping_details` | spp_id, spp_name, spp_address, spp_city | Addresses |
| `coupon_code` | cc_id, cc_code, cc_amount, cc_status | Discount codes |
| `review` | re_id, re_pid, re_name, re_desc | Product reviews |
| `cartdetails` | cd_id, cd_pid, cd_price, cd_qty | Cart items |

---

# File Paths Quick Reference

| What | Path |
|------|------|
| Homepage | `src/app/page.tsx` |
| Products | `src/app/products/page.tsx` |
| Product Detail | `src/app/products/[id]/page.tsx` |
| Cart | `src/app/cart/page.tsx` |
| Checkout | `src/app/checkout/page.tsx` |
| About | `src/app/about/page.tsx` |
| Contact | `src/app/contact/page.tsx` |
| Admin Dashboard | `src/app/admin/page.tsx` |
| Admin Products | `src/app/admin/products/page.tsx` |
| Admin Orders | `src/app/admin/orders/page.tsx` |
| Button Component | `src/components/ui/button.tsx` |
| Card Component | `src/components/ui/card.tsx` |
| Badge Component | `src/components/ui/badge.tsx` |
| Navigation | `src/components/ui/navigation.tsx` |
| Footer | `src/components/ui/footer.tsx` |
| Database | `src/lib/db.ts` |
| Utilities | `src/lib/utils.ts` |
| Styles | `src/app/globals.css` |
| SEO Config | `src/app/layout.tsx` |
