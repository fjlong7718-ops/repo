import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronDown, Globe, Bell, ShoppingCart, User, X, Menu,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS_COLS = [
  {
    title: "PCB Services",
    items: ["Prototype", "Standard", "HDI", "Flex / Rigid", "Aluminum", "Copper"],
  },
  {
    title: "PCBA Services",
    items: ["Turnkey", "Consigned", "SMT", "BGA", "Mixed", "Quick-turn"],
  },
  {
    title: "CNC / 3D Print",
    items: ["CNC Machining", "3D Printing", "Sheet Metal", "Injection"],
  },
];

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "PT", label: "Português" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
];

const SUPPORT_COLS = [
  {
    title: "Learn & Guides",
    items: ["FAQ", "Getting Started", "Tech Guides", "24-Step Process", "File Req'ments", "Gerber Export", "Video Tutorials"],
    viewAll: "→ Help Center",
  },
  {
    title: "Tools & Calc",
    items: ["Instant Quote →", "Price Calc", "Impedance Calc", "Trace Width Calc", "BOM Cost Est.", "Unit Converter", "File Validator", "Shipping Est."],
    viewAll: "→ All Tools",
  },
  {
    title: "Help & Contact",
    items: ["Live Chat", "Submit Ticket", "Email", "WhatsApp", "Phone", "Payment Guide", "Shipping Info", "Returns & RMA"],
    viewAll: "→ Contact Page",
  },
];

const ABOUT_COLS = [
  {
    title: "Company",
    items: ["Company Story", "Sustainability", "Explore Factory", "News"],
  },
  {
    title: "Trust & Quality",
    items: ["Certifications", "IPC Class 3 Capability", "Testing & Inspection", "Quality Control", "Packaging Details", "Customer Feedback", "Video Collection"],
  },
];

const ACCOUNT_ITEMS = [
  { icon: "📋", label: "My Orders",        badge: 2,    reward: null,   href: "/account/orders" },
  { icon: "🛒", label: "Cart",             badge: 4,    reward: null,   href: "/account/cart" },
  { icon: "📍", label: "Addresses",        badge: null, reward: null,   href: "/account/addresses" },
  { icon: "🎫", label: "Coupons",          badge: 5,    reward: null,   href: "/account/coupons" },
  { icon: "🔔", label: "Notifications",    badge: null, reward: null,   href: "/account/notifications" },
  { icon: "⚙️",  label: "My Profile",      badge: null, reward: "+$10", href: "/account/profile" },
];

const PRODUCT_LINKS: Record<string, string> = {
  Prototype: "/products/prototype",
  Standard: "/products/standard",
  Turnkey: "/products/services/turnkey",
  Consigned: "/products/services/consigned",
  "CNC Machining": "/products/services/cnc-machining",
};

const ABOUT_LINKS: Record<string, string> = {
  "Certifications": "/about/certifications",
  "IPC Class 3 Capability": "/about/ipc-class-3",
  "Testing & Inspection": "/about/testing",
  "Quality Control": "/about/quality-control",
  "Packaging Details": "/about/packaging",
  "Customer Feedback": "/about/feedback",
  "Video Collection": "/about/videos",
};

// ── Mega dropdown helper ──────────────────────────────────────────────────────

function MegaCol({ col, links = {} }: { col: { title: string; items: string[]; viewAll?: string }; links?: Record<string, string> }) {
  return (
    <div className="flex flex-col p-5">
      <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">{col.title}</p>
      <ul className="space-y-1.5 flex-1">
        {col.items.map((item) => (
          <li key={item}>
            <Link to={links[item] || PRODUCT_LINKS[item] || "/capabilities"} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5">
              <span className="text-muted-foreground/40">•</span> {item}
            </Link>
          </li>
        ))}
      </ul>
      {col.viewAll && (
        <a href="#" className="flex items-center gap-1 text-xs font-medium text-primary mt-4 pt-3 border-t border-border hover:underline">
          {col.viewAll}
        </a>
      )}
    </div>
  );
}

// ── NavBar ────────────────────────────────────────────────────────────────────

