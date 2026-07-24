"use client";

import { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { SmoothLink } from "@/components/ui/smooth-link";
import { cn } from "@/lib/utils";

const SLIDES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  src: `/coporate-gifts/cursoal/${i + 1}.png`,
  alt: `Corporate gift set ${i + 1}`,
}));

const DEFAULT_HEADING = (
  <>
    Browse Our <span className="italic text-brand">Corporate Gifts</span>
    <br className="hidden sm:block" /> Collection
  </>
);

export function ProductsCarousel({
  heading = DEFAULT_HEADING,
  description = "Discover the perfect gift for every occasion. Explore our corporate gifting solutions",
  slides = SLIDES,
  ctaLabel = "Contact Us",
  ctaHref = "#top",
}: {
  /** Section heading (use a `<span className="italic text-brand">` accent). */
  heading?: React.ReactNode;
  /** Sub-copy under the heading. */
  description?: React.ReactNode;
  /** Carousel slides. */
  slides?: { id: number; src: string; alt: string }[];
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="products" className="section bg-white">
      <Container>
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="h2">{heading}</h2>
            <p className="description mt-3 max-w-md">{description}</p>
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={scrollPrev}
              className="grid size-11 place-items-center rounded-full border border-[#E6E6E6] text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={scrollNext}
              className="grid size-11 place-items-center rounded-full border border-[#E6E6E6] text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pr-3 sm:basis-1/2 lg:basis-1/4"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <SmoothLink href={ctaHref} className={cn(buttonVariants(), "h-11 px-6")}>
            {ctaLabel}
          </SmoothLink>
        </div>
      </Container>
    </section>
  );
}
