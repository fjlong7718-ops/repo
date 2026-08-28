import { useState } from "react";
import { Link } from "react-router";
import {
  Zap,
  Package,
  Cpu,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Layers,
  Truck,
  HeadphonesIcon,
  ShoppingCart,
  ChevronRight,
  Mail,
  Camera,
  Play,
  Glasses,
  ArrowUpRight,
  Phone,
  MessageSquare,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import NavBar from "../components/NavBar";


// ── Process Steps ─────────────────────────────────────────────────────────────

const processSteps = [
  { n: "01", label: "Upload Files", desc: "Gerber / BOM upload, auto-validation" },
  { n: "02", label: "Instant Quote", desc: "Real-time pricing, no email wait" },
  { n: "03", label: "Confirm Order", desc: "Specs locked, delivery selected" },
  { n: "04", label: "Payment", desc: "Secure checkout, multi-currency" },
  { n: "05", label: "Manufacturing", desc: "24-step process, live progress bar" },
  { n: "06", label: "QC & Test", desc: "E-test, AOI, X-ray inspection" },
  { n: "07", label: "Delivery", desc: "DHL Express, inline tracking" },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    name: "James R.",
    role: "Hardware Engineer, San Jose",
    text: "Turnaround is incredible. Uploaded Gerber on Tuesday, boards at my desk Thursday. Quality matches ENIG spec perfectly.",
    stars: 5,
  },
  {
    name: "Anna K.",
    role: "Procurement Manager, Berlin",
    text: "We switched from another vendor after PCBasic hit 98% on-time across 12 consecutive PCBA orders. The order tracking is transparent.",
    stars: 5,
  },
  {
    name: "David L.",
    role: "Founder, Toronto",
    text: "As a first-time PCB buyer the guided quote flow was exactly what I needed. Boards came with a detailed inspection report.",
    stars: 5,
  },
];

// ── Stats ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "16+", label: "Years Manufacturing" },
  { value: "98.3%", label: "On-Time Delivery" },
  { value: "99.6%", label: "Satisfaction Rate" },
  { value: "50K+", label: "Customers Worldwide" },
];

