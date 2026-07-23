/* eslint-disable @next/next/no-img-element */
import { Container } from "@/components/layout/Container";

// Logo cards live in /public/trusted (logo-1.svg … logo-30.svg).
const LOGOS = Array.from({ length: 30 }, (_, i) => `/trusted/logo-${i + 1}.svg`);
const ROW_1 = LOGOS.slice(0, 15);
const ROW_2 = LOGOS.slice(15);

function MarqueeRow({
  logos,
  direction,
}: {
  logos: string[];
  direction: "left" | "right";
}) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...logos, ...logos];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Trusted brand logo"
            className="h-16 w-auto shrink-0 select-none md:h-20"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustedBrands() {
  return (
    <section id="clients" className="section overflow-hidden bg-white">
      <Container>
        <h2 className="text-center text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.15em] text-brand">
          Trusted by India&apos;s Leading Brands
        </h2>
      </Container>

      {/* Full-bleed marquee rows */}
      <div className="marquee-row mt-8 space-y-4">
        <MarqueeRow logos={ROW_1} direction="left" />
        <MarqueeRow logos={ROW_2} direction="right" />
      </div>
    </section>
  );
}
