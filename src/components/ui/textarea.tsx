import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Matches the input field spec (#FAFAFA bg, #E6E6E6 border, 8px radius).
        "flex field-sizing-content min-h-25 w-full rounded-[8px] border border-[#E6E6E6] bg-[#FAFAFA] px-3 py-3.5 text-[14px] text-[#1A1A1A] transition-colors outline-none placeholder:text-[#737373] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
