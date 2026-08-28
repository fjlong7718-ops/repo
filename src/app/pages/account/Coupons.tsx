import { useState } from "react";

type StatusTab = "Unused" | "Used" | "Expired";
type TypeTab = "All" | "PCB" | "PCBA" | "CNC" | "3D Printing";

interface Coupon {
  id: string;
  tag: string;
  name: string;
  amount: string;
  condition: string;
  validity: string;
  status: StatusTab;
  type: TypeTab;
}

const COUPONS: Coupon[] = [
  { id: "c1", tag: "ALL",  name: "New User Coupon - First Order", amount: "$10.00", condition: "For orders over $1 (excluding shipping)", validity: "Valid until Permanent",  status: "Unused",  type: "All" },
  { id: "c2", tag: "ALL",  name: "Profile Completion Reward",     amount: "$10.00", condition: "For orders over $1 (excluding shipping)", validity: "Valid until Permanent",  status: "Unused",  type: "All" },
  { id: "c3", tag: "PCBA", name: "Repeat Order Coupon",           amount: "$20.00", condition: "For orders over $300 (excluding shipping)",validity: "Valid until 2026.08.31", status: "Unused",  type: "PCBA" },
  { id: "c4", tag: "PCB",  name: "Repeat Order Coupon",           amount: "$10.00", condition: "For orders over $1 (excluding shipping)", validity: "Valid until 2026.08.31", status: "Unused",  type: "PCB" },
  { id: "c5", tag: "CNC",  name: "Repeat Order Coupon",           amount: "$10.00", condition: "For orders over $1 (excluding shipping)", validity: "Valid until 2026.08.31", status: "Unused",  type: "CNC" },
  { id: "c6", tag: "ALL",  name: "Holiday Discount",              amount: "$5.00",  condition: "For orders over $50 (excluding shipping)", validity: "Valid until 2025.12.31", status: "Used",    type: "All" },
  { id: "c7", tag: "PCB",  name: "New Year Special",              amount: "$15.00", condition: "For orders over $100 (excluding shipping)",validity: "Valid until 2025.01.31", status: "Expired", type: "PCB" },
];

const STATUS_TABS: StatusTab[] = ["Unused", "Used", "Expired"];
const TYPE_TABS: TypeTab[] = ["All", "PCB", "PCBA", "CNC", "3D Printing"];

const G = "#1A5C2A";

const TAG_STYLE: Record<string, { bg: string; color: string }> = {
  ALL:          { bg: "#E8F0E9", color: G },
  PCB:          { bg: "#E8F0E9", color: G },
  PCBA:         { bg: "#E8F0E9", color: G },
  CNC:          { bg: "#E8F0E9", color: G },
  "3D Printing":{ bg: "#E8F0E9", color: G },
};

function CouponCard({ coupon }: { coupon: Coupon }) {
  const tag = TAG_STYLE[coupon.tag] ?? { bg: "#E8F0E9", color: G };
  const isExpired = coupon.status === "Expired";
  const isUsed = coupon.status === "Used";
  const dimmed = isExpired || isUsed;

  return (
    <div className="flex rounded border overflow-hidden"
      style={{ borderColor: "#E5E7EB", opacity: dimmed ? 0.65 : 1 }}>
      {/* Left: amount strip */}
      <div className="flex flex-col items-center justify-center px-4 py-4 shrink-0"
        style={{ background: dimmed ? "#F9FAFB" : "#F0FDF4", minWidth: 90, borderRight: "1px dashed #D1FAE5" }}>
        <span className="text-xs font-bold mb-1 px-1.5 py-0.5 rounded"
          style={{ background: tag.bg, color: tag.color }}>{coupon.tag}</span>
        <span className="text-lg font-black mt-1" style={{ color: dimmed ? "#9CA3AF" : G }}>{coupon.amount}</span>
      </div>

      {/* Right: details */}
      <div className="flex flex-col justify-between px-4 py-3 flex-1 min-w-0">
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: dimmed ? "#9CA3AF" : "#111827" }}>
            {coupon.name}
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>{coupon.condition}</p>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{coupon.validity}</p>
        </div>
        <div className="mt-3">
          {coupon.status === "Unused" ? (
            <button type="button" onClick={() => window.open("/quote", "_blank", "noopener,noreferrer")} className="px-4 py-1 text-xs font-semibold rounded border transition-colors"
              style={{ borderColor: G, color: G, background: "#fff" }}
              onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = G; }}>
              Use Now
            </button>
          ) : (
            <span className="text-xs px-3 py-1 rounded border inline-block"
              style={{ borderColor: "#D1D5DB", color: "#9CA3AF" }}>
              {coupon.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Coupons() {
  const [statusTab, setStatusTab] = useState<StatusTab>("Unused");
  const [typeTab, setTypeTab] = useState<TypeTab>("All");

  const filtered = COUPONS.filter(c =>
    c.status === statusTab &&
    (typeTab === "All" || c.type === typeTab || c.tag === typeTab)
  );

  return (
    <div className="px-6 py-5 max-w-5xl w-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Status tabs — pill style */}
      <div className="flex items-center gap-2 mb-5">
        {STATUS_TABS.map(t => (
          <button key={t} onClick={() => setStatusTab(t)}
            className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
            style={{
              background: statusTab === t ? G : "#fff",
              color: statusTab === t ? "#fff" : "#374151",
              borderColor: statusTab === t ? G : "#D1D5DB",
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Type filter — underline tabs */}
      <div className="flex items-end border-b mb-5 gap-0" style={{ borderColor: "#E5E7EB" }}>
        {TYPE_TABS.map(t => (
          <button key={t} onClick={() => setTypeTab(t)}
            className="px-4 py-2 text-sm border-b-2 transition-colors whitespace-nowrap"
            style={{
              borderColor: typeTab === t ? G : "transparent",
              color: typeTab === t ? G : "#6B7280",
              fontWeight: typeTab === t ? 600 : 400,
              background: "transparent",
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Coupon grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(c => <CouponCard key={c.id} coupon={c} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-sm" style={{ color: "#9CA3AF" }}>
          No coupons found
        </div>
      )}
    </div>
  );
}
