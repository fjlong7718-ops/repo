import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowRight, Check, ChevronDown, FileCheck2,
  Layers3, Microscope, PackageCheck,
  UploadCloud, Zap,
} from "lucide-react";
import NavBar from "../components/NavBar";
import RelatedProducts from "../components/RelatedProducts";
import quotePreview from "../../imports/image-9.png";

type ProductKind = "prototype" | "standard";

const productData = {
  prototype: {
    eyebrow: "QUICK-TURN PCB · ENGINEERING VALIDATION",
    title: "Prototype PCB",
    accent: "Move from design to tested hardware in days.",
    intro: "Upload your Gerber files, validate manufacturability, and receive production-ready boards with traceable inspection at every stage.",
    badge: "Built in as fast as 24 hours",
    metrics: [["24h", "Fastest build"], ["1–32", "Layer options"], ["3/3 mil", "Min trace / space"], ["0.15mm", "Min mechanical drill"]],
    outcomes: [
      ["Validate earlier", "Catch layout and DFM issues before tooling or volume commitments."],
      ["Iterate without friction", "No MOQ pressure—run one revision, learn, and upload the next."],
      ["Use production processes", "Prototype on the same controlled lines, materials, and test logic used for scale."],
    ],
    ideal: ["EVT / DVT hardware", "IoT and embedded devices", "Medical proof-of-concept", "Robotics control boards"],
  },
  standard: {
    eyebrow: "STANDARD PCB · REPEATABLE PRODUCTION",
    title: "Standard PCB",
    accent: "A dependable path from approved design to repeat orders.",
    intro: "Stable materials, controlled stack-ups, broad finishing options, and documented electrical testing for cost-effective recurring production.",
    badge: "Prototype-to-volume continuity",
    metrics: [["1–14", "Standard layers"], ["0.2–3.2mm", "Board thickness"], ["4 mil", "Standard trace / space"], ["±5–10%", "Impedance tolerance"]],
    outcomes: [
      ["Control total cost", "Standardized materials and processes create predictable pricing at scale."],
      ["Protect repeatability", "Locked stack-ups and inspection records keep later batches aligned."],
      ["Scale on one platform", "Move from fabrication to sourcing and assembly without rebuilding the workflow."],
    ],
    ideal: ["Industrial controls", "Consumer electronics", "Automotive subsystems", "Repeat low/mid-volume runs"],
  },
} satisfies Record<ProductKind, any>;

const capabilityRows = [
  ["Base materials", "FR-4, Aluminum, Copper base", "FR-4, Aluminum, Flex, Rigid-flex, HDI, Rogers"],
  ["Layer count", "1–14 layers", "1–32 layers"],
  ["Board thickness", "0.2–3.2mm", "0.2–4.0mm"],
  ["Trace / spacing", "4/4 mil", "Down to 3/3 mil"],
  ["Copper weight", "1–8 oz typical", "1–13 oz available"],
  ["Surface finish", "HASL, Lead-free HASL, ENIG, OSP", "ENIG, ENEPIG, Hard Gold, Immersion Ag/Sn, OSP"],
  ["Testing", "Flying probe / fixture + AOI", "Free flying probe + AOI; custom reports available"],
];

const process = [
  [UploadCloud, "Upload", "Gerber and drill files"],
  [FileCheck2, "DFM review", "Rules and stack-up check"],
  [Layers3, "Fabricate", "Controlled line production"],
  [Microscope, "Inspect", "AOI and electrical test"],
  [PackageCheck, "Ship", "Protected and traceable"],
];

const faqs = [
  ["Which files should I upload?", "A zipped Gerber package and NC drill file are enough for fabrication. Add a fabrication drawing or stack-up when tolerances, impedance, cut-outs, or special processes matter."],
  ["How is the price calculated?", "Price responds to board area, quantity, layer count, material, copper weight, finish, routing, testing, and delivery speed. The quote page updates the estimate as specifications change."],
  ["Can the same design move into production?", "Yes. Once the prototype is approved, the saved specification and manufacturing record become the baseline for repeat orders and volume review."],
];

