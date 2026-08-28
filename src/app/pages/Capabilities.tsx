import { useState } from "react";
import { Link } from "react-router";
import type React from "react";
import {
  Layers, Shield, Cpu, Zap, ArrowRight,
  CheckCircle, ChevronRight,
} from "lucide-react";
import NavBar from "../components/NavBar";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const R  = "#1A5C2A";
const G  = "#1A1A2E";
const W  = "#F8F7F4";
const WH = "#FFFFFF";
const BD = "#E5E2DB";
const M  = "#5C5C75";
const GD = "#C9A84C";
const G50 = "#EDEDF0";

// ── Data ─────────────────────────────────────────────────────────────────────

const MFG_SPECS = [
  { param: "PCB Layers",        value: "1 – 32 layers",                  note: "HDI up to 20 layers" },
  { param: "Board Thickness",   value: "0.4 – 6.0 mm",                   note: "Standard 1.6 mm" },
  { param: "Copper Weight",     value: "0.5 oz – 6 oz",                  note: "Inner/outer layers" },
  { param: "Min Trace / Space", value: "3 / 3 mil (0.076 mm)",           note: "HDI: 2/2 mil" },
  { param: "Min Drill (mech.)", value: "0.20 mm",                        note: "Laser: 0.10 mm" },
  { param: "Max Board Size",    value: "580 × 480 mm",                   note: "Panel up to 600×500 mm" },
  { param: "Surface Finish",    value: "HASL · HASL-LF · ENIG · OSP",   note: "+ ENEPIG · Hard Gold" },
  { param: "Solder Mask",       value: "Green · Red · Blue · Black · White · Yellow", note: "" },
  { param: "Min Annular Ring",  value: "4 mil (0.10 mm)",                note: "" },
  { param: "Impedance Control", value: "±5% tolerance",                  note: "TDR verified" },
  { param: "Via Types",         value: "Through · Blind · Buried · Micro", note: "HDI & back-drill" },
  { param: "Board Material",    value: "FR4 · Rogers · Aluminum · Polyimide", note: "High-frequency available" },
];

const PCBA_SPECS = [
  { param: "Min Component",     value: "0201 (imperial)",     note: "01005 on request" },
  { param: "Placement Speed",   value: "72,000 CPH",          note: "YAMAHA YSM40R" },
  { param: "BGA Pitch",         value: "0.3 mm min",          note: "X-ray verified" },
  { param: "Solder Paste",      value: "SPI inspection",      note: "DEK Horizon" },
  { param: "Reflow Profile",    value: "Lead / Lead-free",    note: "Heller 1913 MKIII" },
  { param: "Inspection",        value: "AOI · X-ray · ICT",  note: "100% coverage" },
  { param: "IPC Standard",      value: "IPC-A-610 Class II/III", note: "" },
  { param: "BOM Sourcing",      value: "680,000+ components", note: "Original, authorized" },
];

const CERTS = [
  { name: "ISO 9001:2015",  scope: "Quality Management System",              color: GD },
  { name: "IATF 16949",     scope: "Automotive Quality Management",          color: GD },
  { name: "ISO 13485",      scope: "Medical Devices Quality Management",     color: GD },
  { name: "UL Listed",      scope: "Component Safety Certification",         color: GD },
  { name: "RoHS",           scope: "Restriction of Hazardous Substances",    color: "#22C55E" },
  { name: "REACH",          scope: "Chemical Substance Compliance",          color: "#22C55E" },
  { name: "IPC-A-600 / 610",scope: "PCB Acceptability & Assembly Standards", color: "#3B82F6" },
  { name: "IPC Class III",  scope: "High-Reliability Electronics",           color: "#3B82F6" },
];

const EQUIPMENT = [
  {
    category: "SMT Placement",
    image: "https://images.unsplash.com/photo-1532186773960-85649e5cb70b?w=600&h=360&fit=crop",
    items: [
      { brand: "YAMAHA", model: "YSM40R",  spec: "72,000 CPH",       qty: "6 lines" },
      { brand: "FUJI",   model: "NXT III", spec: "0201 min",          qty: "3 lines" },
    ],
  },
  {
    category: "Screen Printing",
    image: "https://images.unsplash.com/photo-1663433567177-9f94be0bff4c?w=600&h=360&fit=crop",
    items: [
      { brand: "DEK", model: "Horizon 03i", spec: "±25 µm accuracy", qty: "6 units" },
    ],
  },
  {
    category: "Reflow Soldering",
    image: "https://images.unsplash.com/photo-1717386255767-52643970d483?w=600&h=360&fit=crop",
    items: [
      { brand: "Heller", model: "1913 MKIII", spec: "13 zones", qty: "4 units" },
    ],
  },
  {
    category: "AOI Inspection",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=360&fit=crop",
    items: [
      { brand: "Saki", model: "BF-3Di", spec: "3D solder inspection", qty: "6 units" },
    ],
  },
  {
    category: "X-Ray",
    image: "https://images.unsplash.com/photo-1760872703636-f8d643a2b510?w=600&h=360&fit=crop",
    items: [
      { brand: "Unicomp", model: "AX7900", spec: "BGA / micro-BGA", qty: "2 units" },
    ],
  },
  {
    category: "Flying Probe",
    image: "https://images.unsplash.com/photo-1631376178637-392efc9e356b?w=600&h=360&fit=crop",
    items: [
      { brand: "Spea", model: "4060", spec: "No fixture required", qty: "4 units" },
    ],
  },
];


