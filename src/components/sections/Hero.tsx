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

      {/* Image band with the form sitting on top — image fills the whole band,
          including behind and around the form (no white gap on mobile). */}
      <div className="relative w-full">
        {/* Background image (replace via bgImage prop) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />

        <Container className="relative flex min-h-104 items-end justify-center px-3 pt-36 pb-6 sm:min-h-128 sm:px-6 lg:min-h-175 lg:items-center lg:justify-end lg:pt-0 lg:pb-0 lg:pr-12">
          <div className="relative z-10 w-full max-w-xl lg:w-165">
            {children}
          </div>
        </Container>
      </div>
    </section>
  );
}
