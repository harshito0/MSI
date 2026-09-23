import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Self-hosted Playfair Display (serif) — avoids Google Fonts network dependency
const playfair = localFont({
  src: [
    { path: "../public/fonts/playfair-display-500.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/playfair-display-600.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/playfair-display-700.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/playfair-display-800.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

// Self-hosted Plus Jakarta Sans (sans-serif)
const jakarta = localFont({
  src: [
    { path: "../public/fonts/plus-jakarta-sans-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-500.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-600.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/plus-jakarta-sans-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "MSI Group of Institutes | Education for a Brighter Tomorrow",
    template: "%s | MSI Group of Institutes",
  },
  description:
    "At MSI, we empower students with quality education, strong values, and the guidance to build a successful future. Shape your tomorrow with world-class academic programs in Engineering, Law, and Management.",
  keywords: [
    "MSI Group of Institutes",
    "MSI",
    "Maharaja Surajmal Institute",
    "B.Tech Computer Science Delhi",
    "Law School India",
    "MBA Delhi",
    "Quality Education",
    "Admissions 2026",
    "Higher Education India",
    "NAAC A+ University",
  ],
  authors: [{ name: "MSI Group of Institutes" }],
  creator: "MSI Group of Institutes",
  publisher: "MSI Group of Institutes",
  metadataBase: new URL("https://www.msi-institutes.edu.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.msi-institutes.edu.in",
    siteName: "MSI Group of Institutes",
    title: "MSI Group of Institutes | Education for a Brighter Tomorrow",
    description:
      "At MSI, we empower students with quality education, strong values, and the guidance to build a successful future. Shape your tomorrow with world-class academic programs.",
    images: [
      {
        url: "/images/msi-crest.png",
        width: 1200,
        height: 630,
        alt: "MSI Group of Institutes Official Seal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MSIInstitutes",
    title: "MSI Group of Institutes | Education for a Brighter Tomorrow",
    description:
      "Premium higher education in Engineering, Law, and Management. NAAC A+ accredited. 98.4% placement rate.",
    images: ["/images/msi-crest.png"],
  },
  icons: {
    icon: "/images/msi-crest.png",
    apple: "/images/msi-crest.png",
    shortcut: "/images/msi-crest.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FFF9EF] text-[#10233F] antialiased selection:bg-[#EFC988] selection:text-[#89190E]">
        {children}
      </body>
    </html>
  );
}
