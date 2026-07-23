"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

// About section image slides.
const DEFAULT_SLIDES = [
  "/coporate-gifts/cards/1.png",
  "/coporate-gifts/cards/2.png",
  "/coporate-gifts/cards/3.png",
  "/coporate-gifts/cards/4.png",
  "/coporate-gifts/cards/5.png",
  "/coporate-gifts/cards/6.png",
];

export function AboutImageCarousel({
  slides = DEFAULT_SLIDES,
}: {
  slides?: string[];
}) {
  const SLIDES = slides;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((src, i) => (
            <div key={i} className="relative min-w-0 shrink-0 grow-0 basis-full">
              <div className="relative aspect-square w-full">
                <Image
                  src={src}
                  alt={`Plattera corporate gift hamper ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clickable dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected ? "w-5 bg-brand" : "w-1.5 bg-brand/25 hover:bg-brand/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
