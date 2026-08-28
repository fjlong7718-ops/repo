import { Link, useParams } from "react-router";
import {
  ArrowRight, Box, Check, ChevronDown, ClipboardCheck,
  Component, FileCheck2, ScanLine, Truck, UploadCloud, Wrench, Zap,
} from "lucide-react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import RelatedProducts from "../components/RelatedProducts";

type ServiceKey = "turnkey" | "consigned" | "cnc-machining";

const services: Record<ServiceKey, any> = {
  turnkey: {
    kicker: "FULL-SERVICE PCBA · ONE ACCOUNTABLE PARTNER",
    title: "Turnkey PCB Assembly",
    statement: "From design files to tested assemblies—without managing five suppliers.",
    intro: "PCBasic coordinates PCB fabrication, verified component sourcing, SMT/THT assembly, inspection, functional testing, packaging, and delivery through one visible production record.",
    icon: Component,
    metrics: [["One PO", "Commercial control"], ["PCB + BOM", "Integrated scope"], ["SMT / THT", "Mixed assembly"], ["MES", "Live traceability"]],
    outcomes: [["Reduce coordination", "One engineering owner manages fabrication, sourcing, assembly, test, and logistics."], ["Expose BOM risk early", "Availability, alternates, lifecycle, and pricing exceptions surface before production."], ["Scale the approved build", "Prototype records become the baseline for repeat and volume orders."]],
    capabilities: [["Customer provides", "Gerber, BOM, centroid, assembly drawing, test requirements"], ["PCBasic manages", "PCB, components, stencils, fixtures, assembly, test, packing"], ["Assembly", "SMT, THT, BGA, mixed technology, box-build options"], ["Inspection", "SPI, AOI, X-ray, flying probe, FCT as specified"], ["Sourcing", "Authorized and traceable channels; alternates require approval"], ["Delivery", "ESD packaging, labels, inspection records, global logistics"]],
    process: ["Upload design package", "DFM + BOM review", "Source + fabricate", "Assemble + test", "Release + deliver"],
    ideal: ["Teams without internal sourcing", "NPI and design iterations", "Multi-vendor consolidation", "Prototype-to-volume programs"],
    files: ["Gerber + drill files", "BOM with MPNs", "Pick-and-place / centroid", "Assembly drawings", "Firmware + test plan"],
  },
  consigned: {
    kicker: "CUSTOMER-SUPPLIED MATERIAL · CONTROLLED HANDOFF",
    title: "Consigned PCB Assembly",
    statement: "Keep control of critical components. Gain a controlled assembly process.",
    intro: "Supply all or selected components from your own inventory while PCBasic manages receiving inspection, registration, ESD storage, assembly, inspection, testing, and finished-goods delivery.",
    icon: Box,
    metrics: [["2–5%", "Recommended attrition"], ["100%", "Material registration"], ["ESD", "Controlled storage"], ["AOI / X-Ray", "Assembly proof"]],
    outcomes: [["Use existing inventory", "Bring proprietary, allocated, pre-programmed, or already purchased components."], ["Protect material identity", "Labels, quantities, moisture status, and lot information are checked at receiving."], ["Share sourcing flexibly", "Choose fully consigned or partial consignment when only selected parts are supplied."]],
    capabilities: [["Customer provides", "All or selected components plus complete manufacturing files"], ["PCBasic manages", "Receiving, IQC, storage, kitting, assembly, test, packaging"], ["Packaging required", "Clearly labeled, anti-static, production-ready reels/trays/tubes"], ["Recommended spare qty", "2–5% by line item, adjusted for package and placement loss"], ["Moisture-sensitive parts", "Vacuum seal, humidity card, MSL status, bake history where applicable"], ["Verification", "BOM-to-label match, count, condition, and exception confirmation"]],
    process: ["Submit files + material list", "Engineering review", "Ship + register materials", "Kit + assemble + test", "Reconcile + deliver"],
    ideal: ["Proprietary or custom ICs", "Customer-owned inventory", "Long-lead allocated parts", "Pre-programmed components"],
    files: ["Gerber + drill files", "Complete BOM", "Pick-and-place / centroid", "Material packing list", "Assembly + test instructions"],
  },
  "cnc-machining": {
    kicker: "PRECISION PARTS · RAPID PROTOTYPING",
    title: "CNC Machining",
    statement: "From CAD geometry to inspected custom parts—with engineering feedback built in.",
    intro: "3-axis, 4-axis, and full 5-axis milling, turning, and post-processing support prototypes and repeat production across metals and engineering plastics.",
    icon: Wrench,
    metrics: [["3 / 4 / 5-axis", "Milling"], ["±0.005mm", "Project-dependent"], ["1 → volume", "Order range"], ["CMM", "Inspection options"]],
    outcomes: [["De-risk geometry", "DFM feedback identifies tool access, thin walls, internal radii, and cost drivers."], ["Match material to function", "Select metals or engineering plastics around strength, weight, wear, and environment."], ["Approve with evidence", "First article, dimensional sheets, CMM reports, and material traceability are available."]],
    capabilities: [["Processes", "3/4/5-axis milling, CNC turning, drilling, tapping, secondary machining"], ["Metals", "Aluminum 6061/7075, stainless steel, steel, copper, brass, titanium"], ["Plastics", "ABS, POM, PTFE, nylon, acrylic, PEEK, FR-4"], ["Finishes", "Anodize, hard anodize, plating, brushing, polishing, painting, laser mark"], ["Inspection", "Visual, dimensional, CMM, first article, customer-defined reports"], ["Order range", "Single prototype, bridge production, and repeat volume"]],
    process: ["Upload CAD + drawing", "DFM + quote", "Program + machine", "Finish + inspect", "Report + ship"],
    ideal: ["Robotics housings", "Medical-grade components", "Aerospace mechanisms", "Jigs, fixtures, and enclosures"],
    files: ["STEP / STP / IGES", "Dimensioned PDF drawing", "Material specification", "Tolerance callouts", "Finish + inspection needs"],
  },
};

