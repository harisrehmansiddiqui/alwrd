import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alwrd.vercel.app"),
  title: {
    default: "Al Wrd — Transparent Umrah Booking from Pakistan",
    template: "%s | Al Wrd Hajj & Umrah",
  },
  description:
    "Plan your Umrah with transparent pricing, trusted guidance, and dedicated support — no agents, no hidden charges.",
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
    title: "Al Wrd — Transparent Umrah Booking from Pakistan",
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
      className={`${jakarta.variable} ${libreBaskerville.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-on-background">
        {children}
      </body>
    </html>
  );
}
