import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DJ GERS | Swopster Gatherings",
    template: "%s | DJ GERS",
  },
  description:
    "DJ GERS – Professional DJ for events, parties, and clubs. Swopster Gatherings organizes community events including FEEST.",
  keywords: ["DJ GERS", "Swopster Gatherings", "FEEST", "DJ", "events", "party"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className={`${inter.className} bg-[#080810] text-gray-100 min-h-screen`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
