import Link from "next/link";

const navLinks = [
  { href: "/splintr", label: "Music" },
  { href: "/event", label: "Events" },
  { href: "/ondrstrm", label: "Ondrstrm" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0b1f17] border-t border-[rgba(242,241,236,0.14)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="coord-tag">ROTTERDAM / 51.9225&deg;N</span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.18em] text-[#f2f1ec] opacity-70 hover:opacity-100 hover:text-[#ff4b1f] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <span className="coord-tag">ONDRSTRM&nbsp;&mdash;&nbsp;EST. 2026</span>
      </div>
    </footer>
  );
}
