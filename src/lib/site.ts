/**
 * Single source of truth for company facts that appear in metadata,
 * structured data, the footer and the contact page.
 *
 * NOTE FOR REISPEQ: the phone number, address and licence number below are
 * placeholders. Replace them here once and every page updates.
 */
export const site = {
  name: "Reispeq Technologies LLC",
  shortName: "Reispeq",
  domain: "reispeq.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reispeq.com",
  email: "hello@reispeq.com",
  salesEmail: "sales@reispeq.com",
  phone: "+968 0000 0000", // TODO: replace with the live number
  phoneHref: "+9680000000", // TODO: replace with the live number
  whatsapp: "9680000000", // TODO: replace or remove
  founded: "2025",
  legalForm: "LLC",
  addresses: [
    {
      id: "om",
      country: "Oman",
      countryCode: "OM",
      city: "Muscat",
      lines: ["Muscat", "Sultanate of Oman"],
    },
    {
      id: "ae",
      country: "United Arab Emirates",
      countryCode: "AE",
      city: "Dubai",
      lines: ["Dubai", "United Arab Emirates"],
    },
  ],
  /** Markets the company sells into — drives `areaServed` in structured data. */
  regions: ["OM", "AE", "SA", "QA", "KW", "BH", "IQ"],
  products: {
    certiTrack: {
      name: "CertiTrack Plus",
      url: "https://certitrackplus.com",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/reispeq",
  },
} as const;

export type SiteConfig = typeof site;
