import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Cpu, Factory, Glasses, MapPin, Pause, Play, ShieldCheck, Warehouse } from "lucide-react";
import NavBar from "../components/NavBar";

const images = {
  floor: "/images/factory/factory-floor.jpg",
  lines: ["01","02","03","04","05","06"].map(n => `https://www.pcbasic.com/Uploads/images/20260702/${n}.webp`),
  equipment: [
    ["Stencil laser cutting", "/images/factory/stencil-laser.jpg"],
    ["High-speed placement", "/images/factory/placement-line.jpg"],
    ["SPI inspection", "/images/factory/spi-inspection.jpg"],
    ["Online AOI", "/images/factory/aoi-inspection.jpg"],
  ],
};

const gallery = [
  ["SMT Production Floor", "A clean, organized line layout designed for flexible high-mix production.", "/images/factory/factory-floor.jpg", "Production"],
  ["Material Preparation", "Kitting and preparation before materials enter the controlled production flow.", "/images/factory/material-prep.jpg", "Materials"],
  ["High-Speed Placement", "Automated placement equipment for reliable, repeatable component assembly.", "/images/factory/placement-line.jpg", "SMT"],
  ["Scan-to-Pick Materials", "Barcode-driven material issue connects each reel to its production work order.", "/images/factory/scan-material.jpg", "Traceability"],
  ["Intelligent Warehouse", "Smart component racks support identification, location control, and fast retrieval.", "/images/factory/smart-warehouse.jpg", "Warehouse"],
  ["AOI Inspection", "Automated optical inspection identifies placement and soldering exceptions in-line.", "/images/factory/aoi-inspection.jpg", "Inspection"],
  ["SPI Inspection", "Solder paste inspection catches print defects before components are placed.", "/images/factory/spi-inspection.jpg", "Inspection"],
  ["Wave Soldering", "Controlled through-hole soldering for repeatable joints across mixed assemblies.", "/images/factory/wave-soldering.jpg", "DIP"],
  ["Functional Testing", "Fixtures and test programs verify that the assembled board performs as intended.", "/images/factory/functional-test.jpg", "Testing"],
  ["Stencil Manufacturing", "In-house laser cutting supports rapid setup and controlled paste apertures.", "/images/factory/stencil-laser.jpg", "Tooling"],
  ["CNC Routing", "Programmed depaneling protects finished assemblies and maintains clean board edges.", "/images/factory/cnc-routing.jpg", "Finishing"],
  ["QA Inspection", "Final visual and documented verification before release to packaging.", "/images/factory/qa-inspection.jpg", "Quality"],
  ["Packing & Shipping", "Protected, labeled assemblies prepared for safe delivery and receiving control.", "/images/factory/packing.jpg", "Delivery"],
] as const;

const steps = ["IQC", "SPI", "Online AOI", "First Article", "IPQC", "X-Ray", "Final QC", "QA", "Shipment"];

