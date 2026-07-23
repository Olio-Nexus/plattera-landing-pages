import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

// Single overall hero background image — swap per page via the `bgImage` prop.
const DEFAULT_BG =
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1920&q=80";

export function Hero({
  highlight,
  title,
  bgImage = DEFAULT_BG,
  children,
  className,
}: {
  /** Italic, brand-coloured leading words (e.g. "Corporate Gifts"). */
  highlight?: string;
  /** Rest of the heading. */
  title: string;
  /** One overall background image for the band. */
  bgImage?: string;
  /** Slot for the form / CTA card — floats right on desktop. */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id="top" className={cn("bg-white", className)}>
      {/* Heading */}
      <Container className="py-5 text-center md:py-6">
        <h1 className="h1 mx-auto max-w-xl">
          {highlight && (
            <span className="font-semibold italic text-brand">{highlight} </span>
          )}
          {title}
        </h1>
      </Container>

      {/* Image band + floating form */}
      <div className="relative w-full">
        {/* Overall background image (replace via bgImage prop) */}
        <div
          aria-hidden
          className="h-75 w-full bg-cover bg-center sm:h-95 lg:h-175"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />

        {/* Form: overlaps band bottom on mobile, floats right & centered on desktop */}
        <div className="lg:absolute lg:inset-0">
          <Container className="lg:flex lg:h-full lg:items-center lg:justify-end lg:py-12 lg:pr-12">
            <div className="relative z-10 mx-auto -mt-20 w-[92%] max-w-xl lg:mx-0 lg:mt-0 lg:w-165">
              {children}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
