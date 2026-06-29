import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import {
  defaultMetadata,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = defaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-on-background">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
