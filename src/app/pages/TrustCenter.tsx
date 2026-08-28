import { Link, useParams } from "react-router";
import {
  ArrowRight, Award, Box, Check, ChevronRight, ClipboardCheck,
  FileCheck2, Gauge, Microscope, PackageCheck, Play, Quote,
  ScanLine, ShieldCheck, Star, TestTube2, Video,
} from "lucide-react";
import NavBar from "../components/NavBar";

type PageKey = "certifications" | "ipc-class-3" | "testing" | "quality-control" | "packaging" | "feedback" | "videos";

const pages: Record<PageKey, any> = {
  certifications: {
    kicker: "CERTIFIED QUALITY SYSTEMS", title: "Global certifications.", accent: "One accountable manufacturing system.",
    intro: "Internationally recognized standards turn quality expectations into repeatable, auditable processes—from material control through final delivery.",
    icon: Award, stats: [["IATF 16949", "Automotive"], ["ISO 13485", "Medical"], ["ISO 9001", "Quality"], ["IPC Class 3", "Reliability"]],
    cards: [["IATF 16949", "Automotive process discipline, risk prevention, and continual improvement."], ["ISO 13485", "Lifecycle controls and traceability for medical-device supply chains."], ["ISO 9001", "Customer-focused quality management and consistent process execution."], ["ISO 14001", "Systematic environmental impact and regulatory management."], ["ISO 45001", "Occupational health, safety, and risk reduction."], ["RoHS / CE / FCC", "Material and market compliance support for global product programs."]],
    stages: ["Requirements mapped", "Processes controlled", "Records retained", "Audits supported"],
  },
  "ipc-class-3": {
    kicker: "HIGH-RELIABILITY PCBA", title: "IPC Class 3 capability.", accent: "Built for products that cannot afford uncertainty.",
    intro: "Precision printing, controlled reflow, automated inspection, X-ray, selective soldering, and electrical verification form a connected high-reliability line.",
    icon: ShieldCheck, stats: [["99.99%", "Nitrogen purity"], ["3D X-Ray", "Hidden joints"], ["Inline AOI", "Traceable vision"], ["Class 3", "Process target"]],
    cards: [["Automatic paste printing", "Stable deposition with fast product changeover and repeatable alignment."], ["SPI inspection", "Measures paste height, area, volume, offset, and bridging before placement."], ["Nitrogen reflow", "Suppresses oxidation and supports fine-pitch, high-density soldering."], ["Inline AOI", "Detects missing, shifted, polarity, and solder defects with MES records."], ["Selective wave soldering", "Controlled flux, preheat, solder wave, and joint formation for THT."], ["3D X-Ray", "Makes BGA, QFN, voiding, and hidden-joint quality visible."]],
    stages: ["Print verified", "Profile controlled", "Joints inspected", "Records traceable"],
  },
  testing: {
    kicker: "TESTING & INSPECTION", title: "Every test. Every board.", accent: "Evidence before shipment.",
    intro: "A flexible testing system covers placement, solder integrity, electrical performance, firmware, function, and environmental reliability—with calibrated, traceable equipment.",
    icon: TestTube2, stats: [["AOI + X-Ray", "Visual"], ["Flying Probe", "Electrical"], ["FCT", "Functional"], ["T&H / Vibration", "Environmental"]],
    cards: [["Programming & functional test", "Programs MCU, FPGA, and EEPROM devices while validating logic and interfaces."], ["Flying probe", "Fixture-free detection of opens, shorts, polarity, values, and solder faults."], ["Functional circuit test", "Simulates power, signals, interfaces, and real operating scenarios."], ["Temperature & humidity", "Exposes material, sealing, aging, and solder risks under harsh conditions."], ["Vibration test", "Evaluates connectors, solder joints, and mechanical stability in motion."], ["Drop test", "Tests impact resistance across heights, angles, and contact surfaces."]],
    stages: ["Test plan", "Fixture / program", "Execute & capture", "Report & release"],
  },
  "quality-control": {
    kicker: "QUALITY CONTROL SYSTEM", title: "Quality is a live process.", accent: "Not a final inspection event.",
    intro: "MES traceability connects incoming materials, operators, equipment, inspection results, exceptions, and delivery status into one visible production record.",
    icon: ClipboardCheck, stats: [["8 gates", "Core QC flow"], ["MES", "Board-level history"], ["Real-time", "Alerts"], ["100%", "Shipment verification"]],
    cards: [["IQC", "Stops non-conforming incoming materials before they reach production."], ["SPI", "Prevents paste-printing defects from flowing into placement and reflow."], ["AOI", "Checks component position, presence, polarity, and solder appearance."], ["First article", "Confirms placement and parameters before full-line release."], ["IPQC + X-Ray", "Controls in-process execution and hidden BGA solder joints."], ["QC + QA", "IPC-based finished inspection, scan verification, and shipment release."]],
    stages: ["Material identity", "Process compliance", "Defect containment", "Final release"],
  },
  packaging: {
    kicker: "PACKAGING & DELIVERY", title: "Protection engineered to travel.", accent: "The last process protects every process before it.",
    intro: "Anti-static, moisture-resistant, shock-managed packaging protects sensitive assemblies through storage, warehousing, and long-distance international transport.",
    icon: Box, stats: [["ESD", "Anti-static"], ["5-layer", "Outer carton"], ["QR / Barcode", "Traceability"], ["FQC", "Pre-pack check"]],
    cards: [["Anti-static barrier", "ESD and moisture-resistant bags protect components and exposed contacts."], ["Cushioning structure", "Layered foam and dividers prevent board-to-board contact and impact damage."], ["Traceable labels", "Unique barcode or QR data supports receiving, storage, and order matching."], ["Compression protection", "Five-layer corrugated cartons support stacking and long-distance shipping."], ["Final quality check", "Quantity, appearance, component integrity, and documentation are verified."], ["OEM packaging", "Custom labels, carton dimensions, logo printing, and packing instructions."]],
    stages: ["FQC verified", "ESD sealed", "Cushioned & labeled", "Carton released"],
  },
  feedback: {
    kicker: "CUSTOMER FEEDBACK", title: "Trust measured in repeat orders.", accent: "Real outcomes from engineering teams worldwide.",
    intro: "Customers consistently point to communication, finish quality, inspection transparency, fast delivery, and a team that resolves engineering questions before they become production risks.",
    icon: Quote, stats: [["4.9 / 5", "Average rating"], ["99.6%", "Satisfaction"], ["50K+", "Customers"], ["100+", "Countries"]],
    cards: [["John Peterson", "Selective soldering and inspection are managed with exceptional precision—exactly what our medical electronics require."], ["Sophie Dupont", "The inspection data is traceable and the vision systems handle our complex assemblies with ease."], ["Christopher Evans", "Quality control, production efficiency, and delivery have stayed consistently strong across years of cooperation."], ["Steve Fuller", "Gerber upload was straightforward, communication was clear, and the boards arrived beautifully finished."], ["Rachel Henderson", "The team caught missing production information, communicated quickly, and delivered an excellent result."], ["Alexander Price", "Quick, solutions-oriented communication and a consistently good PCB finish."]],
    stages: ["Verified order", "Customer review", "Team response", "Improvement loop"],
  },
  videos: {
    kicker: "VIDEO COLLECTION", title: "See the factory at work.", accent: "Processes, equipment, and proof—on camera.",
    intro: "Explore the full manufacturing story through factory footage, process demonstrations, equipment explainers, quality workflows, and customer visits.",
    icon: Video, stats: [["24 steps", "Process story"], ["5 channels", "Video library"], ["Real factory", "No stock footage"], ["On demand", "Self-guided"]],
    cards: [["Quotation to engineering review", "How files, requirements, and process evaluation become a controlled work order."], ["Material & intelligent warehouse", "Purchasing, IQC inspection, identification, storage, and line issue."], ["SMT production line", "Stencil, paste printing, SPI, placement, profile verification, and reflow."], ["Inspection workflow", "AOI, X-ray sampling, functional test, QA, and final release."], ["Equipment explainers", "Flying probe, selective soldering, conformal coating, and test fixtures."], ["Customer factory visits", "Unscripted walkthroughs and engineering conversations on the production floor."]],
    stages: ["Choose a channel", "Watch the process", "Inspect the evidence", "Talk to engineering"],
  },
};

