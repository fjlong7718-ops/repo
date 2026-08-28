import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ChevronDown, ChevronUp, Check, HelpCircle, ArrowLeft, Plane, MapPin, List } from "lucide-react";

type AddressType = "company" | "individual";
type PaymentMethod = "paypal" | "credit" | "bank" | "pingpong";

const G = "#1A5C2A";

// ── Carrier logos ─────────────────────────────────────────────────────────────

function DhlLogo() {
  return (
    <div className="w-20 h-11 rounded flex items-center justify-center font-black shrink-0"
      style={{ background: "#FFCC00" }}>
      <span style={{ color: "#D40511", fontSize: 18, letterSpacing: "-0.5px", fontFamily: "Arial Black, sans-serif" }}>DHL</span>
    </div>
  );
}

function UpsLogo() {
  return (
    <div className="w-20 h-11 rounded flex items-center justify-center shrink-0"
      style={{ background: "#351C15" }}>
      <span style={{ color: "#FFB500", fontSize: 17, fontWeight: 900, fontFamily: "Arial Black, sans-serif" }}>UPS</span>
    </div>
  );
}

function FedExLogo() {
  return (
    <div className="w-20 h-11 rounded flex flex-col items-center justify-center shrink-0"
      style={{ background: "#4D148C" }}>
      <div className="font-black leading-none" style={{ fontSize: 14 }}>
        <span style={{ color: "#FF6600" }}>Fed</span>
        <span style={{ color: "#fff" }}>Ex</span>
      </div>
      <span style={{ color: "#fff", fontSize: 8, letterSpacing: "0.12em", opacity: 0.85 }}>EXPRESS</span>
    </div>
  );
}

function ExwLogo() {
  return (
    <div className="w-20 h-11 rounded flex flex-col items-center justify-center gap-0.5 shrink-0 border"
      style={{ background: "#F8FAFC", borderColor: "#D1D5DB" }}>
      <svg width="20" height="16" viewBox="0 0 24 20" fill="none">
        <rect x="2" y="10" width="20" height="10" rx="1" fill="#6B7280" />
        <rect x="6" y="5" width="12" height="7" rx="1" fill="#9CA3AF" />
        <rect x="9" y="2" width="6" height="5" rx="1" fill="#D1D5DB" />
      </svg>
      <span style={{ color: "#6B7280", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}>EXW</span>
    </div>
  );
}

// ── Payment logos ─────────────────────────────────────────────────────────────

function PayPalLogo() {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <div className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: "#003087" }}>
        <span style={{ color: "#fff", fontWeight: 900, fontStyle: "italic", fontSize: 15 }}>P</span>
      </div>
      <span className="font-bold" style={{ color: "#003087", fontSize: 13 }}>
        Pay<span style={{ color: "#009cde" }}>Pal</span>
      </span>
    </div>
  );
}

function CreditCardLogos() {
  return (
    <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
      <span className="px-1.5 py-0.5 text-[10px] font-black rounded" style={{ background: "#1a1f71", color: "#fff" }}>VISA</span>
      <span className="inline-flex items-center">
        <span className="w-5 h-5 rounded-full inline-block" style={{ background: "#EB001B" }} />
        <span className="w-5 h-5 rounded-full inline-block -ml-2.5" style={{ background: "#F79E1B", opacity: 0.85 }} />
      </span>
      <span className="px-1.5 py-0.5 text-[10px] font-black rounded text-white" style={{ background: "#003087" }}>JCB</span>
      <span className="px-1.5 py-0.5 text-[10px] font-black rounded text-white" style={{ background: "#CC0000" }}>UP</span>
      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded text-white" style={{ background: "#2E77BC" }}>AMEX</span>
    </div>
  );
}

