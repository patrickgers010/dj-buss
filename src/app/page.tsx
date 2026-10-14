import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPL!NTR | ONDRSTRM – Home",
};

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      {/* Photo panel — treated hard: grayscale + green duotone + heavy fade.
          Reads as atmosphere, not a promo shot — a moment, not a portrait. */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-full md:w-[46%] opacity-40 md:opacity-100">
          <Image
            src="/images/splintr-hero.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 46vw"
            style={{
              objectFit: "cover",
              objectPosition: "70% 30%",
              filter: "grayscale(1) contrast(1.15) brightness(0.55) sepia(0.25) hue-rotate(60deg) saturate(1.4)",
              mixBlendMode: "luminosity",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #0b1f17 0%, transparent 38%), linear-gradient(to top, #0b1f17 0%, transparent 32%), linear-gradient(to bottom, #0b1f17 0%, transparent 22%)",
            }}
          />
        </div>
        {/* faint technical grid, barely there */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,241,236,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(242,241,236,0.14) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 70% 40%, black, transparent 75%)",
          }}
        />
      </div>

      {/* ─── HERO BODY ───────────────────────────────────────── */}
      <div className="flex-1 flex items-center px-5 sm:px-8 lg:px-16">
        <div className="max-w-[760px]">
          <p className="eyebrow mb-5">DJ &middot; Producer &middot; RoMinimal</p>

          <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(3.2rem,11vw,7.5rem)]">
            SPL<span className="text-[#ff4b1f]">!</span>NTR
          </h1>

          <div className="hairline-rule my-7" />

          <p className="text-[#f2f1ec]/90 text-base sm:text-lg leading-relaxed max-w-[480px]">
            The undercurrent runs on one frequency. Catch it or don&apos;t —
            there&apos;s no getting off once you&apos;re in.
          </p>

          <div className="flex gap-9 items-center mt-11">
            <Link href="/ondrstrm" className="underline-link">
              Ondrstrm &rarr;
            </Link>
            <Link href="/splintr" className="underline-link">
              Listen
            </Link>
          </div>
        </div>
      </div>

      {/* ─── FOOT / SCROLL CUE ───────────────────────────────── */}
      <div className="flex items-end justify-between px-5 sm:px-8 lg:px-16 pb-10 gap-4">
        <span className="coord-tag">ROTTERDAM / 51.9225&deg;N</span>
        <div className="hidden sm:flex flex-col items-center gap-2 opacity-55">
          <span className="w-px h-8 bg-gradient-to-b from-[#f2f1ec] to-transparent" />
          <span className="coord-tag">Scroll</span>
        </div>
        <span className="coord-tag">ONDRSTRM&nbsp;&mdash;&nbsp;EST. 2026</span>
      </div>
    </div>
  );
}
