"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "What types of corporate gifts does Plattera offer?",
    a: "We have an exclusive collection of best gifts for employees and best gifts for clients, comprising company-branded merchandise and office supplies, edibles, wellness care, home décor, and luxury gift items.",
  },
  {
    q: "Do u offer customization options for corporate gifts?",
    a: "Yes, we offer a range of customization options for gift for employee collection to align with your brand identity and message. From merchandising, personalised gifting to custom packaging, we ensure your gifts stand out and leave a lasting impression.",
  },
  {
    q: "How early in advance should I place a bulk order?",
    a: "To ensure smooth processing and timely delivery, we recommend placing bulk orders one week in advance. The lead time may vary depending on the size and complexity of your order, so it's best to discuss your requirements with our team as early as possible.",
  },
  {
    q: "Can you handle bulk orders for large corporate events or holidays?",
    a: "Yes, we specialize in handling bulk orders for corporate events, conferences, holidays, and other special occasions too. Our dedicated team will ensure seamless execution and timely delivery.",
  },
  {
    q: "Do you offer gift wrapping or customized packaging options?",
    a: "Yes, we offer a range of gift wrapping and customized packaging options to enhance the presentation of your gifts and leave a lasting impression.",
  },
  {
    q: "What payment methods do you accept for corporate gift orders?",
    a: "We accept various payment methods, including bank transfers, credit/debit cards, and corporate accounts, to provide you with flexibility and convenience.",
  },
  {
    q: "Do you offer international shipping for corporate gifts?",
    a: "Yes, we offer international shipping to most destinations. Additional charges may apply depending on the location. Please fill out the form to contact our team for more details.",
  },
];

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: QA;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-heading text-[16px] font-semibold text-foreground md:text-[17px]">
          {item.q}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-foreground transition-transform duration-300",
            open && "rotate-180 text-brand"
          )}
        />
      </button>

      {/* Animated answer */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="description px-5 pb-5">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq({ faqs = FAQS }: { faqs?: QA[] } = {}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="section bg-white">
      <Container>
        <h2 className="h2 text-center">
          Frequently Asked
          <br />
          <span className="italic text-brand">Question</span>
        </h2>

        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
