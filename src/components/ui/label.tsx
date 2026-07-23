"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        // Field title spec: Mona Sans 500, 14px, line-height 100%,
        // letter-spacing -0.25px, capitalize, #1A1A1A.
        "flex items-center gap-2 font-body text-[14px] md:text-[15px] leading-none font-medium tracking-[-0.25px] capitalize text-[#1A1A1A] select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
