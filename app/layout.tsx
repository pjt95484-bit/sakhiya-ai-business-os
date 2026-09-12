import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { buildJsonLd } from "./lib/jsonld";
import { PRODUCT_NAME, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: PRODUCT_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  other: {
    "content-language": "en",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {jsonLd.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            // JSON-LD is generated from local constants, never from user input.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
        {children}
      </body>
    </html>
  );
}
