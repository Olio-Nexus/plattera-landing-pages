// Central site config so all pages/components stay consistent and reusable.
export const siteConfig = {
  name: "Plattera",
  nav: [
    { label: "About Us", href: "#about" },
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Our Clients", href: "#clients" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ's", href: "#faqs" },
  ],
  cta: { label: "Download Brochure", href: "#brochure" },
  contact: {
    email: "contact@plattera.in",
    phone: "+91 93218 20699",
    phoneHref: "+919321820699", // tel: link (no spaces)
    companyName: "Plattera Gifts — Corporate & Promotional Gifting Company",
    address:
      "Carnival Hub Work Space, Opp. Oberoi Mall, Dindoshi, Malad East, Mumbai, Maharashtra 400097",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Carnival+Hub+Work+Space+Opp+Oberoi+Mall+Dindoshi+Malad+East+Mumbai+400097",
  },
  social: {
    instagram: "https://www.instagram.com/plattera.in/",
    linkedin: "https://www.linkedin.com/company/plattera/",
  },
};

// Reusable option sets for the enquiry form (also handy across pages).
export const quantityOptions = ["1 - 25", "26 - 50", "51 - 100", "100 - 500", "500+"];
export const occasionOptions = [
  "Onboarding / Welcome Kit",
  "Festive / Diwali",
  "Employee Appreciation",
  "Client Gifting",
  "Conference / Event",
  "Other",
];
export const budgetOptions = [
  "Under ₹500",
  "₹500 - ₹1,000",
  "₹1,000 - ₹2,500",
  "₹2,500 - ₹5,000",
  "₹5,000+",
];