export default function ExploreFactory() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % gallery.length), 5000);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const changeSlide = (index: number) => setActiveSlide((index + gallery.length) % gallery.length);

  return <div className="min-h-screen bg-[#F6F8F5] text-[#142018]" style={{fontFamily:"'Inter', sans-serif"}}>
    <NavBar activePage="about" />
    <section className="relative bg-[#071B0D] text-white overflow-hidden">
      <img src={images.floor} alt="PCBasic smart PCBA factory floor" className="absolute inset-0 w-full h-full object-cover opacity-35"/>
      <div className="absolute inset-0 bg-gradient-to-r from-[#06180B] via-[#06180B]/90 to-[#06180B]/35"/>
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="flex items-center gap-2 text-xs font-mono text-white/45 mb-10"><Link to="/">Home</Link><ChevronRight size={13}/><span>About</span><ChevronRight size={13}/><span className="text-white/80">Explore Factory</span></div>
        <p className="text-xs font-mono tracking-[.2em] text-[#D4B144] mb-4">SMART FACTORY · VISIBLE PRODUCTION</p>
        <h1 className="text-5xl lg:text-7xl font-black leading-[.98] max-w-4xl mb-6" style={{fontFamily:"'Outfit', sans-serif"}}>See where your boards<br/><span className="text-[#39A054]">come to life.</span></h1>
        <p className="text-lg leading-8 text-white/62 max-w-2xl mb-9">Step inside PCBasic’s offices, intelligent warehouse, automated SMT lines, inspection labs, and final assembly areas—one connected production system built for traceability.</p>
        <div className="flex flex-wrap gap-3"><a href="#tour" className="bg-[#1B7435] px-6 py-3.5 font-bold inline-flex items-center gap-2"><Play size={17} fill="currentColor"/> Start factory tour</a><a href="#equipment" className="border border-white/25 px-6 py-3.5 font-semibold inline-flex items-center gap-2">Explore equipment <ArrowRight size={16}/></a></div>
      </div>
      <div className="relative border-t border-white/10 bg-black/25"><div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">{[["20,000m²","Factory area"],["500+","Team members"],["9","Quality gates"],["1,000+","Monthly orders"]].map(([v,l])=><div key={l} className="p-6 text-center"><strong className="text-2xl text-[#D4B144]">{v}</strong><p className="text-[10px] font-mono uppercase text-white/40 mt-1">{l}</p></div>)}</div></div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-20"><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14 items-start"><div className="lg:sticky lg:top-24"><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">ONE CONNECTED FACTORY</p><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Digital control from engineering to shipment.</h2><p className="text-[#647067] leading-7">Self-developed CRM, MES, ERP, and IoT systems connect quotation, engineering, materials, production, inspection, and delivery. Every process handoff becomes visible and traceable.</p></div><div className="grid sm:grid-cols-2 gap-4">{[[Factory,"Automated production","SMT, THT, wave soldering, selective soldering, and flexible mixed-volume lines."],[Warehouse,"Intelligent warehouse","IQC, component identification, smart racks, and controlled ESD storage."],[Cpu,"Digital operations","MES work orders, live status, process records, and order-level traceability."],[ShieldCheck,"Quality evidence","Nine inspection gates with AOI, SPI, X-ray, functional test, QA, and release."]].map(([Icon,title,text]:any)=><article key={title} className="bg-white border border-[#D8E0D7] p-6"><Icon size={23} className="text-[#1A6B32] mb-8"/><h3 className="font-bold text-lg mb-2">{title}</h3><p className="text-sm text-[#687169] leading-6">{text}</p></article>)}</div></div></section>

    <section id="gallery" className="bg-white border-y border-[#DDE3DC] py-20 scroll-mt-20"><div className="max-w-7xl mx-auto px-6"><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10"><div><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">FACTORY GALLERY · REAL PHOTOS</p><h2 className="text-4xl font-black" style={{fontFamily:"'Outfit', sans-serif"}}>Inside the production flow.</h2></div><p className="text-sm text-[#687169] max-w-md">Thirteen real factory scenes—from material preparation and SMT through inspection, testing, and shipment.</p></div>
      <div className="relative overflow-hidden bg-[#071B0D] aspect-[16/8.5] min-h-[420px] group">
        {gallery.map(([title,,src],index)=><img key={src} src={src} alt={`PCBasic factory: ${title}`} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${index===activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"}`}/>) }
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/15"/>
        <div className="absolute left-6 right-6 bottom-6 lg:left-10 lg:right-10 lg:bottom-9 flex items-end justify-between gap-6 text-white"><div><span className="inline-block text-[10px] font-mono tracking-widest text-[#D4B144] mb-3">{gallery[activeSlide][3]} · {String(activeSlide+1).padStart(2,"0")}/{gallery.length}</span><h3 className="text-2xl lg:text-3xl font-black mb-2" style={{fontFamily:"'Outfit', sans-serif"}}>{gallery[activeSlide][0]}</h3><p className="text-sm text-white/65 max-w-xl">{gallery[activeSlide][1]}</p></div><button type="button" aria-label={autoPlay ? "Pause photo carousel" : "Play photo carousel"} onClick={()=>setAutoPlay(play=>!play)} className="w-11 h-11 border border-white/30 bg-black/30 flex items-center justify-center shrink-0">{autoPlay?<Pause size={16}/>:<Play size={16} fill="currentColor"/>}</button></div>
        <button type="button" aria-label="Previous factory photo" onClick={()=>changeSlide(activeSlide-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 text-[#142018] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={20}/></button>
        <button type="button" aria-label="Next factory photo" onClick={()=>changeSlide(activeSlide+1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 text-[#142018] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={20}/></button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label="Factory photo thumbnails">{gallery.map(([title,,src],index)=><button type="button" key={src} aria-label={`Show ${title}`} aria-current={index===activeSlide} onClick={()=>changeSlide(index)} className={`relative shrink-0 w-28 h-16 overflow-hidden border-2 transition-colors ${index===activeSlide ? "border-[#1A6B32]" : "border-transparent opacity-60 hover:opacity-100"}`}><img src={src} alt="" className="w-full h-full object-cover"/></button>)}</div>
    </div></section>

    <section id="equipment" className="py-20 bg-[#F2F5F1] scroll-mt-20"><div className="max-w-7xl mx-auto px-6"><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">EQUIPMENT PROOF</p><h2 className="text-4xl font-black mb-10" style={{fontFamily:"'Outfit', sans-serif"}}>Machines that make quality repeatable.</h2><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{images.equipment.map(([name,src],i)=><article key={name} className="bg-white border border-[#D7DFD6] overflow-hidden group"><div className="aspect-[4/3] overflow-hidden bg-[#E7ECE6]"><img src={src} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div><div className="p-5"><div className="text-[10px] font-mono text-[#A17D20] mb-2">EQUIPMENT 0{i+1}</div><h3 className="font-bold">{name}</h3></div></article>)}</div></div></section>

    <section className="bg-[#17172A] text-white py-20"><div className="max-w-7xl mx-auto px-6"><div className="grid lg:grid-cols-[.85fr_1.15fr] gap-14 items-center"><div><p className="text-xs font-mono tracking-widest text-[#D4B144] mb-3">QUALITY ON THE LINE</p><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Nine gates. One release standard.</h2><p className="text-white/50 leading-7">Inspection is embedded into production, not added at the end. Each gate prevents defects from moving forward and creates evidence for final release.</p></div><div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">{steps.map((step,i)=><div key={step} className="bg-[#17172A] p-4 min-h-[100px]"><span className="text-[10px] font-mono text-[#D4B144]">0{i+1}</span><p className="text-sm font-semibold mt-4">{step}</p></div>)}</div></div></div></section>

    <section id="video" className="py-20 bg-white scroll-mt-20"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"><div className="relative aspect-video overflow-hidden bg-[#09230F] group"><img src="/images/factory/placement-line.jpg" alt="Factory video preview" className="w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-700"/><div className="absolute inset-0 flex items-center justify-center"><Link to="/about/videos" aria-label="Open factory video collection" className="w-20 h-20 rounded-full bg-white text-[#1A6B32] flex items-center justify-center shadow-xl"><Play size={28} fill="currentColor" className="ml-1"/></Link></div><span className="absolute bottom-5 left-5 text-xs font-mono text-white/75">FACTORY VIDEO · PROCESS WALKTHROUGH</span></div><div><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">WATCH THE PROCESS</p><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>See the line move, not just the machine list.</h2><p className="text-[#657067] leading-7 mb-7">Follow material receiving, solder paste printing, placement, reflow, inspection, testing, and final release through the factory video collection.</p><Link to="/about/videos" className="inline-flex items-center gap-2 font-bold text-[#1A6B32]">View all factory videos <ArrowRight size={16}/></Link></div></div></section>

    <section id="tour" className="py-20 bg-[#EAF1E9] scroll-mt-20"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_.8fr] gap-12 items-center"><div className="relative rounded-2xl overflow-hidden min-h-[360px]"><img src="https://www.pcbasic.com/public/static/new/images/about/360VR-banner_1.webp" alt="PCBasic 360 degree virtual factory tour" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#071B0D]/85 to-transparent"/><Glasses size={46} className="absolute left-7 bottom-7 text-white"/></div><div><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">360° VIRTUAL TOUR</p><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Walk the factory at your own pace.</h2><p className="text-[#627064] leading-7 mb-7">Explore key production and office environments in an immersive view, then speak with engineering about the process behind your project.</p><a href="https://www.pcbasic.com/company.html?goto=3" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#1A6B32] text-white px-6 py-3.5 font-bold">Launch 360° tour <ArrowRight size={16}/></a></div></div></section>

    <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-4">{[["Shenzhen Factory","Building E, Jianshi Industrial Park, Baoan District, Shenzhen"],["Huizhou Factory","Buildings 25–26, Zhongkai High-tech Zone, Huizhou"]].map(([name,address])=><div key={name} className="border border-[#D8E0D7] p-6 flex gap-4"><MapPin className="text-[#1A6B32] shrink-0" size={21}/><div><h3 className="font-bold mb-2">{name}</h3><p className="text-sm text-[#687169]">{address}</p></div></div>)}</div></section>
  </div>;
}