// ── Services ──────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Layers,
    title: "PCB Manufacturing",
    sub: "1–32 layer • 24h prototype",
    specs: ["Min trace: 3/3 mil", "Min hole: 0.2mm", "Max size: 580×480mm", "Surface: HASL / ENIG / OSP"],
    cta: "Get PCB Quote",
    color: "#1A5C2A",
  },
  {
    icon: Cpu,
    title: "PCBA Assembly",
    sub: "Turnkey & consigned",
    specs: ["SMT + THT + BGA", "Min component: 0201", "X-ray + AOI inspection", "IPC-A-610 Class II/III"],
    cta: "Get PCBA Quote",
    color: "#134421",
    accent: true,
  },
  {
    icon: Package,
    title: "CNC & 3D Print",
    sub: "Precision prototyping",
    specs: ["CNC milling & turning", "FDM / SLA / SLS print", "Sheet metal fabrication", "±0.05mm tolerance"],
    cta: "Get CNC Quote",
    color: "#2D6B3A",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [supportExpanded, setSupportExpanded] = useState(false);

  // compact quote bar state
  const [material, setMaterial] = useState("Fr-4");
  const [layers,   setLayers]   = useState(2);
  const [qty,      setQty]      = useState(5);
  const [width,    setWidth]    = useState(100);
  const [height,   setHeight]   = useState(100);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

      <NavBar />


      {/* ══════════════════════════════════════════════
          HERO — Full-bleed PCB background
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "620px", background: "#0C1F10" }}>

        {/* ── Background: PCB macro photo ── */}
        <img
          src="https://images.unsplash.com/photo-1592659762303-90081d34b277?w=1800&h=900&fit=crop&auto=format"
          alt="PCB circuit board macro"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.45 }}
        />

        {/* ── Left-to-right gradient: full dark left → transparent right ── */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(100deg, rgba(12,31,16,0.98) 0%, rgba(12,31,16,0.88) 38%, rgba(12,31,16,0.55) 65%, rgba(12,31,16,0.18) 100%)",
          }}
        />

        {/* ── Subtle circuit-trace grid overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26,92,42,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26,92,42,0.25) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.4,
          }}
        />

        {/* ── Precision dot grid (subtle) ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(26,92,42,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.3,
          }}
        />

        {/* ── Content ── */}
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 flex items-center min-h-[580px]">
          <div className="max-w-2xl">

            {/* Label chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-widest mb-7"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)", color: "#C9A84C" }}>
              <Zap size={10} /> Automotive & Medical Grade PCBA Manufacturing
            </div>

            {/* Headline */}
            <h1
              className="text-5xl lg:text-[3.75rem] text-white leading-[1.08] mb-6 font-black"
              style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}
            >
              Precision Born
              <br />
              <span style={{ color: "#C9A84C" }}>in Every Layer</span>
            </h1>

            <p className="text-lg mb-3 leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              15 years of manufacturing precision. Instant online quoting — upload your Gerber
              and get a real price in seconds.
            </p>
            <p className="text-sm mb-10 font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
              IPC Class III · IATF 16949 · ISO 13485 · UL Listed
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-14">
              <Link to="/quote"
                className="flex items-center gap-2 px-7 py-3.5 font-bold text-sm rounded-sm transition-all"
                style={{ background: "#1A5C2A", color: "#fff", boxShadow: "0 4px 20px rgba(26,92,42,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}>
                <Zap size={15} /> Get Instant Quote
              </Link>
              <a href="/capabilities"
                className="flex items-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-sm border transition-colors"
                style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.2)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                View Capabilities <ArrowRight size={14} />
              </a>
            </div>

            {/* Floating micro-stats row */}
            <div className="flex flex-wrap gap-3">
              {[
                { val: "24h",   label: "Rapid Prototype" },
                { val: "32L",   label: "Max Layers" },
                { val: "0.2mm", label: "Min Drill" },
                { val: "99.6%", label: "Satisfaction" },
              ].map(s => (
                <div key={s.val}
                  className="flex items-center gap-2 px-3 py-2 rounded-sm backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="text-sm font-bold" style={{ color: "#C9A84C", fontFamily: "'Outfit', sans-serif" }}>{s.val}</span>
                  <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="relative" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(12,31,16,0.8)", backdropFilter: "blur(12px)" }}>
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-1 px-4">
                <span className="text-2xl font-black" style={{ fontFamily: "'Outfit', sans-serif", color: "#C9A84C", letterSpacing: "-0.02em" }}>
                  {s.value}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wide mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INSTANT QUOTE — compact bar
      ══════════════════════════════════════════════ */}
      <section id="quote" className="py-12 bg-[#F0F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: "#162018", letterSpacing: "-0.02em" }}>
              Instant Quote
            </h2>
            <p className="text-sm" style={{ color: "#4A6B4D" }}>
              Select material, set dimensions, get a price — then go deep on the full quote page.
            </p>
          </div>

          {/* Compact quote bar */}
          <div className="bg-white rounded-lg border shadow-sm px-6 py-5" style={{ borderColor: "#CDDECE" }}>
            <div className="flex flex-wrap items-end gap-4">

              {/* Material Type */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A6B4D" }}>Material Type</span>
                <div className="flex gap-1.5">
                  {["Fr-4", "Aluminum", "Copper", "Flexible Boards"].map(m => (
                    <button key={m} onClick={() => setMaterial(m)}
                      className="px-3 py-2 text-sm rounded border font-medium transition-all"
                      style={{
                        borderColor: material === m ? "#C9A84C" : "#CDDECE",
                        color: material === m ? "#9E8138" : "#4A6B4D",
                        background: material === m ? "#FDF8EC" : "#fff",
                        boxShadow: material === m ? "0 0 0 1px #C9A84C" : "none",
                      }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layers */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A6B4D" }}>Layers</span>
                <select value={layers} onChange={e => setLayers(Number(e.target.value))}
                  className="border rounded px-3 py-2 text-sm bg-white outline-none"
                  style={{ borderColor: "#CDDECE", minWidth: "120px" }}>
                  {[1,2,4,6,8,10,12].map(l => <option key={l} value={l}>{l} {l===1?"Layer":"Layers"}</option>)}
                </select>
              </div>

              {/* Dimensions */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1A5C2A" }}>Dimensions (mm)</span>
                <div className="flex items-center gap-2">
                  <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))}
                    className="border rounded px-3 py-2 text-sm bg-white outline-none w-20"
                    style={{ borderColor: "#CDDECE" }} />
                  <span className="text-sm font-medium" style={{ color: "#4A6B4D" }}>×</span>
                  <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))}
                    className="border rounded px-3 py-2 text-sm bg-white outline-none w-20"
                    style={{ borderColor: "#CDDECE" }} />
                </div>
              </div>

              {/* Qty */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4A6B4D" }}>Qty (pcs)</span>
                <select value={qty} onChange={e => setQty(Number(e.target.value))}
                  className="border rounded px-3 py-2 text-sm bg-white outline-none"
                  style={{ borderColor: "#CDDECE", minWidth: "90px" }}>
                  {[5,10,20,50,100,200,500].map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>

              {/* Quote Now */}
              <div className="flex flex-col gap-2">
                <span className="text-xs opacity-0">.</span>
                <a href="/quote" target="_blank" rel="noopener noreferrer"
                  className="px-7 py-2 text-sm font-bold text-white rounded-full transition-all whitespace-nowrap"
                  style={{ background: "#1A5C2A", boxShadow: "0 4px 16px rgba(26,92,42,0.3)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}>
                  Quote Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* ══════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
              One-stop PCB Solution
            </h2>
            <p className="text-muted-foreground mt-2">
              We offer a full range of professional services from prototype to volume production.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="border border-border bg-card rounded-sm p-6 flex flex-col hover:shadow-md transition-shadow group"
                  style={{ borderTop: `3px solid ${svc.color}` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{ background: `${svc.color}14` }}
                    >
                      <Icon size={20} style={{ color: svc.color }} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{svc.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground mb-4">{svc.sub}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {svc.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2 text-sm text-foreground/70">
                        <div className="w-1 h-1 rounded-full bg-border shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#quote"
                    className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-border rounded-sm hover:bg-muted transition-colors group-hover:border-primary group-hover:text-primary"
                  >
                    {svc.cta} <ArrowRight size={13} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#0C1F10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-2">Transparent Manufacturing</p>
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              From File to Delivery — 7 Visible Stages
            </h2>
            <p className="text-white/40 mt-2 text-sm">
              Every order gets a real-time progress bar. No more wondering where your boards are.
            </p>
          </div>

          {/* Horizontal steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[3.5rem] right-[3.5rem] h-px bg-white/10" />

            <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
              {processSteps.map((step, i) => (
                <div key={step.n} className="flex flex-col items-center text-center group">
                  <div
                    className="w-14 h-14 rounded-sm border border-white/10 bg-white/5 flex items-center justify-center mb-3 relative z-10 group-hover:border-accent/50 transition-colors"
                  >
                    <span className="font-mono text-xs font-semibold text-accent">{step.n}</span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">{step.label}</p>
                  <p className="text-[11px] text-white/30 leading-snug">{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <ChevronRight size={12} className="text-white/20 mt-2 lg:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Manufacturing progress example */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Live Order Example</p>
                <p className="text-white text-sm font-medium">Order #PC20260616-001 · 5× 2-layer PCB · 1.6mm · ENIG</p>
              </div>
              <span className="px-2 py-1 text-xs font-mono bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-sm">
                In Production · 56%
              </span>
            </div>
            <div className="flex items-center gap-0 mb-3">
              {["Cut", "Drill", "Plate", "Etch", "AOI", "Test", "Ship"].map((s, i) => (
                <div key={s} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                      i <= 3
                        ? "bg-green-500 border-green-500 text-white"
                        : i === 4
                        ? "bg-accent border-accent text-accent-foreground"
                        : "bg-transparent border-white/20 text-white/30"
                    }`}
                  >
                    {i <= 3 ? "✓" : i === 4 ? "●" : "○"}
                  </div>
                  <p className={`text-[10px] font-mono mt-1.5 ${i <= 4 ? "text-white/60" : "text-white/20"}`}>{s}</p>
                </div>
              ))}
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: "56%" }} />
            </div>
            <div className="flex justify-between mt-2 text-[11px] font-mono text-white/30">
              <span>Started Jun 16, 09:00</span>
              <span>Est. complete Jun 17, 14:30</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY PCBASIC
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">Why Choose Us</p>
              <h2 className="text-4xl text-foreground mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                15 Years of Global Trust
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Automotive &amp; Medical Grade PCBA Manufacturing Expert
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: "Certification Guarantee",
                    desc: "Dual-certified with IATF 16949 & ISO 13485, meeting international automotive and medical device quality standards.",
                    badge: "IATF 16949 · ISO 13485",
                  },
                  {
                    icon: Zap,
                    title: "Technology Leadership",
                    desc: "Supports up to 24-layer boards and 0.25mm fine-pitch BGA assembly, tackling your most complex design challenges.",
                    badge: "24-Layer · 0.25mm BGA",
                  },
                  {
                    icon: CheckCircle,
                    title: "Quality Delivery",
                    desc: "9 fully automatic SMT lines paired with MES full traceability — every PCB is accountable from raw material to finished board.",
                    badge: "9 SMT Lines · MES",
                  },
                ].map(({ icon: Icon, title, desc, badge }) => (
                  <div key={title} className="flex gap-4 p-5 rounded-sm border border-border hover:border-primary/30 hover:shadow-sm transition-all">
                    <div className="w-9 h-9 bg-primary/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-bold text-foreground">{title}</p>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#EAF3EB", color: "#1A5C2A" }}>
                          {badge}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certs & guarantees */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "16+", label: "Years Experience", sub: "Since 2009" },
                  { value: "98.3%", label: "On-Time Delivery", sub: "Last 12 months" },
                  { value: "99.6%", label: "Satisfaction Rate", sub: "50K+ customers" },
                  { value: "< 0.2%", label: "Complaint Rate", sub: "Industry avg: 1.5%" },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F0F6F0] rounded-sm p-5 border border-border">
                    <p className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {item.value}
                    </p>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#F0F6F0] border border-border rounded-sm p-5">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Guarantees</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Full refund for quality issues",
                    "DFM review on every order",
                    "Re-spin at cost if our fault",
                    "No hidden fees",
                  ].map((g) => (
                    <div key={g} className="flex items-start gap-1.5 text-xs text-foreground/70">
                      <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cert badges */}
              <div className="flex flex-wrap gap-3">
                {["ISO 9001:2015", "IATF 16949", "ISO 13485", "UL Listed", "RoHS"].map((cert) => (
                  <div key={cert} className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-sm bg-white text-xs font-mono text-muted-foreground">
                    <Shield size={10} className="text-primary" /> {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EXPLORE FACTORY
      ══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A2E" }}>
              Explore PCBasic Factory
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#5C5C75" }}>
              See how we build your boards — from raw laminate to finished assembly.
              Transparency is part of every order.
            </p>
          </div>

          {/* 3 cards */}
          <div className="grid grid-cols-3 gap-5">
            {[
              {
                n: "01",
                icon: Camera,
                label: "Photos",
                sub: "Explore Factory",
                img: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=700&h=480&fit=crop&auto=format",
                href: "/about/explore-factory#gallery",
              },
              {
                n: "02",
                icon: Play,
                label: "Videos",
                sub: "Explore Factory",
                img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=480&fit=crop&auto=format",
                href: "/about/explore-factory#video",
              },
              {
                n: "03",
                icon: Glasses,
                label: "VR Tour",
                sub: "Explore Factory",
                img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=480&fit=crop&auto=format",
                href: "/about/explore-factory#tour",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.n}
                  href={card.href}
                  className="relative rounded-lg overflow-hidden group block"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Background image */}
                  <img
                    src={card.img}
                    alt={card.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark overlay — deep space gray gradient, brand red tint on hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(12,31,16,0.72) 0%, rgba(12,31,16,0.45) 60%, rgba(12,31,16,0.2) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(26,92,42,0.45) 0%, transparent 70%)" }}
                  />

                  {/* Number — top-right large */}
                  <span
                    className="absolute top-4 right-5 font-bold leading-none select-none"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "3.5rem",
                      color: "rgba(255,255,255,0.18)",
                    }}
                  >
                    {card.n}
                  </span>

                  {/* Icon — top-left */}
                  <div
                    className="absolute top-4 left-4 w-9 h-9 rounded flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
                  >
                    <Icon size={18} color="#fff" />
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-white mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {card.label}
                        </p>
                        <p className="text-xs text-white/60 font-mono uppercase tracking-widest">
                          {card.sub}
                        </p>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                        style={{ background: "#1A5C2A" }}
                      >
                        <ArrowUpRight size={15} color="#fff" />
                      </div>
                    </div>
                    {/* Red underline on hover */}
                    <div
                      className="h-0.5 mt-3 rounded-full transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ background: "#1A5C2A" }}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F0F6F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Engineers Trust PCBasic
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-border rounded-sm p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} fill="#e8b84b" className="text-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to order your first board?
            </h2>
            <p className="text-white/50 text-sm">
              No MOQ. No email wait. Get an instant price for 5 PCBs from $9.90.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/quote"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-sm hover:bg-accent/90 transition-colors"
            >
              <Zap size={15} /> Get Instant Quote
            </Link>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-sm hover:bg-white/5 transition-colors"
            >
              Talk to an Engineer
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="bg-[#0C1F10] text-white/50">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-5 gap-8">

          {/* ── Brand column — logo matches NavBar exactly ── */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex flex-col leading-none mb-5">
              <span
                className="font-black tracking-tight leading-none text-white"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", letterSpacing: "-0.02em" }}
              >
                PCBasic
              </span>
              <span
                className="text-[9px] font-medium tracking-wide mt-0.5"
                style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}
              >
                Precision Manufacturing. Under Your Control
              </span>
            </a>
            <p className="text-xs leading-relaxed mb-5">
              Automotive &amp; Medical Grade PCB/PCBA manufacturer. 15 years of global trust. Same-day quoting, no MOQ.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["ISO 9001", "IATF 16949", "ISO 13485", "UL"].map((c) => (
                <span key={c} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded-sm">
                  {c}
                </span>
              ))}
            </div>

            {/* Social media */}
            <p className="text-xs font-semibold text-white/60 mb-3 uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Follow Us On
            </p>
            <div className="flex gap-2">
              {[
                { label: "Facebook",  bg: "#1877F2", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                )},
                { label: "X / Twitter", bg: "#000000", icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                )},
                { label: "YouTube",   bg: "#FF0000", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>
                )},
                { label: "LinkedIn",  bg: "#0A66C2", icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                )},
                { label: "TikTok",   bg: "#010101", icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/></svg>
                )},
                { label: "Instagram", bg: "#E1306C", icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#fff" stroke="none"/></svg>
                )},
              ].map(({ label, bg, icon }) => (
                <a
                  key={label}
                  href="#"
                  title={label}
                  className="w-8 h-8 rounded flex items-center justify-center transition-all hover:opacity-90 hover:scale-110 active:scale-95"
                  style={{ background: bg }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Sitemap columns — aligned with NavBar menu structure ── */}
          {[
            {
              title: "Products",
              links: [
                { label: "PCB Prototype", to: "/products/prototype" },
                { label: "Standard PCB", to: "/products/standard" },
                { label: "Turnkey PCBA", to: "/products/services/turnkey" },
                { label: "Consigned PCBA", to: "/products/services/consigned" },
                { label: "CNC Machining", to: "/products/services/cnc-machining" },
              ],
            },
            {
              title: "Capabilities",
              links: [
                { label: "Manufacturing Capabilities", to: "/capabilities" },
                { label: "Certifications", to: "/about/certifications" },
                { label: "IPC Class 3 Capability", to: "/about/ipc-class-3" },
                { label: "Testing & Inspection", to: "/about/testing" },
                { label: "Quality Control", to: "/about/quality-control" },
                { label: "Packaging Details", to: "/about/packaging" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Help Center", to: "/help" },
                { label: "FAQ", to: "/help#faq" },
                { label: "Getting Started", to: "/help#getting-started" },
                { label: "Tech Guides", to: "/blog" },
                { label: "Instant Quote", to: "/quote" },
                { label: "Contact Us", to: "/contact" },
              ],
            },
            {
              title: "About",
              links: [
                { label: "Company Story", to: "/company" },
                { label: "Sustainability", to: "/about/sustainability" },
                { label: "Explore Factory", to: "/about/explore-factory" },
                { label: "News", to: "/news" },
                { label: "Customer Feedback", to: "/about/feedback" },
                { label: "Video Collection", to: "/about/videos" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-xs transition-colors hover:text-white/80">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono">© 2026 PCBasic · Shenzhen, China · support@pcbasic.com</p>
          <div className="flex gap-4 text-xs">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <a href="https://www.pcbasic.com/cookie-agreement.html?1" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {/* ── Floating Support Widget — bottom right ── */}
      <div className="fixed right-5 bottom-8 z-50 flex flex-col items-center gap-2">

        {/* Expanded items (WeChat / Message / Email / Tel) */}
        {supportExpanded && (
          <>
            {/* WeChat */}
            <button
              title="WeChat"
              onClick={() => window.open("weixin://", "_blank")}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group relative"
              style={{ background: "#07C160", boxShadow: "0 4px 12px rgba(7,193,96,0.4)" }}
            >
              {/* WeChat bubble SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M9.5 3C5.36 3 2 5.91 2 9.5c0 1.93.9 3.67 2.34 4.9L3.5 17l2.83-1.41A8.1 8.1 0 0 0 9.5 16c.17 0 .34 0 .5-.01A5.98 5.98 0 0 1 10 14c0-3.31 2.69-6 6-6 .34 0 .67.03 1 .08C16.12 5.57 13.07 3 9.5 3z"/>
                <path d="M16 10c-2.76 0-5 2.24-5 5s2.24 5 5 5c.9 0 1.74-.24 2.47-.66L21 20l-.84-2.52A4.97 4.97 0 0 0 21 15c0-2.76-2.24-5-5-5z"/>
              </svg>
              <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#1A1A2E" }}>WeChat</span>
            </button>

            {/* Message */}
            <button
              title="Message"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group relative"
              style={{ background: "#1A5C2A", boxShadow: "0 4px 12px rgba(26,92,42,0.4)" }}
            >
              <MessageSquare size={20} color="#fff" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#1A1A2E" }}>Message</span>
            </button>

            {/* Email */}
            <a
              href="mailto:support@pcbasic.com"
              title="Email"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group relative"
              style={{ background: "#1A5C2A", boxShadow: "0 4px 12px rgba(26,92,42,0.4)" }}
            >
              <Mail size={20} color="#fff" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#1A1A2E" }}>Email</span>
            </a>

            {/* Tel */}
            <a
              href="tel:+86400123456"
              title="Tel"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group relative"
              style={{ background: "#1A5C2A", boxShadow: "0 4px 12px rgba(26,92,42,0.4)" }}
            >
              <Phone size={20} color="#fff" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "#1A1A2E" }}>Tel</span>
            </a>
          </>
        )}

        {/* Always visible: Live Chat */}
        <button
          title="Live Chat"
          onClick={() => window.open("https://tawk.to", "_blank")}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group relative"
          style={{ background: "#1A5C2A", boxShadow: "0 4px 12px rgba(26,92,42,0.4)" }}
        >
          <HeadphonesIcon size={20} color="#fff" />
          <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: "#1A1A2E" }}>Live Chat</span>
        </button>

        {/* Always visible: WhatsApp */}
        <a
          href="https://wa.me/86400123456"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 group relative"
          style={{ background: "#25D366", boxShadow: "0 4px 12px rgba(37,211,102,0.4)" }}
        >
          {/* WhatsApp SVG */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white px-2.5 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: "#1A1A2E" }}>WhatsApp</span>
        </a>

        {/* Expand / Collapse toggle */}
        <button
          onClick={() => setSupportExpanded(o => !o)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          style={{ background: "#1A1A2E", boxShadow: "0 4px 12px rgba(26,26,46,0.35)" }}
        >
          {supportExpanded
            ? <ChevronDown size={18} color="#fff" />
            : <ChevronUp size={18} color="#fff" />}
        </button>
      </div>
    </div>
  );
}
