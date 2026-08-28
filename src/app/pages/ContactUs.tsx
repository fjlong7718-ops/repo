import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { Mail, Phone, MessageSquare, Clock, MapPin, Paperclip, X } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const CHANNELS = [
  {
    icon: <MessageSquare size={18} />,
    title: "Live Chat",
    action: "Start Chat",
    href: "#",
    note: "Avg. wait < 2 min",
  },
  {
    icon: <Mail size={18} />,
    title: "Email",
    action: "JS@pcbasic.com",
    href: "mailto:JS@pcbasic.com",
    note: "Response within 4 hours",
  },
  {
    icon: <Phone size={18} />,
    title: "Phone",
    action: "+86-755-27218592",
    href: "tel:+8675527218592",
    note: "Mon–Fri 9:00–18:00 GMT+8",
  },
];

const OFFICES = [
  { city: "Shenzhen Office",      address: "Building 1#, Unicity Intelligent Valley, Hang Cheng Street, Baoan, Shenzhen, China" },
  { city: "Shenzhen Factory",     address: "Building E, Jianshi Industrial Park, No. 52 Huangpu Road, Xinqiao Street, Baoan District, Shenzhen, China" },
  { city: "Huizhou Factory",      address: "Building 25-26, No. 84 Songbuling Avenue, Sanhe Village, High-Tech Zone, Zhongkai High-Tech Zone, Huizhou City, China" },
  { city: "Shanghai R&D Center",  address: "Room 806, Building 2, Lane 1015 Longteng Road, Songjiang District, Shanghai, China" },
  { city: "Mexico Office",        address: "No. 500 Paseo Del Cafe, Apt. 90, Zakia Community, El Marques, Queretaro 76269, Mexico" },
];

// ── Form ──────────────────────────────────────────────────────────────────────

function ContactForm() {
  const [sent, setSent]         = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef                 = useRef<HTMLInputElement>(null);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center text-xl">✅</div>
        <p className="text-sm font-semibold text-foreground">Message submitted!</p>
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
          We will text you back if necessary.
        </p>
        <button onClick={() => { setSent(false); setFileName(null); }}
          className="text-xs text-primary hover:underline mt-1">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-3">
      <input required type="text" placeholder="Your Name"
        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />

      <input required type="email" placeholder="Your Email Address"
        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />

      <textarea required rows={6} placeholder="Please enter the details of your request."
        className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none" />

      {/* Upload */}
      <div>
        <input ref={fileRef} type="file" className="hidden"
          onChange={e => setFileName(e.target.files?.[0]?.name ?? null)} />
        {fileName ? (
          <div className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-sm bg-muted/40">
            <Paperclip size={13} className="text-muted-foreground shrink-0" />
            <span className="flex-1 text-xs text-foreground truncate">{fileName}</span>
            <button type="button"
              onClick={() => { setFileName(null); if (fileRef.current) fileRef.current.value = ""; }}
              className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={13} />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 w-full border border-dashed border-border rounded-sm text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
            <Paperclip size={13} /> Upload File
          </button>
        )}
        <p className="text-[11px] text-muted-foreground mt-1.5 pl-1">Gerber, PDF, images — max 20 MB</p>
      </div>

      <button type="submit"
        className="w-full py-3 text-sm font-semibold text-white rounded-sm transition-colors"
        style={{ background: "#1A5C2A" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
        onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}>
        Submit message
      </button>

      <p className="text-[11px] text-muted-foreground text-center">
        By submitting you agree to our{" "}
        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar activePage="support" />

      {/* Hero */}
      <div className="bg-[#0C1F10] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            Contact Us
          </h1>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Questions about an order, a quote, or a technical issue? We're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* ── Channel strip ── */}
        <div className="grid grid-cols-3 gap-4">
          {CHANNELS.map(ch => (
            <a key={ch.title} href={ch.href}
              className="flex items-center gap-4 px-5 py-4 bg-white border border-border rounded-sm hover:border-primary hover:shadow-sm transition-all group">
              <span className="text-primary shrink-0">{ch.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{ch.title}</p>
                <p className="text-xs text-muted-foreground truncate">{ch.action}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5">{ch.note}</p>
              </div>
            </a>
          ))}
        </div>

        {/* ── Form + sidebar ── */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* Form card */}
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            <div className="px-7 pt-6 pb-4 border-b border-border bg-muted/30">
              <h2 className="text-base font-bold text-foreground">Leave a message for PCBasic</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                After your message is successfully submitted, we will text you back if necessary.
              </p>
            </div>
            <div className="px-7 py-6">
              <ContactForm />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            {/* Business hours */}
            <div className="bg-white border border-border rounded-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-primary" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Business Hours</h3>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Mon. – Fri.", hours: "9:00 – 18:00 (GMT+8)" },
                  { day: "Sat.",        hours: "9:00 – 12:00 (GMT+8)" },
                ].map(r => (
                  <div key={r.day} className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">{r.day}</span>
                    <span className="text-xs font-medium text-foreground">{r.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/70 mt-3 pt-3 border-t border-border">
                Excluding Chinese Public Holidays
              </p>
            </div>

            {/* All offices in one card */}
            <div className="bg-white border border-border rounded-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-primary" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Our Offices</h3>
              </div>
              <div className="space-y-4">
                {OFFICES.map((o, i) => (
                  <div key={o.city} className={i > 0 ? "pt-4 border-t border-border" : ""}>
                    <p className="text-xs font-semibold text-foreground mb-0.5">{o.city}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{o.address}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
