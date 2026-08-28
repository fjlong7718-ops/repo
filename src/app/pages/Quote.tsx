import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Upload, ChevronDown, ChevronUp, RotateCcw, Play,
  ShoppingCart, ChevronRight,
} from "lucide-react";
import NavBar from "../components/NavBar";

type Product = "pcb" | "pcba" | "cnc";

function toggleArr<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

// ── Product Tab Icons ─────────────────────────────────────────────────────────

function IconPCBProto({ active }: { active: boolean }) {
  const ink = active ? "#15803d" : "#64748b";
  const dim = active ? "#86efac" : "#cbd5e1";
  const fill = active ? "#f0fdf4" : "#f8fafc";
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* Board body */}
      <rect x="4" y="5" width="36" height="28" rx="2.5" fill={fill} stroke={ink} strokeWidth="1.5"/>
      {/* PCB substrate layer hint */}
      <rect x="4" y="28" width="36" height="5" rx="0" fill={dim} opacity="0.4"/>
      <rect x="4" y="27" width="36" height="1" fill={dim} opacity="0.6"/>
      {/* Corner mounting holes */}
      <circle cx="8.5" cy="9" r="1.8" fill="white" stroke={ink} strokeWidth="1.2"/>
      <circle cx="35.5" cy="9" r="1.8" fill="white" stroke={ink} strokeWidth="1.2"/>
      <circle cx="8.5" cy="29" r="1.8" fill="white" stroke={ink} strokeWidth="1.2"/>
      <circle cx="35.5" cy="29" r="1.8" fill="white" stroke={ink} strokeWidth="1.2"/>
      {/* Trace routing — horizontal backbone */}
      <path d="M13 19 H19 V13 H25 V19 H31" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Trace drops */}
      <line x1="19" y1="19" x2="19" y2="25" stroke={ink} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="25" y1="19" x2="25" y2="25" stroke={ink} strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="19" y1="25" x2="25" y2="25" stroke={ink} strokeWidth="1.6" strokeLinecap="round"/>
      {/* Via annular rings */}
      <circle cx="19" cy="19" r="2.2" fill="white" stroke={ink} strokeWidth="1.4"/>
      <circle cx="19" cy="19" r="0.8" fill={ink}/>
      <circle cx="25" cy="19" r="2.2" fill="white" stroke={ink} strokeWidth="1.4"/>
      <circle cx="25" cy="19" r="0.8" fill={ink}/>
      <circle cx="19" cy="25" r="2.2" fill="white" stroke={ink} strokeWidth="1.4"/>
      <circle cx="19" cy="25" r="0.8" fill={ink}/>
      <circle cx="25" cy="25" r="2.2" fill="white" stroke={ink} strokeWidth="1.4"/>
      <circle cx="25" cy="25" r="0.8" fill={ink}/>
      {/* Gold finger edge connectors */}
      <rect x="13" y="33" width="3.5" height="5.5" rx="0.8" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="18.5" y="33" width="3.5" height="5.5" rx="0.8" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="24" y="33" width="3.5" height="5.5" rx="0.8" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="29.5" y="33" width="3.5" height="5.5" rx="0.8" fill={active ? "#ca8a04" : "#94a3b8"}/>
    </svg>
  );
}

function IconPCBAssembly({ active }: { active: boolean }) {
  const ink = active ? "#15803d" : "#64748b";
  const dim = active ? "#86efac" : "#cbd5e1";
  const fill = active ? "#f0fdf4" : "#f8fafc";
  const chip = active ? "#166534" : "#475569";
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* Board */}
      <rect x="4" y="10" width="36" height="24" rx="2.5" fill={fill} stroke={ink} strokeWidth="1.5"/>
      <rect x="4" y="29" width="36" height="5" rx="0" fill={dim} opacity="0.4"/>
      {/* Traces */}
      <line x1="4" y1="17" x2="13" y2="17" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="31" y1="17" x2="40" y2="17" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4" y1="27" x2="13" y2="27" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="31" y1="27" x2="40" y2="27" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
      {/* IC package body */}
      <rect x="13" y="14" width="18" height="16" rx="1.5" fill={chip} stroke={ink} strokeWidth="1.2"/>
      {/* IC pin 1 marker dot */}
      <circle cx="15" cy="16" r="1" fill={dim}/>
      {/* IC label lines */}
      <line x1="17" y1="19" x2="27" y2="19" stroke={dim} strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="17" y1="22" x2="27" y2="22" stroke={dim} strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="17" y1="25" x2="24" y2="25" stroke={dim} strokeWidth="0.8" strokeLinecap="round"/>
      {/* Left pins */}
      <rect x="10" y="15.5" width="3.5" height="2" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="10" y="19.5" width="3.5" height="2" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="10" y="23.5" width="3.5" height="2" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      {/* Right pins */}
      <rect x="30.5" y="15.5" width="3.5" height="2" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="30.5" y="19.5" width="3.5" height="2" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="30.5" y="23.5" width="3.5" height="2" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      {/* Top pins */}
      <rect x="17" y="11.5" width="2" height="3" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="21" y="11.5" width="2" height="3" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="25" y="11.5" width="2" height="3" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      {/* Bottom pins */}
      <rect x="17" y="30" width="2" height="3.5" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="21" y="30" width="2" height="3.5" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      <rect x="25" y="30" width="2" height="3.5" rx="0.4" fill={active ? "#ca8a04" : "#94a3b8"}/>
      {/* Passive components – capacitors */}
      <rect x="5.5" y="12" width="5" height="3" rx="0.5" fill={ink} opacity="0.6"/>
      <rect x="33.5" y="12" width="5" height="3" rx="0.5" fill={ink} opacity="0.6"/>
      <rect x="5.5" y="24" width="5" height="3" rx="0.5" fill={ink} opacity="0.4"/>
      <rect x="33.5" y="24" width="5" height="3" rx="0.5" fill={ink} opacity="0.4"/>
    </svg>
  );
}

