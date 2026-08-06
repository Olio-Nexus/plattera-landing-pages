"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { SmoothLink } from "@/components/ui/smooth-link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function Header({
  nav = siteConfig.nav,
  brandName = siteConfig.name,
}: {
  nav?: NavItem[];
  brandName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white shadow-sm">
      <Container className="flex h-22 items-center justify-between gap-4">
        {/* Logo */}
        <SmoothLink
          href="#top"
          className="flex items-center gap-2"
          aria-label={brandName}
        >
          <Image
            src="/logo.png"
            alt={brandName}
            width={232}
            height={204}
            priority
            className="h-18 w-auto md:h-18"
          />
        </SmoothLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {nav.map((item) => (
            <SmoothLink key={item.href} href={item.href} className="nav-link">
              {item.label}
            </SmoothLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-md text-foreground lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-black/5 bg-white transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <SmoothLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="nav-link rounded-md px-2 py-2.5 text-left hover:bg-brand/5"
            >
              {item.label}
            </SmoothLink>
          ))}
        </Container>
      </div>
    </header>
  );
}
