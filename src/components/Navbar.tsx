"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dj-gers", label: "DJ GERS" },
  { href: "/swopster", label: "Swopster" },
  { href: "/feest", label: "FEEST" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Book / Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080810]/90 backdrop-blur-md border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full gradient-purple-blue flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
              G
            </div>
            <span className="font-black text-lg tracking-widest text-white group-hover:neon-text transition-all">
              DJ<span className="gradient-text">GERS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 ${
                    active
                      ? "text-purple-400 bg-purple-500/10"
                      : "text-gray-400 hover:text-purple-300 hover:bg-purple-500/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-neon-filled ml-4 text-sm py-2 px-4 lowercase tracking-normal font-semibold">
              Book Now
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-purple-400 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#10101c] border-t border-purple-900/30 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium tracking-wide transition-all ${
                  active
                    ? "text-purple-400 bg-purple-500/10"
                    : "text-gray-400 hover:text-purple-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