interface NavBarProps {
  /** Highlight the matching nav item. Matches "capabilities" | "support" | "about" etc. */
  activePage?: string;
}

export default function NavBar({ activePage }: NavBarProps) {
  const [megaOpen,       setMegaOpen]       = useState(false);
  const [solutionsOpen,  setSolutionsOpen]  = useState(false);
  const [supportOpen,    setSupportOpen]    = useState(false);
  const [aboutOpen,      setAboutOpen]      = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [userMenuOpen,   setUserMenuOpen]   = useState(false);
  const [languageOpen,   setLanguageOpen]   = useState(false);
  const [language,       setLanguage]       = useState("EN");

  const linkCls = (page?: string) =>
    `px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
      activePage === page
        ? "text-primary font-semibold border-b-2 border-primary"
        : "text-foreground/70 hover:text-foreground hover:bg-muted"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex flex-col shrink-0 leading-none">
          <span
            className="font-black tracking-tight leading-none"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", color: "#1A5C2A", letterSpacing: "-0.02em" }}
          >
            PCBasic
          </span>
          <span
            className="text-[9px] font-medium tracking-wide"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#4A6B4D", letterSpacing: "0.04em" }}
          >
            Precision Manufacturing. Under Your Control
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5">

          {/* [Quote] CTA */}
          <Link to="/quote"
            className="mr-2 px-5 py-2 text-sm font-semibold text-white rounded-sm transition-all"
            style={{ background: "#1A5C2A", boxShadow: "0 2px 8px rgba(26,92,42,0.25)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}>
            Quote
          </Link>

          {/* Products ▼ */}
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className={`flex items-center gap-1 ${linkCls("products")}`}>
              Products <ChevronDown size={13} className={`transition-transform duration-150 ${megaOpen ? "rotate-180" : ""}`} />
            </button>
            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[560px] bg-white border border-border shadow-xl rounded-sm z-50">
                <div className="grid grid-cols-3 divide-x divide-border">
                  {PRODUCTS_COLS.map(col => <MegaCol key={col.title} col={col} />)}
                </div>
              </div>
            )}
          </div>

          {/* Solutions ▼ */}
          <div className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
            <button className={`flex items-center gap-1 ${linkCls("solutions")}`}>
              Solutions <ChevronDown size={13} className={`transition-transform duration-150 ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            {solutionsOpen && (
              <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-border shadow-xl rounded-sm z-50 py-1">
                {[
                  { label: "Industrial Controls", icon: "⚙️", slug: "industrial" },
                  { label: "Robotics",            icon: "🤖", slug: "robotics"   },
                  { label: "Medical",             icon: "🏥", slug: "medical"    },
                  { label: "Automotive",          icon: "🚗", slug: "automotive" },
                ].map(item => (
                  <Link key={item.label} to={`/solutions/${item.slug}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setSolutionsOpen(false)}>
                    <span className="text-base leading-none">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Capabilities */}
          <Link to="/capabilities" className={linkCls("capabilities")}>
            Capabilities
          </Link>

          {/* Support ▼ */}
          <div className="relative" onMouseEnter={() => setSupportOpen(true)} onMouseLeave={() => setSupportOpen(false)}>
            <button className={`flex items-center gap-1 ${linkCls("support")}`}>
              Support <ChevronDown size={13} className={`transition-transform duration-150 ${supportOpen ? "rotate-180" : ""}`} />
            </button>
            {supportOpen && (
              <div className="absolute top-full left-0 mt-0 w-40 bg-white border border-border shadow-xl rounded-sm z-50 py-1">
                {[
                  { label: "Help Center", to: "/help" },
                  { label: "Blog",        to: "/blog" },
                  { label: "Contact Us",  to: "/contact" },
                ].map(item => (
                  <Link key={item.label} to={item.to}
                    className="flex items-center px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About ▼ */}
          <div className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
            <button
              type="button"
              aria-expanded={aboutOpen}
              aria-haspopup="menu"
              onClick={() => setAboutOpen((open) => !open)}
              className={`flex items-center gap-1 ${linkCls("about")}`}
            >
              About <ChevronDown size={13} className={`transition-transform duration-150 ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div className="absolute top-full right-0 mt-0 w-[420px] bg-white border border-border shadow-xl rounded-sm z-50">
                <div className="grid grid-cols-2 divide-x divide-border">
                  {/* Company column — Company Story links to /company */}
                  <div className="flex flex-col p-5">
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Company</p>
                    <ul className="space-y-1.5 flex-1">
                      <li>
                        <Link to="/company"
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5"
                          onClick={() => setAboutOpen(false)}>
                          <span className="text-muted-foreground/40">•</span> Company Story
                        </Link>
                      </li>
                      <li>
                        <Link to="/about/sustainability" onClick={() => setAboutOpen(false)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5">
                          <span className="text-muted-foreground/40">•</span> Sustainability
                        </Link>
                      </li>
                      <li>
                        <a href="/about/explore-factory" onClick={() => setAboutOpen(false)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5">
                          <span className="text-muted-foreground/40">•</span> Explore Factory
                        </a>
                      </li>
                      <li>
                        <Link to="/news"
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-0.5"
                          onClick={() => setAboutOpen(false)}>
                          <span className="text-muted-foreground/40">•</span> News
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Trust & Quality column */}
                  <MegaCol col={ABOUT_COLS[1]} links={ABOUT_LINKS} />
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* ── Right icons ── */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <button type="button" aria-haspopup="listbox" aria-expanded={languageOpen} onClick={() => { setLanguageOpen(open => !open); setUserMenuOpen(false); }} className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground">
              <Globe size={14} /> {language} <ChevronDown size={12}/>
            </button>
            {languageOpen && <><button type="button" aria-label="Close language menu" className="fixed inset-0 z-40 cursor-default" onClick={() => setLanguageOpen(false)}/><div role="listbox" aria-label="Choose language" className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-sm border border-border bg-white py-1 shadow-xl">{LANGUAGES.map(option => <button key={option.code} type="button" role="option" aria-selected={language === option.code} onClick={() => { setLanguage(option.code); setLanguageOpen(false); }} className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"><span>{option.label}</span><span className="text-xs text-gray-400">{option.code}</span></button>)}</div></>}
          </div>
          <Link to="/account/notifications" aria-label="Message Center, 2 unread messages" className="relative p-2 text-muted-foreground hover:text-foreground rounded-sm hover:bg-muted transition-colors">
            <Bell size={16} />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">2</span>
          </Link>

          {/* User avatar + dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(o => !o)}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors focus:outline-none ring-2 ring-offset-1 ring-primary/30"
            >
              M
            </button>

            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-border rounded-sm shadow-xl z-50 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-4 py-4 bg-muted/40 border-b border-border">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">M</div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">Hi, Mil 👋</p>
                      <p className="text-xs text-muted-foreground truncate">mil@pcbasic.com</p>
                    </div>
                  </div>
                  {/* Items */}
                  <div className="py-1">
                    {ACCOUNT_ITEMS.map(item => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/75 hover:text-foreground hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{item.icon}</span>
                          {item.label}
                        </span>
                        {item.reward && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-300">
                            {item.reward}
                          </span>
                        )}
                        {item.badge != null && (
                          <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  {/* Sign out */}
                  <div className="border-t border-border py-1">
                    <a href="#" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      onClick={() => setUserMenuOpen(false)}>
                      <span className="text-base leading-none">🚪</span> Sign Out
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <a href="/account/cart" className="relative flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors">
            <ShoppingCart size={14} /> Cart
            <span className="bg-accent text-accent-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">4</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white px-6 py-4 space-y-3">
          {[
            ["Quote", "/quote"], ["PCB Prototype", "/products/prototype"], ["Standard PCB", "/products/standard"],
            ["Capabilities", "/capabilities"], ["Support", "/help"], ["About", "/company"], ["My Orders", "/account/orders"],
          ].map(([item, to]) => (
            <Link key={item} to={to} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground/80 py-1.5 border-b border-border/50 last:border-0">{item}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
