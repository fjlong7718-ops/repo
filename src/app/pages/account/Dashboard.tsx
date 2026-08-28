import { ClipboardList, ShoppingCart, Clock, Award, ArrowRight, CheckCircle, Truck } from "lucide-react";
import { NavLink } from "react-router";

const RECENT_ORDERS = [
  { id: "PC20260617-042", status: "In Production", statusColor: "#3B82F6", statusBg: "#EFF6FF", items: "5× 2L PCB · ENIG · 100×100mm", total: "$42.50", date: "Jun 17, 2026" },
  { id: "PC20260614-031", status: "Shipped",       statusColor: "#166534", statusBg: "#F0FDF4", items: "10× 4L PCB · HASL · 80×60mm",  total: "$89.00", date: "Jun 14, 2026" },
  { id: "PC20260610-019", status: "Delivered",     statusColor: "#166534", statusBg: "#F0FDF4", items: "50× PCBA Turnkey",              total: "$312.00",date: "Jun 10, 2026" },
];

const STAT_CARDS = [
  { icon: ClipboardList, label: "Total Orders",    value: "24",    sub: "3 active",      color: "#1A5C2A" },
  { icon: ShoppingCart,  label: "Cart Items",      value: "3",     sub: "$128.50 est.",  color: "#3B82F6" },
  { icon: Clock,         label: "Avg. Lead Time",  value: "2.4d",  sub: "last 6 orders", color: "#F59E0B" },
  { icon: Award,         label: "Satisfaction",    value: "99.6%", sub: "your rating",   color: "#C9A84C" },
];

export default function Dashboard() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A2E" }}>
          Welcome back, Mil 👋
        </h1>
        <p className="text-sm" style={{ color: "#5C5C75" }}>Here's what's happening with your account today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-lg p-5 border" style={{ borderColor: "#E5E2DB" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: `${color}14` }}>
                <Icon size={18} color={color} />
              </div>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ color: "#1A1A2E", fontFamily: "'Outfit', sans-serif" }}>{value}</p>
            <p className="text-xs font-medium mb-0.5" style={{ color: "#1A1A2E" }}>{label}</p>
            <p className="text-xs" style={{ color: "#8B8BA0" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-lg border" style={{ borderColor: "#E5E2DB" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#E5E2DB" }}>
          <h2 className="text-base font-semibold" style={{ color: "#1A1A2E" }}>Recent Orders</h2>
          <NavLink to="/account/orders" className="text-xs font-medium flex items-center gap-1" style={{ color: "#1A5C2A" }}>
            View all <ArrowRight size={12} />
          </NavLink>
        </div>
        <div className="divide-y" style={{ borderColor: "#E5E2DB" }}>
          {RECENT_ORDERS.map((o) => (
            <div key={o.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: "#F8F7F4" }}>
                  <ClipboardList size={16} color="#5C5C75" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold font-mono" style={{ color: "#1A1A2E" }}>{o.id}</p>
                  <p className="text-xs truncate" style={{ color: "#8B8BA0" }}>{o.items}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: o.statusBg, color: o.statusColor }}>
                  {o.status}
                </span>
                <p className="text-sm font-bold" style={{ color: "#1A5C2A" }}>{o.total}</p>
                <p className="text-xs hidden lg:block" style={{ color: "#8B8BA0" }}>{o.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { icon: CheckCircle, label: "New Quote",    sub: "Start a PCB / PCBA quote",  href: "/", color: "#1A5C2A" },
          { icon: Truck,       label: "Track Order",  sub: "Check manufacturing status", href: "/account/orders", color: "#3B82F6" },
          { icon: ClipboardList,label: "Reorder",     sub: "Repeat a previous order",    href: "/account/orders", color: "#22C55E" },
        ].map(({ icon: Icon, label, sub, href, color }) => (
          <NavLink key={label} to={href}
            className="flex items-start gap-3 bg-white rounded-lg p-4 border transition-all"
            style={{ borderColor: "#E5E2DB" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E2DB")}>
            <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: `${color}12` }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{label}</p>
              <p className="text-xs" style={{ color: "#8B8BA0" }}>{sub}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
