import { useState } from "react";
import { ChevronRight, ChevronDown, Search, ArrowLeft } from "lucide-react";
import NavBar from "../components/NavBar";

// ── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "ordering",
    icon: "🛒",
    title: "Order Process",
    summary: "Quotes, ordering steps, modifications & cancellations.",
    groups: [
      {
        label: "Placing an Order",
        items: [
          { id: "how-to-order", q: "How do I place an order?", a: "Register a free account, go to the Quote page, upload your Gerber files, configure your board specs (layers, material, surface finish, quantity), and proceed to checkout. Instant pricing is generated automatically — no waiting for a sales rep." },
          { id: "min-qty",      q: "What is the minimum order quantity?", a: "PCB prototype orders start from 5 pcs. Standard production orders start from 100 pcs. PCBA orders start from 1 unit for turnkey assembly. Contact our sales team for custom low-quantity pricing." },
          { id: "single-board", q: "Can I order a single board?", a: "Yes. For prototyping we support single-board and low-quantity orders. Select 'Prototype' on the quote page and adjust the quantity. For quantities below 5, please contact support for a manual quote." },
          { id: "reorder",      q: "How do I reorder a previous design?", a: "In My Orders, find the completed order and click 'Reorder'. Your specifications and Gerber files are pre-filled. Update quantity or options as needed, then proceed to checkout." },
        ],
      },
      {
        label: "Modifying & Cancelling",
        items: [
          { id: "modify-order",  q: "Can I modify my order after placing it?", a: "Modifications are possible before engineering review begins. Log in, go to My Orders, and use the 'Request Modification' option. Once production has started, modifications may not be possible or may incur additional charges." },
          { id: "cancel-order",  q: "How do I cancel an order?", a: "Orders can be cancelled before production begins at no charge. After production starts, cancellation fees apply based on materials and labor incurred. Go to My Orders and click 'Cancel Order', or contact support." },
          { id: "order-status",  q: "How do I track my order status?", a: "Log in and go to My Orders. Each order shows its current stage: Payment Confirmed → Engineering Review → In Production → Quality Inspection → Shipped. Email notifications are sent at each milestone." },
        ],
      },
    ],
  },
  {
    id: "pcb-capabilities",
    icon: "🔲",
    title: "PCB Capabilities",
    summary: "Layers, materials, tolerances, finishes & via types.",
    groups: [
      {
        label: "Layers & Materials",
        items: [
          { id: "layer-count", q: "What layer counts do you support?", a: "1–32 layers for standard FR4. HDI up to 20 layers with blind/buried vias. Flex and rigid-flex up to 12 layers. Consult our engineering team for specialty stack-ups." },
          { id: "materials",   q: "What base materials are available?", a: "FR4 (TG 130/150/170), High-TG FR4, Rogers (4003C, 4350B, 5880), Aluminum IMS, Polyimide (flex), PTFE, and Copper-core for thermal management. Material availability depends on board type." },
          { id: "thickness",   q: "What board thicknesses are available?", a: "Standard: 0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0, 2.4, 3.0 mm. Custom thickness is available on request. 1.6 mm is the most common and has the shortest lead time." },
        ],
      },
      {
        label: "Trace, Finish & Vias",
        items: [
          { id: "trace-width",  q: "What is your minimum trace width and spacing?", a: "Standard: 4/4 mil. Advanced: 3/3 mil. HDI: 2/2 mil. Traces below 3 mil require engineering review and may add 1–2 days to lead time." },
          { id: "surface-finish", q: "What surface finishes do you offer?", a: "HASL (lead & lead-free), ENIG, ENEPIG, Hard Gold, Immersion Silver, Immersion Tin, and OSP. ENIG is recommended for fine-pitch SMT. Hard Gold is standard for edge connectors and pogo-pin contacts." },
          { id: "solder-mask-color", q: "What solder mask colors are available?", a: "Green, Black, White, Red, Blue, Yellow, Purple, and Matte Black/Green. Green ships fastest; other colors add 1–2 business days." },
          { id: "vias",        q: "What via types do you support?", a: "Through-hole vias (standard), blind vias (HDI), buried vias (HDI), and laser microvias. Via-in-pad is supported with resin fill and copper cap. Specify via type in your Gerber stack-up document." },
        ],
      },
    ],
  },
  {
    id: "pcba",
    icon: "🛠️",
    title: "PCB Assembly",
    summary: "Turnkey, consigned, SMT, BGA & component sourcing.",
    groups: [
      {
        label: "Assembly Types",
        items: [
          { id: "assembly-types",  q: "What assembly services do you offer?", a: "Turnkey PCBA (we source components), consigned PCBA (you supply components), and combo (partial consignment). Services include SMT, through-hole, mixed assembly, BGA, QFN, and chip-on-board." },
          { id: "turnkey-vs-consign", q: "Turnkey vs. consigned — which should I choose?", a: "Turnkey is more convenient but requires lead time for component sourcing. Consigned is faster if you already have parts, but requires you to ship components to us in advance. For most prototypes, turnkey is recommended." },
          { id: "bom-format",    q: "What BOM format should I provide?", a: "Excel or CSV with columns: Reference Designator, Quantity, MPN (Manufacturer Part Number), Manufacturer, Description, and Footprint/Package. We cross-reference against global distributors and will flag unavailable parts." },
        ],
      },
      {
        label: "Inspection & Components",
        items: [
          { id: "aoi-xray",    q: "Do you perform AOI and X-ray inspection?", a: "AOI (Automated Optical Inspection) is included as standard on all PCBA orders. X-ray inspection for BGA and hidden joints is an available add-on — select it during checkout." },
          { id: "hard-to-find", q: "Can you source hard-to-find or obsolete components?", a: "We work with a global network of authorized distributors (Digi-Key, Mouser, Arrow, AVNET). For obsolete or allocation-constrained parts, contact us before placing your order for availability advice." },
          { id: "ipc-610",     q: "What IPC standard applies to PCBA?", a: "All PCBA is inspected to IPC-A-610 Class 2 as standard. Class 3 inspection is available on request for aerospace, medical, and defense applications and carries additional documentation and lead time." },
        ],
      },
    ],
  },
  {
    id: "files",
    icon: "📁",
    title: "Files & Design",
    summary: "Upload requirements, Gerber export, DFM checks.",
    groups: [
      {
        label: "File Requirements",
        items: [
          { id: "file-formats", q: "What file formats do you accept?", a: "Gerber RS-274X (preferred), Excellon drill files, ODB++, and IPC-2581. For PCBA, also provide a BOM (Excel/CSV) and pick-and-place (centroid) file. Submit all files in a single ZIP archive." },
          { id: "gerber-export", q: "How do I export Gerber files from my EDA tool?", a: "KiCad: File → Plot → Gerber, include all copper, silkscreen, solder mask layers, and a separate drill file. Altium: Fabrication Outputs → Gerber Files + NC Drill. Eagle: CAM Processor. Contact support for tool-specific step-by-step guides." },
          { id: "missing-layers", q: "What layers must be included?", a: "Required: all copper layers, top/bottom solder mask, top/bottom silkscreen, board outline (mechanical/edge cuts), and drill file. Optional but recommended: fab notes, impedance spec sheet, assembly drawing for PCBA." },
        ],
      },
      {
        label: "DFM & Confidentiality",
        items: [
          { id: "dfm-check",  q: "What DFM checks do you perform?", a: "Our engineers check minimum trace/space violations, drill-to-copper clearance, missing solder mask openings, pad-to-edge clearance, and panel constraints. A DFM report is sent before production begins." },
          { id: "file-rejected", q: "My file was rejected — what do I do?", a: "Check the rejection reason in your order dashboard. Common causes: missing drill file, board outline on wrong layer, clearance violations. Re-upload corrected files or chat with our engineering team for free DFM support." },
          { id: "confidentiality", q: "Are my design files kept confidential?", a: "Yes. Files are stored on encrypted servers and never shared with third parties. All staff are bound by NDAs. We can sign a custom NDA on request — contact our sales team before uploading sensitive designs." },
        ],
      },
    ],
  },
  {
    id: "shipping",
    icon: "🚚",
    title: "Shipping & Delivery",
    summary: "Lead times, carriers, customs duties & tracking.",
    groups: [
      {
        label: "Lead Times & Carriers",
        items: [
          { id: "lead-times",  q: "How long does production take?", a: "Prototype PCBs: 24-hour, 48-hour, and 3–5 day options. Standard PCBs: 5–10 business days. PCBA: 7–15 business days based on component availability. Lead time starts after file approval and payment clearance." },
          { id: "shipping-options", q: "What shipping carriers do you use?", a: "DHL Express (2–5 days), FedEx International Priority (3–5 days), UPS Worldwide Express (3–5 days), and economy air freight (7–15 days). Carrier and cost are shown at checkout based on weight and destination." },
          { id: "ship-countries", q: "Which countries do you ship to?", a: "We ship to over 200 countries. A few restricted destinations are unavailable due to export regulations. Enter your shipping address at checkout to confirm availability and estimated cost." },
        ],
      },
      {
        label: "Customs & Tracking",
        items: [
          { id: "customs",   q: "Who pays customs duties and import taxes?", a: "Import duties, VAT, and customs fees are the buyer's responsibility and vary by country and declared value. We declare the true commercial value on all shipments and do not undervalue goods on customs forms." },
          { id: "tracking",  q: "How do I track my shipment?", a: "Once your order ships, a tracking number is emailed to you and appears in your order dashboard under 'Shipped'. Click the number to track in real time on the carrier's website." },
          { id: "damage",    q: "What if my shipment arrives damaged?", a: "Inspect all packages on arrival. Report visible damage to us and the carrier within 3 business days of delivery with photos. We will work with you and the carrier to arrange a replacement or claim." },
        ],
      },
    ],
  },
  {
    id: "payment",
    icon: "💳",
    title: "Payment & Invoice",
    summary: "Accepted methods, invoices, refunds & credit terms.",
    groups: [
      {
        label: "Payment Methods",
        items: [
          { id: "payment-methods", q: "What payment methods do you accept?", a: "Credit/debit cards (Visa, Mastercard, Amex), PayPal, wire transfer (T/T for orders over $500), and Alipay for Chinese customers. All card payments are processed via Stripe." },
          { id: "credit-terms",   q: "Do you offer credit terms?", a: "Net-30 credit terms are available for established business customers. Apply via our sales team. Orders over $10,000 may qualify for milestone-based payment schedules." },
          { id: "payment-security", q: "Is my payment information secure?", a: "PCBasic never stores credit card numbers. All card transactions go through our PCI-DSS compliant payment gateway (Stripe) and are never transmitted through our own servers." },
        ],
      },
      {
        label: "Invoices & Refunds",
        items: [
          { id: "invoice",  q: "How do I get an invoice?", a: "A tax invoice is auto-generated for every completed order and available in your account under Order History → Download Invoice. For a proforma invoice before payment, contact our sales team." },
          { id: "refund",   q: "Can I get a refund?", a: "Orders not yet in production are fully refundable. Once production starts, refunds are pro-rated. For defective products within our 90-day warranty, we offer free replacement or full refund after review." },
          { id: "currency", q: "What currency do you charge in?", a: "All prices are in USD by default. Some regional payment methods may charge in local currency at the current exchange rate. Contact us if you need invoicing in a specific currency." },
        ],
      },
    ],
  },
  {
    id: "quality",
    icon: "✅",
    title: "Quality & Certifications",
    summary: "IPC standards, testing, certifications & warranty.",
    groups: [
      {
        label: "Standards & Testing",
        items: [
          { id: "ipc-standard",    q: "What quality standards do you follow?", a: "PCBs are manufactured to IPC-A-600 Class 2 as standard; Class 3 is available on request. PCBA is inspected to IPC-A-610. We hold ISO 9001:2015, IATF 16949, and UL certifications." },
          { id: "electrical-test", q: "Do you perform electrical testing?", a: "Yes — 100% electrical test (flying probe or fixture) is standard on all PCB orders. E-test verifies every net for open circuits and shorts against your Gerber netlist." },
          { id: "class3",          q: "Do you support IPC Class 3?", a: "Yes. IPC Class 3 is available for aerospace, medical, and defense applications. Specify at order time. Class 3 requires additional inspection, documentation, and carries a longer lead time." },
        ],
      },
      {
        label: "Documentation & Warranty",
        items: [
          { id: "coc",        q: "Can I get a Certificate of Conformance?", a: "Yes, available at no charge on request. For regulated industries needing material certs, RoHS compliance, or REACH declarations, specify requirements at order time so we can include them." },
          { id: "warranty",   q: "What is your warranty?", a: "90 days from shipment for manufacturing defects. Warranty claims require written notice with photos and test data. Remedy is repair, replacement, or refund at our discretion. Excludes design errors and misuse." },
          { id: "defective",  q: "I received a defective board — what now?", a: "Contact support within 90 days of shipment with photos and a defect description. We will investigate and, if the fault is ours, provide a free replacement or full refund within our standard lead time." },
        ],
      },
    ],
  },
  {
    id: "account",
    icon: "👤",
    title: "Account & Profile",
    summary: "Registration, team access, coupons & notifications.",
    groups: [
      {
        label: "Registration & Security",
        items: [
          { id: "register",       q: "How do I create an account?", a: "Click 'Sign Up' on the top-right, enter your email and password, and verify your email. Your account is instantly active. Completing your profile earns a $10 reward credit." },
          { id: "password-reset", q: "How do I reset my password?", a: "On the login page, click 'Forgot Password', enter your email, and follow the reset link sent to your inbox. Links expire in 30 minutes. If the email doesn't arrive, check your spam folder." },
          { id: "team-access",    q: "Can multiple team members share an account?", a: "Yes. Go to Account Settings → Team Management to invite members and assign roles (Viewer, Ordering, Admin). Team accounts are available for all registered business customers at no extra cost." },
        ],
      },
      {
        label: "Coupons & Notifications",
        items: [
          { id: "coupons",       q: "How do I use a coupon or promo code?", a: "Enter your code in the 'Promo Code' field at checkout. Credits from referrals or rewards are applied automatically from your account balance. Codes cannot be combined unless stated in the promotion terms." },
          { id: "notifications", q: "How do order notifications work?", a: "Email notifications are sent at every key order stage: payment received, engineering review complete, in production, shipped, and delivered. You can manage notification preferences in Account Settings → Notifications." },
          { id: "profile-reward", q: "Why complete my profile for a $10 reward?", a: "A complete profile helps us personalise quotes, shipping defaults, and support. Fill in your company details, shipping address, and phone number to unlock a $10 account credit applied to your next order." },
        ],
      },
    ],
  },
  {
    id: "aftersales",
    icon: "🔁",
    title: "After-sales & RMA",
    summary: "Returns, replacements, complaints & feedback.",
    groups: [
      {
        label: "Returns & Replacements",
        items: [
          { id: "rma-process",  q: "How do I initiate a return or RMA?", a: "Submit a support ticket in My Orders → Contact Support or email support@pcbasic.com with your order number, a description of the issue, and supporting photos. Our team will review and issue an RMA number within 2 business days." },
          { id: "rma-shipping", q: "Who pays return shipping?", a: "If the defect is confirmed as a manufacturing error, PCBasic covers return shipping costs and provides a prepaid label. If the issue stems from a design error in your files, return shipping is at the customer's expense." },
          { id: "replacement-time", q: "How long does a replacement take?", a: "Replacement orders follow our standard production lead times. We prioritise RMA replacements to minimise your downtime. Express options are available on request." },
        ],
      },
      {
        label: "Complaints & Feedback",
        items: [
          { id: "complaint",  q: "How do I raise a formal complaint?", a: "Contact our Customer Relations team at quality@pcbasic.com with your order number and a detailed description. We acknowledge all complaints within 1 business day and aim to resolve within 5 business days." },
          { id: "feedback",   q: "How do I leave feedback or a review?", a: "After an order is delivered, you will receive an email with a feedback link. You can also leave a review from My Orders → Awaiting Feedback. Honest feedback helps us improve and unlock a small discount on your next order." },
          { id: "escalation", q: "What if I'm not satisfied with the resolution?", a: "If you are not satisfied with the initial response, ask to escalate to our Quality Manager. For unresolved disputes, our Terms of Service describe our arbitration process under SCIA rules." },
        ],
      },
    ],
  },
];

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = typeof CATEGORIES[0];
type FaqItem  = Category["groups"][0]["items"][0];

