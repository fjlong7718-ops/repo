import { Link } from "react-router";
import { ChevronRight, MapPin, Mail, Phone, Shield, Zap, Star, Users, Clock, Award } from "lucide-react";
import NavBar from "../components/NavBar";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const G  = "#1A5C2A";
const DK = "#1A1A2E";
const W  = "#F8F7F4";
const WH = "#FFFFFF";
const BD = "#E5E2DB";
const M  = "#5C5C75";
const GD = "#C9A84C";

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "15+",      label: "Years Experience" },
  { value: "500+",     label: "Employees" },
  { value: "20,000m²", label: "Factory Area" },
  { value: "1,000+",   label: "Monthly Orders" },
  { value: "9",        label: "QC Inspection Steps" },
  { value: "5",        label: "Global Offices" },
];

const QC_STEPS = [
  { n: 1, name: "IQC",            full: "Incoming Quality Control",       desc: "Prevent process defects caused by material issues and avoid efficiency losses due to non-compliant quality of refurbished materials." },
  { n: 2, name: "SPI",            full: "Solder Paste Inspection",        desc: "Detect solder paste printing defects to prevent them from entering the next process." },
  { n: 3, name: "Online AOI",     full: "Automated Optical Inspection",   desc: "Check for any errors, omissions, or defects in the PCBs to prevent them from flowing into the next process." },
  { n: 4, name: "FAI",            full: "First Article Inspection",       desc: "Verify the accuracy of the placement process on the production line and ensure each component's parameters are within standard limits." },
  { n: 5, name: "IPQC",           full: "In-Process Quality Control",     desc: "Conduct random inspections of all production processes to ensure compliance with work instructions." },
  { n: 6, name: "X-Ray",          full: "X-Ray Inspection",               desc: "Inspect the solder joints of components invisible to the naked eye to ensure the reliability of BGA solder balls." },
  { n: 7, name: "QC",             full: "Quality Control Inspection",     desc: "Inspect finished PCBA according to the IPC-610 inspection standard." },
  { n: 8, name: "QA",             full: "Quality Assurance Inspection",   desc: "Conduct strict inspections before shipment, along with barcode scanning verification, to prevent defective products from being shipped." },
  { n: 9, name: "Shipment",       full: "Shipment Inspection",            desc: "Strict final inspections with scanning and verification to ensure no defective products leave the facility." },
];

const TIMELINE = [
  { year: "2010", items: ["Established 500 m² facility in Xixiang", "One SMT line (CP45)", "10 employees"] },
  { year: "2011", items: ["Expanded to 800 m², added SMT production line", "Staff grew to 15 people"] },
  { year: "2016", items: ["Launched online self-service quoting & CRM system", "First wave soldering machine installed", "24 employees"] },
  { year: "2017", items: ["Developed first-piece SMT testing device", "Strategic platform partnerships", "SMT soldering process patents filed", "50 employees"] },
  { year: "2018", items: ["Established IT department, developed MES system", "Multiple process patents", "4 SMT assembly lines", "65 employees"] },
  { year: "2019", items: ["Self-developed MES digital management system", "Relocated to 3,000 m² Shajing factory, 7 SMT lines", "Strategic cooperation with HQ", "130 employees"] },
  { year: "2020", items: ["APIS advanced production reform technology", "Monthly capacity: 1,000+ orders", "Obtained ISO 9001 & ISO 13485", "140 employees"] },
  { year: "2021", items: ["Smart warehouse & IQC inspection system", "Established JS foreign trade company", "National high-tech enterprise certification", "Purchased Huizhou factory", "FCC & CE certifications", "150 employees"] },
  { year: "2022", items: ["Informatized MES moving toward intelligence", "Stencil & fixture business division", "National 'Specialized, Refined and New' SME honor", "170 employees"] },
  { year: "2023", items: ["Established CNC business division", "Multiple invention patents", "Added 4,500 m² factory space", "IATF 16949 certification", "180 employees"] },
  { year: "2024", items: ["Total employees exceed 500", "New Huizhou factory — 20,000 m² combined", "Historic order high, global customers", "ISO 45001 & ISO 14001 certifications", "Introduced flying probe testers & selective wave soldering"] },
];

