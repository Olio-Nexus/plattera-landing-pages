import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrochureProvider } from "@/components/brochure/BrochureProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Thank You — Plattera",
  description:
    "Thanks for reaching out to Plattera. Our gifting team will be in touch shortly.",
  robots: { index: false }, // conversion page — keep out of search
};

export default function ThankYouPage() {
  return (
    <BrochureProvider brochureUrl="/brochures/corporate-gifts.pdf">
      <Header />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-brand/[0.06] via-white to-white px-6 py-24 text-center">
        {/* Soft brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Success badge */}
          <span className="grid size-20 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/30">
            <Check className="size-9" strokeWidth={3} />
          </span>

          <h1 className="mt-8 font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Thank You!
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/60">
            We&apos;ve received your details. Our gifting team will reach out to
            you shortly.
          </p>

          {/* Actions */}
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/" className={cn(buttonVariants(), "h-12 px-7")}>
              Back to Home
            </Link>
            <a
              href="https://www.instagram.com/plattera.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "h-12 px-7")}
            >
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </BrochureProvider>
  );
}
