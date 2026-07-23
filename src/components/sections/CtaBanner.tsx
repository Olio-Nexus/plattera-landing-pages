import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { SmoothLink } from "@/components/ui/smooth-link";
import { cn } from "@/lib/utils";

const DEFAULT_HEADING = (
  <>
    Ready to Elevate your Corporate Gifting Game?
    <br className="hidden sm:block" /> Fill the form to discuss your
    requirements.
  </>
);

export function CtaBanner({
  heading = DEFAULT_HEADING,
  ctaLabel = "Contact Us",
  ctaHref = "#top",
}: {
  heading?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  return (
    <section
      id="cta"
      // bg-fixed gives the parallax effect as the page scrolls over it.
      className="bg-brand bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/cta.svg')" }}
    >
      <Container className="flex flex-col items-center py-16 text-center md:py-24">
        <h2 className="h2 max-w-3xl text-center text-white">{heading}</h2>

        <SmoothLink
          href={ctaHref}
          className={cn(
            buttonVariants(),
            "mt-6 h-11 bg-white px-6 text-brand hover:bg-white/90"
          )}
        >
          {ctaLabel}
        </SmoothLink>
      </Container>
    </section>
  );
}
