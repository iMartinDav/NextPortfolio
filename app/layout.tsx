import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

// Font definitions
const satoshiSans = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi-sans",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: "Martin DAVILA | Full Stack Bioinformatics Engineer",
  description:
    "Innovative bioinformatics solutions for cutting-edge biotech research",
  keywords: ["bioinformatics", "biotech", "full stack", "software engineering"],
  authors: [{ name: "Martin DAVILA" }],
  openGraph: {
    type: "website",
    url: "https://yourwebsite.com",
    title: "Martin DAVILA | Full Stack Bioinformatics Engineer",
    description:
      "Innovative bioinformatics solutions for cutting-edge biotech research",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
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
    <html lang="en" suppressHydrationWarning className={satoshiSans.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