// ── Tree Nav ──────────────────────────────────────────────────────────────────

function TreeNav({
  category,
  activeId,
  onSelect,
}: {
  category: Category;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setCollapsed(p => ({ ...p, [label]: !p[label] }));

  return (
    <nav className="text-sm">
      {category.groups.map(group => {
        const open = !collapsed[group.label];
        const hasActive = group.items.some(i => i.id === activeId);
        return (
          <div key={group.label} className="mb-1">
            <button
              onClick={() => toggle(group.label)}
              className="w-full flex items-center gap-1.5 px-2 py-2 rounded text-left font-semibold transition-colors hover:bg-muted"
              style={{ color: hasActive ? "var(--primary)" : "var(--foreground)" }}
            >
              <ChevronDown
                size={13}
                className={`shrink-0 transition-transform duration-150 ${open ? "" : "-rotate-90"}`}
              />
              {group.label}
            </button>
            {open && (
              <ul className="ml-3 border-l border-border pl-3 space-y-0.5 mb-1">
                {group.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelect(item.id)}
                      className="w-full text-left px-2 py-1.5 rounded text-xs transition-colors leading-snug"
                      style={{
                        color: item.id === activeId ? "var(--primary)" : "var(--muted-foreground)",
                        background: item.id === activeId ? "color-mix(in srgb, var(--primary) 8%, transparent)" : "transparent",
                        fontWeight: item.id === activeId ? 600 : 400,
                      }}
                    >
                      {item.q}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ── Detail view ───────────────────────────────────────────────────────────────

function DetailView({
  category,
  onBack,
}: {
  category: Category;
  onBack: () => void;
}) {
  const firstId = category.groups[0]?.items[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstId);

  const allItems: FaqItem[] = category.groups.flatMap(g => g.items);
  const active = allItems.find(i => i.id === activeId) ?? allItems[0];
  const activeGroup = category.groups.find(g => g.items.some(i => i.id === activeId));

  return (
    <div className="flex gap-0 flex-1 min-h-0">

      {/* Left tree */}
      <aside className="w-64 shrink-0 border-r border-border bg-white overflow-y-auto py-5 px-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-5 px-2 transition-colors"
        >
          <ArrowLeft size={12} /> All Topics
        </button>

        {/* Category heading */}
        <div className="flex items-center gap-2 px-2 mb-4 pb-3 border-b border-border">
          <span className="text-xl leading-none">{category.icon}</span>
          <span className="text-sm font-bold text-foreground">{category.title}</span>
        </div>

        <TreeNav category={category} activeId={activeId} onSelect={setActiveId} />
      </aside>

      {/* Right content */}
      <main className="flex-1 overflow-y-auto p-10 bg-background">
        <p className="text-xs text-muted-foreground mb-1">
          {category.title} · {activeGroup?.label}
        </p>
        <h2 className="text-xl font-bold text-foreground mb-6 leading-snug">
          {active?.q}
        </h2>
        <div className="prose prose-sm max-w-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed">{active?.a}</p>
        </div>

        {/* Prev / Next */}
        <div className="flex justify-between mt-12 pt-6 border-t border-border max-w-2xl">
          {(() => {
            const idx = allItems.findIndex(i => i.id === activeId);
            const prev = allItems[idx - 1];
            const next = allItems[idx + 1];
            return (
              <>
                {prev ? (
                  <button onClick={() => setActiveId(prev.id)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={12} /> {prev.q}
                  </button>
                ) : <span />}
                {next && (
                  <button onClick={() => setActiveId(next.id)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {next.q} <ChevronRight size={12} />
                  </button>
                )}
              </>
            );
          })()}
        </div>

        {/* Still need help */}
        <div className="mt-10 max-w-2xl rounded-sm border border-border bg-muted/40 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-0.5">Still need help?</p>
            <p className="text-xs text-muted-foreground">Our team is available Mon–Fri 9am–6pm CST.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href="mailto:support@pcbasic.com"
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-sm text-foreground hover:bg-muted transition-colors">
              Email Us
            </a>
            <a href="#"
              className="px-3 py-1.5 text-xs font-semibold text-white rounded-sm transition-colors"
              style={{ background: "#1A5C2A" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}>
              Live Chat
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Grid card ─────────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  onClick,
}: {
  cat: Category;
  onClick: () => void;
}) {
  const total = cat.groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start p-6 bg-white border border-border rounded-sm hover:border-primary hover:shadow-md transition-all text-left"
    >
      <span className="text-3xl mb-4 leading-none">{cat.icon}</span>
      <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
        {cat.title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{cat.summary}</p>
      <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-border">
        <span className="text-[10px] text-muted-foreground">{total} articles</span>
        <ChevronRight size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HelpCenter() {
  const [selected, setSelected] = useState<Category | null>(null);
  const [search, setSearch]     = useState("");

  const query = search.trim().toLowerCase();
  const searchResults = query
    ? CATEGORIES.flatMap(cat =>
        cat.groups.flatMap(g =>
          g.items
            .filter(i => i.q.toLowerCase().includes(query) || i.a.toLowerCase().includes(query))
            .map(i => ({ cat, group: g.label, item: i }))
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar activePage="support" />

      {/* Hero — always visible */}
      <div className="bg-[#0C1F10] text-white py-12 px-6 shrink-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}>
            {selected ? selected.title : "Help Center"}
          </h1>
          {!selected && (
            <>
              <p className="text-white/50 text-sm mb-7">
                Browse topics or search across all articles.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search questions…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-sm bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#4CAF6E] transition-colors"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      {selected ? (
        /* ── Detail view ── */
        <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
          <DetailView category={selected} onBack={() => setSelected(null)} />
        </div>
      ) : query ? (
        /* ── Search results ── */
        <div className="max-w-3xl mx-auto px-6 py-10 w-full">
          {searchResults.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              No results for "<span className="text-foreground font-medium">{search}</span>".
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-5">{searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{search}"</p>
              {searchResults.map(({ cat, group, item }) => (
                <button
                  key={item.id}
                  onClick={() => { setSearch(""); setSelected(cat); }}
                  className="w-full text-left p-4 bg-white border border-border rounded-sm hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">{cat.icon} {cat.title} · {group}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">{item.q}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.a}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── 3×3 grid ── */
        <div className="max-w-5xl mx-auto px-6 py-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map(cat => (
              <CategoryCard key={cat.id} cat={cat} onClick={() => setSelected(cat)} />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 rounded-sm border border-border bg-muted/40 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground mb-1">Can't find what you're looking for?</p>
              <p className="text-sm text-muted-foreground">Our engineering support team is available Mon–Fri 9am–6pm CST.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href="mailto:support@pcbasic.com"
                className="px-4 py-2 text-sm font-medium border border-border rounded-sm text-foreground hover:bg-muted transition-colors">
                Email Us
              </a>
              <a href="#"
                className="px-4 py-2 text-sm font-semibold text-white rounded-sm transition-colors"
                style={{ background: "#1A5C2A" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#134421")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1A5C2A")}>
                Live Chat
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
