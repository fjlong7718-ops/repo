import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Calendar, Tag, ArrowRight, MapPin } from "lucide-react";
import NavBar from "../components/NavBar";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const G  = "#1A5C2A";
const DK = "#1A1A2E";
const W  = "#F8F7F4";
const WH = "#FFFFFF";
const BD = "#E5E2DB";
const M  = "#5C5C75";

// ── Types ─────────────────────────────────────────────────────────────────────
type Category = "Trade Shows" | "Employee Life" | "Sponsorship & Awards";

interface NewsItem {
  id: string;
  category: Category;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  location?: string;
  imgH?: number;
}

// ── News Data ─────────────────────────────────────────────────────────────────
const NEWS: NewsItem[] = [
  {
    id: "n1",
    category: "Sponsorship & Awards",
    date: "2026-08-20",
    title: "PCBasic x Team Octane Racing Electric",
    excerpt: "PCBasic is proud to announce its sponsorship of Team Octane Racing Electric, the Formula Student electric racing team from COEP Technological University, Pune, India. Through this partnership, PCBasic will provide high-performance PCB prototyping and manufacturing support to aid the team's 2026-2027 season race car development.",
    image: "https://i.ibb.co/fY6149WX/image.jpg",
    featured: true,
    location: "Pune, India",
    imgH: 280,
  },
  {
    id: "n2",
    category: "Trade Shows",
    date: "2024-11-12",
    title: "electronica Munich 2024 — PCBasic at Booth C6 241/9",
    excerpt: "PCBasic joined the world's leading trade fair for electronic components, systems, applications and solutions. At Booth C6 241/9, our team showcased automotive-grade IATF 16949 and medical-grade ISO 13485 certified PCBA services to an audience of professionals from around the globe. electronica Munich ran from 12–15 November 2024.",
    image: "https://images.unsplash.com/photo-1775314054195-85f31de0c944?w=800&h=480&fit=crop",
    location: "Munich, Germany",
    imgH: 200,
  },
  {
    id: "n3",
    category: "Employee Life",
    date: "2026-02-06",
    title: "2026 Chinese New Year Gala — A Night to Remember",
    excerpt: "PCBasic's 500-strong team came together for our grandest annual gala dinner yet, celebrating the Year of the Horse with a lavish banquet, talent show performances, lucky draws, and heartfelt recognition of employees who have been with us for 5, 10, and 15 years.",
    image: "https://images.unsplash.com/photo-1768508950719-4d76978fdf44?w=800&h=480&fit=crop",
    location: "Shenzhen, China",
    imgH: 240,
  },
  {
    id: "n4",
    category: "Sponsorship & Awards",
    date: "2025-12-20",
    title: "PCBasic Receives National High-Tech Enterprise Re-Certification",
    excerpt: "For the third consecutive cycle, PCBasic has been re-certified as a National High-Tech Enterprise by China's Ministry of Science and Technology — a recognition of our sustained R&D investment and innovation in intelligent PCBA manufacturing processes.",
    image: "https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?w=800&h=480&fit=crop",
    location: "Beijing, China",
    imgH: 190,
  },
  {
    id: "n5",
    category: "Trade Shows",
    date: "2025-10-13",
    title: "HKTDC Electronics Fair Autumn 2025 — Booth 5BB03",
    excerpt: "PCBasic exhibited at the HKTDC Hong Kong Electronics Fair (Autumn Edition), October 13–16, 2025, at Booth 5BB03. Our team connected with procurement professionals and engineers from across Asia and beyond, presenting our full range of PCB prototyping, turnkey PCBA, and quick-turn manufacturing services.",
    image: "https://images.unsplash.com/photo-1761195689615-9469b65dac01?w=800&h=480&fit=crop",
    location: "Hong Kong",
    imgH: 220,
  },
  {
    id: "n6",
    category: "Employee Life",
    date: "2025-05-18",
    title: "2025 Company Trip: Zhangjiajie Adventure",
    excerpt: "Over 400 PCBasic employees and their families embarked on a 3-day adventure to Zhangjiajie National Forest Park. From the glass-bottomed skywalk to team hiking challenges and a lakeside bonfire night, the trip strengthened bonds across departments and celebrated our growing family.",
    image: "https://images.unsplash.com/photo-1781861730972-a9865afb4337?w=800&h=480&fit=crop",
    location: "Zhangjiajie, China",
    imgH: 260,
  },
  {
    id: "n7",
    category: "Sponsorship & Awards",
    date: "2025-10-28",
    title: "PCBasic Sponsors Shenzhen Electronics Industry Summit",
    excerpt: "As a Platinum Sponsor of the 2025 Shenzhen Electronics Industry Association Annual Summit, PCBasic hosted a roundtable discussion on 'Digital Transformation in PCBA Manufacturing' attended by 200+ industry leaders, government officials, and technical experts.",
    image: "https://images.unsplash.com/photo-1764874299025-d8b2251f307d?w=800&h=480&fit=crop",
    location: "Shenzhen, China",
    imgH: 200,
  },
  {
    id: "n8",
    category: "Employee Life",
    date: "2025-09-29",
    title: "Mid-Autumn Festival: Moon Cakes & Team Games",
    excerpt: "To celebrate the Mid-Autumn Festival, PCBasic organized a campus-wide lantern crafting contest, mooncake tasting competition, and an outdoor team relay race. Each department decorated their workshop area, and the engineering team took home the prize for most creative display.",
    image: "https://images.unsplash.com/photo-1592591281836-af5e5904c466?w=800&h=480&fit=crop",
    location: "Shenzhen, China",
    imgH: 180,
  },
  {
    id: "n9",
    category: "Trade Shows",
    date: "2024-10-13",
    title: "HKTDC Electronics Fair Autumn 2024 — Booth 5B-B21",
    excerpt: "PCBasic participated in the HKTDC Hong Kong Electronics Fair (Autumn Edition) 2024, October 13–16, at Booth 5B-B21. We showcased our quick-turn PCB prototype service and full PCBA capabilities to buyers and engineers from Japan, South Korea, Southeast Asia, and beyond.",
    image: "https://images.unsplash.com/photo-1770910196472-6936b9639687?w=800&h=480&fit=crop",
    location: "Hong Kong",
    imgH: 230,
  },
  {
    id: "n10",
    category: "Sponsorship & Awards",
    date: "2025-03-15",
    title: "PCBasic Sponsors Shenzhen STEM Education Initiative",
    excerpt: "PCBasic donated equipment and mentorship to 5 local high schools in Baoan District, providing PCB design software licenses, hands-on soldering kits, and monthly workshops led by our engineering team. Over 600 students participated in the first semester of the programme.",
    image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?w=400&h=360&fit=crop",
    location: "Shenzhen, China",
    imgH: 210,
  },
  {
    id: "n11",
    category: "Employee Life",
    date: "2024-10-25",
    title: "PCBasic Sports Day 2024 — Inter-Department Challenge",
    excerpt: "Eight departments competed in our first-ever all-hands Sports Day held at a rented stadium in Baoan. Events included tug-of-war, a 4×100 relay, basketball 3-on-3, and a factory-floor obstacle course. The SMT Operations team claimed the championship trophy.",
    image: "https://images.unsplash.com/photo-1762769334463-fc071a584734?w=800&h=480&fit=crop",
    location: "Shenzhen, China",
    imgH: 250,
  },
  {
    id: "n12",
    category: "Sponsorship & Awards",
    date: "2024-08-19",
    title: "Awarded 'Specialized, Refined and New' Enterprise Honor",
    excerpt: "PCBasic was formally recognized as a 'Specialized, Refined and New' (专精特新) Small and Medium-Sized Enterprise by the Guangdong Provincial Government, acknowledging our technological specialization and innovation-driven approach to intelligent PCBA manufacturing.",
    image: "https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?w=800&h=480&fit=crop",
    location: "Guangzhou, China",
    imgH: 195,
  },
];

