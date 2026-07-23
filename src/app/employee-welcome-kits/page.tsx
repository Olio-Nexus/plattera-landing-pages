import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrochureProvider } from "@/components/brochure/BrochureProvider";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { WhyChooseUs, type Feature } from "@/components/sections/WhyChooseUs";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { Faq, type QA } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProductsCarousel } from "@/components/sections/ProductsCarousel";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Plattera — Employee Welcome Kits",
  description:
    "Personalized employee welcome kits that make new hires feel valued from day one.",
};

// Welcome-kit imagery lives in /public/employee-welcome-kits (Frame 30.png,
// Frame 30-1.png … Frame 30-12.png). Split across the section carousels.
const KIT_IMAGES = [
  "/employee-welcome-kits/Frame 30.png",
  ...Array.from(
    { length: 12 },
    (_, i) => `/employee-welcome-kits/Frame 30-${i + 1}.png`
  ),
];

const ABOUT_IMAGES = KIT_IMAGES;
const PRODUCT_SLIDES = KIT_IMAGES.map((src, i) => ({
  id: i,
  src,
  alt: `Employee welcome kit ${i + 1}`,
}));

const ABOUT_PARAGRAPHS: React.ReactNode[] = [
  <>
    At Plattera Gifts, we specialize in crafting personalized employee welcome
    kits designed to create a lasting impression. Based in Mumbai, our expertise
    lies in providing customized gifting solutions tailored to your
    organization&apos;s unique onboarding needs.
  </>,
  <>
    With a team of skilled product experts, creative designers, curators,
    marketers, and delivery operators, we are committed to delivering thoughtful
    and meaningful welcome kits that reflect your company&apos;s values and
    culture. Let Plattera help you set the perfect tone for new hires with our
    thoughtfully curated employee welcome kits.
  </>,
];

const WELCOME_FEATURES: Feature[] = [
  {
    icon: "/whychoose/fi_9437732.svg",
    title: "Unparalleled Quality",
    description:
      "Welcome your new team members with gifts that reflect the high standards of your organization. Every item in our welcome kits is carefully selected to create a lasting impression.",
  },
  {
    icon: "/whychoose/fi_9288195.svg",
    title: "5000+ Products",
    description:
      "Choose from over 5,000 thoughtfully curated items to create the perfect welcome kit. From practical essentials to personalized keepsakes, we have something for every new hire.",
  },
  {
    icon: "/whychoose/fi_546980.svg",
    title: "1,00,000+ Products Delivered",
    description:
      "Join the countless organizations that trust us to deliver exceptional welcome kits. With over 1,00,000 products successfully delivered, we ensure a seamless onboarding experience.",
  },
  {
    icon: "/whychoose/fi_3790344.svg",
    title: "Gift for Every Budget",
    description:
      "Create a warm and professional first impression with welcome kits tailored to fit your budget. Whether you're looking for affordable yet thoughtful items or premium gifts, we've got you covered.",
  },
  {
    icon: "/whychoose/fi_2477155.svg",
    title: "Personalized to Perfection",
    description:
      "Make every welcome kit unique with personalized touches like branded merchandise, customized stationery, and more—designed to align with your company culture.",
  },
  {
    icon: "/whychoose/fi_786017.svg",
    title: "Timely Delivery",
    description:
      "Ensure your new hires feel valued from day one. Our efficient logistics network ensures every welcome kit is delivered on time, leaving a positive and lasting impression.",
  },
];

const WELCOME_FAQS: QA[] = [
  {
    q: "What types of corporate gifts does Plattera offer?",
    a: "You can customize your welcome kit with branded merchandise, office essentials, wellness products, personalized gifts, edibles, and more. We help you tailor the kit to align with your company's culture and values.",
  },
  {
    q: "Do you offer customization for the items in the welcome kit?",
    a: "Yes, we specialize in customization! From adding your company logo to creating personalized messages, we ensure every kit is unique and resonates with your brand identity.",
  },
  {
    q: "Is there a minimum order quantity for welcome kits?",
    a: "The minimum order quantity depends on the type of kit and products you choose. Contact us for more details, and we'll help you create the perfect solution for your team.",
  },
  {
    q: "Can you deliver welcome kits to multiple locations?",
    a: "Absolutely! We provide delivery services across India, ensuring each kit reaches your employees on time, no matter where they are.",
  },
  {
    q: "How long does it take to prepare and deliver the welcome kits?",
    a: "The timeline depends on the level of customization and quantity of your order. Typically, we deliver within 7-14 business days. For specific timelines, please reach out to us.",
  },
  {
    q: "Do you offer eco-friendly or sustainable product options?",
    a: "Yes, we offer a wide range of eco-friendly and sustainable products to align with your company's commitment to the environment.",
  },
];

export default function EmployeeWelcomeKitsPage() {
  return (
    <BrochureProvider brochureUrl="/brochures/corporate-gifts.pdf">
      <Header />

      <main className="flex-1">
        <Hero
          highlight="Professional Curated"
          title="Welcome Kits"
        >
          <EnquiryForm />
        </Hero>

        <AboutUs
          heading={
            <>
              Plattera – Crafting{" "}
              <span className="text-brand">Employee Welcome Kits</span> That Make
              New Hires Feel Valued!
            </>
          }
          paragraphs={ABOUT_PARAGRAPHS}
          images={ABOUT_IMAGES}
        />

        <ProductsCarousel
          heading={
            <>
              Browse Our{" "}
              <span className="italic text-brand">Welcome Onboarding Kits</span>
              <br className="hidden sm:block" /> Collection
            </>
          }
          description="Welcome Your New Hires in Style. Explore our tailored employee welcome kits today!"
          slides={PRODUCT_SLIDES}
        />

        <TrustedBrands />

        <WhyChooseUs
          heading={
            <>
              Why Choose <span className="italic text-brand">Plattera</span> for
              Your Corporate Gifting Needs?
            </>
          }
          description="At Plattera, we take pride in our commitment to excellence in gifting and customer satisfaction. Here's why you should choose us for all your corporate gifting needs:"
          features={WELCOME_FEATURES}
        />

        <CtaBanner
          heading={
            <>
              Impress your employees from day one with Plattera&apos;s custom
              welcome kits.
              <br className="hidden sm:block" /> Contact us now for a free
              consultation.
            </>
          }
          ctaLabel="Explore Employee Kits"
          ctaHref="#top"
        />

        <ReviewsCarousel background="bg-white" />
        <Faq faqs={WELCOME_FAQS} />
      </main>

      <Footer />
    </BrochureProvider>
  );
}
