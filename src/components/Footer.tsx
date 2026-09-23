import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-purple-900/30 mt-24">
      <div className="divider-neon" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-black text-2xl tracking-widest text-white mb-2">
              SPL<span className="gradient-text">!</span>NTR
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              RoMinimal. Stripped, rolling, hypnotic.<br />
              Onderdeel van het ONDRSTRM ecosysteem.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-purple-400 font-semibold uppercase tracking-widest text-xs mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-purple-300 transition-colors">Home</Link></li>
              <li><Link href="/splintr" className="hover:text-purple-300 transition-colors">SPL!NTR</Link></li>
              <li><Link href="/ondrstrm" className="hover:text-purple-300 transition-colors">ONDRSTRM</Link></li>
              <li><Link href="/event" className="hover:text-purple-300 transition-colors">Event</Link></li>
              <li><Link href="/gallery" className="hover:text-purple-300 transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-purple-300 transition-colors">Book / Contact</Link></li>
            </ul>
          </div>

          {/* ONDRSTRM */}
          <div>
            <h4 className="text-pink-400 font-semibold uppercase tracking-widest text-xs mb-4">ONDRSTRM</h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Label, events en booking agency. Klein, underground, alleen muziek.
            </p>
            <Link
              href="/event"
              className="inline-block text-sm text-pink-400 border border-pink-500/40 px-3 py-1 rounded hover:bg-pink-500/10 transition-colors"
            >
              Upcoming: ONDRSTRM &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>&copy; {new Date().getFullYear()} SPL!NTR &amp; ONDRSTRM. All rights reserved.</span>
          <Link href="/contact" className="text-purple-600 hover:text-purple-400 transition-colors">
            Book a set &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
