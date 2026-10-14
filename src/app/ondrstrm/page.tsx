import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONDRSTRM",
  description: "ONDRSTRM — the undercurrent. Not a brand. A frequency.",
};

export default function OndrstrmPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center px-5 sm:px-8 lg:px-16 py-20">
      <div className="max-w-[640px]">
        <p className="eyebrow mb-5">Onderstroom &middot; Undercurrent</p>

        <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.8rem,9vw,5.5rem)] mb-7">
          ONDRSTRM
        </h1>

        <div className="hairline-rule mb-9" />

        <div className="space-y-5 text-[#f2f1ec]/90 text-lg sm:text-xl leading-relaxed">
          <p>Not a brand. A frequency.</p>
          <p>No stage. No spotlight. Just the ones who hear it.</p>
          <p>Label. Events. Agency. One current, one maat.</p>
          <p className="text-[#8a8a84]">A threshold — not a sign on the door.</p>
        </div>
      </div>
    </div>
  );
}
