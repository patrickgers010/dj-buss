import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="bg-[#080810] text-gray-100 min-h-screen" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