export default function ProductDetail() {
  const { type } = useParams();
  const kind: ProductKind = type === "standard" ? "standard" : "prototype";
  const data = productData[kind];
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-white text-[#162018]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavBar activePage="products" />

      <section className="relative overflow-hidden bg-[#071A0D] text-white">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 76% 36%, #397947 0, transparent 25%), linear-gradient(rgba(67,120,75,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(67,120,75,.18) 1px, transparent 1px)", backgroundSize: "auto, 44px 44px, 44px 44px" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <div>
            <div className="text-[11px] font-mono tracking-[.18em] text-[#D5B34E] mb-5">{data.eyebrow}</div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>{data.title}</h1>
            <p className="text-xl lg:text-2xl font-semibold text-[#D5B34E] mb-5 max-w-2xl">{data.accent}</p>
            <p className="text-base text-white/60 leading-7 max-w-2xl mb-8">{data.intro}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A6B32] text-white rounded-sm font-bold hover:bg-[#155527] transition-colors"><Zap size={16} /> Get Instant Quote</Link>
              <a href="#capabilities" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-sm font-semibold text-white/80 hover:bg-white/5">View capabilities <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="relative min-h-[330px] hidden md:block">
            <div className="absolute inset-4 rounded-[32px] border border-[#D5B34E]/20 rotate-3" />
            <div className="absolute inset-10 rounded-[28px] bg-[#123D20] border border-white/10 shadow-2xl -rotate-2 overflow-hidden">
              <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle, #D5B34E 2px, transparent 3px), linear-gradient(90deg, transparent 48%, rgba(213,179,78,.34) 49%, rgba(213,179,78,.34) 51%, transparent 52%)", backgroundSize: "42px 42px, 70px 70px" }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-[18px] border-[#D5B34E]/60 rounded-2xl shadow-[0_0_0_12px_rgba(0,0,0,.18)]" />
              <div className="absolute left-5 bottom-5 right-5 flex items-center justify-between bg-[#071A0D]/85 border border-white/10 px-4 py-3 backdrop-blur-sm">
                <span className="text-xs font-mono text-white/45">LIVE PRODUCTION PROFILE</span><span className="text-xs font-bold text-[#D5B34E]">{data.badge}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {data.metrics.map(([value, label]: string[]) => <div key={label} className="px-5 py-6 text-center"><div className="text-2xl font-black text-[#D5B34E]">{value}</div><div className="text-[10px] mt-1 font-mono uppercase tracking-wider text-white/35">{label}</div></div>)}
          </div>
        </div>
      </section>

      <section className="py-18 lg:py-22 bg-[#F3F7F3]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">WHY THIS PRODUCT</p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{kind === "prototype" ? "Learn fast without compromising the build." : "Standardized where it matters. Flexible where it counts."}</h2>
              <p className="text-[#4A6B4D] leading-7">A product channel designed around the decision you are making now—not a catalog of disconnected processes.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {data.outcomes.map(([title, text]: string[], i: number) => <article key={title} className="bg-white border border-[#D4E1D5] p-6 rounded-sm shadow-sm"><div className="w-9 h-9 bg-[#E5F1E6] text-[#1A5C2A] flex items-center justify-center rounded-sm font-mono font-bold mb-8">0{i + 1}</div><h3 className="font-bold text-lg mb-2">{title}</h3><p className="text-sm text-[#607362] leading-6">{text}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-9"><div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">MANUFACTURING WINDOW</p><h2 className="text-4xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>Specs you can design around</h2></div><Link to="/capabilities" className="text-sm font-semibold text-[#1A5C2A] flex items-center gap-2">Explore the full capability matrix <ArrowRight size={15} /></Link></div>
          <div className="border border-[#CBD9CC] overflow-hidden rounded-sm">
            <div className="grid grid-cols-[1fr_1.15fr_1.4fr] bg-[#0D2914] text-white text-xs font-mono uppercase tracking-wide"><div className="p-4">Parameter</div><div className="p-4 border-l border-white/10">Standard window</div><div className="p-4 border-l border-white/10">Extended / prototype window</div></div>
            {capabilityRows.map((row, i) => <div key={row[0]} className={`grid grid-cols-[1fr_1.15fr_1.4fr] text-sm ${i % 2 ? "bg-[#F4F7F4]" : "bg-white"}`}><div className="p-4 font-semibold">{row[0]}</div><div className={`p-4 border-l border-[#D8E1D9] ${kind === "standard" ? "text-[#155527] font-semibold" : "text-[#607362]"}`}>{row[1]}</div><div className={`p-4 border-l border-[#D8E1D9] ${kind === "prototype" ? "text-[#155527] font-semibold" : "text-[#607362]"}`}>{row[2]}</div></div>)}
          </div>
          <p className="mt-4 text-xs text-[#718273]">Final manufacturability depends on the complete design combination. Unusual stack-ups and tolerances receive an engineering review before production.</p>
        </div>
      </section>

      <section className="py-20 bg-[#0B2111] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12"><p className="text-xs font-mono tracking-widest text-[#D5B34E] mb-3">ONE VISIBLE WORKFLOW</p><h2 className="text-4xl font-black mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>From uploaded files to inspected boards</h2><p className="text-white/45">A simple front-end experience backed by controlled engineering gates.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">{process.map(([Icon, title, text], i) => <div key={String(title)} className="relative border border-white/10 bg-white/[.035] p-5"><div className="flex justify-between items-start mb-10"><Icon size={21} className="text-[#D5B34E]" /><span className="font-mono text-xs text-white/20">0{i + 1}</span></div><h3 className="font-bold mb-1">{String(title)}</h3><p className="text-xs text-white/38">{String(text)}</p></div>)}</div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-sm border border-[#CBD9CC] bg-[#F5F8F5] p-3 shadow-xl overflow-hidden"><img src={quotePreview} alt="PCBasic instant quote configuration" className="w-full h-auto" /></div>
          <div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">QUOTE WITHOUT THE EMAIL LOOP</p><h2 className="text-4xl font-black mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>Configure, compare, and commit when you are ready.</h2><p className="text-[#607362] leading-7 mb-7">Upload Gerber files for automatic parameter recognition or enter the core specifications manually. Pricing, build time, and shipping remain visible as the configuration changes.</p><ul className="grid sm:grid-cols-2 gap-3 mb-8">{["Secure Gerber upload", "Real-time price feedback", "Build-time selection", "Saved production profile"].map(x => <li key={x} className="flex items-center gap-2 text-sm font-medium"><Check size={16} className="text-[#1A6B32]" />{x}</li>)}</ul><Link to="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A5C2A] text-white font-bold rounded-sm">Start your quote <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="py-20 bg-[#F3F7F3]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          <div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">DESIGNED FOR</p><h2 className="text-4xl font-black mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Where {data.title.toLowerCase()} fits best</h2><div className="grid sm:grid-cols-2 gap-3">{data.ideal.map((x: string, i: number) => <div key={x} className="bg-white border border-[#D4E1D5] p-5 flex gap-4"><span className="text-[#B18C2D] font-mono text-xs mt-1">0{i + 1}</span><span className="font-semibold">{x}</span></div>)}</div></div>
          <div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">COMMON QUESTIONS</p><div className="border-t border-[#CAD8CB]">{faqs.map(([q, a], i) => <div key={q} className="border-b border-[#CAD8CB]"><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full py-5 flex items-center justify-between text-left font-bold"><span>{q}</span><ChevronDown size={17} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} /></button>{openFaq === i && <p className="pb-5 pr-10 text-sm leading-6 text-[#607362]">{a}</p>}</div>)}</div></div>
        </div>
      </section>

      <RelatedProducts mode="pcb" />

      <section className="bg-[#D5B34E] py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"><div><p className="text-xs font-mono tracking-widest text-[#44350D] mb-2">READY FOR THE NEXT REVISION?</p><h2 className="text-3xl font-black text-[#132016]" style={{ fontFamily: "'Outfit', sans-serif" }}>Upload your files. See your path to production.</h2></div><div className="flex gap-3"><Link to="/quote" className="px-6 py-3 bg-[#123D20] text-white font-bold rounded-sm">Get Instant Quote</Link><Link to="/contact" className="px-6 py-3 border border-[#44350D]/30 text-[#24301F] font-bold rounded-sm">Talk to an engineer</Link></div></div>
      </section>

      <footer className="bg-[#071A0D] text-white/45 py-9"><div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-4 text-xs"><span className="font-semibold text-white/70">PCBasic · Precision Manufacturing. Under Your Control.</span><span>Prototype · Standard PCB · PCBA · CNC / 3D Print</span></div></footer>
    </div>
  );
}
