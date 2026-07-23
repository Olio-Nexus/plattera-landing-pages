"use client";

import NextLink from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { cn } from "@/lib/utils";

// The header is sticky (~100px tall) — offset so the scrolled-to section
// isn't hidden underneath it.
const HEADER_OFFSET = -100;

type SmoothLinkProps = {
  /** In-page anchor ("#about") → smooth scroll; anything else → a route. */
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export function SmoothLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: SmoothLinkProps) {
  // In-page anchors get react-scroll smooth behaviour.
  if (href.startsWith("#")) {
    return (
      <ScrollLink
        to={href.slice(1)}
        smooth
        duration={500}
        offset={HEADER_OFFSET}
        className={cn("cursor-pointer", className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ScrollLink>
    );
  }

  // Real routes fall back to next/link.
  return (
    <NextLink href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </NextLink>
  );
}
