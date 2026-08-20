import { locales, defaultLocale } from "@/i18n/config";
import { site } from "@/lib/site";

/**
 * Static entry point.
 *
 * A static host cannot negotiate Accept-Language, so `/` is a thin routing
 * document: it links to both locales for crawlers, redirects immediately for
 * people, and points its canonical at the English edition. The <meta refresh>
 * fires even with JavaScript disabled; the inline script just gets there
 * sooner and honours the visitor's browser language.
 */
export const metadata = {
  title: site.name,
  description:
    "Reispeq Technologies LLC — software development, auditing and inspection services for oilfield and industrial operations across the Gulf.",
  alternates: {
    canonical: `${site.url}/${defaultLocale}/`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}/`])),
      "x-default": `${site.url}/${defaultLocale}/`,
    },
  },
  robots: { index: false, follow: true },
};

const REDIRECT = `(function(){try{var s=(navigator.languages&&navigator.languages[0]||navigator.language||"en").toLowerCase();var l=s.indexOf("ar")===0?"ar":"en";location.replace(l+"/"+location.search+location.hash)}catch(e){location.replace("en/")}})();`;

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=./${defaultLocale}/`} />
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      </head>
      <body style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", padding: "2rem" }}>
        <p>{site.name}</p>
        <ul>
          <li>
            <a href="./en/" hrefLang="en">
              English
            </a>
          </li>
          <li>
            <a href="./ar/" hrefLang="ar" lang="ar" dir="rtl">
              العربية
            </a>
          </li>
        </ul>
      </body>
    </html>
  );
}
