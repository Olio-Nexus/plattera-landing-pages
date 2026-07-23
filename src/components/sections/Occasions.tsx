import { Container } from "@/components/layout/Container";
import { AboutImageCarousel } from "./AboutImageCarousel";

const SLIDES = [
  "/coporate-gifts/variation/1.png",
  "/coporate-gifts/variation/2.png",
  "/coporate-gifts/variation/3.png",
  "/coporate-gifts/variation/4.png",
  "/coporate-gifts/variation/5.png",
  "/coporate-gifts/variation/6.png",
];

const TAGS = [
  "Promotional Gifts",
  "Branded Merchandise",
  "Theme based Gift Hampers",
  "Annual Birthdays & Anniversaries",
  "Welcome /Onboarding Kits",
  "Festive Gifting",
  "Long Service Awards",
  "Reward & Recognition Giveaways",
  "Gifts for Annual Events, Conferences, Townhalls",
];

export function Occasions() {
  return (
    <section id="occasions" className="section bg-white">
      <Container className="grid items-center gap-10 lg:grid-cols-[60fr_40fr] lg:gap-12">
        {/* Copy + tags */}
        <div>
          <h2 className="h2 max-w-md">
            <span className="italic text-brand">Corporate Gifts</span> for Various
            Occasions
          </h2>

          <p className="description mt-4 max-w-xl">
            Plattera provides the best gift for employees and clients for various
            occasions, ensuring you can celebrate and appreciate your employees
            year-round. Elevate the gifting experience for your employees, clients
            &amp; business partners with our holistic services – Customization,
            Styling, Branding &amp; Delivery.
          </p>

          {/* Occasion tags */}
          <div className="mt-7 flex flex-wrap gap-3">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex cursor-default items-center rounded-full bg-brand px-4 py-2 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand/85 hover:shadow-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Image carousel */}
        <div>
          <AboutImageCarousel slides={SLIDES} />
        </div>
      </Container>
    </section>
  );
}