const CULTURE = [
  { icon: "🏆", title: "Corporate Vision",   body: "Become a well-known global service provider for multi-variety, small-batch, high-end PCBA fast production." },
  { icon: "🎯", title: "Corporate Mission",   body: "Create development opportunities for employees, lead the development of the industry, and provide excellent services for customers." },
  { icon: "🤝", title: "Management Idea",     body: "Honesty, Cooperation, Innovation and Pragmatism — four principles that guide every decision." },
  { icon: "⚡", title: "Core Competence",     body: "Speed · Quality · Technology · Service. Agile response, national-standard quality, process innovation, and customer-first dedication." },
];

const INDUSTRIES = [
  {
    icon: "📱",
    title: "Consumer Electronics",
    desc: "Audio/video equipment, digital cameras, drones, computers, wearable electronics, gaming consoles, smart home devices, IoT terminals, and security systems.",
  },
  {
    icon: "🏭",
    title: "Industrial Electronics",
    desc: "Industrial power & control systems, UPS, industrial robots, rugged embedded computers, HVAC controllers, energy management, and surveillance systems.",
  },
  {
    icon: "🏥",
    title: "Medical Devices",
    desc: "Blood pressure monitors, X-ray & CT scanners, ECG/EEG/EMG systems, ventilators, pulmonary analyzers, and PET scanners.",
  },
  {
    icon: "✈️",
    title: "Aerospace Systems",
    desc: "Flight control computers, INS/GNSS navigation boards, SATCOM transceiver boards, multifunction display controllers, ADS-B transmitters, and HUD controllers.",
  },
  {
    icon: "🚗",
    title: "Automotive Electronics",
    desc: "EV charging stations, digital instrument clusters, power converters, infotainment & navigation, domain control units (DCUs), ECUs, and airbag systems.",
  },
];

const CERTS = [
  { name: "ISO 9001:2015",      scope: "Quality Management System",           color: GD },
  { name: "IATF 16949",         scope: "Automotive Quality Management",        color: GD },
  { name: "ISO 13485:2016",     scope: "Medical Devices Quality",              color: GD },
  { name: "IPC Class III",      scope: "High-Reliability Electronics",         color: "#3B82F6" },
  { name: "ISO 14001:2015",     scope: "Environmental Management",             color: "#22C55E" },
  { name: "ISO 45001:2018",     scope: "Occupational Health & Safety",         color: "#22C55E" },
  { name: "CE",                 scope: "European Conformity",                  color: "#6366F1" },
  { name: "FCC",                scope: "Federal Communications Commission",    color: "#6366F1" },
];

