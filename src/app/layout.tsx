import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NewsBook — Your Personal Newsletter Library",
  description:
    "Search, discover, and save the world's best newsletters across tech, fashion, cooking, world news, and more.",
  keywords: ["newsletters", "tech", "fashion", "cooking", "news", "subscribe"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
