import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alwrdgroup.com"),
  title: {
    default: "Al Wrd — Trusted Umrah Packages from Pakistan",
    template: "%s | Al Wrd Hajj & Umrah",
  },
  description:
    "Book complete Umrah packages from Pakistan with fast visa processing, premium hotels near the Haram, authentic meals and private transport.",
  keywords: [
    "Umrah packages Pakistan",
    "Umrah booking",
    "Hajj and Umrah",
    "Umrah visa",
    "Makkah hotels",
  ],
  openGraph: {
    type: "website",
    siteName: "Al Wrd Hajj & Umrah",
    title: "Al Wrd — Trusted Umrah Packages from Pakistan",
    description:
      "Premium Umrah packages from Pakistan. Fast visa, hotels near the Haram, private transport.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface">{children}</body>
    </html>
  );
}