function IconCNC({ active }: { active: boolean }) {
  const ink = active ? "#15803d" : "#64748b";
  const mid = active ? "#16a34a" : "#94a3b8";
  const hi  = active ? "#bbf7d0" : "#e2e8f0";
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* Spindle housing (top cylinder) */}
      <rect x="16" y="3" width="12" height="8" rx="2" fill={hi} stroke={ink} strokeWidth="1.4"/>
      {/* Housing highlight */}
      <rect x="18" y="4.5" width="3" height="5" rx="1" fill="white" opacity="0.5"/>
      {/* Collet / chuck transition */}
      <path d="M17 11 L15 16 L29 16 L27 11 Z" fill={mid} stroke={ink} strokeWidth="1.2"/>
      {/* Fluted tool body */}
      <rect x="19" y="16" width="6" height="16" rx="1" fill={hi} stroke={ink} strokeWidth="1.3"/>
      {/* Flute helix lines */}
      <path d="M21 17 Q23 21 21 25 Q23 29 21 32" stroke={ink} strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      <path d="M23 17 Q21 21 23 25 Q21 29 23 32" stroke={ink} strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
      {/* Cutting tip */}
      <path d="M19 32 L22 38 L25 32 Z" fill={ink} stroke={ink} strokeWidth="0.8" strokeLinejoin="round"/>
      {/* Workpiece / material */}
      <rect x="5" y="38" width="34" height="4" rx="1" fill={mid} opacity="0.5" stroke={ink} strokeWidth="1"/>
      {/* Cutting sparks / chips */}
      <line x1="25" y1="35" x2="30" y2="33" stroke={active ? "#fbbf24" : "#94a3b8"} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="25" y1="36" x2="32" y2="36" stroke={active ? "#fbbf24" : "#94a3b8"} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="25" y1="37" x2="29" y2="39" stroke={active ? "#fbbf24" : "#94a3b8"} strokeWidth="1.2" strokeLinecap="round"/>
      {/* Cross-slide rails */}
      <line x1="5" y1="30" x2="14" y2="30" stroke={ink} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="30" y1="30" x2="39" y2="30" stroke={ink} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

// ── Pricing Panel ─────────────────────────────────────────────────────────────

interface PricingPanelProps {
  product: Product;
  pcbaOn: boolean;
  qty: string;
  layers: number;
  onCart: () => void;
}