const OFFICES = [
  { city: "Shenzhen Office",   addr: "Building 1#, Unicity Intelligent Valley, Hang Cheng Street, Baoan, Shenzhen, China" },
  { city: "Shenzhen Factory",  addr: "Building E, Jianshi Industrial Park, No. 52 Huangpu Road, Xinqiao Street, Baoan District, Shenzhen, China" },
  { city: "Huizhou Factory",   addr: "Building 25-26, No. 84 Songbuling Ave., Sanhe Village, High-tech Zone, Zhongkai High-tech Zone, Huizhou, China" },
  { city: "Shanghai R&D",      addr: "Room 806, Building 2, Lane 1015 Longteng Road, Songjiang District, Shanghai, China" },
  { city: "Mexico Office",     addr: "No. 500 Paseo del Café, Apt. 90, Zakia Community, El Marqués, Querétaro 76269, Mexico" },
];

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ label, title, sub, light }: { label: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: light ? "rgba(255,255,255,0.4)" : G }}>
        {label}
      </p>
      <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: light ? "#fff" : DK }}>
        {title}
      </h2>
      {sub && <p className="text-sm mt-2 max-w-2xl" style={{ color: light ? "rgba(255,255,255,0.5)" : M }}>{sub}</p>}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Company() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: W, color: DK, minHeight: "100vh" }}>
      <NavBar activePage="about" />

      {/* ── Hero ── */}
      <section style={{ background: DK }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Home</Link>
            <ChevronRight size={12} color="rgba(255,255,255,0.25)" />
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>Company</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-10">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                About <span style={{ color: G }}>PCBasic</span>
              </h1>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                Global high-mix volume, high-speed PCBA manufacturer. Intelligent factory focusing on one-stop service and fast multi-variety small and large batch PCBA production since 2010.
              </p>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 shrink-0 lg:min-w-[380px]">
              {STATS.map(s => (
                <div key={s.label} className="rounded p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: G }}>{s.value}</p>
                  <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Profile ── */}
      <section className="py-16" style={{ background: WH }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHead label="Company Profile" title="Who We Are" />
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: M }}>
                <p>
                  PCBasic JS Technology Co., Ltd is an intelligent factory focusing on one-stop service and fast multi-variety small and large batch PCBA production. We are also a PCB company focusing on online PCB design, manufacture, and one-stop PCB assembly — incorporating core business values of <strong style={{ color: DK }}>speed, quality, PCBA technology, and PCB design services.</strong>
                </p>
                <p>
                  We provide R&D solutions, material selection, OEM order production, and other services. The company self-developed CRM, MES, ERP, and IoT management systems to achieve an industrial digital intelligent factory.
                </p>
                <p>
                  Our core service areas include industrial control, smart home, instrumentation, vehicle IoT, communication power, medical devices, automotive electronics, and aviation systems.
                </p>
                <p>
                  We have passed <strong style={{ color: DK }}>ISO 9001 / IATF 16949 / ISO 13485</strong> quality certifications and won the national high-tech enterprise award. With 15+ years of SMT industry experience, we've continuously invested in PCBA technology, developing intelligent production management systems that improve efficiency and quality.
                </p>
              </div>

              {/* Key numbers */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { icon: Users,  v: "200+",  l: "Engineering, QC & IT Staff" },
                  { icon: Clock,  v: "24h",   l: "Customer Support" },
                  { icon: Award,  v: "30+",   l: "PCB Designers" },
                  { icon: Star,   v: "15+",   l: "Years SMT Experience" },
                ].map(({ icon: Icon, v, l }) => (
                  <div key={l} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: BD, background: W }}>
                    <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "#E8F0E9" }}>
                      <Icon size={15} color={G} />
                    </div>
                    <div>
                      <p className="text-base font-bold leading-none" style={{ fontFamily: "'Outfit', sans-serif", color: DK }}>{v}</p>
                      <p className="text-xs mt-0.5 leading-tight" style={{ color: M }}>{l}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Factory image */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden" style={{ height: 300 }}>
                <img
                  src="https://images.unsplash.com/photo-1532186773960-85649e5cb70b?w=800&h=600&fit=crop"
                  alt="PCBasic SMT Production Line"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://images.unsplash.com/photo-1761195696590-3490ea770aa1?w=400&h=360&fit=crop"
                    alt="Factory automation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://images.unsplash.com/photo-1592659762303-90081d34b277?w=400&h=360&fit=crop"
                    alt="PCB circuit board"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality Control Process ── */}
      <section className="py-16 border-t" style={{ background: W, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Quality Assurance"
            title="9-Step Quality Control Process"
            sub="Our fully automated SMT line includes 9 inspection processes to ensure the highest quality for every board we ship."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QC_STEPS.map(step => (
              <div key={step.n} className="bg-white rounded-lg border p-5 flex gap-4" style={{ borderColor: BD }}>
                <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: G }}>
                  {step.n}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: DK }}>{step.name}</p>
                  <p className="text-[11px] font-medium mb-1.5" style={{ color: G }}>{step.full}</p>
                  <p className="text-xs leading-relaxed" style={{ color: M }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Development History ── */}
      <section className="py-16 border-t" style={{ background: WH, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Development History"
            title="Our Journey Since 2010"
            sub="From a 500 m² workshop to a 20,000 m² global manufacturing group."
          />
        </div>

        {/*
          Alternating zigzag layout:
            even i → card ABOVE the rail   (2010, 2016, 2018, 2020, 2022, 2024)
            odd  i → card BELOW the rail   (2011, 2017, 2019, 2021, 2023)

          Fixed row heights so every dot lands on the same horizontal line:
            above-card zone : 200px  (justify-end)
            stem            :  14px
            year label      :  18px
            dot             :  22px   ← rail centre = 200+14+18+11 = 243px
            year label      :  18px
            stem            :  14px
            below-card zone : 200px  (justify-start)
        */}
        <div
          className="overflow-x-auto py-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: `${BD} transparent` }}
        >
          <div className="relative px-10" style={{ minWidth: 1870 }}>

            {/* ── Horizontal rail — sits at dot centre ── */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 243,
                left: 40, right: 40,
                height: 2,
                background: `linear-gradient(to right, transparent, ${BD} 40px, ${BD} calc(100% - 40px), transparent)`,
              }}
            />

            <div className="flex">
              {TIMELINE.map((entry, i) => {
                const above  = i % 2 === 0;
                const isLast = i === TIMELINE.length - 1;
                const stemColor = isLast ? G : "#CDDECE";
                const dotBg    = isLast ? G : WH;
                const dotBd    = isLast ? G : "#CDDECE";

                const Card = () => (
                  <div
                    className="rounded-lg border p-2.5"
                    style={{
                      borderColor: isLast ? G : BD,
                      background:  isLast ? "#EBF5EE" : W,
                    }}
                  >
                    <ul className="space-y-1.5">
                      {entry.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-1.5 leading-snug" style={{ fontSize: 11, color: M }}>
                          <span
                            className="shrink-0 rounded-full"
                            style={{ width: 5, height: 5, marginTop: 4, background: isLast ? G : "#CDDECE", flexShrink: 0 }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );

                return (
                  <div
                    key={entry.year}
                    className="flex flex-col items-center"
                    style={{ flex: 1, minWidth: 170 }}
                  >
                    {/* ── ABOVE CARD ZONE (200px) ── */}
                    <div
                      className="w-full px-2 flex flex-col justify-end"
                      style={{ height: 200 }}
                    >
                      {above && <Card />}
                    </div>

                    {/* ── STEM ABOVE DOT (14px) ── */}
                    <div
                      className="w-px"
                      style={{ height: 14, background: above ? stemColor : "transparent" }}
                    />

                    {/* ── YEAR LABEL ABOVE DOT (18px, shown for above entries) ── */}
                    <div className="flex items-center justify-center" style={{ height: 18 }}>
                      {above && (
                        <span
                          className="font-bold font-mono"
                          style={{ fontSize: 11, color: isLast ? G : "#4A6B4D", letterSpacing: "0.03em" }}
                        >
                          {entry.year}
                        </span>
                      )}
                    </div>

                    {/* ── DOT (22px) ── */}
                    <div
                      className="relative z-10 flex items-center justify-center rounded-full border-2 shrink-0"
                      style={{
                        width: 22, height: 22,
                        background: dotBg,
                        borderColor: dotBd,
                        boxShadow: isLast ? `0 0 0 4px rgba(26,92,42,0.14)` : "none",
                      }}
                    >
                      {isLast ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <div className="rounded-full" style={{ width: 7, height: 7, background: "#CDDECE" }} />
                      )}
                    </div>

                    {/* ── YEAR LABEL BELOW DOT (18px, shown for below entries) ── */}
                    <div className="flex items-center justify-center" style={{ height: 18 }}>
                      {!above && (
                        <span
                          className="font-bold font-mono"
                          style={{ fontSize: 11, color: "#4A6B4D", letterSpacing: "0.03em" }}
                        >
                          {entry.year}
                        </span>
                      )}
                    </div>

                    {/* ── STEM BELOW DOT (14px) ── */}
                    <div
                      className="w-px"
                      style={{ height: 14, background: !above ? stemColor : "transparent" }}
                    />

                    {/* ── BELOW CARD ZONE (200px) ── */}
                    <div
                      className="w-full px-2 flex flex-col justify-start"
                      style={{ height: 200 }}
                    >
                      {!above && <Card />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Enterprise Culture ── */}
      <section className="py-16 border-t" style={{ background: DK, borderColor: "#2A2A3E" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Enterprise Culture"
            title="Treasure Talented People, Pay Attention To Management"
            sub="Four principles that guide every decision, every day."
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE.map(c => (
              <div key={c.title} className="rounded-lg p-6 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-3xl">{c.icon}</span>
                <p className="text-sm font-bold text-white">{c.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{c.body}</p>
              </div>
            ))}
          </div>

          {/* Core values strip */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap,    label: "Speed",    desc: "Agile response, fast lead time." },
              { icon: Shield, label: "Quality",  desc: "ISO-managed processes, advanced equipment, MES system." },
              { icon: Star,   label: "Technology", desc: "Innovation-driven, rich process experience, quality risk prevention." },
              { icon: Users,  label: "Service",  desc: "Customer-centered, rapid response, long-term value creation." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-lg"
                style={{ background: "rgba(26,92,42,0.18)", border: `1px solid rgba(26,92,42,0.3)` }}>
                <Icon size={16} color={G} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Industries ── */}
      <section className="py-16 border-t" style={{ background: W, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Service Industry"
            title="Industries We Serve"
            sub="From consumer gadgets to aerospace-grade systems — our processes are qualified for every demand level."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="bg-white rounded-lg border p-6 flex gap-4"
                style={{ borderColor: BD }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = G)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BD)}>
                <span className="text-3xl shrink-0">{ind.icon}</span>
                <div>
                  <p className="text-sm font-bold mb-1.5" style={{ color: DK }}>{ind.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: M }}>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-16 border-t" style={{ background: WH, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Qualification & Patent"
            title="Certifications & Compliance"
            sub="Every certification is third-party audited and maintained annually. Certificates available on request."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTS.map(cert => (
              <div key={cert.name} className="rounded-lg p-5 border flex flex-col gap-3" style={{ background: W, borderColor: BD }}>
                <div className="flex items-start justify-between">
                  <Shield size={18} color={cert.color} />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                    style={{ background: `${cert.color}18`, color: cert.color }}>Active</span>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: DK }}>{cert.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: M }}>{cert.scope}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg flex items-center gap-3"
            style={{ background: "#FDF8EC", border: "1px solid #FAEFC8" }}>
            <Shield size={16} color={GD} />
            <p className="text-sm" style={{ color: "#9E8138" }}>
              <strong>PCBasic Promise:</strong> Quality issues trigger a full refund or free re-spin — no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* ── Global Offices ── */}
      <section className="py-16 border-t" style={{ background: W, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Contact Us"
            title="Global Offices"
            sub="Five locations across China, and a growing international presence in Mexico."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {OFFICES.map(o => (
              <div key={o.city} className="bg-white rounded-lg border p-5" style={{ borderColor: BD }}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} color={G} />
                  <p className="text-sm font-bold" style={{ color: DK }}>{o.city}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: M }}>{o.addr}</p>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div className="flex flex-wrap gap-4">
            <a href="mailto:JS@pcbasic.com"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:border-primary"
              style={{ borderColor: BD, color: DK }}>
              <Mail size={14} color={G} />
              JS@pcbasic.com
            </a>
            <a href="tel:+86-755-27218592"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:border-primary"
              style={{ borderColor: BD, color: DK }}>
              <Phone size={14} color={G} />
              +86-755-27218592
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14" style={{ background: G }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to start your build?
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              Upload Gerbers, get an instant quote, and rely on our 9-step QC for every board shipped.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/quote"
              className="px-6 py-3 text-sm font-bold text-white rounded-sm"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              Get Instant Quote
            </Link>
            <Link to="/contact"
              className="px-6 py-3 text-sm font-bold rounded-sm"
              style={{ background: WH, color: G }}>
              Contact Us
            </Link>
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