function BankOfChinaLogo() {
  return (
    <div className="flex flex-col items-center gap-0.5 shrink-0">
      <div className="w-9 h-9 rounded-full flex items-center justify-center border-2"
        style={{ background: "#CC0000", borderColor: "#CC0000" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5" />
          <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">中</text>
        </svg>
      </div>
      <span style={{ fontSize: 7, color: "#6B7280", letterSpacing: "0.02em", textAlign: "center", lineHeight: 1.2 }}>BANK OF CHINA</span>
    </div>
  );
}

function PingPongLogo() {
  return (
    <span className="font-black text-xl tracking-tight shrink-0" style={{ fontFamily: "Arial Rounded MT Bold, Arial, sans-serif" }}>
      <span style={{ color: "#0062FF" }}>ping</span>
      <span style={{ color: "#00CFFF" }}>pong</span>
    </span>
  );
}

// ── Shipping options data ─────────────────────────────────────────────────────

const SHIPPING_OPTIONS = [
  { id: "dhl",    name: "DHL",      desc: "If customs inspects your package, additional duties and fees may apply, subject to destination country/region rules.", time: "2~5 Days", price: 89.00,  Logo: DhlLogo   },
  { id: "ups",    name: "UPS",      desc: "If customs inspects your package, additional duties and fees may apply, subject to destination country/region rules.", time: "2~5 Days", price: 69.84,  Logo: UpsLogo   },
  { id: "fedex",  name: "FedEx",    desc: "If customs inspects your package, additional duties and fees may apply, subject to destination country/region rules.", time: "2~5 Days", price: 41.02,  Logo: FedExLogo },
  { id: "dhldp",  name: "DHL(DDP)", desc: "Choosing the DDP service will help speed up customs clearance. This service will incur service charges and customs duties, and you need to prepay in advance.", time: "2~5 Days", price: 120.00, Logo: DhlLogo },
  { id: "exw",    name: "EXW",      desc: "Seller delivers goods at its premises; buyer assumes all risks, costs, loading, and export clearance thereafter.", time: "NA", price: 0.00, Logo: ExwLogo },
];

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Germany",
  "Australia", "Japan", "France", "China", "Singapore", "South Korea",
];

// ── Shared primitives ─────────────────────────────────────────────────────────

function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
      style={{ borderColor: selected ? G : "#D1D5DB" }}>
      {selected && <span className="w-2 h-2 rounded-full" style={{ background: G }} />}
    </span>
  );
}

function SectionCard({
  icon, title, helpIcon, open, onToggle, children,
}: {
  icon: React.ReactNode; title: string; helpIcon?: boolean;
  open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-5 py-3.5 border-b text-left"
        style={{ borderColor: open ? "#E5E7EB" : "transparent" }}
      >
        <span style={{ color: G }}>{icon}</span>
        <span className="flex-1 text-sm font-semibold" style={{ color: "#111827" }}>{title}</span>
        {helpIcon && <HelpCircle size={14} color="#9CA3AF" className="mr-1" />}
        {open
          ? <ChevronUp size={16} color="#9CA3AF" />
          : <ChevronDown size={16} color="#9CA3AF" />}
      </button>
      {open && children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium" style={{ color: "#6B7280" }}>
          {required && <span style={{ color: "#EF4444" }} className="mr-0.5">*</span>}{label}
        </label>
      )}
      {children}
    </div>
  );
}

function Input({ placeholder, value, onChange, type = "text" }: {
  placeholder: string; value?: string; onChange?: (v: string) => void; type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className="w-full border rounded px-3 py-2 text-sm focus:outline-none transition-colors"
      style={{ borderColor: "#D1D5DB", color: "#1a1a2e" }}
      onFocus={e => (e.target.style.borderColor = G)}
      onBlur={e => (e.target.style.borderColor = "#D1D5DB")}
    />
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span style={{ color: "#6B7280" }}>{label}</span>
      <span className="font-semibold" style={{ color: "#111827" }}>{value}</span>
    </div>
  );
}

function PaymentOption({ selected, onSelect, title, desc, Logo }: {
  selected: boolean; onSelect: () => void;
  title: string; desc: React.ReactNode; Logo: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full flex items-center gap-4 px-4 py-3 rounded border text-left transition-all"
      style={{ borderColor: selected ? G : "#E5E7EB", background: selected ? "#F0FDF4" : "#fff" }}
    >
      <RadioDot selected={selected} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold mb-0.5" style={{ color: "#111827" }}>{title}</p>
        <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>{desc}</p>
      </div>
      <div className="shrink-0 flex items-center">{Logo}</div>
    </button>
  );
}

// ── Confirm Payment Modal ─────────────────────────────────────────────────────

function ConfirmPaymentModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-xl overflow-hidden"
        style={{ width: 420, minWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3" style={{ background: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
          <p className="text-sm font-semibold" style={{ color: "#374151" }}>Confirm Payment</p>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm" style={{ color: "#2563EB" }}>Did you complete the payment?</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 pb-4">
          <button
            onClick={onClose}
            className="px-5 py-1.5 text-sm rounded border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#D1D5DB", color: "#374151" }}
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-1.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
            style={{ background: "#D97706" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const paymentSource = searchParams.get("source");
  const balancePayment = paymentSource === "balance";
  const fromOrders = paymentSource === "orders" || balancePayment;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [addrOpen,  setAddrOpen]  = useState(true);
  const [shipOpen,  setShipOpen]  = useState(true);
  const [payOpen,   setPayOpen]   = useState(true);
  const [orderOpen, setOrderOpen] = useState(true);

  const [addrType,    setAddrType]    = useState<AddressType>("individual");
  const [firstName,   setFirstName]   = useState("");
  const [lastName,    setLastName]    = useState("");
  const [country,     setCountry]     = useState("United States");
  const [stateCity,   setStateCity]   = useState("");
  const [street,      setStreet]      = useState("");
  const [building,    setBuilding]    = useState("");
  const [postal,      setPostal]      = useState("");
  const [phone,       setPhone]       = useState("");
  const [defaultAddr, setDefaultAddr] = useState(true);

  const [shippingId, setShippingId] = useState("dhl");
  const [payMethod,  setPayMethod]  = useState<PaymentMethod>("paypal");

  const selectedShipping = SHIPPING_OPTIONS.find(s => s.id === shippingId);
  const shippingCost = selectedShipping?.price ?? 89.00;
  const merchandise  = balancePayment ? 2.00 : 13.00;
  const bankFee      = payMethod === "paypal" ? 1.81 : payMethod === "credit" ? 0.39 : 0;
  const discount     = 0.00;
  const total        = balancePayment ? merchandise + bankFee - discount : fromOrders ? 0 : merchandise + shippingCost + bankFee - discount;

  return (
    <div className="flex gap-6 px-6 py-5 items-start" style={{ background: "#F5F7FA", minHeight: "100%" }}>

      {/* ── Left column ── */}
      <div className="flex-1 min-w-0 space-y-3">

        {/* Back */}
        <Link
          to={fromOrders ? "/account/orders" : "/account/cart"}
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
          style={{ color: "#374151" }}
        >
          <ArrowLeft size={13} /> {fromOrders ? "Back to My Orders" : "Back to Cart"}
        </Link>

        {!fromOrders && <>{/* ── Shipping Address ── */}
        <SectionCard
          icon={<MapPin size={15} />}
          title="Shipping Address"
          open={addrOpen}
          onToggle={() => setAddrOpen(o => !o)}
        >
          {fromOrders ? <div className="px-5 py-4 space-y-4">
            <p className="text-xs font-medium text-orange-600">Please fill in the correct and complete address, otherwise delivery may not be possible.</p>
            <div className="rounded-md border border-gray-300 bg-white px-10 py-4 text-sm leading-7" aria-readonly="true"><div>Steve Jobs　 0085291234567</div><div>80 Airport Boulevard, Singapore 819642</div></div>
          </div> : <div className="px-5 py-4 space-y-4">
            <p className="text-xs font-medium" style={{ color: "#D97706" }}>
              Please fill in the correct and complete address, otherwise delivery may not be possible.
            </p>

            {/* Company / Individual toggle */}
            <div className="grid grid-cols-2 gap-3">
              {(["company", "individual"] as AddressType[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAddrType(t)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded border text-sm font-medium transition-colors capitalize"
                  style={{
                    borderColor: addrType === t ? G : "#D1D5DB",
                    background:  addrType === t ? "#F0FDF4" : "#fff",
                    color:       addrType === t ? G : "#6B7280",
                  }}
                >
                  <RadioDot selected={addrType === t} />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" required><Input placeholder="First Name" value={firstName} onChange={setFirstName} /></Field>
              <Field label="Last Name"  required><Input placeholder="Last Name"  value={lastName}  onChange={setLastName}  /></Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Country / Region" required>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 flex items-center gap-1 pointer-events-none">
                    <span style={{ fontSize: 13 }}>🇺🇸</span>
                  </div>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full border rounded pl-8 pr-8 py-2 text-sm focus:outline-none bg-white appearance-none"
                    style={{ borderColor: "#D1D5DB" }}
                  >
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-3 pointer-events-none" style={{ color: "#9CA3AF" }} />
                </div>
              </Field>
              <Field label="State / Province / City">
                <Input placeholder="State / Province / City" value={stateCity} onChange={setStateCity} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Street Address" required><Input placeholder="Street Address" value={street} onChange={setStreet} /></Field>
              <Field label="Building / Apartment No."><Input placeholder="Building /Apartment No." value={building} onChange={setBuilding} /></Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="PostalCode" required><Input placeholder="PostalCode" value={postal} onChange={setPostal} /></Field>
              <Field label="Phone Number" required><Input placeholder="Phone Number" value={phone} onChange={setPhone} type="tel" /></Field>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <button
                type="button"
                onClick={() => setDefaultAddr(o => !o)}
                className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
                style={{ borderColor: defaultAddr ? G : "#D1D5DB", background: defaultAddr ? G : "#fff" }}
              >
                {defaultAddr && <Check size={10} color="#fff" strokeWidth={3} />}
              </button>
              <span className="text-sm font-medium" style={{ color: G }}>Default Settings</span>
            </label>

            <button
              type="button"
              className="px-8 py-2 text-white text-sm font-semibold rounded transition-opacity hover:opacity-90"
              style={{ background: G }}
            >
              Save
            </button>
          </div>}
        </SectionCard>
        </>}

        {/* ── Shipping Method ── */}
        {!fromOrders && <SectionCard
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
          }
          title="Shipping Method"
          open={shipOpen}
          onToggle={() => setShipOpen(o => !o)}
        >
          {fromOrders ? <div className="px-5 py-3"><div className="flex w-full items-center gap-4 rounded border border-gray-300 bg-white p-3" aria-readonly="true"><DhlLogo/><div className="min-w-0 flex-1"><p className="mb-0.5 text-xl font-semibold text-gray-900">DHL</p><p className="text-xs leading-relaxed text-gray-500">If customs inspects your package, additional duties and fees may apply, subject to destination country/region rules.</p></div><div className="shrink-0 text-right"><div className="flex items-center gap-1 text-xs text-gray-500"><Plane size={11}/>2~5 Days</div><p className="text-xl font-bold text-gray-900">$89.00</p></div></div></div> : <div className="px-5 py-3 space-y-2">
            {SHIPPING_OPTIONS.map(opt => {
              const sel = shippingId === opt.id;
              const Logo = opt.Logo;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setShippingId(opt.id)}
                  className="w-full flex items-center gap-4 p-3 rounded border text-left transition-all"
                  style={{ borderColor: sel ? G : "#E5E7EB", background: sel ? "#F0FDF4" : "#fff" }}
                >
                  <RadioDot selected={sel} />
                  <Logo />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "#111827" }}>{opt.name}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{opt.desc}</p>
                  </div>
                  <div className="shrink-0 text-right flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
                      <Plane size={11} />{opt.time}
                    </div>
                    <p className="text-sm font-bold" style={{ color: "#111827" }}>${opt.price.toFixed(2)}</p>
                  </div>
                </button>
              );
            })}
          </div>}
        </SectionCard>}

        {/* ── Payment Method ── */}
        <SectionCard
          icon={<HelpCircle size={15} />}
          title="Payment Method"
          helpIcon
          open={payOpen}
          onToggle={() => setPayOpen(o => !o)}
        >
          <div className="px-5 py-3 space-y-2">
            <PaymentOption
              selected={payMethod === "paypal"}
              onSelect={() => setPayMethod("paypal")}
              title="Payment by PayPal"
              desc="Pay with PayPal – fast, easy, secure."
              Logo={<PayPalLogo />}
            />
            <PaymentOption
              selected={payMethod === "credit"}
              onSelect={() => setPayMethod("credit")}
              title="Payment by Credit Card"
              desc="Supplier should receive payment in1-2 hours."
              Logo={<CreditCardLogos />}
            />
            <PaymentOption
              selected={payMethod === "bank"}
              onSelect={() => setPayMethod("bank")}
              title="Bank Transfer"
              desc={<>{"Don't forget to save your transfer screenshot."}</>}
              Logo={<BankOfChinaLogo />}
            />
            <PaymentOption
              selected={payMethod === "pingpong"}
              onSelect={() => setPayMethod("pingpong")}
              title="Payment by PingPong"
              desc="Supplier should receive payment in 1-2 hours."
              Logo={<PingPongLogo />}
            />
          </div>
        </SectionCard>

        {/* ── Order Confirmation ── */}
        <SectionCard
          icon={<List size={15} />}
          title="Order Confirmation"
          open={orderOpen}
          onToggle={() => setOrderOpen(o => !o)}
        >
          <div className="px-5 py-3">
            <div
              className="grid text-xs font-semibold uppercase tracking-wide pb-2 border-b"
              style={{ gridTemplateColumns: "1fr 140px 100px", color: "#9CA3AF", borderColor: "#F3F4F6" }}
            >
              <span>Product  Details</span>
              <span>Quantity</span>
              <span className="text-right">Price</span>
            </div>
            <div className="grid items-start py-3" style={{ gridTemplateColumns: "1fr 140px 100px" }}>
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded border shrink-0 overflow-hidden" style={{ borderColor: "#E5E2DB" }}>
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" alt="PCB" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 pt-0.5 space-y-0.5 text-xs">
                  <p style={{ color: "#6B7280" }}>
                    Product NO.&nbsp;<span className="font-semibold" style={{ color: "#111827" }}>HB120087XT3</span>
                  </p>
                  <p className="font-medium" style={{ color: G }}>fr4, 2 Layers, 100X100mm, 1.6mm</p>
                  <p style={{ color: "#6B7280" }}>PO No: N/A</p>
                  <p style={{ color: "#6B7280" }}>Build Time:&nbsp;<span style={{ color: "#374151" }}>3 days</span></p>
                </div>
              </div>
              <div className="pt-1">
                <p className="text-sm font-medium" style={{ color: "#111827" }}>10PCS</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>(0.32kg)</p>
              </div>
              <div className="pt-1 text-right text-sm font-bold" style={{ color: "#111827" }}>{balancePayment ? <><div>$18.00</div><div className="mt-1 rounded bg-amber-50 px-1 py-1 text-[9px] font-normal leading-4 text-orange-600">Original quote: $16.00<br/>Pay the difference: $2.00</div></> : "$28.00"}</div>
            </div>
          </div>
        </SectionCard>

      </div>

      {/* ── Confirm Payment Modal ── */}
      {showModal && (
        <ConfirmPaymentModal
          onConfirm={() => { setShowModal(false); navigate("/account/cart"); }}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ── Right: Summary ── */}
      <div className="w-72 shrink-0 sticky top-6">
        <div className="bg-white rounded border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
          <div className="px-5 py-3.5 border-b" style={{ borderColor: "#E5E7EB" }}>
            <p className="font-bold text-sm uppercase tracking-widest" style={{ color: "#111827" }}>SUMMARY</p>
          </div>
          <div className="px-5 py-4 space-y-2.5">
            <SummaryRow label={balancePayment ? "Difference Amount" : "Merchandise Total"} value={`$ ${merchandise.toFixed(2)}`} />
            {!balancePayment && <SummaryRow label="Estimated Shipping" value={`$ ${shippingCost.toFixed(2)}`} />}
            <SummaryRow label="Bank Fee"            value={`$ ${bankFee.toFixed(2)}`} />
            {!balancePayment && <div className="flex justify-between items-center text-sm">
              <span style={{ color: "#6B7280" }}>Discount</span>
              <span className="flex items-center gap-0.5 font-medium" style={{ color: "#DC2626" }}>
                -$0.00 <span className="text-xs" style={{ color: "#9CA3AF" }}>›</span>
              </span>
            </div>}
            <div className="border-t pt-2.5" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold" style={{ color: "#374151" }}>Total</span>
                <span className="text-2xl font-black" style={{ color: "#D97706" }}>
                  $ {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="px-5 pb-5">
            <button
              type="button"
              className="w-full py-3 text-white font-bold text-sm rounded transition-opacity hover:opacity-90"
              style={{ background: "#D97706" }}
              onClick={() => setShowModal(true)}
            >
              Payment
            </button>
            <p className="text-[11px] text-center leading-relaxed mt-2.5" style={{ color: "#9CA3AF" }}>
              Import duties, taxes, and customs fees are not included in your payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