const cardIcons = [Award, ScanLine, Microscope, Gauge, FileCheck2, PackageCheck];

export default function TrustCenter() {
  const { section } = useParams();
  const key: PageKey = (section && section in pages ? section : "certifications") as PageKey;
  const page = pages[key];
  const HeroIcon = page.icon;
  const isFeedback = key === "feedback";
  const isVideos = key === "videos";

  return (
    <div className="min-h-screen bg-white text-[#161727]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavBar activePage="about" />

      <section className="relative overflow-hidden bg-[#151629] text-white">
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 82% 30%, rgba(37,116,55,.5), transparent 25%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "auto, 48px 48px, 48px 48px" }} />
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[.18em] text-[#D0AD4A] mb-5"><HeroIcon size={14} /> {page.kicker}</div>
            <h1 className="text-5xl lg:text-[3.5rem] leading-[1.05] font-black tracking-tight mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>{page.title}<br/><span className="text-[#49A15F]">{page.accent}</span></h1>
            <p className="text-white/55 leading-7 max-w-2xl mb-8">{page.intro}</p>
            <div className="flex flex-wrap gap-3"><Link to="/quote" className="px-6 py-3 bg-[#1C6730] text-white text-sm font-bold rounded-sm inline-flex items-center gap-2">Start a quote <ArrowRight size={15}/></Link><Link to="/contact" className="px-6 py-3 border border-white/15 text-white/75 text-sm font-semibold rounded-sm">Ask an engineer</Link></div>
          </div>
          <div className="grid grid-cols-2 gap-3">{page.stats.map(([v,l]: string[]) => <div key={l} className="border border-white/10 bg-white/[.035] p-5"><div className="text-xl lg:text-2xl font-black text-[#D0AD4A]">{v}</div><div className="text-[10px] font-mono uppercase tracking-wider text-white/35 mt-2">{l}</div></div>)}</div>
        </div>
      </section>

      <section className="py-20 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"><div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">{isFeedback ? "VERIFIED EXPERIENCES" : isVideos ? "EXPLORE THE LIBRARY" : "WHAT THIS MEANS FOR YOUR ORDER"}</p><h2 className="text-4xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>{isFeedback ? "What customers notice most" : isVideos ? "Choose your way into the factory" : "Evidence, organized around decisions"}</h2></div><p className="max-w-md text-sm leading-6 text-[#69716A]">{isFeedback ? "Representative feedback grouped around quality, communication, delivery, and technical support." : isVideos ? "Each collection answers a different question before you place an order or approve production." : "Clear proof points help engineering and procurement teams review risk without hunting through disconnected documents."}</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {page.cards.map(([title,text]: string[], i:number) => { const Icon = cardIcons[i % cardIcons.length]; return <article key={title} className="group bg-white border border-[#D9E0D9] p-6 min-h-[230px] flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-8"><div className="w-10 h-10 bg-[#E6F0E7] text-[#1A5C2A] flex items-center justify-center rounded-sm">{isVideos ? <Play size={17} fill="currentColor"/> : isFeedback ? <Quote size={17}/> : <Icon size={18}/>}</div>{isFeedback && <div className="flex text-[#C49C34]">{[0,1,2,3,4].map(s=><Star key={s} size={12} fill="currentColor"/>)}</div>}{isVideos && <span className="text-[10px] font-mono text-[#8A918A]">0{i+1} · WATCH</span>}</div>
              <h3 className="font-bold text-lg mb-3">{title}</h3><p className={`text-sm text-[#6A726B] leading-6 ${isFeedback ? "italic" : ""}`}>{isFeedback ? `“${text}”` : text}</p>
              <div className="mt-auto pt-6 text-xs font-semibold text-[#1A5C2A] flex items-center gap-1 opacity-70 group-hover:opacity-100">{isVideos ? "Preview story" : isFeedback ? "Verified customer" : "View evidence"}<ChevronRight size={13}/></div>
            </article>})}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[.8fr_1.2fr] gap-14 items-start">
          <div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">CONNECTED TO THE ORDER RECORD</p><h2 className="text-4xl font-black mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>Proof that travels with the board.</h2><p className="text-[#69716A] leading-7 mb-7">Quality evidence is most useful when it is attached to the product, process, and release decision. The prototype experience connects each gate to a visible manufacturing record.</p><div className="flex gap-8"><div><div className="font-black text-2xl text-[#1A5C2A]">MES</div><div className="text-xs text-[#7D857E] mt-1">Traceability layer</div></div><div><div className="font-black text-2xl text-[#1A5C2A]">QA</div><div className="text-xs text-[#7D857E] mt-1">Release authority</div></div></div></div>
          <div className="border border-[#D9E0D9] bg-[#F8FAF8] p-4"><div className="flex items-center justify-between bg-[#142719] text-white px-5 py-4"><span className="font-semibold text-sm">Order evidence timeline</span><span className="font-mono text-[10px] text-white/35">LIVE PROTOTYPE</span></div><div className="grid sm:grid-cols-4">{page.stages.map((stage:string,i:number)=><div key={stage} className="p-5 border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#D9E0D9]"><div className="w-7 h-7 rounded-full bg-[#1A5C2A] text-white flex items-center justify-center mb-5"><Check size={13}/></div><div className="text-[10px] font-mono text-[#9A7C2E] mb-2">0{i+1}</div><div className="font-semibold text-sm">{stage}</div></div>)}</div></div>
        </div>
      </section>

      <section className="py-16 bg-[#0D2113] text-white"><div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"><div><p className="text-xs font-mono tracking-widest text-[#D0AD4A] mb-2">MAKE QUALITY PART OF THE SPEC</p><h2 className="text-3xl font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>Tell us what your product must prove.</h2></div><div className="flex gap-3"><Link to="/quote" className="px-6 py-3 bg-[#1A6731] text-white font-bold rounded-sm">Get Instant Quote</Link><Link to="/contact" className="px-6 py-3 border border-white/15 text-white/75 font-bold rounded-sm">Plan a quality review</Link></div></div></section>
      <footer className="bg-[#07150B] text-white/40 py-8"><div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-3 text-xs"><span className="font-semibold text-white/65">PCBasic · Precision Manufacturing. Under Your Control.</span><span>Quality systems · Inspection · Traceability · Delivery</span></div></footer>
    </div>
  );
}
