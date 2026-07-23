import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrochureProvider } from "@/components/brochure/BrochureProvider";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { WhyChooseUs, type Feature } from "@/components/sections/WhyChooseUs";
import { GiftsForOccasion } from "@/components/sections/GiftsForOccasion";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { Faq, type QA } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProductsCarousel } from "@/components/sections/ProductsCarousel";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Plattera — Corporate Diwali Gifts",
  description:
    "Exquisite corporate Diwali gifts and hampers to celebrate the festival of lights with employees, clients, and stakeholders.",
};

// Diwali imagery lives in /public/coporate-diwali-gifts (Frame 30.png,
// Frame 30-1.png … Frame 30-7.png). Every image is used in each carousel.
const DIWALI_IMAGES = [
  "/coporate-diwali-gifts/Frame 30.png",
  ...Array.from(
    { length: 7 },
    (_, i) => `/coporate-diwali-gifts/Frame 30-${i + 1}.png`
  ),
];

const PRODUCT_SLIDES = DIWALI_IMAGES.map((src, i) => ({
  id: i,
  src,
  alt: `Corporate Diwali gift ${i + 1}`,
}));

const ABOUT_PARAGRAPHS: React.ReactNode[] = [
  <>
    Illuminate the festival of lights with Plattera&apos;s exquisite range of
    corporate Diwali gifts designed to add warmth and joy to your corporate
    celebrations. From elegant tokens of appreciation for employees to memorable
    gifts for valued clients or other business stakeholders, our Diwali gifts
    are designed to make this auspicious occasion even more memorable.
  </>,
];

const DIWALI_FEATURES: Feature[] = [
  {
    icon: "/whychoose/fi_9437732.svg",
    title: "Extensive Selection",
    description:
      "We offer a diverse range of Diwali gift hampers, including traditional sweets, modern accessories, and luxurious hampers, so you're sure to find the perfect gift for every recipient.",
  },
  {
    icon: "/whychoose/fi_9288195.svg",
    title: "Unmatched Quality",
    description:
      "Our corporate Diwali gifts for employees are crafted using the finest materials and ingredients, ensuring that each item is of the excellent quality.",
  },
  {
    icon: "/whychoose/fi_2477155.svg",
    title: "Personalized Service",
    description:
      "We understand the importance of personalization in gifting. That's why we offer a variety of customization options to tailor your Diwali gift hampers for employees according to your preferences and brand identity.",
  },
];

const OCCASION_POINTS: React.ReactNode[] = [
  "If you're looking for Women's Day gifts to celebrate and honor the women in your company, Diwali gift hampers for your employees, Christmas gifts for employees to enhance holiday spirit, New Year Gifts to welcome the upcoming year, eco-friendly corporate gifts, or employee welcome kits for new team members, Plattera is your destination.",
  "Corporate Gifts Under Budget: Discover our gift hampers available at different price points, such as corporate gifts under ₹500, corporate gifts under ₹1000, and corporate gifts under ₹2000. This ensures that you can easily find corporate gifts that fit your budget.",
  "Trending gifts: Browse through our curated selection of Complete Gift Sets, thoughtfully designed gifts that embody the essence of the season and leave a memorable mark.",
];

const DIWALI_FAQS: QA[] = [
  {
    q: "What types of corporate Diwali gifts do you offer for employees?",
    a: "We offer a variety of corporate Diwali gifts for employees, including traditional sweets, premium diwali gift hampers, decorative items, personalized accessories, and more.",
  },
  {
    q: "Can you customize Diwali gifts with our company logo or branding?",
    a: "Absolutely! We offer customized corporate gifts for Diwali gift hampers for employees, such as adding your company logo or branding and personalizing with names for Diwali gifts to align with your corporate identity and make a lasting impression.",
  },
  {
    q: "What is the ordering process for corporate Diwali gifts?",
    a: "Ordering Diwali gift hampers for employees with Plattera is simple and convenient. Browse our collection, select your desired items, customize as needed, and proceed to checkout. Our professional team will handle the rest, to make sure your order is delivered to your specified address.",
  },
  {
    q: "What customization options are available for Diwali gifts for employees?",
    a: "We offer various customization options in corporate Diwali gifts for employees, including personalized names on the gift, branding, packaging, and choice of items, allowing you to create a perfect and memorable gift experience.",
  },
  {
    q: "Do you offer discounts for bulk orders of corporate Diwali gifts?",
    a: "Yes, we offer competitive pricing and discounts for bulk orders of corporate Diwali gifts for employees. Fill out the form to contact our team for personalized assistance and pricing information.",
  },
  {
    q: "How can I contact Plattera for further assistance with my Diwali gifting needs?",
    a: "For further assistance with your Diwali gifting needs, contact our professional team via phone, email, or fill out our website contact form. We're here to help you make this Diwali celebration one to remember.",
  },
  {
    q: "Do you offer international shipping for Diwali gift hampers for employees?",
    a: "Yes, we offer international shipping to most destinations. Additional charges may apply depending on the location. Please fill out the form to contact our team for more details.",
  },
];

export default function CorporateDiwaliGiftsPage() {
  return (
    <BrochureProvider brochureUrl="/brochures/corporate-gifts.pdf">
      <Header />

      <main className="flex-1">
        <Hero
          highlight="Celebrate Diwali"
          title="with Thoughtful Corporate Gifts"
        >
          <EnquiryForm />
        </Hero>

        <AboutUs
          heading={
            <>
              Make Diwali Shine Brighter with Plattera&apos;s{" "}
              <span className="text-brand">Diwali Gifts</span>
            </>
          }
          paragraphs={ABOUT_PARAGRAPHS}
          images={DIWALI_IMAGES}
        />

        <ProductsCarousel
          heading={
            <>
              Browse Our{" "}
              <span className="italic text-brand">Diwali Collection</span>
            </>
          }
          description="Let's Make This Diwali Extra Special Together — Contact Us Now!"
          slides={PRODUCT_SLIDES}
        />

        <TrustedBrands />

        <WhyChooseUs
          heading={
            <>
              Why Choose <span className="italic text-brand">Plattera</span> for
              Diwali Gifting?
            </>
          }
          description="At Plattera, we take pride in our commitment to excellence in gifting and customer satisfaction. Here's why you should choose us for all your Diwali gifting needs:"
          features={DIWALI_FEATURES}
        />

        <CtaBanner
          heading={
            <>
              Celebrate the Spirit of Diwali with Plattera&apos;s Exquisite Gift
              Hampers!
            </>
          }
          ctaLabel="Contact Now"
          ctaHref="#top"
        />

        <GiftsForOccasion
          heading={<>Gifts for Various Occasions</>}
          points={OCCASION_POINTS}
          images={DIWALI_IMAGES}
        />

        <ReviewsCarousel background="bg-white" />
        <Faq faqs={DIWALI_FAQS} />
      </main>

      <Footer />
    </BrochureProvider>
  );
}
