// Lightweight stub pages for account sub-routes

import type React from "react";
import { MapPin, CreditCard, Bell, Users, Settings, Plus } from "lucide-react";

function PageShell({ icon: Icon, title, sub, children }: {
  icon: React.ElementType; title: string; sub: string; children: React.ReactNode;
}) {
  return (
    <div className="px-8 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#1A1A2E" }}>{title}</h1>
        <p className="text-sm mt-1" style={{ color: "#5C5C75" }}>{sub}</p>
      </div>
      {children}
    </div>
  );
}

// ── Addresses ────────────────────────────────────────────────────────────────

const ADDRESSES = [
  { id: 1, name: "Mil (Default)", line1: "1234 Innovation Drive, Suite 500", city: "San Jose, CA 95110", country: "United States", default: true },
  { id: 2, name: "Office",        line1: "88 Tech Park Road",                city: "Singapore 138565",  country: "Singapore",      default: false },
];

export function Addresses() {
  return (
    <PageShell icon={MapPin} title="Addresses" sub="Manage your shipping addresses">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {ADDRESSES.map(addr => (
          <div key={addr.id} className="bg-white rounded-lg border p-5 relative" style={{ borderColor: addr.default ? "#1A5C2A" : "#E5E2DB" }}>
            {addr.default && (
              <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#FEF2F2", color: "#1A5C2A" }}>Default</span>
            )}
            <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A2E" }}>{addr.name}</p>
            <p className="text-xs" style={{ color: "#5C5C75" }}>{addr.line1}</p>
            <p className="text-xs" style={{ color: "#5C5C75" }}>{addr.city}</p>
            <p className="text-xs" style={{ color: "#5C5C75" }}>{addr.country}</p>
            <div className="flex gap-3 mt-3">
              <button className="text-xs font-medium" style={{ color: "#1A5C2A" }}>Edit</button>
              {!addr.default && <button className="text-xs" style={{ color: "#8B8BA0" }}>Set default</button>}
            </div>
          </div>
        ))}
        <button className="bg-white rounded-lg border border-dashed p-5 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors" style={{ borderColor: "#D4D4DA" }}>
          <Plus size={20} color="#8B8BA0" />
          <span className="text-sm" style={{ color: "#8B8BA0" }}>Add address</span>
        </button>
      </div>
    </PageShell>
  );
}

// ── Payment Methods ───────────────────────────────────────────────────────────

const CARDS = [
  { brand: "Visa", last4: "4242", expiry: "12/28", default: true },
  { brand: "Mastercard", last4: "8888", expiry: "06/27", default: false },
];

