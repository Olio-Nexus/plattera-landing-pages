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
  title: "Plattera — Women's Day Corporate Gifts",
  description:
    "Premium Women's Day corporate gifts to celebrate, appreciate, and inspire the women in your organization.",
};

// Women's Day imagery lives in /public/women-day (Frame 30.png,
// Frame 30-1.png … Frame 30-11.png). Split across the section carousels.
const WOMENS_DAY_IMAGES = [
  "/women-day/Frame 30.png",
  ...Array.from(
    { length: 11 },
    (_, i) => `/women-day/Frame 30-${i + 1}.png`
  ),
];

const ABOUT_IMAGES = WOMENS_DAY_IMAGES;
const PRODUCT_SLIDES = WOMENS_DAY_IMAGES.map((src, i) => ({
  id: i,
  src,
  alt: `Women's Day corporate gift ${i + 1}`,
}));

const ABOUT_PARAGRAPHS: React.ReactNode[] = [
  <>
    Women&apos;s Day is more than a celebration—it&apos;s a moment to recognize
    the dedication, talent, and impact of women in the corporate world. At
    Plattera, we bring you an exclusive collection of premium Women&apos;s Day
    corporate gifts designed to express gratitude and appreciation for the
    incredible women in your organization.
  </>,
];

const WOMENS_DAY_FEATURES: Feature[] = [
  {
    icon: "/whychoose/fi_9437732.svg",
    title: "Unparalleled Quality",
    description:
      "Celebrate Women's Day with gifts that reflect the excellence and appreciation you have for the women in your organization. Each item in our curated collection is chosen to honor their dedication and make a meaningful impact.",
  },
  {
    icon: "/whychoose/fi_9288195.svg",
    title: "5000+ Products",
    description:
      "Explore over 5,000 premium products to find the perfect Women's Day gift. From luxurious hampers to personalized keepsakes, our diverse collection ensures you'll find something special to celebrate and appreciate the incredible women in your organization.",
  },
  {
    icon: "/whychoose/fi_546980.svg",
    title: "1,00,000+ Products Delivered",
    description:
      "Join the many organizations that trust us to deliver exceptional Women's Day gifts. With over 1,00,000 products successfully delivered, we ensure a seamless gifting experience that honors the women in your organization with excellence.",
  },
  {
    icon: "/whychoose/fi_3790344.svg",
    title: "Gift for Every Budget",
    description:
      "Make Women's Day memorable with gifts that fit your budget. Whether you're seeking thoughtful, affordable options or premium, luxurious items, we offer a range of curated gifts to suit every need and budget, ensuring you honor the women in your organization in the best way possible.",
  },
  {
    icon: "/whychoose/fi_2477155.svg",
    title: "Personalized to Perfection",
    description:
      "Celebrate Women's Day with gifts that are as unique as the women in your organization. Add personalized touches like customized stationery, branded merchandise, and more, all designed to align with your company culture and make a lasting impression.",
  },
  {
    icon: "/whychoose/fi_786017.svg",
    title: "Timely Delivery",
    description:
      "Celebrate Women's Day with confidence, knowing your gifts will arrive on time. Our efficient logistics network ensures every gift is delivered promptly, leaving a positive and lasting impression on the incredible women in your organization.",
  },
];

const WOMENS_DAY_FAQS: QA[] = [
  {
    q: "What types of corporate gifts does Plattera offer for Women's Day?",
    a: "We offer a wide range of premium Women's Day gifts, including personalized keepsakes, luxury hampers, wellness products, office essentials, and branded merchandise. All items can be customized to reflect your appreciation for the incredible women in your organization.",
  },
  {
    q: "Can I customize Women's Day gifts for my team?",
    a: "Yes! We specialize in customization. From adding your company logo to creating personalized messages, we ensure that every gift is unique and thoughtfully tailored to resonate with your brand and the spirit of Women's Day.",
  },
  {
    q: "Is there a minimum order quantity for Women's Day gifts?",
    a: "The minimum order quantity varies depending on the types of gifts and customization options you choose. Contact us for more details, and we'll assist in creating the perfect Women's Day gifting solution for your team.",
  },
  {
    q: "Can you deliver Women's Day gifts to multiple locations?",
    a: "Absolutely! We offer nationwide delivery services, ensuring that your Women's Day gifts reach your employees on time, no matter where they are located.",
  },
  {
    q: "How long does it take to prepare and deliver Women's Day gifts?",
    a: "The preparation and delivery timeline depends on the customization level and order quantity. Typically, we deliver within 7-14 business days. For specific timelines, please reach out to us.",
  },
  {
    q: "Do you offer eco-friendly or sustainable Women's Day gifts?",
    a: "Yes, we offer a selection of eco-friendly and sustainable gifts to help align your Women's Day celebration with your company's environmental values.",
  },
];

export default function WomensDayCorporatePage() {
  return (
    <BrochureProvider brochureUrl="/brochures/corporate-gifts.pdf">
      <Header />

      <main className="flex-1">
        <Hero
          highlight="Celebrate the Women"
          title="Who Drive Your Workplace Forward"
        >
          <EnquiryForm />
        </Hero>

        <AboutUs
          heading={
            <>
              Plattera&apos;s Premium{" "}
              <span className="text-brand">Women&apos;s Day Corporate Gifts</span>
              : Celebrate, Appreciate, Inspire
            </>
          }
          paragraphs={ABOUT_PARAGRAPHS}
          images={ABOUT_IMAGES}
        />

        <ProductsCarousel
          heading={
            <>
              Browse Our{" "}
              <span className="italic text-brand">Women&apos;s Day</span>{" "}
              Collection
            </>
          }
          description="Explore our exclusive corporate gift collection today and honor the incredible women in your organization with thoughtful, premium gifts!"
          slides={PRODUCT_SLIDES}
          ctaLabel="Get Quote"
        />

        <TrustedBrands />

        <WhyChooseUs
          heading={
            <>
              Why Choose <span className="italic text-brand">Plattera</span> for
              Your Corporate Gifting Needs?
            </>
          }
          features={WOMENS_DAY_FEATURES}
        />

        <CtaBanner
          heading={
            <>
              Impress Your Team this Women&apos;s Day with Plattera&apos;s Custom
              Gifts.
              <br className="hidden sm:block" /> Contact us today for a free
              consultation and create the perfect gift to celebrate the women in
              your organization!
            </>
          }
          ctaLabel="Contact Now"
          ctaHref="#top"
        />

        <ReviewsCarousel background="bg-white" />
        <Faq faqs={WOMENS_DAY_FAQS} />
      </main>

      <Footer />
    </BrochureProvider>
  );
}
