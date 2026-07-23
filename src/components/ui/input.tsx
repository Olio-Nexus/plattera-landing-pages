import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Field spec: 48px tall, #FAFAFA bg, 1px #E6E6E6 border, 8px radius,
        // padding 14/14/14/12, 14px text #1A1A1A, placeholder #737373.
        "h-12 w-full min-w-0 rounded-[8px] border border-[#E6E6E6] bg-[#FAFAFA] pt-3.5 pr-3.5 pb-3.5 pl-3 text-[14px] text-[#1A1A1A] transition-colors outline-none placeholder:text-[#737373] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
