import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrochureProvider } from "@/components/brochure/BrochureProvider";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Occasions } from "@/components/sections/Occasions";
import { GiftsForOccasion } from "@/components/sections/GiftsForOccasion";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProductsCarousel } from "@/components/sections/ProductsCarousel";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export default function Home() {
  return (
    <BrochureProvider brochureUrl="/brochures/corporate-gifts.pdf">
      <Header />

      <main className="flex-1">
        <Hero
          highlight="Corporate Gifts"
          title="That Build Lasting Relationships"
          bgImage="/banner/corporate-gifting.png"
        >
          <EnquiryForm />
        </Hero>

        <AboutUs />
        <ProductsCarousel />
        <TrustedBrands />
        <WhyChooseUs />
        <Occasions />
        <CtaBanner />
        <GiftsForOccasion />
        <ReviewsCarousel />
        <Faq />
      </main>

      <Footer />
    </BrochureProvider>
  );
}