const faqs: Record<ServiceKey, [string, string][]> = {
  turnkey: [["What is included in a turnkey quote?", "PCB fabrication, sourced components, assembly, standard inspection, selected testing, packaging, and shipping are presented as one coordinated scope."], ["Can we approve substitutions?", "Yes. No alternate part should enter production without the agreed customer approval workflow."], ["Is there a minimum order quantity?", "The service supports prototype quantities through production volumes; economics change with tooling, setup, and component packaging."]],
  consigned: [["Can we supply only selected parts?", "Yes. Partial consignment combines customer-supplied critical parts with components sourced by PCBasic."], ["Why are spare components required?", "Setup, feeder loading, package handling, and placement verification can consume a small amount of material, especially for tiny passives."], ["What happens to unused materials?", "Remaining quantities are reconciled to the work order and can be returned, stored, or handled according to the agreed instruction."]],
  "cnc-machining": [["Can you optimize the design?", "Yes. DFM feedback can reduce setups, machining time, material waste, and tolerance-driven cost."], ["Do you provide inspection reports?", "Dimensional reports, CMM output, first-article inspection, and customer-specific documents can be quoted."], ["Is one-off machining supported?", "Yes. The workflow supports single-piece prototypes as well as repeat and volume orders."]],
};

export default function ServiceDetail() {
  const { service } = useParams();
  const key: ServiceKey = service === "consigned" || service === "cnc-machining" ? service : "turnkey";
  const data = services[key];
  const HeroIcon = data.icon;
  const [openFaq, setOpenFaq] = useState(0);

  return <div className="min-h-screen bg-white text-[#162018]" style={{ fontFamily: "'Inter', sans-serif" }}>
    <NavBar activePage="products" />

    <section className="relative overflow-hidden bg-[#071A0D] text-white">
      <div className="absolute inset-0 opacity-55" style={{ backgroundImage: "radial-gradient(circle at 78% 35%, rgba(48,125,66,.62), transparent 27%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "auto, 46px 46px, 46px 46px" }} />
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
        <div><p className="text-[11px] font-mono tracking-[.18em] text-[#D5B34E] mb-5">{data.kicker}</p><h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>{data.title}</h1><p className="text-xl lg:text-2xl font-semibold text-[#D5B34E] mb-5 max-w-2xl">{data.statement}</p><p className="text-white/58 leading-7 max-w-2xl mb-8">{data.intro}</p><div className="flex flex-wrap gap-3"><Link to="/quote" className="px-6 py-3 bg-[#1A6B32] text-white font-bold rounded-sm inline-flex items-center gap-2"><Zap size={16}/> Get a project quote</Link><a href="#scope" className="px-6 py-3 border border-white/20 text-white/80 font-semibold rounded-sm inline-flex items-center gap-2">View service scope <ArrowRight size={15}/></a></div></div>
        {key === "turnkey" ? (
          <figure className="relative min-h-[300px] md:min-h-[360px] overflow-hidden border border-white/15 bg-[#0B2614] shadow-[0_24px_70px_rgba(0,0,0,.42)]">
            <img
              src="/images/service-heroes/turnkey-pcba-tech.webp"
              alt="Technology-focused turnkey PCBA with populated circuit board and electronic components"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041109] via-transparent to-[#0B2A17]/20" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
              <div>
                <span className="mb-2 block font-mono text-[10px] tracking-[.2em] text-[#D5B34E]">TURNKEY PCBA</span>
                <strong className="block max-w-sm text-lg leading-tight text-white">One visible build—from sourced components to verified assembly.</strong>
              </div>
              <span className="hidden shrink-0 font-mono text-[9px] tracking-widest text-white/45 lg:block">CONTROLLED INPUT → VERIFIED OUTPUT</span>
            </figcaption>
          </figure>
        ) : (
          <div className="hidden md:flex min-h-[320px] items-center justify-center relative"><div className="absolute w-72 h-72 rounded-full border border-[#D5B34E]/20"/><div className="absolute w-52 h-52 rotate-45 border border-white/10 bg-[#123D20] shadow-2xl"/><div className="relative w-32 h-32 bg-[#D5B34E] text-[#0A2110] flex items-center justify-center rounded-2xl shadow-[0_0_60px_rgba(213,179,78,.2)]"><HeroIcon size={54}/></div><span className="absolute bottom-4 font-mono text-[10px] tracking-widest text-white/30">CONTROLLED INPUT → VERIFIED OUTPUT</span></div>
        )}
      </div>
      <div className="relative border-t border-white/10 bg-black/20"><div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">{data.metrics.map(([v,l]:string[]) => <div key={l} className="px-4 py-6 text-center"><div className="text-2xl font-black text-[#D5B34E]">{v}</div><div className="text-[10px] mt-1 font-mono uppercase text-white/35">{l}</div></div>)}</div></div>
    </section>

    <section className="py-20 bg-[#F3F7F3]"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[.75fr_1.25fr] gap-12"><div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">WHY THIS SERVICE</p><h2 className="text-4xl font-black mb-4" style={{fontFamily:"'Outfit', sans-serif"}}>One structure. A different control model.</h2><p className="text-[#617063] leading-7">Choose the service according to what your team wants to own—and what it wants the manufacturing partner to control.</p></div><div className="grid md:grid-cols-3 gap-4">{data.outcomes.map(([t,d]:string[],i:number)=><article key={t} className="bg-white border border-[#D4E1D5] p-6"><div className="font-mono text-xs text-[#B18C2D] mb-10">0{i+1}</div><h3 className="font-bold text-lg mb-3">{t}</h3><p className="text-sm leading-6 text-[#657166]">{d}</p></article>)}</div></div></section>

    <section id="scope" className="py-20"><div className="max-w-7xl mx-auto px-6"><div className="mb-9"><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">SERVICE BOUNDARY</p><h2 className="text-4xl font-black" style={{fontFamily:"'Outfit', sans-serif"}}>Know what goes in—and what comes back.</h2></div><div className="border border-[#CBD9CC] overflow-hidden"><div className="grid grid-cols-[.8fr_1.7fr] bg-[#0D2914] text-white text-xs font-mono uppercase"><div className="p-4">Control point</div><div className="p-4 border-l border-white/10">Included capability</div></div>{data.capabilities.map(([a,b]:string[],i:number)=><div key={a} className={`grid grid-cols-[.8fr_1.7fr] text-sm ${i%2?"bg-[#F4F7F4]":"bg-white"}`}><div className="p-4 font-semibold">{a}</div><div className="p-4 border-l border-[#D8E1D9] text-[#56675A]">{b}</div></div>)}</div></div></section>

    <section className="py-20 bg-[#0B2111] text-white"><div className="max-w-7xl mx-auto px-6"><div className="text-center max-w-2xl mx-auto mb-12"><p className="text-xs font-mono tracking-widest text-[#D5B34E] mb-3">ONE VISIBLE WORKFLOW</p><h2 className="text-4xl font-black mb-4" style={{fontFamily:"'Outfit', sans-serif"}}>From input package to verified delivery</h2><p className="text-white/45">The narrative stays consistent across services; ownership and evidence change at each gate.</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">{data.process.map((x:string,i:number)=>{const icons=[UploadCloud,FileCheck2,ClipboardCheck,ScanLine,Truck];const Icon=icons[i];return <div key={x} className="border border-white/10 bg-white/[.035] p-5"><div className="flex justify-between mb-10"><Icon size={20} className="text-[#D5B34E]"/><span className="font-mono text-xs text-white/20">0{i+1}</span></div><h3 className="font-bold text-sm">{x}</h3></div>})}</div></div></section>

    <section className="py-20 bg-white"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14"><div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">DESIGN PACKAGE</p><h2 className="text-4xl font-black mb-6" style={{fontFamily:"'Outfit', sans-serif"}}>Start with a reviewable input.</h2><div className="space-y-3">{data.files.map((x:string,i:number)=><div key={x} className="flex items-center justify-between border border-[#D6E0D7] p-4"><span className="flex items-center gap-3 font-semibold text-sm"><span className="w-7 h-7 bg-[#E5F1E6] text-[#1A5C2A] flex items-center justify-center font-mono text-xs">{i+1}</span>{x}</span><Check size={15} className="text-[#1A5C2A]"/></div>)}</div></div><div><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">BEST FIT</p><h2 className="text-4xl font-black mb-6" style={{fontFamily:"'Outfit', sans-serif"}}>Designed for real program constraints.</h2><div className="grid sm:grid-cols-2 gap-3">{data.ideal.map((x:string)=><div key={x} className="bg-[#F3F7F3] border border-[#D4E1D5] p-5 min-h-28 flex items-end font-semibold">{x}</div>)}</div></div></div></section>

    <section className="py-20 bg-[#F3F7F3]"><div className="max-w-4xl mx-auto px-6"><p className="text-xs font-mono tracking-widest text-[#1A5C2A] mb-3">COMMON QUESTIONS</p><h2 className="text-4xl font-black mb-8" style={{fontFamily:"'Outfit', sans-serif"}}>Make the handoff predictable.</h2><div className="border-t border-[#CAD8CB]">{faqs[key].map(([q,a],i)=><div key={q} className="border-b border-[#CAD8CB]"><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} className="w-full py-5 flex items-center justify-between text-left font-bold"><span>{q}</span><ChevronDown size={17} className={`transition-transform ${openFaq===i?"rotate-180":""}`}/></button>{openFaq===i&&<p className="pb-5 pr-12 text-sm leading-6 text-[#607362]">{a}</p>}</div>)}</div></div></section>

    <RelatedProducts mode={key === "cnc-machining" ? "cnc" : "pcba"} />

    <section className="py-14 bg-[#D5B34E]"><div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"><div><p className="text-xs font-mono tracking-widest text-[#4A3A0E] mb-2">READY FOR ENGINEERING REVIEW?</p><h2 className="text-3xl font-black" style={{fontFamily:"'Outfit', sans-serif"}}>Upload the package. Define the control model.</h2></div><div className="flex gap-3"><Link to="/quote" className="px-6 py-3 bg-[#123D20] text-white font-bold rounded-sm">Get Instant Quote</Link><Link to="/contact" className="px-6 py-3 border border-[#4A3A0E]/30 font-bold rounded-sm">Talk to engineering</Link></div></div></section>
    <footer className="bg-[#071A0D] text-white/40 py-8"><div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-3 text-xs"><span className="font-semibold text-white/65">PCBasic · Precision Manufacturing. Under Your Control.</span><span>PCB · PCBA · CNC · 3D Print</span></div></footer>
  </div>;
}
