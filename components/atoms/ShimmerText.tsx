"use client";

import { memo } from "react";
import { cn } from "@/utils/cn";

function ShimmerTextComponent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        "bg-[linear-gradient(110deg,#0F172A_35%,#06B6D4_50%,#0F172A_65%)]",
        "bg-[length:250%_100%] animate-shimmer",
        className
      )}
    >
      {children}
    </span>
  );
}

export const ShimmerText = memo(ShimmerTextComponent);
