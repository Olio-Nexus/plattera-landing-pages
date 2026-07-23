"use client";

import { createContext, useContext, useState } from "react";
import { BrochureModal } from "./BrochureModal";

type BrochureCtx = { open: () => void };

const Ctx = createContext<BrochureCtx>({ open: () => {} });

export const useBrochure = () => useContext(Ctx);

/**
 * Wrap a page with this and pass the page-specific PDF.
 * The header's "Download Brochure" button calls useBrochure().open().
 */
export function BrochureProvider({
  brochureUrl,
  children,
}: {
  brochureUrl: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <BrochureModal
        open={open}
        onClose={() => setOpen(false)}
        brochureUrl={brochureUrl}
      />
    </Ctx.Provider>
  );
}
