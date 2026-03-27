import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Mockup – DJ GERS & Swopster Gatherings",
  description: "Interactive mockup presentation of the DJ GERS & Swopster Gatherings website.",
};

export default function MockupPage() {
  return (
    <div className="min-h-screen bg-[#04040a]">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-[#04040a]/95 backdrop-blur border-b border-purple-900/30 px-6 py-3 flex items-center justify-between">
        <div>
          <p className="text-purple-400 text-xs uppercase tracking-widest font-semibold">Mockup Presentatie</p>
          <h1 className="text-white font-black text-lg">DJ GERS &amp; Swopster Gatherings</h1>
        </div>
        <div className="flex gap-2 text-xs">
          {["Home", "DJ GERS", "Swopster", "FEEST", "Gallery", "Contact"].map((p) => (
            <a key={p} href={`#${p.toLowerCase()}`}
              className="px-3 py-1.5 rounded-full border border-purple-700/40 text-purple-300 hover:bg-purple-500/10 transition-colors hidden sm:block">
              {p}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">

        {/* ── HOME ── */}
        <section id="home">
          <SectionLabel page="01" title="Home" route="/" color="#a855f7" />
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <MockupDevice type="desktop" label="Hero sectie">
              <div className="w-full h-full bg-[#080810] flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto" />
                <div className="text-white font-black text-4xl tracking-tight leading-none">
                  DJ<span style={{ background: "linear-gradient(135deg,#a855f7,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>GERS</span>
                </div>
                <div className="w-16 h-px" style={{ background: "linear-gradient(90deg,transparent,#a855f7,#3b82f6,transparent)" }} />
                <p className="text-gray-400 text-xs max-w-xs">Professional DJ. Unforgettable nights. De kracht achter Swopster Gatherings &amp; FEEST.</p>
                <div className="flex gap-2 mt-1">
                  <span className="px-3 py-1 rounded text-xs text-white" style={{ background: "linear-gradient(135deg,#a855f7,#3b82f6)" }}>Book DJ GERS</span>
                  <span className="px-3 py-1 rounded text-xs text-white" style={{ background: "linear-gradient(135deg,#ec4899,#a855f7)" }}>Next FEEST →</span>
                </div>
              </div>
            </MockupDevice>
            <MockupDevice type="mobile" label="Brand cards">
              <div className="w-full h-full bg-[#080810] flex flex-col gap-2 p-3 overflow-hidden">
                <div className="rounded-lg p-3 border border-purple-700/30 bg-[#10101c] flex-1">
                  <div className="w-7 h-7 rounded bg-gradient-to-br from-purple-500 to-blue-500 mb-2" />
                  <p className="text-white font-black text-sm">DJ <span className="text-purple-400">GERS</span></p>
                  <p className="text-gray-500 text-xs mt-1">Club nights · Festivals · Private events</p>
                </div>
                <div className="rounded-lg p-3 border border-pink-700/30 bg-[#10101c] flex-1">
                  <div className="w-7 h-7 rounded bg-gradient-to-br from-pink-500 to-purple-600 mb-2" />
                  <p className="text-white font-black text-sm">Swopster <span className="text-pink-400">Gatherings</span></p>
                  <p className="text-gray-500 text-xs mt-1">Community events · FEEST series</p>
                </div>
              </div>
            </MockupDevice>
          </div>
        </section>

        {/* ── DJ GERS ── */}
        <section id="dj gers">
          <SectionLabel page="02" title="DJ GERS" route="/dj-gers" color="#a855f7" />
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <MockupDevice type="desktop" label="Services grid">
              <div className="w-full h-full bg-[#080810] p-5 flex flex-col gap-3">
                <p className="text-purple-400 text-xs uppercase tracking-widest">Services</p>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {[["🎧","Club Nights"],["🎉","Private Parties"],["🏟️","Festivals"],["💼","Corporate"]].map(([icon, label]) => (
                    <div key={label as string} className="bg-[#10101c] rounded-lg p-3 border border-purple-900/20 flex flex-col gap-1">
                      <span className="text-lg">{icon}</span>
                      <p className="text-white text-xs font-bold">{label as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MockupDevice>
            <MockupDevice type="mobile" label="Mixes sectie">
              <div className="w-full h-full bg-[#080810] p-3 flex flex-col gap-2">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">Mixes</p>
                {["Late Night Session Vol. 3","Afro Heat Mix","Deep House Journey"].map((mix) => (
                  <div key={mix} className="flex items-center gap-2 bg-[#10101c] rounded-lg p-2 border border-purple-900/20">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs">▶</span>
                    </div>
                    <p className="text-white text-xs font-medium truncate">{mix}</p>
                  </div>
                ))}
              </div>
            </MockupDevice>
          </div>
        </section>

        {/* ── SWOPSTER ── */}
        <section id="swopster">
          <SectionLabel page="03" title="Swopster Gatherings" route="/swopster" color="#ec4899" />
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <MockupDevice type="desktop" label="Merkwaarden">
              <div className="w-full h-full bg-[#080810] p-5 flex flex-col gap-3">
                <p className="text-pink-400 text-xs uppercase tracking-widest">Onze waarden</p>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {[["🤝","Community First"],["🎵","Music as Core"],["✨","Uniek"],["🔥","Pure Energy"]].map(([icon, label]) => (
                    <div key={label as string} className="bg-[#10101c] rounded-lg p-3 border border-pink-900/20 flex flex-col gap-1">
                      <span className="text-lg">{icon}</span>
                      <p className="text-white text-xs font-bold">{label as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MockupDevice>
            <MockupDevice type="mobile" label="Events timeline">
              <div className="w-full h-full bg-[#080810] p-3 flex flex-col gap-2">
                <p className="text-pink-400 text-xs uppercase tracking-widest mb-1">Events</p>
                {[{name:"FEEST Ed. 3", upcoming:true},{name:"FEEST Ed. 2",upcoming:false},{name:"FEEST Ed. 1",upcoming:false}].map((e) => (
                  <div key={e.name} className={`flex items-center gap-2 rounded-lg p-2 border ${e.upcoming ? "border-pink-500/40 bg-pink-500/5" : "border-white/5 bg-[#10101c]"}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${e.upcoming ? "bg-pink-500" : "bg-gray-600"}`} />
                    <p className="text-white text-xs font-semibold">{e.name}</p>
                    {e.upcoming && <span className="text-xs text-pink-400 ml-auto">Upcoming</span>}
                  </div>
                ))}
              </div>
            </MockupDevice>
          </div>
        </section>

        {/* ── FEEST ── */}
        <section id="feest">
          <SectionLabel page="04" title="FEEST" route="/feest" color="#ec4899" accent="#f59e0b" />
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <MockupDevice type="desktop" label="Event hero">
              <div className="w-full h-full bg-[#080810] flex flex-col items-center justify-center gap-3 p-5 text-center relative overflow-hidden">
                <div className="absolute top-4 left-4 w-24 h-24 rounded-full blur-2xl" style={{background:"rgba(236,72,153,0.25)"}} />
                <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full blur-2xl" style={{background:"rgba(245,158,11,0.2)"}} />
                <p className="text-pink-400 text-xs uppercase tracking-widest relative z-10">Swopster Gatherings presents</p>
                <p className="font-black text-5xl relative z-10" style={{background:"linear-gradient(135deg,#ec4899,#a855f7,#f59e0b)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>FEEST</p>
                <p className="text-white text-sm font-semibold relative z-10">Edition 3</p>
                <div className="flex gap-2 mt-1 relative z-10">
                  <span className="px-2 py-1 rounded-full text-xs border border-pink-500/40 text-pink-300">📅 TBA</span>
                  <span className="px-2 py-1 rounded-full text-xs border border-yellow-500/40 text-yellow-300">📍 TBA</span>
                </div>
              </div>
            </MockupDevice>
            <MockupDevice type="mobile" label="Lineup">
              <div className="w-full h-full bg-[#080810] p-3 flex flex-col gap-2">
                <p className="text-pink-400 text-xs uppercase tracking-widest mb-1">Lineup</p>
                <div className="flex items-center gap-2 rounded-lg p-2 border border-pink-500/40 bg-pink-500/5">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-black">G</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-black">DJ GERS</p>
                    <p className="text-gray-500 text-xs">Headliner · 22:00–00:00</p>
                  </div>
                  <span className="text-xs text-pink-400 ml-auto">★</span>
                </div>
                {["Support DJ","Opening DJ"].map((role) => (
                  <div key={role} className="flex items-center gap-2 rounded-lg p-2 border border-white/5 bg-[#10101c]">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
                      <span className="text-gray-400 text-xs">?</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-black">TBA</p>
                      <p className="text-gray-600 text-xs">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MockupDevice>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery">
          <SectionLabel page="05" title="Gallery" route="/gallery" color="#3b82f6" />
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <MockupDevice type="desktop" label="Fotogrid">
              <div className="w-full h-full bg-[#080810] p-3 flex flex-col gap-2">
                <div className="flex gap-2 mb-1">
                  {["All","FEEST","DJ","Swopster"].map((cat, i) => (
                    <span key={cat} className={`px-2 py-0.5 rounded-full text-xs border ${i===0?"border-purple-500 text-purple-300":"border-white/10 text-gray-500"}`}>{cat}</span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-1 flex-1">
                  {[
                    {color:"#1a0030",accent:"#a855f7"},{color:"#1a001a",accent:"#ec4899"},{color:"#001030",accent:"#3b82f6"},
                    {color:"#1a1000",accent:"#f59e0b"},{color:"#001a10",accent:"#22d3ee"},{color:"#200015",accent:"#a855f7"},
                  ].map((item, i) => (
                    <div key={i} className="rounded aspect-square flex items-center justify-center text-sm"
                      style={{background:item.color, boxShadow:`inset 0 0 20px ${item.accent}30`}}>
                      <span style={{color:item.accent}}>📸</span>
                    </div>
                  ))}
                </div>
              </div>
            </MockupDevice>
            <MockupDevice type="mobile" label="Video highlights">
              <div className="w-full h-full bg-[#080810] p-3 flex flex-col gap-2">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">Video</p>
                {["FEEST Ed. 2 – Aftermovie","DJ GERS – Festival Set"].map((vid) => (
                  <div key={vid} className="flex-1 bg-[#10101c] rounded-lg border border-purple-900/20 flex flex-col items-center justify-center gap-1">
                    <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-white text-sm">▶</span>
                    </div>
                    <p className="text-white text-xs font-medium text-center px-2">{vid}</p>
                  </div>
                ))}
              </div>
            </MockupDevice>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <SectionLabel page="06" title="Book / Contact" route="/contact" color="#a855f7" />
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <MockupDevice type="desktop" label="Booking formulier">
              <div className="w-full h-full bg-[#080810] p-4 flex flex-col gap-2">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">Booking Request</p>
                <div className="grid grid-cols-2 gap-1">
                  {["Naam","Email","Telefoon","Event Type"].map((f) => (
                    <div key={f} className="bg-[#10101c] rounded border border-white/5 px-2 py-1.5">
                      <p className="text-gray-600 text-xs">{f}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#10101c] rounded border border-white/5 px-2 py-1.5 flex-1">
                  <p className="text-gray-600 text-xs">Bericht...</p>
                </div>
                <div className="h-8 rounded flex items-center justify-center text-xs text-white font-semibold"
                  style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)"}}>
                  Stuur Boeking
                </div>
              </div>
            </MockupDevice>
            <MockupDevice type="mobile" label="Contact info">
              <div className="w-full h-full bg-[#080810] p-3 flex flex-col gap-2">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-1">Info</p>
                {[{icon:"📧","label":"Email","val":"info@djgers.nl"},{icon:"📍","label":"Gebaseerd in","val":"Nederland"},{icon:"🎧","label":"Booking","val":"DJ GERS"},{icon:"🎉","label":"Events","val":"Swopster Gatherings"}].map((item) => (
                  <div key={item.label} className="flex gap-2 bg-[#10101c] rounded-lg p-2 border border-purple-900/20">
                    <span className="text-base shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-gray-500 text-xs">{item.label}</p>
                      <p className="text-white text-xs font-semibold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MockupDevice>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <div className="text-center py-16 border-t border-purple-900/20">
          <p className="text-gray-500 text-sm mb-2">Website klaar voor deployment</p>
          <h2 className="text-3xl font-black text-white mb-4">
            Zet live via <span style={{background:"linear-gradient(135deg,#a855f7,#3b82f6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Vercel</span>
          </h2>
          <div className="bg-[#10101c] border border-purple-900/30 rounded-xl p-6 max-w-lg mx-auto text-left">
            <p className="text-purple-400 text-xs uppercase tracking-widest mb-3">Deploy in 3 stappen</p>
            {["1. Ga naar vercel.com en log in met GitHub","2. Importeer repo: patrickgers010/dj-buss","3. Klik Deploy — klaar! Je krijgt een live URL"].map((s) => (
              <p key={s} className="text-gray-300 text-sm py-1.5 border-b border-white/5 last:border-0">{s}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Helper Components ────────────────────────────────── */

function SectionLabel({ page, title, route, color, accent }: {
  page: string; title: string; route: string; color: string; accent?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-black text-4xl">{page}</span>
      <div>
        <h2 className="font-black text-3xl text-white" style={{ color }}>{title}</h2>
        <p className="text-gray-600 text-sm font-mono">{route}</p>
      </div>
      <div className="flex-1 h-px ml-4" style={{
        background: `linear-gradient(90deg, ${color}60, ${accent ?? color}30, transparent)`
      }} />
    </div>
  );
}

function MockupDevice({ type, label, children }: {
  type: "desktop" | "mobile"; label: string; children: React.ReactNode;
}) {
  if (type === "desktop") {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c18] p-2 shadow-2xl">
          {/* Browser chrome */}
          <div className="bg-[#18181f] rounded-t-lg px-3 py-2 flex items-center gap-2 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 bg-[#0c0c18] rounded text-gray-600 text-xs px-3 py-0.5 font-mono">
              djgers.nl
            </div>
          </div>
          {/* Screen */}
          <div className="aspect-video overflow-hidden rounded-b-lg">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-gray-500 text-xs uppercase tracking-wider self-start">{label}</p>
      <div className="relative w-52 mx-auto">
        {/* Phone frame */}
        <div className="rounded-[2rem] overflow-hidden border-2 border-white/10 bg-[#0c0c18] p-1.5 shadow-2xl">
          {/* Notch */}
          <div className="bg-black rounded-full w-16 h-4 mx-auto mb-1 flex items-center justify-center">
            <div className="w-6 h-1.5 bg-[#18181f] rounded-full" />
          </div>
          {/* Screen */}
          <div className="rounded-[1.5rem] overflow-hidden" style={{ aspectRatio: "9/16" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
