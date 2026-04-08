import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-xs font-medium tracking-wider uppercase",
  {
    variants: {
      variant: {
        default: "bg-stone-900 text-white px-3 py-1",
        gold: "bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-900 px-3 py-1",
        outline: "border border-stone-300 text-stone-700 px-3 py-1",
        secondary: "bg-stone-100 text-stone-800 px-3 py-1",
        success: "bg-green-100 text-green-800 px-3 py-1",
        warning: "bg-yellow-100 text-yellow-800 px-3 py-1",
        error: "bg-red-100 text-red-800 px-3 py-1",
        discount: "bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1",
        new: "bg-stone-900 text-white px-3 py-1",
        bestseller: "bg-amber-100 text-amber-800 px-3 py-1",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] px-2 py-0.5",
        lg: "text-sm px-4 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