export function PaymentMethods() {
  return (
    <PageShell icon={CreditCard} title="Payment Methods" sub="Your saved payment methods">
      <div className="space-y-3 mb-4">
        {CARDS.map(card => (
          <div key={card.last4} className="flex items-center gap-4 bg-white rounded-lg border px-5 py-4" style={{ borderColor: card.default ? "#1A5C2A" : "#E5E2DB" }}>
            <div className="w-10 h-7 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "#1A1A2E", color: "#C9A84C" }}>{card.brand[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{card.brand} •••• {card.last4}</p>
              <p className="text-xs" style={{ color: "#8B8BA0" }}>Expires {card.expiry}</p>
            </div>
            {card.default && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#FEF2F2", color: "#1A5C2A" }}>Default</span>}
          </div>
        ))}
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border rounded" style={{ borderColor: "#1A5C2A", color: "#1A5C2A" }}>
        <Plus size={14} /> Add payment method
      </button>
    </PageShell>
  );
}

// ── Notifications ─────────────────────────────────────────────────────────────

const NOTIFS = [
  { title: "Order PC20260617-042 is now In Production", time: "2 hours ago", read: false },
  { title: "DFM review complete for your last upload",   time: "5 hours ago", read: false },
  { title: "Order PC20260614-031 has been shipped",      time: "3 days ago",  read: true },
  { title: "Your quote has been saved",                  time: "5 days ago",  read: true },
];

export function Notifications() {
  return (
    <PageShell icon={Bell} title="Notifications" sub="Stay updated on your orders">
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#E5E2DB" }}>
        {NOTIFS.map((n, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-4 border-b last:border-0 transition-colors"
            style={{ borderColor: "#E5E2DB", background: n.read ? "#fff" : "#FEF2F2" }}>
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: n.read ? "#D4D4DA" : "#1A5C2A" }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: n.read ? "#5C5C75" : "#1A1A2E", fontWeight: n.read ? 400 : 500 }}>{n.title}</p>
              <p className="text-xs mt-0.5" style={{ color: "#8B8BA0" }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

// ── Team Management ───────────────────────────────────────────────────────────

const MEMBERS = [
  { name: "Mil",       email: "mil@pcbasic.com",   role: "Owner",  avatar: "M" },
  { name: "Alex Chen", email: "alex@pcbasic.com",  role: "Admin",  avatar: "A" },
  { name: "Sarah K.",  email: "sarah@pcbasic.com", role: "Member", avatar: "S" },
];

export function TeamManagement() {
  return (
    <PageShell icon={Users} title="Team Management" sub="Manage your team's access">
      <div className="bg-white rounded-lg border overflow-hidden mb-4" style={{ borderColor: "#E5E2DB" }}>
        <table className="w-full">
          <thead style={{ background: "#1A1A2E" }}>
            <tr>
              {["Member", "Role", ""].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white/70">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "#E5E2DB" }}>
            {MEMBERS.map(m => (
              <tr key={m.email} className="hover:bg-[#FEF2F2] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{ background: "#1A5C2A", color: "#fff" }}>{m.avatar}</div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{m.name}</p>
                      <p className="text-xs" style={{ color: "#8B8BA0" }}>{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2 py-1 rounded-full" style={{
                    background: m.role === "Owner" ? "#FDF8EC" : m.role === "Admin" ? "#EFF6FF" : "#F8F7F4",
                    color:      m.role === "Owner" ? "#9E8138"  : m.role === "Admin" ? "#1E40AF"  : "#5C5C75",
                  }}>{m.role}</span>
                </td>
                <td className="px-5 py-4">
                  {m.role !== "Owner" && (
                    <button className="text-xs" style={{ color: "#8B8BA0" }}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border rounded" style={{ borderColor: "#1A5C2A", color: "#1A5C2A" }}>
        <Plus size={14} /> Invite member
      </button>
    </PageShell>
  );
}

// ── Account Settings ──────────────────────────────────────────────────────────

export function AccountSettings() {
  return (
    <PageShell icon={Settings} title="Account Settings" sub="Manage your profile and preferences">
      <div className="space-y-5">
        {[
          { label: "Full Name",     defaultVal: "Mil",              type: "text"  },
          { label: "Email",         defaultVal: "mil@pcbasic.com",  type: "email" },
          { label: "Phone",         defaultVal: "+1 (408) 000-0000",type: "tel"   },
          { label: "Company",       defaultVal: "PCBasic",          type: "text"  },
        ].map(field => (
          <div key={field.label}>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#5C5C75" }}>
              {field.label}
            </label>
            <input type={field.type} defaultValue={field.defaultVal}
              className="w-full px-3 py-2.5 text-sm rounded border outline-none transition-all"
              style={{ borderColor: "#E5E2DB", color: "#1A1A2E", background: "#fff" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#1A5C2A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E5E2DB")} />
          </div>
        ))}
        <div className="pt-2">
          <button className="px-6 py-2.5 text-sm font-semibold text-white rounded" style={{ background: "#1A5C2A" }}>
            Save Changes
          </button>
        </div>

        {/* Danger zone */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E5E2DB" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#1A1A2E" }}>Danger Zone</p>
          <p className="text-xs mb-3" style={{ color: "#8B8BA0" }}>Permanently delete your account and all associated data.</p>
          <button className="px-4 py-2 text-sm font-medium border rounded" style={{ borderColor: "#EF4444", color: "#EF4444" }}>
            Delete Account
          </button>
        </div>
      </div>
    </PageShell>
  );
}
