import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SPL!NTR | ONDRSTRM",
    template: "%s | SPL!NTR",
  },
  description:
    "SPL!NTR – DJ & producer draaiend RoMinimal. Onderdeel van ONDRSTRM: label, events en booking agency. Klein, underground, alleen muziek.",
  keywords: ["SPL!NTR", "ONDRSTRM", "RoMinimal", "DJ", "minimal techno", "events"],
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
