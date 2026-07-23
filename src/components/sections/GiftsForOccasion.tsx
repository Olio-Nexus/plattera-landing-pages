/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/layout/Container";
import { AboutImageCarousel } from "./AboutImageCarousel";

const DEFAULT_SLIDES = [
  "/coporate-gifts/sec-about/1.png",
  "/coporate-gifts/sec-about/2.png",
  "/coporate-gifts/sec-about/3.png",
  "/coporate-gifts/sec-about/4.png",
  "/coporate-gifts/sec-about/5.png",
  "/coporate-gifts/sec-about/6.png",
];

const DEFAULT_POINTS = [
  "Find the perfect corporate gifts that fit your budget, whether you're looking for something affordable or a luxurious treat.",
  "Corporate Gifts Under Budget: Browse our selection of gifts under various budget ranges. This ensures you can find the perfect gift for employees while staying within your budget. Our diverse selection of the best gifts for clients ensures that you can find the ideal gift option for any occasion.",
  "Trending gifts: Celebrate occasions like Diwali, International Women's Day, New Year, and Christmas with our curated collection of new arrivals, carefully crafted gifts to capture the spirit of the season and make a memorable impression.",
];

const DEFAULT_HEADING = (
  <>
    <span className="italic text-brand">Corporate Gifts</span> For Your Various
    Occasion
  </>
);

export function GiftsForOccasion({
  heading = DEFAULT_HEADING,
  points = DEFAULT_POINTS,
  images = DEFAULT_SLIDES,
}: {
  /** Section heading (use a `<span className="italic text-brand">` accent). */
  heading?: React.ReactNode;
  /** Tick-list bullet points. */
  points?: React.ReactNode[];
  /** Image carousel slides on the right. */
  images?: string[];
} = {}) {
  return (
    <section id="various-occasion" className="section bg-white">
      <Container className="grid items-center gap-10 lg:grid-cols-[60fr_40fr] lg:gap-12">
        {/* Copy + tick list */}
        <div>
          <h2 className="h2 max-w-md">{heading}</h2>

          <ul className="mt-8 space-y-6">
            {points.map((point, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-lg bg-brand">
                  <img src="/tick.svg" alt="" className="size-6" />
                </span>
                <p className="description">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Image carousel */}
        <div>
          <AboutImageCarousel slides={images} />
        </div>
      </Container>
    </section>
  );
}
