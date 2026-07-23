import { Container } from "@/components/layout/Container";
import { AboutImageCarousel } from "./AboutImageCarousel";

const DEFAULT_HEADING = (
  <>
    Welcome to Plattera – Your{" "}
    <span className="text-brand">Premier Corporate Gifting</span> Partner
  </>
);

const DEFAULT_PARAGRAPHS: React.ReactNode[] = [
  <>
    Plattera Gifts is a gifting company based in Mumbai which provides customized
    gifting solutions to corporates. We have an exclusive product range
    comprising of company branded merchandise &amp; office supplies, edibles,
    wellness care, home décor &amp; luxury keepsake gift items.
  </>,
  <>
    With a team of product experts, creative designers, curators, marketers and
    delivery operators we are committed to providing our clients with
    personalized and thoughtful gifting solutions. We provide a holistic gifting
    experience to our clients with services that include : Customization,
    Styling, Branding &amp; Delivery across India &amp; International locations.
  </>,
];

export function AboutUs({
  heading = DEFAULT_HEADING,
  paragraphs = DEFAULT_PARAGRAPHS,
  images,
}: {
  /** Section heading (use a `<span className="text-brand">` for the accent). */
  heading?: React.ReactNode;
  /** Body copy — one <p> per entry. */
  paragraphs?: React.ReactNode[];
  /** Image carousel slides. Omit to use the default set. */
  images?: string[];
} = {}) {
  return (
    <section id="about" className="section bg-white">
      <Container className="grid items-center gap-10 lg:grid-cols-[60fr_40fr] lg:gap-8">
        {/* Copy — 50% */}
        <div>
          <h2 className="h2 md:max-w-xl">{heading}</h2>

          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="description">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Image carousel — 50% */}
        <div>
          <AboutImageCarousel slides={images} />
        </div>
      </Container>
    </section>
  );
}