// ── Category config ───────────────────────────────────────────────────────────
const CAT_COLOR: Record<Category, { bg: string; text: string }> = {
  "Trade Shows":          { bg: "#EEF2FF", text: "#4338CA" },
  "Employee Life":        { bg: "#F0FDF4", text: "#15803D" },
  "Sponsorship & Awards": { bg: "#FFFBEB", text: "#B45309" },
};

function CategoryBadge({ cat }: { cat: Category }) {
  const c = CAT_COLOR[cat];
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: c.bg, color: c.text }}
    >
      <Tag size={9} />
      {cat}
    </span>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ── Masonry card ──────────────────────────────────────────────────────────────
function WaterfallCard({ item }: { item: NewsItem }) {
  const h = item.imgH ?? 200;
  const isFeatured = !!item.featured;

  return (
    <div
      className="break-inside-avoid mb-5 rounded-xl overflow-hidden border bg-white group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      style={{ borderColor: isFeatured ? G : BD }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: h }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(26,26,46,0.55) 0%, transparent 55%)" }}
        />
        {/* Badges overlaid on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div className="flex flex-col items-start gap-1.5">
            {isFeatured && (
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded text-white"
                style={{ background: G }}
              >
                Featured
              </span>
            )}
            <CategoryBadge cat={item.category} />
          </div>
          {item.location && (
            <span
              className="flex items-center gap-1 text-[10px] text-white font-medium px-2 py-0.5 rounded shrink-0"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            >
              <MapPin size={9} />
              {item.location}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3
          className="text-sm font-bold mb-2 leading-snug"
          style={{ fontFamily: "'Outfit', sans-serif", color: DK }}
        >
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: M }}>
          {item.excerpt}
        </p>
        <div
          className="flex items-center justify-between mt-4 pt-3 border-t"
          style={{ borderColor: BD }}
        >
          <span className="flex items-center gap-1 text-[10px]" style={{ color: M }}>
            <Calendar size={9} />
            {formatDate(item.date)}
          </span>
          <button
            className="flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all"
            style={{ color: G }}
          >
            Read more <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function News() {
  const [visibleCount, setVisibleCount] = useState(9);

  const visible = NEWS.slice(0, visibleCount);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: W, color: DK, minHeight: "100vh" }}>
      <NavBar activePage="about" />

      {/* ── Hero ── */}
      <section style={{ background: DK }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 mb-5">
            <Link to="/" className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Home</Link>
            <ChevronRight size={12} color="rgba(255,255,255,0.2)" />
            <Link to="/company" className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>About</Link>
            <ChevronRight size={12} color="rgba(255,255,255,0.2)" />
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>News</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1
                className="text-5xl font-bold text-white mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Company <span style={{ color: G }}>News</span>
              </h1>
              <p className="text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
                Stay up to date with PCBasic — trade show appearances, employee milestones, sponsorships, and everything in between.
              </p>
            </div>
            {/* Quick stats */}
            <div className="flex gap-4 shrink-0">
              {[
                { v: "12+", l: "Global Exhibitions" },
                { v: "500+", l: "Employees" },
                { v: "2026", l: "Latest Update" },
              ].map(s => (
                <div
                  key={s.l}
                  className="text-center px-4 py-2.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: G }}>{s.v}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Masonry / Waterfall ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/*
          CSS columns masonry: items flow top-to-bottom within each column,
          break-inside-avoid on each card keeps them intact.
        */}
        <div
          style={{
            columns: "3 280px",
            columnGap: "1.5rem",
          }}
        >
          {visible.map(item => (
            <WaterfallCard key={item.id} item={item} />
          ))}
        </div>

        {/* Load more */}
        {visibleCount < NEWS.length && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setVisibleCount(v => v + 6)}
              className="px-8 py-2.5 rounded-sm text-sm font-semibold border transition-colors hover:border-primary hover:text-primary"
              style={{ borderColor: BD, color: M }}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div
        className="py-5 border-t mt-8"
        style={{ background: "#0D0D1A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 PCBasic</p>
          <Link to="/company" className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>← Back to About</Link>
        </div>
      </div>
    </div>
  );
}
