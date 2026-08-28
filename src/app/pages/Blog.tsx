import { useState } from "react";
import { ArrowRight, Tag, Search } from "lucide-react";
import NavBar from "../components/NavBar";

// ── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "PCB Design", "Manufacturing", "Assembly", "Materials", "Quality", "Industry"];

const POPULAR_IDS = [
  "dfm-checklist",
  "gerber-export-guide",
  "surface-finish-guide",
];

const POSTS = [
  {
    id: "gerber-export-guide",
    category: "PCB Design",
    title: "The Definitive Gerber Export Guide for KiCad, Altium & Eagle",
    excerpt: "Wrong Gerber exports are the #1 cause of order delays. This guide walks through the exact settings for the three most popular EDA tools so your files are right the first time.",
    date: "Jul 15, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: "impedance-control",
    category: "PCB Design",
    title: "Controlled Impedance PCBs: Stack-Up Design and Tolerance Explained",
    excerpt: "High-speed signals demand controlled impedance. Learn how to define your stack-up, specify target impedance, and what ±10% vs ±5% tolerance means for your design.",
    date: "Jul 02, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "hdi-basics",
    category: "Manufacturing",
    title: "HDI PCBs Explained: Blind Vias, Buried Vias, and Microvias",
    excerpt: "High Density Interconnect technology allows you to pack more function into less space. We cover the three via types, when to use each, and how HDI affects your BOM and cost.",
    date: "Jun 20, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
  {
    id: "smt-vs-tht",
    category: "Assembly",
    title: "SMT vs. Through-Hole vs. Mixed Assembly: Choosing the Right Process",
    excerpt: "SMT dominates modern PCB assembly, but through-hole still plays a vital role. This post helps you decide which process — or combination — suits your design and production volume.",
    date: "Jun 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "rogers-materials",
    category: "Materials",
    title: "Rogers vs FR4: When to Upgrade Your PCB Substrate",
    excerpt: "FR4 handles most designs fine — but RF, microwave, and high-frequency applications need something better. We compare Rogers 4003C, 4350B, and 5880 against standard FR4.",
    date: "May 28, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: "surface-finish-guide",
    category: "Materials",
    title: "PCB Surface Finish Comparison: HASL, ENIG, ENEPIG, and OSP",
    excerpt: "Surface finish affects solderability, shelf life, and cost. We compare the most common options so you can make the right call for your application — from prototype to production.",
    date: "May 14, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
  {
    id: "dfm-checklist",
    category: "PCB Design",
    title: "DFM Checklist: 15 Things to Verify Before Submitting Your Gerbers",
    excerpt: "Design for Manufacturability (DFM) issues are costly and avoidable. Run through our 15-point checklist before every submission and eliminate the most common rejection reasons.",
    date: "May 01, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "bga-assembly",
    category: "Assembly",
    title: "BGA Soldering and Inspection: What Makes It Challenging and How We Handle It",
    excerpt: "Ball Grid Array packages offer high density but hidden solder joints that require X-ray inspection. We explain our BGA assembly process, common defects, and inspection methods.",
    date: "Apr 18, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: "flex-rigid-pcb",
    category: "Manufacturing",
    title: "Flex and Rigid-Flex PCBs: Design Rules, Materials, and Use Cases",
    excerpt: "Flexible and rigid-flex PCBs enable packaging geometries impossible with standard rigid boards. Learn the design rules, layer stack-up, and applications where they add real value.",
    date: "Apr 05, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
  {
    id: "aoi-xray",
    category: "Quality",
    title: "AOI vs X-Ray Inspection: How We Catch Defects Before They Ship",
    excerpt: "Automated Optical Inspection and X-ray are complementary — AOI sees surface defects, X-ray sees hidden joints. We walk through both processes and when each is applied.",
    date: "Mar 22, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "ems-trends-2025",
    category: "Industry",
    title: "Electronics Manufacturing Trends to Watch in 2025",
    excerpt: "From AI-assisted DFM to nearshoring and advanced packaging, the EMS industry is evolving fast. We share the trends shaping PCB manufacturing in 2025 and what they mean for designers.",
    date: "Mar 08, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: "aluminum-pcb",
    category: "Materials",
    title: "Aluminum-Backed PCBs for LED and Power Applications",
    excerpt: "Thermal management is critical for high-power LEDs and power converters. Aluminum-backed PCBs (IMS) offer dramatically better heat dissipation than standard FR4. Here's when and how to use them.",
    date: "Feb 25, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "PCB Design":   { bg: "#EFF6FF", text: "#1D4ED8" },
  "Manufacturing":{ bg: "#F0FDF4", text: "#166534" },
  "Assembly":     { bg: "#FFF7ED", text: "#C2410C" },
  "Materials":    { bg: "#FAF5FF", text: "#7E22CE" },
  "Quality":      { bg: "#ECFDF5", text: "#065F46" },
  "Industry":     { bg: "#FFF1F2", text: "#BE123C" },
};

function CategoryPill({ label }: { label: string }) {
  const c = CATEGORY_COLORS[label] ?? { bg: "#F3F4F6", text: "#374151" };
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase"
      style={{ background: c.bg, color: c.text }}
    >
      <Tag size={9} />
      {label}
    </span>
  );
}

function PostCard({ post }: { post: typeof POSTS[0] }) {
  return (
    <article className="group flex flex-col bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-44 overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <CategoryPill label={post.category} />
        </div>
        <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-[11px] text-muted-foreground">{post.date}</span>
          <a href="#" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
            Read <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Blog() {
  const [active, setActive] = useState("All");
  const [search, setSearch]  = useState("");

  const query = search.trim().toLowerCase();
  const posts = POSTS.filter(p =>
    (active === "All" || p.category === active) &&
    (!query || p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar activePage="support" />

      {/* Hero */}
      <div className="bg-[#0C1F10] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            Blog
          </h1>
          <p className="text-white/50 text-sm mb-7">
            PCB design tips, manufacturing guides, material comparisons, and industry insights.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-sm bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#4CAF6E] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="border-b border-border bg-white sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="shrink-0 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
                style={{
                  borderColor: active === cat ? "var(--primary)" : "transparent",
                  color: active === cat ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      {active === "All" && !query && (
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-2">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-base">🔥</span>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">Popular Articles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_IDS.map((id, idx) => {
              const post = POSTS.find(p => p.id === id);
              if (!post) return null;
              return (
                <article key={id}
                  className="group flex flex-col bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image with rank badge */}
                  <div className="relative h-44 overflow-hidden bg-muted shrink-0">
                    <img src={post.image} alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span
                      className="absolute top-2 left-2 w-7 h-7 rounded flex items-center justify-center text-xs font-black leading-none"
                      style={{
                        background: idx < 2 ? "#1A5C2A" : "rgba(0,0,0,0.45)",
                        color: "#fff",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <div className="mb-2">
                      <CategoryPill label={post.category} />
                    </div>
                    <h3 className="text-xs font-bold text-foreground leading-snug line-clamp-3 group-hover:text-primary transition-colors flex-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
                      <span className="text-[10px] text-muted-foreground">{post.date}</span>
                      <a href="#" className="flex items-center gap-1 text-[10px] font-medium text-primary hover:underline">
                        Read <ArrowRight size={10} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Divider */}
      {active === "All" && !query && (
        <div className="max-w-6xl mx-auto px-6 pt-10">
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest shrink-0">All Articles</span>
            <div className="flex-1 border-t border-border" />
          </div>
        </div>
      )}

      {/* Posts grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No posts in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-sm border border-border bg-muted/40 px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-semibold text-foreground mb-1">Stay up to date</p>
            <p className="text-sm text-muted-foreground">Get new articles and PCB manufacturing tips delivered to your inbox.</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-56 px-3 py-2 text-sm border border-border rounded-sm bg-white focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white rounded-sm transition-colors shrink-0"
              style={{ background: "#1A5C2A" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
