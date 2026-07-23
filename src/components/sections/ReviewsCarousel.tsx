"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type Review = {
  quote: string;
  name: string;
  role: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "We would like to thank you for always being so professional and consistently meeting our expectations by going that extra mile to fulfill our service requests.",
    name: "Chaitali Bhati",
    role: "Khaitan & Co",
  },
  {
    quote:
      "Greetings! I received the Diwali hamper and want to say a hundred thanks for such a kind gesture. It was absolutely beautiful and the karaoke system was just what we needed, as if you had overheard us talking about it! Truly grateful. God bless.",
    name: "Avendus Client",
    role: "Avendus",
  },
  {
    quote:
      "I had the pleasure of using Plattera's services during my clinic relaunch. We ordered gifts like tote bags, customised coasters, bottles, and pens. The products were a huge success, everyone loved the designs and they were very well received. Plattera is a go-to solution for brand visibility and promotion. The team was professional, responsive, and ensured timely delivery. I highly recommend their services!",
    name: "Divya Srivastava",
    role: "Silver Lining Wellness Centre",
  },
  {
    quote:
      "The gifts have been an absolute hit! Everyone who's seen them has been thoroughly impressed and completely wowed! The response has been nothing short of fantastic.",
    name: "Senior RM",
    role: "ICICI",
  },
  {
    quote:
      "We loved the way the team coordinated this project & made all deliveries right on time, while we were sitting thousands of miles away from India. This level of professionalism is something that you experience on rare occasions. Each gift recipient was extremely happy and impressed with the hamper and its content. This is going to be one of the many projects that we would be doing together with Plattera. You guys are super creative, professional yet friendly! Be that way!",
    name: "Pravin",
    role: "Mauritius",
  },
  {
    quote:
      "Thank you so much for the wonderful wedding favours for my son's wedding! Your involvement throughout has been unparalleled and I have no words to fully express my gratitude for the love & care that you have poured into each and every hamper. Not to forget, your amazing attention to the smallest details. My wedding celebrations would have been incomplete had it not been for Plattera's beautiful Wedding Favours, delivered to all my dear ones.",
    name: "Amrita",
    role: "New Jersey",
  },
  {
    quote:
      "Plattera curated a beautiful last-minute gift hamper for my niece, and she absolutely loved it! Every item was thoughtfully chosen and uniquely special, making the entire hamper truly memorable. I genuinely appreciate the prompt response and outstanding service.",
    name: "Namitta Kulkarni",
    role: "Green Digital",
  },
  {
    quote:
      "I recently used Plattera's services for a special personal occasion. The gift hamper was beautifully done and, importantly, arrived safely. Plattera has a committed and professional team. My overall experience was very good. Wishing them continued success!",
    name: "Kumar Venkat",
    role: "IBM",
  },
];

function Avatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-medium text-white">
      {initial}
    </span>
  );
}

export function ReviewsCarousel({
  background = "bg-[#FBEAEA]",
}: {
  /** Section background utility class. Defaults to the pink band. */
  background?: string;
} = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="testimonials" className={cn("section", background)}>
      <Container>
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="h2">
            What Our Client Says
            <br />
            About <span className="italic text-brand">Plattera.</span>
          </h2>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={scrollPrev}
              className="grid size-11 place-items-center rounded-full border border-black/15 text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={scrollNext}
              className="grid size-11 place-items-center rounded-full border border-black/15 text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="min-w-0 shrink-0 grow-0 basis-[88%] pr-4 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="description mt-4 flex-1">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar name={review.name} />
                    <div>
                      <p className="font-heading text-[15px] font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-[12px] text-[#737373]">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
