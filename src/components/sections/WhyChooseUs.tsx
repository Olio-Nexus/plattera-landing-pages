import { Container } from "@/components/layout/Container";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: "/whychoose/fi_9437732.svg",
    title: "Unparalleled Quality",
    description:
      "We source only the finest products to ensure that every gift for employee reflects the high standards of your brand.",
  },
  {
    icon: "/whychoose/fi_9288195.svg",
    title: "5000+ Products",
    description:
      "Choose from over 5000+ unique product options. With so many choices, you'll easily find the ideal gift to make a lasting impression on clients and employees.",
  },
  {
    icon: "/whychoose/fi_546980.svg",
    title: "1,00,000+ Products Delivered",
    description:
      "Join the thousands of businesses who trust us with their corporate gifts. With over 100,000 products delivered, we guarantee timely and reliable service to meet your gifting needs.",
  },
  {
    icon: "/whychoose/fi_3790344.svg",
    title: "Product for Every Budget",
    description:
      "Find the perfect corporate gifts that fit your budget, whether you're looking for something affordable or a luxurious treat.",
  },
  {
    icon: "/whychoose/fi_2477155.svg",
    title: "Customization Options",
    description:
      "From customized gift hampers to branded merchandise, we offer customized solutions to your unique requirements.",
  },
  {
    icon: "/whychoose/fi_786017.svg",
    title: "Timely Delivery",
    description:
      "Our efficient logistics network ensures prompt delivery of gifts, allowing you to meet deadlines and make a memorable impression.",
  },
];

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="group rounded-[16px] bg-white p-6 shadow-sm transition-colors duration-300 hover:bg-brand md:p-7">
      {/* Icon badge */}
      <span className="grid size-11 place-items-center rounded-lg bg-brand transition-colors duration-300 group-hover:bg-white">
        <span
          aria-hidden
          className="size-5 bg-white transition-colors duration-300 group-hover:bg-brand"
          style={{
            maskImage: `url(${icon})`,
            WebkitMaskImage: `url(${icon})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      </span>

      <h3 className="mt-5 font-heading text-[18px] font-semibold text-foreground transition-colors duration-300 group-hover:text-white">
        {title}
      </h3>
      <p className="description mt-3 transition-colors duration-300 group-hover:text-white/80">
        {description}
      </p>
    </div>
  );
}

const DEFAULT_HEADING = (
  <>
    Why Choose <span className="italic text-brand">Plattera</span> for Your
    Corporate Gifting Needs?
  </>
);

const DEFAULT_DESCRIPTION =
  "At Plattera, we take pride in our commitment to excellence in gifting and customer satisfaction. Here's why you should choose us for all your corporate gifting needs:";

export function WhyChooseUs({
  heading = DEFAULT_HEADING,
  description = DEFAULT_DESCRIPTION,
  features = FEATURES,
}: {
  /** Section heading (use a `<span className="italic text-brand">` accent). */
  heading?: React.ReactNode;
  /** Intro copy under the heading. */
  description?: React.ReactNode;
  /** Feature cards to render. */
  features?: Feature[];
} = {}) {
  return (
    <section id="why-us" className="section bg-[#FAF1EB]">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2 text-center">{heading}</h2>
          <p className="description mt-4">{description}</p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Container>
    </section>
  );
}