const SPECIAL = [
  {
    title: "Copper Coin Embedding",
    desc: "Solid copper coins pressed into PCB cavities for superior thermal dissipation. Suitable for power modules and LED drivers requiring > 150 W/m·K thermal conductivity.",
    tags: ["Thermal management", "Power electronics", "LED drivers"],
    icon: "🔶",
  },
  {
    title: "Stepped / Slot Routing",
    desc: "Controlled-depth milling to create component recesses or partial board cutouts. Enables flush-mount connectors and reduces assembled height.",
    tags: ["Mechanical fit", "Flush-mount", "Space-saving"],
    icon: "🔷",
  },
  {
    title: "Back Drilling",
    desc: "Removal of stub sections from through-hole vias to eliminate signal reflections at high frequencies (> 10 GHz). Critical for 100G/400G SerDes channels.",
    tags: ["High-speed signal", "10G+ SerDes", "Stub removal"],
    icon: "🔩",
  },
  {
    title: "Mixed Dielectric / Hybrid Stack",
    desc: "Combining FR4 with Rogers or PTFE sub-laminates in a single board for RF front-end designs that require both digital logic and high-frequency antenna layers.",
    tags: ["RF / mmWave", "5G antenna", "Hybrid stack"],
    icon: "📡",
  },
  {
    title: "Buried & Blind Vias (HDI)",
    desc: "Sequential lamination enabling any-layer HDI structures. Up to 4 build-up layers with laser micro-vias down to 0.10 mm for high-density mobile and wearable designs.",
    tags: ["HDI", "Any-layer", "Micro-via"],
    icon: "🔬",
  },
  {
    title: "Heavy Copper (≥ 4 oz)",
    desc: "Thick copper traces for high-current power distribution boards. Supported up to 6 oz on outer layers and 4 oz on inner layers with specialized etching processes.",
    tags: ["Power bus", "High current", "EV / energy"],
    icon: "⚡",
  },
];

// ── Nav (simplified shared bar) ───────────────────────────────────────────────

// ── Section heading ────────────────────────────────────────────────────────────

