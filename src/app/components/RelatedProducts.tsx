import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type ProductMode = "pcb" | "pcba" | "cnc";
type Sample = { title: string; category: string; description: string; image: string; href: string };

const pcbSamples: Sample[] = [
  { title: "Industrial Control PCBA", category: "MIXED TECHNOLOGY", description: "Production-ready control electronics with dense I/O and power interfaces.", image: "/images/product-samples/real/pcba-sample-01.jpg", href: "/products/services/turnkey" },
  { title: "Drone Control Board", category: "COMPACT PCBA", description: "High-density assembly for lightweight, connected motion-control products.", image: "/images/product-samples/real/pcba-sample-02.jpg", href: "/products/services/turnkey" },
  { title: "Smart Display Controller", category: "MULTILAYER PCBA", description: "Processor-rich controller boards assembled and verified as one build.", image: "/images/product-samples/real/pcba-sample-03.jpg", href: "/products/services/consigned" },
  { title: "Automotive Electronics", category: "HIGH RELIABILITY", description: "Controlled assembly and traceability for demanding mobility applications.", image: "/images/product-samples/real/pcba-sample-04.jpg", href: "/products/standard" },
  { title: "Power Supply Assembly", category: "POWER ELECTRONICS", description: "Mixed-component power boards with thermal and workmanship control.", image: "/images/product-samples/real/pcba-sample-05.jpg", href: "/products/services/turnkey" },
  { title: "Connected Device PCBA", category: "IOT ASSEMBLY", description: "Compact wireless product electronics from sourcing through functional test.", image: "/images/product-samples/real/pcba-sample-06.jpg", href: "/products/services/turnkey" },
  { title: "LED Lighting Module", category: "LED PCBA", description: "Repeatable LED module assembly for prototypes and scaled production.", image: "/images/product-samples/real/pcba-sample-10.jpg", href: "/products/services/consigned" },
  { title: "Industrial Interface Board", category: "CONTROL SYSTEMS", description: "Robust connectivity and component placement for industrial equipment.", image: "/images/product-samples/real/pcba-sample-12.jpg", href: "/products/standard" },
];

const cncSamples: Sample[] = [
  { title: "Precision Aluminum Housing", category: "5-AXIS MILLING", description: "Complex pockets, thin walls, and controlled interface geometry.", image: "/images/product-samples/cnc-01.webp", href: "/quote" },
  { title: "Anodized Functional Parts", category: "ALUMINUM 6061", description: "Machined prototypes with production-ready surface treatment.", image: "/images/product-samples/cnc-02.webp", href: "/quote" },
  { title: "Multi-part CNC Assembly", category: "PRECISION FIT", description: "Matched parts produced around assembly and inspection requirements.", image: "/images/product-samples/cnc-03.jpg", href: "/quote" },
  { title: "Robotics Structural Parts", category: "RAPID PROTOTYPING", description: "Lightweight components for motion systems and robotic platforms.", image: "/images/product-samples/cnc-04.webp", href: "/quote" },
  { title: "Turned Metal Components", category: "CNC TURNING", description: "Repeatable cylindrical features, threads, and precision diameters.", image: "/images/product-samples/cnc-05.webp", href: "/quote" },
  { title: "Custom Machined Enclosure", category: "LOW VOLUME", description: "Engineering housings from one-off proof parts to repeat builds.", image: "/images/product-samples/cnc-06.webp", href: "/quote" },
];

export default function RelatedProducts({ mode }: { mode: ProductMode }) {
  const products = mode === "cnc" ? cncSamples : pcbSamples;
  const [start, setStart] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setStart((value) => (value + 1) % products.length), 4500);
    return () => window.clearInterval(timer);
  }, [products.length]);

  const visible = [0, 1, 2].map((offset) => products[(start + offset) % products.length]);
  const move = (direction: number) => setStart((value) => (value + direction + products.length) % products.length);

  return <section id="related-products" className="py-20 bg-white border-t border-[#D9E1D8] scroll-mt-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-10"><p className="text-xs font-mono tracking-widest text-[#1A6B32] mb-3">REAL PRODUCT SAMPLES</p><h2 className="text-4xl font-black" style={{fontFamily:"'Outfit', sans-serif"}}>Built for products that have to perform.</h2><p className="mt-3 max-w-2xl text-[#687169]">Explore real PCB and PCBA samples manufactured for control, mobility, connected devices, power, and industrial applications.</p></div>
      <div className="relative">
        <button type="button" onClick={()=>move(-1)} aria-label="Previous products" className="absolute left-2 md:-left-5 top-[27%] z-10 w-11 h-11 border border-[#C9D5CA] bg-white shadow-md flex items-center justify-center hover:bg-[#EAF2EB]"><ChevronLeft size={20}/></button>
        <div className="grid md:grid-cols-3 gap-5">{visible.map((product,index)=><article key={`${start}-${product.title}`} className="group border border-[#D7E0D8] bg-[#F7F9F6] overflow-hidden animate-in fade-in duration-500"><div className="aspect-[4/3] overflow-hidden bg-white"><img src={product.image} alt={`PCBasic manufactured sample: ${product.title}`} className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"/></div><div className="p-6"><p className="text-[10px] font-mono tracking-widest text-[#A17C1D] mb-3">{product.category} · 0{(start+index)%products.length+1}</p><h3 className="font-bold text-lg mb-2">{product.title}</h3><p className="text-sm text-[#687169] leading-6 mb-5">{product.description}</p><Link to={product.href} className="inline-flex items-center gap-2 text-sm font-bold text-[#1A6B32]">View related service <ArrowRight size={14}/></Link></div></article>)}</div>
        <button type="button" onClick={()=>move(1)} aria-label="Next products" className="absolute right-2 md:-right-5 top-[27%] z-10 w-11 h-11 border border-[#C9D5CA] bg-white shadow-md flex items-center justify-center hover:bg-[#EAF2EB]"><ChevronRight size={20}/></button>
      </div>
      <div className="mt-6 flex justify-center gap-1.5">{products.map((product,index)=><button type="button" key={product.title} aria-label={`Show ${product.title}`} aria-current={index===start} onClick={()=>setStart(index)} className={`h-1.5 transition-all ${index===start?"w-8 bg-[#1A6B32]":"w-3 bg-[#C9D5CA]"}`}/>)}</div>
    </div>
  </section>;
}
