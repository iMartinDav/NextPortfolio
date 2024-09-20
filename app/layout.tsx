// app/layout.tsx or app/layout.jsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Importing the Script component

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font definitions
const inter = Inter({ subsets: ["latin"] });

// Metadata
export const metadata: Metadata = {
  title: "Martin DAVILA | Full Stack Bioinformatics Engineer",
  description:
    "Innovative bioinformatics solutions for cutting-edge biotech research",
  keywords: ["bioinformatics", "biotech", "full stack", "software engineering"],
  authors: [{ name: "Martin DAVILA" }],
  openGraph: {
    type: "website",
    url: "https://www.imartin.dev",
    title: "Martin DAVILA | Full Stack Bioinformatics Engineer",
    description:
      "Innovative bioinformatics solutions for cutting-edge biotech research",
    images: [
      {
        url: "https://www.imartin.dev/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Martin DAVILA | Full Stack Bioinformatics Engineer",
      },
    ],
  },
  robots: "index, follow",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Umami Analytics Script */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="1cb76843-7b97-489c-8564-d2429ad9bddb"
          strategy="afterInteractive" // Ensures the script loads after the page is interactive
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
