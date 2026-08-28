import { Link } from "react-router";
import { ArrowRight, Check, ChevronRight, HeartHandshake, Leaf, ShieldCheck, Users } from "lucide-react";
import NavBar from "../components/NavBar";

const commitments = [
  { icon: Leaf, label: "Environment", value: "ISO 14001", copy: "Resource efficiency, lower-impact materials, and a greener manufacturing system." },
  { icon: ShieldCheck, label: "Workplace", value: "ISO 45001", copy: "A structured occupational health and safety management system." },
  { icon: HeartHandshake, label: "Community", value: "Public Welfare", copy: "Direct support for communities through donations and employee participation." },
];

const greenActions = [
  "Halogen-free substrates and lead-free solder paste",
  "Plastic-reduced and recyclable packaging",
  "Energy optimization for SMT and wave-soldering lines",
  "Waste PCB recycling and equipment remanufacturing",
  "Low-power PCBA design and carbon-footprint initiatives",
];

export default function Sustainability() {
  return <div className="min-h-screen bg-[#F7F8F5] text-[#132016]" style={{ fontFamily: "'Inter', sans-serif" }}>
    <NavBar activePage="about" />

    <section className="relative overflow-hidden bg-[#17172A] text-white">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 75% 20%, #1A6B32 0, transparent 34%), linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "auto, 48px 48px, 48px 48px" }}/>
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/45 mb-7"><Link to="/">Home</Link><ChevronRight size={13}/><span>About</span><ChevronRight size={13}/><span className="text-white/80">Sustainability</span></div>
          <p className="text-xs font-mono tracking-[.18em] text-[#D2AF43] mb-4">CSR · SUSTAINABILITY · CARE</p>
          <h1 className="text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Technology with<br/><span className="text-[#2C8A45]">responsibility.</span></h1>
          <p className="text-lg leading-8 text-white/62 max-w-xl">PCBasic combines responsible manufacturing, employee well-being, and community action so that production progress creates value beyond the factory floor.</p>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-3 shadow-2xl">
          <img src="/images/sustainability/commitment.png" alt="PCBasic corporate social responsibility commitment" className="w-full h-[310px] object-cover rounded-2xl bg-[#E5EFE6]" />
          <div className="absolute left-7 right-7 bottom-7 bg-[#092811]/95 text-white px-5 py-4 flex items-center justify-between"><div><div className="text-[10px] font-mono tracking-widest text-[#D2AF43]">OUR COMMITMENT</div><div className="font-bold mt-1">Sustainability, care & responsibility</div></div><Leaf size={24} className="text-[#D2AF43]"/></div>
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14 mb-14">
        <div><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">RESPONSIBLE BUSINESS</p><h2 className="text-4xl font-black leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>Progress should be measurable—and shared.</h2></div>
        <div className="text-[#5D6A60] leading-7 space-y-4"><p>Amid rapid change in the global electronics industry, PCBasic remains committed to responsible business practices while delivering high-quality PCBA manufacturing and rapid turnaround.</p><p>We believe technological innovation is not only about efficiency and quality. It must advance in harmony with social responsibility, employee development, and environmental sustainability.</p></div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">{commitments.map(({icon:Icon,label,value,copy}) => <article key={label} className="bg-white border border-[#D9E1D8] p-7"><div className="w-11 h-11 bg-[#E7F2E9] text-[#1A6B32] flex items-center justify-center mb-8"><Icon size={21}/></div><p className="text-[10px] font-mono uppercase tracking-widest text-[#788278] mb-2">{label}</p><h3 className="text-xl font-black mb-3">{value}</h3><p className="text-sm leading-6 text-[#647066]">{copy}</p></article>)}</div>
    </section>

    <section className="bg-white border-y border-[#DDE4DC] py-20"><div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden bg-[#EEF3ED]"><img src="/images/sustainability/earthquake-aid.png" alt="PCBasic employee donation activity supporting Tibet earthquake relief" className="w-full aspect-[4/3] object-cover"/></div>
        <div><div className="inline-flex items-center gap-2 text-xs font-mono text-[#9A761C] mb-4"><HeartHandshake size={15}/> SOCIAL RESPONSIBILITY</div><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Emergency aid for the Tibet earthquake</h2><p className="text-[#5F6D62] leading-7 mb-4">Following the January 2025 Tibet earthquake, PCBasic responded with a donation of more than RMB 20,000 to support disaster relief and post-earthquake reconstruction.</p><p className="text-[#5F6D62] leading-7">The employee donation activity turned concern into direct participation—supporting affected communities as they recover and rebuild. PCBasic will continue to engage in public welfare through tangible, long-term action.</p><div className="mt-8 flex gap-8"><div><strong className="block text-2xl text-[#1A6B32]">¥20K+</strong><span className="text-xs text-[#7A847B]">Relief donation</span></div><div><strong className="block text-2xl text-[#1A6B32]">2025</strong><span className="text-xs text-[#7A847B]">Emergency response</span></div></div></div>
      </div>
    </div></section>

    <section className="max-w-7xl mx-auto px-6 py-20"><div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="lg:order-2 rounded-2xl overflow-hidden bg-[#EEF3ED]"><img src="/images/sustainability/employee-health.png" alt="PCBasic employee team-building and recognition activities" className="w-full aspect-[4/3] object-cover"/></div>
      <div><div className="inline-flex items-center gap-2 text-xs font-mono text-[#1A6B32] mb-4"><Users size={15}/> OCCUPATIONAL HEALTH</div><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Safety, growth, and well-being at work</h2><p className="text-[#5F6D62] leading-7 mb-5">Employee health and safety are a first priority. PCBasic operates an ISO 45001-aligned management system supported by medical checkups, safety drills, and continuous workplace improvement.</p><div className="grid sm:grid-cols-2 gap-3">{["Annual health checks", "Safety training & drills", "Career development", "Team and cultural activities"].map(item=><div key={item} className="flex items-center gap-3 text-sm bg-white border border-[#D9E1D8] p-3"><Check size={15} className="text-[#1A6B32]"/>{item}</div>)}</div></div>
    </div></section>

    <section className="bg-[#0A2812] text-white py-20"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[.9fr_1.1fr] gap-14 items-center">
      <div className="rounded-2xl overflow-hidden border border-white/10"><img src="/images/sustainability/green-manufacturing.png" alt="Green circular manufacturing and recycling" className="w-full aspect-[4/3] object-cover"/></div>
      <div><p className="text-xs font-mono tracking-widest text-[#D2AF43] mb-4">ENVIRONMENTAL MANAGEMENT</p><h2 className="text-4xl font-black leading-tight mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Building a greener PCBA supply chain</h2><p className="text-white/58 leading-7 mb-7">Environmental responsibility runs from material selection to production energy, packaging, recycling, and the products our customers bring to market.</p><div className="space-y-3">{greenActions.map(item=><div key={item} className="flex items-start gap-3 text-sm text-white/78"><Check size={16} className="text-[#D2AF43] mt-0.5 shrink-0"/>{item}</div>)}</div></div>
    </div></section>

    <section className="py-20 bg-[#F1F5F0]"><div className="max-w-5xl mx-auto px-6 text-center"><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-4">A LONG-TERM COMMITMENT</p><h2 className="text-4xl font-black mb-5" style={{fontFamily:"'Outfit', sans-serif"}}>Responsible manufacturing is never finished.</h2><p className="text-[#627064] max-w-2xl mx-auto leading-7 mb-8">We will keep improving our environmental systems, supporting employees and communities, and making sustainability part of every manufacturing decision.</p><Link to="/contact" className="inline-flex items-center gap-2 bg-[#1A6B32] text-white px-7 py-3.5 font-bold">Talk to our team <ArrowRight size={16}/></Link></div></section>
  </div>;
}
