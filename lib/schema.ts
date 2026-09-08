import { brand } from "@/lib/brand";
import { canonical, SITE_URL } from "@/lib/site";

/**
 * Schema.org descriptions of what this site is, for the crawlers that read
 * structured data rather than prose.
 *
 * This matters more for an answer engine than for classic search. A ranking
 * algorithm can infer a product page from the words on it; a model being
 * asked "what tools do X" is far likelier to name something it can read as a
 * typed entity with a price and a platform attached than something it has to
 * summarise out of marketing copy.
 *
 * Every `@id` is a real URL with a fragment, which is how separate blocks on
 * separate pages are understood as the same entity rather than as several.
 * That is the difference between one product with a publisher and a scatter
 * of unrelated things.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#software`;

/** Verastack Labs, as the entity behind both the site and the product. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Verastack Labs",
    url: `${SITE_URL}/`,
    email: brand.contactEmail,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.svg`,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: brand.productName,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/**
 * The product itself.
 *
 * No `aggregateRating`. Google's rich result for software leans on one, and
 * there is a standing temptation to invent it, but a rating with no reviews
 * behind it is a fabricated claim in machine-readable form. Nobody has bought
 * this yet.
 *
 * The offer states the early access rate, which is the price actually
 * charged today. `priceValidUntil` is deliberately absent: the tier closes on
 * a count of seats rather than on a date, so any date here would be a guess
 * presented as a fact.
 */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: brand.productName,
    url: `${SITE_URL}/`,
    // The category a developer tool belongs in. Without it the entry is
    // classified by guesswork from the description.
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Windows, Linux",
    softwareVersion: brand.latestVersion,
    downloadUrl: canonical("/download"),
    description:
      "A desktop app for making Git commits at any date and time, so a contribution graph reflects work that was actually done.",
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: brand.earlyAccessPrice,
      priceCurrency: brand.currency,
      url: canonical("/pricing"),
      availability: "https://schema.org/InStock",
      category: "subscription",
    },
  };
}

/**
 * A page of questions and answers.
 *
 * Only for a block that genuinely is one on the page. Marking up copy that no
 * visitor sees as a question and answer is what the spec calls hidden content,
 * and it is grounds for a manual penalty rather than a shrug.
 */
export function faqPageSchema(
  entries: ReadonlyArray<{ q: string; a: string }>,
  pagePath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical(pagePath)}#faq`,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: { "@type": "Answer", text: entry.a },
    })),
  };
}