function SectionHead({ icon: Icon, label, title, sub }: { icon: React.ElementType; label: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} color={R} />
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: R }}>{label}</span>
      </div>
      <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: G }}>{title}</h2>
      {sub && <p className="text-sm mt-2" style={{ color: M }}>{sub}</p>}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState<"pcb" | "pcba">("pcb");

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: W, color: G, minHeight: "100vh" }}>
      <NavBar activePage="capabilities" />

      {/* ── Hero ── */}
      <section style={{ background: G }}>
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Home</Link>
              <ChevronRight size={12} color="rgba(255,255,255,0.25)" />
              <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>Capabilities</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Manufacturing<br /><span style={{ color: R }}>Capabilities</span>
            </h1>
            <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              Full technical specifications, certifications, equipment catalog, and competitive benchmarks.
              Find the right process for your project — from standard FR4 to HDI, hybrid RF, and automotive-grade builds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            {["108,000+ Orders", "32-Layer Max", "IATF 16949", "IPC Class III"].map(s => (
              <span key={s} className="px-3 py-1.5 text-xs font-mono rounded"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1. Manufacturing Capabilities ── */}
      <section className="py-16" style={{ background: W }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead icon={Layers} label="Manufacturing Capabilities"
            title="Technical Specifications"
            sub="Full process parameters for PCB fabrication and PCBA assembly. Values represent standard capabilities; extended specs available on request." />

          {/* PCB / PCBA tab */}
          <div className="flex gap-0 border-b mb-6" style={{ borderColor: BD }}>
            {(["pcb", "pcba"] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="px-6 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors"
                style={{ borderColor: activeTab === t ? R : "transparent", color: activeTab === t ? R : M }}>
                {t === "pcb" ? "PCB Fabrication" : "PCBA Assembly"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg overflow-hidden border" style={{ borderColor: BD }}>
            <table className="w-full">
              <thead style={{ background: G }}>
                <tr>
                  {["Parameter", "Specification", "Notes"].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(activeTab === "pcb" ? MFG_SPECS : PCBA_SPECS).map((row, i) => (
                  <tr key={row.param} style={{ background: i % 2 === 0 ? WH : W }}>
                    <td className="px-6 py-3.5 text-sm font-semibold" style={{ color: G }}>{row.param}</td>
                    <td className="px-6 py-3.5 text-sm font-mono font-medium" style={{ color: R }}>{row.value}</td>
                    <td className="px-6 py-3.5 text-sm" style={{ color: M }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 2. Certifications Overview ── */}
      <section className="py-16 border-t" style={{ background: WH, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead icon={Shield} label="Certifications Overview"
            title="Quality & Compliance"
            sub="Every certification is third-party audited and maintained annually. Certificates available for download on request." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTS.map(cert => (
              <div key={cert.name} className="rounded-lg p-5 border" style={{ background: W, borderColor: BD }}>
                <div className="flex items-start justify-between mb-3">
                  <Shield size={18} color={cert.color} />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${cert.color}15`, color: cert.color }}>
                    Active
                  </span>
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: G }}>{cert.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: M }}>{cert.scope}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 p-4 rounded-lg" style={{ background: "#FDF8EC", border: `1px solid #FAEFC8` }}>
            <Shield size={16} color={GD} />
            <p className="text-sm" style={{ color: "#9E8138" }}>
              <strong>PCBasic Promise:</strong> Quality issues trigger a full refund or free re-spin — no questions asked. Certificates available upon request for every shipped order.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Equipment Catalog ── */}
      <section className="py-16 border-t" style={{ background: W, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead icon={Cpu} label="Equipment Catalog"
            title="Production Equipment"
            sub="Industry-leading equipment from global brands. All machines are calibrated and maintained under ISO 9001 protocols." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EQUIPMENT.map(cat => (
              <div key={cat.category} className="bg-white rounded-lg border overflow-hidden flex flex-col"
                style={{ borderColor: BD }}>
                {/* Equipment photo */}
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img
                    src={cat.image}
                    alt={cat.category}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Category label overlaid on image */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2"
                    style={{ background: "linear-gradient(to top, rgba(22,32,24,0.82) 0%, transparent 100%)" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white">{cat.category}</p>
                  </div>
                </div>

                {/* Machine specs */}
                <div className="p-4 space-y-3 flex-1">
                  {cat.items.map(eq => (
                    <div key={eq.model} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold" style={{ color: G }}>{eq.brand} {eq.model}</p>
                        <p className="text-xs mt-0.5" style={{ color: M }}>{eq.spec}</p>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 rounded shrink-0 whitespace-nowrap"
                        style={{ background: G50, color: M }}>{eq.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Special Processes ── */}
      <section className="py-16 border-t" style={{ background: W, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead icon={Zap} label="Special Processes"
            title="Advanced Manufacturing"
            sub="Non-standard processes for demanding applications. All special processes require DFM review — contact engineering before ordering." />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPECIAL.map(proc => (
              <div key={proc.title} className="bg-white rounded-lg border p-5 flex flex-col"
                style={{ borderColor: BD }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = R)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BD)}>
                <span className="text-2xl mb-3">{proc.icon}</span>
                <h3 className="text-base font-bold mb-2" style={{ color: G }}>{proc.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: M }}>{proc.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proc.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full font-mono"
                      style={{ background: "#FEF2F2", color: R }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Get a Quote CTA ── */}
      <section className="py-16" style={{ background: G }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              Capability Match → Instant Quote
            </p>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to start your build?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", maxWidth: "480px" }}>
              Upload your Gerber or configure manually. Our instant quote engine matches your specs
              to the right process automatically — standard, HDI, or special.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
            <a href="/#quote"
              onClick={e => { e.preventDefault(); window.location.href = "/#quote"; }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-sm"
              style={{ background: R, boxShadow: "0 4px 16px rgba(26,92,42,0.35)" }}>
              <Zap size={16} /> Get Instant Quote
            </a>
            <a href="mailto:engineering@pcbasic.com"
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium rounded-sm border"
              style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}>
              Talk to an Engineer <ArrowRight size={14} />
            </a>
            <div className="flex gap-4 mt-1">
              {[
                { icon: CheckCircle, text: "Free DFM review" },
                { icon: CheckCircle, text: "No MOQ" },
                { icon: CheckCircle, text: "24h prototype" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <Icon size={11} color="#22C55E" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="py-5 border-t" style={{ background: "#0D0D1A", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 PCBasic</p>
          <Link to="/" className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