function PricingPanel({ product, pcbaOn, qty, layers, onCart }: PricingPanelProps) {
  const [asmTier, setAsmTier] = useState(0);
  const [country, setCountry] = useState("CANADA");
  const [carrier, setCarrier] = useState("DHL");

  const pcbQty   = Math.max(1, Number(qty) || 20);
  const pcbUnit  = Math.max(0.28, 0.18 + layers * 0.055);
  const pcbCost  = Math.round(Math.max(8.5, pcbQty * pcbUnit) * 100) / 100;

  const asmTiers = [
    { perPiece: 4.5,  qty: 5,   total: 22.25  },
    { perPiece: 2.8,  qty: 20,  total: 50.60  },
    { perPiece: 1.5,  qty: 100, total: 150.00 },
  ];

  const showPcb = product === "pcb" || product === "pcba";
  const showAsm = product === "pcba" || (product === "pcb" && pcbaOn);
  const showCnc = product === "cnc";

  const asmCost  = showAsm ? asmTiers[asmTier].total : 0;
  const shipping = 88.00;
  const discount = 10.00;
  const rawTotal = (showPcb ? pcbCost : 0) + (showAsm ? asmCost : 0) - discount;
  const total    = Math.max(0, Math.round(rawTotal * 100) / 100);

  function CheckIcon() {
    return (
      <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <polyline points="1,3 3,5 7,1" stroke="white" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    );
  }

  function SectionHead({ title }: { title: string }) {
    return (
      <div className="px-4 py-2 bg-gray-50 border-y border-gray-100">
        <p className="text-xs font-semibold text-gray-700">{title}</p>
      </div>
    );
  }

  return (
    <div className="sticky top-20 rounded border border-gray-200 shadow-sm bg-white text-sm overflow-hidden">
      {/* Panel header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <p className="font-semibold text-gray-800 text-sm">Pricing And Build Time</p>
      </div>

      {/* ── PCB Price ── */}
      {showPcb && (
        <>
          <SectionHead title="PCB Price" />
          <div className="px-4 py-2.5">
            <div className="flex text-[11px] text-gray-400 mb-2 font-medium">
              <span className="flex-1">Build Time</span>
              <span className="w-10 text-center">Qty</span>
              <span className="w-16 text-right">Total</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-2 flex-1">
                <CheckIcon />
                <span className="text-xs font-medium text-gray-700">24 Hours</span>
              </div>
              <span className="w-10 text-center text-xs text-gray-700">{pcbQty}</span>
              <span className="w-16 text-right text-xs font-semibold text-gray-900">
                ${pcbCost.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}

      {/* ── Assembly Service Price ── */}
      {showAsm && (
        <>
          <SectionHead title="Assembly Service Price" />
          <div className="px-4 py-2.5">
            <div className="flex text-[11px] text-gray-400 mb-2 font-medium">
              <span className="flex-1">Per Piece</span>
              <span className="w-10 text-center">Qty</span>
              <span className="w-16 text-right">Total</span>
            </div>
            {asmTiers.map((tier, i) => (
              <button
                key={i} type="button" onClick={() => setAsmTier(i)}
                className="flex items-center w-full py-1.5 text-left hover:bg-gray-50 rounded transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  {asmTier === i
                    ? <CheckIcon />
                    : <span className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />}
                  <span className={`text-xs ${asmTier === i ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                    {tier.perPiece} / pcs
                  </span>
                </div>
                <span className={`w-10 text-center text-xs ${asmTier === i ? "text-gray-700" : "text-gray-400"}`}>
                  {tier.qty}
                </span>
                <span className={`w-16 text-right text-xs ${asmTier === i ? "font-semibold text-gray-900" : "text-gray-400"}`}>
                  ${tier.total.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── Structural Parts Price ── */}
      {showCnc && (
        <>
          <SectionHead title="Structural Parts Price" />
          <div className="px-4 py-3 space-y-1.5">
            <p className="text-xs text-gray-600 leading-relaxed">
              After the order is submitted, the quotation will be completed within 1 to 3 hours
              and you will be notified of payment by email.
            </p>
            <p className="text-[11px] text-gray-400">Final price is subject to our review</p>
          </div>
        </>
      )}

      {/* ── Cost breakdown ── */}
      <div className="px-4 py-3 border-t border-gray-200 space-y-1.5">
        {showPcb && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">PCB Cost</span>
            <span className="font-medium text-gray-800">${pcbCost.toFixed(2)}</span>
          </div>
        )}
        {showAsm && (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">BOM Cost</span>
              <span className="text-gray-400 italic text-[11px]">Manual quotation</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Assembly Service Cost</span>
              <span className="font-medium text-gray-800">${asmCost.toFixed(2)}</span>
            </div>
          </>
        )}
        {showCnc && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Structural Parts Cost</span>
            <span className="text-gray-400 italic text-[11px]">Manual quotation</span>
          </div>
        )}
        <div className="flex justify-between text-xs items-center">
          <span className="text-gray-600">Order discount</span>
          <span className="text-green-600 font-medium flex items-center gap-0.5">
            $-{discount.toFixed(2)}
            <ChevronRight size={12} />
          </span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
          <span className="font-semibold text-gray-800">Total:</span>
          <span className="font-bold text-gray-900">
            {showCnc ? "— (quoted)" : `$${total.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Save to Cart */}
      <div className="px-4 pb-4">
        <button
          type="button" onClick={onCart}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-white text-sm font-semibold rounded transition-opacity hover:opacity-90"
          style={{ background: "#15803d" }}
        >
          <ShoppingCart size={15} /> Save to Cart
        </button>
      </div>

      {/* Shipping Estimate */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
            Shipping Estimate
            <span className="w-3.5 h-3.5 rounded-full border border-gray-300 text-gray-400 text-[9px] flex items-center justify-center">?</span>
          </div>
          <span className="text-xs font-semibold text-gray-800">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 mb-1.5">
          <select
            value={country} onChange={e => setCountry(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:border-green-500"
          >
            {["CANADA","USA","UK","Germany","Australia","Japan","China"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={carrier} onChange={e => setCarrier(e.target.value)}
            className="w-20 border border-gray-300 rounded px-1 py-1 text-xs bg-white focus:outline-none focus:border-green-500"
          >
            {["DHL","FedEx","UPS"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <p className="text-[11px] text-gray-400">{carrier} 2-4 business days,&nbsp;wt: 0.52kg</p>
      </div>

      {/* Register banner */}
      <div className="mx-4 mb-4 rounded-lg overflow-hidden">
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)" }}
        >
          <div>
            <p className="text-white text-[11px] font-medium leading-tight">Register to receive a</p>
            <p className="text-yellow-300 text-xl font-black leading-tight">$10 discount</p>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-bold rounded bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Primitives ──────────────────────────────────────────────────────────────

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 text-xs rounded border transition-colors whitespace-nowrap ${
        selected
          ? "border-green-600 bg-green-50 text-green-700 font-semibold"
          : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

function Row({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-52 shrink-0 flex items-start gap-1 pt-0.5">
        <span className="text-sm text-gray-600 leading-snug">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
        <span className="shrink-0 w-4 h-4 rounded-full border border-gray-300 text-gray-400 text-[9px] flex items-center justify-center cursor-help select-none mt-0.5">?</span>
      </div>
      <div className="flex-1 flex flex-wrap gap-1.5 items-start">{children}</div>
    </div>
  );
}

function ColSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        {open
          ? <ChevronUp size={15} className="text-gray-400 shrink-0" />
          : <ChevronDown size={15} className="text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-5 py-1">{children}</div>}
    </div>
  );
}

function Toggler({ on, flip }: { on: boolean; flip: () => void }) {
  return (
    <button
      type="button"
      onClick={flip}
      className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-green-500" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function UpBtn({ label, accept }: { label: string; accept: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string | null>(null);
  return (
    <>
      <input
        ref={ref} type="file" accept={accept} className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) setName(f.name); }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex items-center gap-2 px-8 py-2 rounded text-white text-sm font-medium hover:opacity-90 transition-opacity"
        style={{ background: "#16a34a" }}
      >
        <Upload size={14} /> {name ?? label}
      </button>
    </>
  );
}

// ── PCBA form content (reused in PCB toggle + PCBA tab) ─────────────────────

interface PcbaProps {
  qty: string; setQty(v: string): void;
  side: string; setSide(v: string): void;
  panel: string; setPanel(v: string): void;
  pcbType: string; setPcbType(v: string): void;
  reqs: string[]; setReqs(v: string[]): void;
  purchase: string[]; setPurchase(v: string[]): void;
}

function PcbaFormContent({ p }: { p: PcbaProps }) {
  return (
    <div className="px-5 py-2">
      <Row label="upload gerber file">
        <div>
          <UpBtn label="Add gerber file" accept=".zip,.rar,.gbr,.gko" />
          <p className="text-xs text-gray-400 mt-1">Supports zip, rar, cam files, file size limit 50 MB</p>
        </div>
      </Row>
      <Row label="upload BOM file">
        <div>
          <UpBtn label="Add BOM file" accept=".xlsx,.xls,.csv" />
          <div className="flex gap-3 mt-1">
            <a href="#" className="text-xs text-green-600 underline">Download BOM Template</a>
            <a href="#" className="text-xs text-green-600 underline">BOM Example ⓘ</a>
          </div>
        </div>
      </Row>
      <Row label="upload Coordinate file">
        <div>
          <UpBtn label="Add Coordinate file" accept=".csv,.xlsx" />
          <div className="flex gap-3 mt-1">
            <a href="#" className="text-xs text-green-600 underline">Download Coordinate Template</a>
            <a href="#" className="text-xs text-green-600 underline">Coordinate Example ⓘ</a>
          </div>
        </div>
      </Row>
      <Row label="Quantity">
        <input
          type="number" value={p.qty} onChange={e => p.setQty(e.target.value)}
          className="w-28 border border-green-400 rounded px-2 py-1 text-sm focus:outline-none focus:border-green-600"
        />
      </Row>
      <Row label="Assembly Side">
        {["Top side", "Bottom side", "Both side"].map(v => (
          <Chip key={v} label={v} selected={p.side === v} onClick={() => p.setSide(v)} />
        ))}
      </Row>
      <Row label="PCB Panel Array">
        {["Single pieces", "Panelized PCBs"].map(v => (
          <Chip key={v} label={v} selected={p.panel === v} onClick={() => p.setPanel(v)} />
        ))}
      </Row>
      <Row label="PCB Type">
        {["Rigid PCB", "Flex PCB", "Rigid-flexible board"].map(v => (
          <Chip key={v} label={v} selected={p.pcbType === v} onClick={() => p.setPcbType(v)} />
        ))}
      </Row>
      <Row label="Processing requirements">
        <div className="flex flex-wrap gap-1">
          {["Function test","Split board","X-Ray","Aging test","Paste label","Final Assemble","Gem Package","Patch part first","Conformal coating"].map(v => (
            <Chip key={v} label={v} selected={p.reqs.includes(v)} onClick={() => p.setReqs(toggleArr(p.reqs, v))} />
          ))}
        </div>
      </Row>
      <Row label="Remaining material processing method">
        <select className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-green-600">
          <option>Keep in the factory</option>
          <option>Return to customer</option>
          <option>Discard</option>
        </select>
      </Row>
      <Row label="Purchasing materials">
        {["Purchasing components", "Purchasing PCB"].map(v => (
          <Chip key={v} label={v} selected={p.purchase.includes(v)} onClick={() => p.setPurchase(toggleArr(p.purchase, v))} />
        ))}
      </Row>
    </div>
  );
}

// ── PCBA shipping fields (its own state) ─────────────────────────────────────

function PcbaShippingSection() {
  return (
    <ColSection title="PCB Shipping Requirements" defaultOpen={false}>
      <Row label="Product Name">
        <input className="w-48 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none" />
      </Row>
      <Row label="Width * Height">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Length</span>
          <input className="w-16 border border-green-400 rounded px-2 py-1 text-sm focus:outline-none" />
          <span className="text-gray-400">+</span>
          <span className="text-xs text-gray-500">Width</span>
          <input className="w-16 border border-green-400 rounded px-2 py-1 text-sm focus:outline-none" />
          <span className="text-xs text-gray-500">mm</span>
        </div>
      </Row>
      <Row label="BOM Material Type">
        <input className="w-28 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none" placeholder="Kind" />
      </Row>
      <Row label="BOM total components">
        <input className="w-28 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none" placeholder="Pcs" />
      </Row>
      <Row label="Number of ICs with 16 pins or more such as QFP/BGA">
        <input className="w-28 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none" placeholder="Pcs" />
      </Row>
      <Row label="DIP solder joints">
        <input className="w-28 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none" placeholder="Pcs" />
      </Row>
      <Row label="upload the Other file">
        <UpBtn label="Upload file" accept="*" />
      </Row>
      <Row label="Special requirement">
        <textarea
          rows={4}
          placeholder="Please fill in your special requirements for the PCB order(within 5-1000 characters)"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none resize-y"
        />
      </Row>
    </ColSection>
  );
}

// ── Main Quote component ─────────────────────────────────────────────────────

export default function Quote() {
  const { productType } = useParams();
  const initialProduct: Product = productType === "pcba" || productType === "cnc" ? productType : "pcb";
  const [product, setProduct] = useState<Product>(initialProduct);
  const [pcbaOn, setPcbaOn] = useState(false);
  const [stencilOn, setStencilOn] = useState(false);

  // PCB basic
  const [mat, setMat] = useState("FR-4");
  const [layers, setLayers] = useState(2);
  const [sw, setSw] = useState("");
  const [sh, setSh] = useState("");
  const [qty, setQty] = useState("");
  const [btype, setBtype] = useState("Single piece");
  const [diff, setDiff] = useState(1);

  // PCB Process
  const [thick, setThick] = useState("1.6mm");
  const [tg, setTg] = useState("TG130");
  const [mask, setMask] = useState("Green");
  const [silk, setSilk] = useState("White");
  const [copper, setCopper] = useState("1 oz");
  const [surf, setSurf] = useState("HASL with lead");

  // High-spec
  const [track, setTrack] = useState("10/13mil");
  const [drill, setDrill] = useState("0.1mm");
  const [via, setVia] = useState("Via Covering with Solder Mask");
  const [testm, setTestm] = useState("100% flying probe testing");
  const [imp, setImp] = useState("No");
  const [specTech, setSpecTech] = useState<string[]>([]);

  // PCB Shipping
  const [qcomp, setQcomp] = useState("According to standard product contract");
  const [kelvin, setKelvin] = useState("None");
  const [cfile, setCfile] = useState("Yes");
  const [treports, setTreports] = useState<string[]>(["Quality assurance certificate"]);
  const [trtype, setTrtype] = useState("Electronic");
  const [btol, setBtol] = useState("Standard routing ±0.2mm");
  const [ipc, setIpc] = useState("IPC-II");
  const [interleave, setInterleave] = useState("Yes");
  const [dconflict, setDconflict] = useState("Follow Order Parameters");
  const [poNo, setPoNo] = useState("");
  const [refNo, setRefNo] = useState("");
  const [pcbSpecial, setPcbSpecial] = useState("");

  // PCBA
  const [pqty, setPqty] = useState("");
  const [pside, setPside] = useState("Top side");
  const [ppanel, setPpanel] = useState("Single pieces");
  const [ptype, setPtype] = useState("Rigid PCB");
  const [preqs, setPreqs] = useState<string[]>([]);
  const [ppurch, setPpurch] = useState<string[]>([]);

  // Structural Parts
  const [cncQty, setCncQty] = useState("");
  const [structuralProcess, setStructuralProcess] = useState("CNC Machining");
  const [structuralMaterial, setStructuralMaterial] = useState("");
  const [structuralFinish, setStructuralFinish] = useState("");

  // Footer
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const navigate = useNavigate();

  const pcbaState: PcbaProps = {
    qty: pqty, setQty: setPqty,
    side: pside, setSide: setPside,
    panel: ppanel, setPanel: setPpanel,
    pcbType: ptype, setPcbType: setPtype,
    reqs: preqs, setReqs: setPreqs,
    purchase: ppurch, setPurchase: setPpurch,
  };

  const maskColors = [
    { name: "Green", bg: "#16a34a" }, { name: "White", bg: "#e5e7eb" },
    { name: "Blue", bg: "#1d4ed8" }, { name: "Black", bg: "#111827" },
    { name: "Yellow", bg: "#ca8a04" }, { name: "Red", bg: "#dc2626" },
    { name: "Purple", bg: "#7c3aed" }, { name: "Matte Black", bg: "#374151" },
    { name: "Matte Green", bg: "#15803d" }, { name: "None", bg: "#f3f4f6" },
  ];

  const productTabs: { key: Product; label: string }[] = [
    { key: "pcb", label: "PCB Prototype" },
    { key: "pcba", label: "PCB Assembly" },
    { key: "cnc", label: "Structural Parts" },
  ];

  const tabIcons: Record<Product, (active: boolean) => React.ReactNode> = {
    pcb:  a => <IconPCBProto active={a} />,
    pcba: a => <IconPCBAssembly active={a} />,
    cnc:  a => <IconCNC active={a} />,
  };

  const barTitle: Record<Product, string> = {
    pcb: "PCB Specification Selection",
    pcba: "PCB Assembly Service",
    cnc: "Structural Manufacturing",
  };

  // Shared Info bar
  function InfoBar({ title }: { title: string }) {
    return (
      <div className="flex items-center justify-between px-4 py-2.5 rounded border border-green-200 bg-green-50">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-green-700 text-base leading-none">⚡</span>
          <span className="text-sm font-semibold text-green-800">{title}</span>
          <span className="text-xs text-gray-500">
            New Users Get <span className="text-green-600 font-semibold">$10</span> Off Instantly
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-1 text-xs text-orange-500 font-medium">
            <Play size={11} /> How it works
          </button>
          <button className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <RotateCcw size={11} /> Reset
          </button>
        </div>
      </div>
    );
  }

  // PCB Quote upload box
  const PcbUploadBox = (
    <div className="p-5 border-b border-gray-200">
      <p className="text-sm font-semibold text-gray-700 mb-3">PCB Quote</p>
      <div className="bg-gray-50 border border-gray-200 rounded py-10 flex flex-col items-center gap-3">
        <UpBtn label="Add gerber file" accept=".zip,.rar,.gbr,.gko,.drl" />
        <p className="text-xs text-gray-500 text-center max-w-md">
          Upload the Gerber or PCB file, the system will automatically analyze and fill in the identified parameters.
        </p>
        <p className="text-xs text-gray-400">Files up to 50 MB · Your files are private and confidential.</p>
      </div>
    </div>
  );

  // PCB basic parameter rows
  const PcbBasicRows = (
    <div className="px-5 py-2">
      <Row label="Base Material">
        <div className="flex flex-wrap gap-1">
          {["FR-4","Aluminum","DIF","FR-1","Special"].map(m => (
            <Chip key={m} label={m} selected={mat === m} onClick={() => setMat(m)} />
          ))}
        </div>
        <p className="w-full text-[11px] text-red-400 mt-1">
          *Material must be maintained before. HDI is available for 4 layer or more.
        </p>
      </Row>
      <Row label="Layer count">
        <div className="flex flex-wrap gap-1">
          {[1,2,4,6,8,10,12,14,16,18,20,22,24,26,30,32].map(l => (
            <Chip key={l} label={String(l)} selected={layers === l} onClick={() => setLayers(l)} />
          ))}
        </div>
      </Row>
      <Row label="Size (single)">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-500">Length</span>
          <input
            type="number" value={sw} onChange={e => setSw(e.target.value)}
            className="w-20 border border-green-400 rounded px-2 py-1 text-sm focus:outline-none"
          />
          <span className="text-gray-400">+</span>
          <span className="text-xs text-gray-500">Width</span>
          <input
            type="number" value={sh} onChange={e => setSh(e.target.value)}
            className="w-20 border border-green-400 rounded px-2 py-1 text-sm focus:outline-none"
          />
          <span className="text-xs text-gray-500">mm</span>
        </div>
      </Row>
      <Row label="Quantity (single)">
        <div className="flex items-center gap-2">
          <input
            type="number" value={qty} onChange={e => setQty(e.target.value)}
            className="w-24 border border-green-400 rounded px-2 py-1 text-sm focus:outline-none"
          />
          <span className="text-xs text-gray-500">pcs</span>
        </div>
      </Row>
      <Row label="Board type">
        {["Single piece","Panel by Customer","Panel by PCBasic"].map(b => (
          <Chip key={b} label={b} selected={btype === b} onClick={() => setBtype(b)} />
        ))}
      </Row>
      <Row label="Different designs">
        {[1,2,3,4,5].map(d => (
          <Chip key={d} label={String(d)} selected={diff === d} onClick={() => setDiff(d)} />
        ))}
      </Row>
    </div>
  );

  // PCB Process Information collapsible
  const PcbProcessSection = (
    <ColSection title="PCB Process Information">
      <Row label="PCB Thickness">
        <div className="flex flex-wrap gap-1">
          {["0.4mm","0.6mm","0.8mm","1.0mm","1.2mm","1.6mm","2.0mm","2.4mm","3.0mm","3.8mm","4.0mm"].map(t => (
            <Chip key={t} label={t} selected={thick === t} onClick={() => setThick(t)} />
          ))}
        </div>
      </Row>
      <Row label="TG Rating">
        {["TG130","TG135","TG150","TG155","TG170"].map(t => (
          <Chip key={t} label={t} selected={tg === t} onClick={() => setTg(t)} />
        ))}
      </Row>
      <Row label="Solder mask color">
        <div className="flex flex-wrap gap-1.5">
          {maskColors.map(c => (
            <button
              key={c.name} type="button" onClick={() => setMask(c.name)}
              className="flex items-center gap-1 px-2 py-1 text-xs rounded border transition-all"
              style={{
                borderColor: mask === c.name ? "#16a34a" : "#d1d5db",
                background: mask === c.name ? "#f0fdf4" : "#fff",
                color: mask === c.name ? "#15803d" : "#4b5563",
              }}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: c.bg, border: c.name === "White" ? "1px solid #ccc" : "none" }}
              />
              {c.name}
            </button>
          ))}
        </div>
      </Row>
      <Row label="Silkscreen">
        {["White","Black","None"].map(s => (
          <Chip key={s} label={s} selected={silk === s} onClick={() => setSilk(s)} />
        ))}
      </Row>
      <Row label="Outer Copper Weight">
        <div className="flex flex-wrap gap-1">
          {["1 oz","1.5 oz","2 oz","3 oz","4 oz","5 oz","6 oz","7 oz","8 oz","9 oz","10 oz","11 oz","12 oz","13 oz","14 oz","15 oz"].map(w => (
            <Chip key={w} label={w} selected={copper === w} onClick={() => setCopper(w)} />
          ))}
        </div>
      </Row>
      <Row label="Surface finish">
        {["HASL with lead","Lead Free HASL","ENIG (Immersion Gold)","OSP"].map(s => (
          <Chip key={s} label={s} selected={surf === s} onClick={() => setSurf(s)} />
        ))}
      </Row>
    </ColSection>
  );

  // High-spec Options collapsible
  const HighSpecSection = (
    <ColSection title="High-spec Options" defaultOpen={false}>
      <Row label="Min trackspacing">
        {["3/mil","4/mil","5/mil","6/mil","8/mil","10/13mil","20/20mil"].map(t => (
          <Chip key={t} label={t} selected={track === t} onClick={() => setTrack(t)} />
        ))}
      </Row>
      <Row label="Min drill hole">
        <div className="flex flex-wrap gap-1">
          {["0.12mm","0.2mm","0.25mm","0.3mm","0.35mm","0.4mm","0.6mm","0.8mm","0.1mm"].map(d => (
            <Chip key={d} label={d} selected={drill === d} onClick={() => setDrill(d)} />
          ))}
        </div>
      </Row>
      <Row label="Via Processing">
        <div className="flex flex-col gap-1 w-full">
          {["Via Covering with Solder Mask","Via Opening (Exposed Vias)","Via Filling with Solder Mask and Silkscreen Printing"].map(v => (
            <Chip key={v} label={v} selected={via === v} onClick={() => setVia(v)} />
          ))}
          <p className="text-[11px] text-green-600 mt-1">
            Resin Filled Vias with Copper Plated Cap &nbsp;·&nbsp; Via Filling with Solder Mask (Aluminum Sheet Assisted)
          </p>
          <p className="text-[11px] text-orange-500">
            * Via over the plugging limit will be tested by default. To accept reduced-diameter plugging, please note in remarks.
            Gerber files take precedence — this option will be ignored
          </p>
        </div>
      </Row>
      <Row label="Test method">
        <div className="flex flex-col gap-1 w-full">
          {["100% flying probe testing","Engineering limit failure"].map(t => (
            <Chip key={t} label={t} selected={testm === t} onClick={() => setTestm(t)} />
          ))}
          <p className="text-[11px] text-green-600 mt-1">
            * Specify impedance trace locations and values in the document, and upload with PCB files
          </p>
        </div>
      </Row>
      <Row label="Impedance control">
        {["Yes","No"].map(v => (
          <Chip key={v} label={v} selected={imp === v} onClick={() => setImp(v)} />
        ))}
      </Row>
      <Row label="Profiling Method">
        <Chip label="Mold Forming" selected={true} onClick={() => {}} />
      </Row>
      <Row label="Pre-Plating process">
        <Chip label="Electroless copper plating" selected={true} onClick={() => {}} />
      </Row>
      <Row label="Special technique">
        <div className="flex flex-wrap gap-1">
          {["Metallization edge","Carbon ink","Serial number","Blue-glue","Countersunk hole/Step hole","Crimp connection hole","CTI600"].map(t => (
            <Chip key={t} label={t} selected={specTech.includes(t)} onClick={() => setSpecTech(prev => toggleArr(prev, t))} />
          ))}
        </div>
      </Row>
    </ColSection>
  );

  // PCB Shipping Requirements collapsible
  const PcbShippingSection = (
    <ColSection title="PCB Shipping Requirements" defaultOpen={false}>
      <Row label="Quality compensation">
        <div className="flex flex-col gap-1 w-full">
          {["According to standard product contract","Full component compensation (Exclusive to premium orders)"].map(q => (
            <Chip key={q} label={q} selected={qcomp === q} onClick={() => setQcomp(q)} />
          ))}
        </div>
      </Row>
      <Row label="4-Wire Kelvin Test">
        {["None","Full Testing"].map(k => (
          <Chip key={k} label={k} selected={kelvin === k} onClick={() => setKelvin(k)} />
        ))}
      </Row>
      <Row label="Confirm Production file">
        {["Yes","No"].map(v => (
          <Chip key={v} label={v} selected={cfile === v} onClick={() => setCfile(v)} />
        ))}
      </Row>
      <Row label="Test report">
        <div className="flex flex-wrap gap-1">
          {[
            "Quality assurance certificate","Electrical Testing","Final inspection",
            "Microsection measurement","Surface plating thickness test",
            "Solderability test","Ionic contamination test","Thermal stress test",
          ].map(t => (
            <Chip key={t} label={t} selected={treports.includes(t)} onClick={() => setTreports(prev => toggleArr(prev, t))} />
          ))}
        </div>
      </Row>
      <Row label="Test report type">
        {["Electronic","Paper"].map(t => (
          <Chip key={t} label={t} selected={trtype === t} onClick={() => setTrtype(t)} />
        ))}
      </Row>
      <Row label="Board Outline Tolerance">
        {["Standard routing ±0.2mm","Precision routing ±0.1mm"].map(t => (
          <Chip key={t} label={t} selected={btol === t} onClick={() => setBtol(t)} />
        ))}
      </Row>
      <Row label="IPC level">
        {["IPC-II","IPC-III"].map(l => (
          <Chip key={l} label={l} selected={ipc === l} onClick={() => setIpc(l)} />
        ))}
      </Row>
      <Row label="Interleaving paper">
        {["Yes","No"].map(v => (
          <Chip key={v} label={v} selected={interleave === v} onClick={() => setInterleave(v)} />
        ))}
      </Row>
      <Row label="If Data Conflicts">
        {["Follow Order Parameters","Follow Files","Ask for Confirmation"].map(d => (
          <Chip key={d} label={d} selected={dconflict === d} onClick={() => setDconflict(d)} />
        ))}
      </Row>
      <Row label="Add PO No.">
        <input
          type="text" value={poNo} onChange={e => setPoNo(e.target.value)}
          className="w-48 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none"
        />
      </Row>
      <Row label="Ref. Order No.">
        <input
          type="text" value={refNo} onChange={e => setRefNo(e.target.value)}
          className="w-48 border border-green-400 rounded px-3 py-1 text-sm focus:outline-none"
        />
      </Row>
      <Row label="Special requirement">
        <textarea
          value={pcbSpecial} onChange={e => setPcbSpecial(e.target.value)}
          rows={4}
          placeholder="Please fill in your special requirements for the PCB order(within 5-1000 characters)"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none resize-y"
        />
      </Row>
    </ColSection>
  );

  // Shared addon bar template
  function AddonBar({ title, on, onToggle }: { title: string; on: boolean; onToggle: () => void }) {
    return (
      <div className="flex items-center justify-between px-5 py-3 bg-green-50 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">⚡</span>
          <span className="text-sm font-semibold text-green-800">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-orange-500 font-medium">Special Offers: Free assembly for 1-10 pieces</span>
          <Toggler on={on} flip={onToggle} />
        </div>
      </div>
    );
  }

  // Structural parts quote form
  function StructuralPartsForm() {
    const processes = ["CNC Machining", "3D Printing", "Sheet Metal Fabrication", "Vacuum Casting", "Injection Molding"];
    return (
      <div className="p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">Quote Files</p>
        <div className="bg-gray-50 border border-gray-200 rounded py-10 flex flex-col items-center gap-3 mb-6">
          <UpBtn label="Add structural files" accept=".step,.stp,.stl,.x_t,.iges,.igs,.sldprt,.zip,.pdf" />
          <p className="text-xs text-gray-500 text-center">
            3D CAD accepted: *.step, *.stp, *.stl, *.x_t, *.iges, *.igs, *.sldprt, *.zip, *.pdf
          </p>
        </div>
        <Row label="Production process" required>
          <div className="flex flex-wrap gap-2">{processes.map(process => <Chip key={process} label={process} selected={structuralProcess === process} onClick={() => setStructuralProcess(process)} />)}</div>
        </Row>
        <Row label="Base Material" required>
          <select value={structuralMaterial} onChange={event => setStructuralMaterial(event.target.value)} className="w-72 border border-green-400 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-green-600"><option value="">Select a material</option><option>Aluminum 6061</option><option>Aluminum 7075</option><option>Stainless Steel 304</option><option>Stainless Steel 316L</option><option>Brass</option><option>Titanium</option><option>ABS</option><option>POM / Delrin</option><option>PEEK</option><option>Other / Engineer review</option></select>
        </Row>
        <Row label="Finishing">
          <select value={structuralFinish} onChange={event => setStructuralFinish(event.target.value)} className="w-72 border border-green-400 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-green-600"><option value="">Select a finish</option><option>As machined</option><option>Bead blasted</option><option>Anodized</option><option>Hard anodized</option><option>Polished</option><option>Powder coated</option><option>Plated</option><option>Other / Engineer review</option></select>
        </Row>
        <Row label="Quantity" required>
          <div className="flex items-center gap-2">
            <input
              type="number" value={cncQty} onChange={e => setCncQty(e.target.value)}
              className="w-20 border border-green-400 rounded px-2 py-1.5 text-sm focus:outline-none"
            />
            <span className="text-xs text-gray-500">pcs</span>
          </div>
        </Row>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavBar activePage="quote" />

      {/* Dark header */}
      <div style={{ background: "#1C2B1C" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <p className="text-xs uppercase tracking-widest mb-2 text-white/40">
            INSTANT PRICING · NO EMAIL WAIT
          </p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Get Your Quote
          </h1>
          <p className="text-sm mt-1 text-white/45">
            {product === "cnc" ? "Upload 3D CAD files and define the manufacturing process for engineering review." : "Configure specs or upload Gerber — price updates in real time."}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-6">

        {/* Product selector */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Select Product</p>
          <div className="flex gap-3 flex-wrap">
            {productTabs.map(tab => {
              const active = product === tab.key;
              return (
                <button
                  key={tab.key} type="button" onClick={() => setProduct(tab.key)}
                  className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded border-2 text-xs font-medium transition-all min-w-[120px] bg-white ${
                    active
                      ? "border-green-600 text-green-700 shadow-sm"
                      : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {tabIcons[tab.key](active)}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Info bar */}
        <div className="mb-4">
          <InfoBar title={barTitle[product]} />
        </div>

        {/* Two-column layout: form + pricing panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-5 items-start">

          {/* ── Left: form card ── */}
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">

            {/* PCB PROTOTYPE */}
            {product === "pcb" && (
              <>
                {PcbUploadBox}
                {PcbBasicRows}
                <div className="px-5 py-3 space-y-3">
                  {PcbProcessSection}
                  {HighSpecSection}
                  {PcbShippingSection}
                </div>
                <AddonBar title="PCB Assembly Service" on={pcbaOn} onToggle={() => setPcbaOn(o => !o)} />
                {pcbaOn && (
                  <div className="border-t border-gray-100">
                    <PcbaFormContent p={pcbaState} />
                    <div className="px-5 pb-3 space-y-3">
                      <PcbaShippingSection />
                    </div>
                  </div>
                )}
                <AddonBar title="Stencil" on={stencilOn} onToggle={() => setStencilOn(o => !o)} />
              </>
            )}

            {/* PCB ASSEMBLY */}
            {product === "pcba" && (
              <>
                <PcbaFormContent p={pcbaState} />
                <div className="px-5 pb-3 space-y-3">
                  <PcbaShippingSection />
                </div>
                <div className="border-t border-gray-200 px-5 pt-4 pb-2">
                  <InfoBar title="PCB Specification Selection" />
                </div>
                {PcbUploadBox}
                {PcbBasicRows}
                <div className="px-5 py-3 space-y-3">
                  {PcbProcessSection}
                  {HighSpecSection}
                  {PcbShippingSection}
                </div>
                <AddonBar title="Stencil" on={stencilOn} onToggle={() => setStencilOn(o => !o)} />
              </>
            )}

            {/* Structural Parts */}
            {product === "cnc" && <StructuralPartsForm />}

            {/* Footer row */}
            <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-200">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your Email*"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-600"
              />
              <input
                type="tel" value={tel} onChange={e => setTel(e.target.value)}
                placeholder="Your Tel"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-600"
              />
              <button
                type="button"
                onClick={() => navigate("/account/cart")}
                className="flex items-center gap-2 px-7 py-2 text-white text-sm font-semibold rounded transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ background: "#15803d" }}
              >
                <ShoppingCart size={15} /> Add to Cart
              </button>
            </div>
          </div>

          {/* ── Right: pricing panel ── */}
          <PricingPanel
            product={product}
            pcbaOn={pcbaOn}
            qty={qty}
            layers={layers}
            onCart={() => navigate("/account/cart")}
          />
        </div>
      </div>
    </div>
  );
}
