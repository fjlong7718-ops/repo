import { useState } from "react";
import { Search, Smile, Paperclip, Image, Send } from "lucide-react";

type ReadTab = "All" | "Read" | "Unread";

interface Conversation {
  id: string;
  title: string;
  orderNo?: string;
  preview: string;
  time: string;
  unread: boolean;
  isSystem?: boolean;
}

interface Message {
  id: string;
  text: React.ReactNode;
  time: string;
}

const CONVERSATIONS: Conversation[] = [
  { id: "c1", title: "Order number:",   orderNo: "2507289774", preview: "Your order has been submitted successfully and is currently...", time: "07-28 13:41", unread: false },
  { id: "c2", title: "Order number:",   orderNo: "HB120087XT3", preview: "Your order has been submitted successfully and is currently...", time: "07-24 14:13", unread: false },
  { id: "c3", title: "Order number:",   orderNo: "HA120087XT2", preview: "Your order has been submitted successfully and is currently...", time: "07-23 10:49", unread: true },
  { id: "c4", title: "Order number:",   orderNo: "HA120087XT1", preview: "Your order has been submitted successfully and is currently...", time: "07-23 09:25", unread: false },
  { id: "c5", title: "System Message",  preview: "Dear customer, we have issued a $10 welcome coupon to...", time: "07-22 17:44", unread: false, isSystem: true },
];

const RED = "#EF4444";
const G = "#1A5C2A";

const SYSTEM_MESSAGES: Message[] = [
  {
    id: "m1", time: "2026-07-22 17:44",
    text: (
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>Welcome gift · your $15 coupon has arrived</p>
        <p className="text-sm" style={{ color: "#374151" }}>
          Welcome to PCBasic ! As a new member, you've received a{" "}
          <span className="font-semibold" style={{ color: RED }}>$10 coupon</span> for your first order.
        </p>
        <a href="/account/coupons" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: RED }}>Use now→</a>
      </div>
    ),
  },
  {
    id: "m2", time: "",
    text: (
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>Profile complete · your $10 coupon is ready</p>
        <p className="text-sm" style={{ color: "#374151" }}>
          Thanks for completing your profile! As a reward, we've added a{" "}
          <span className="font-semibold" style={{ color: RED }}>$10 coupon</span> to your account.
        </p>
        <a href="/account/coupons" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: RED }}>Use now→</a>
      </div>
    ),
  },
  {
    id: "m3", time: "",
    text: (
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>Thanks for your order · enjoy a $20 coupon</p>
        <p className="text-sm" style={{ color: "#374151" }}>
          Your order HA120087XT1 is complete. As a thank-you, here's a{" "}
          <span className="font-semibold" style={{ color: RED }}>$20 coupon</span> for your next PCBA order.
          We look forward to your next project ! Valid until 2028-08-31.
        </p>
        <a href="/account/coupons" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: RED }}>Use now→</a>
      </div>
    ),
  },
  {
    id: "m4", time: "",
    text: (
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>Thanks for your order · enjoy a $10 coupon</p>
        <p className="text-sm" style={{ color: "#374151" }}>
          Your order HB120087XT3 is complete. As a thank-you, here's a{" "}
          <span className="font-semibold" style={{ color: RED }}>$10 coupon</span> for your next PCB order.
          We look forward to your next project ! Valid until 2028-08-31.
        </p>
        <a href="/account/coupons" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: RED }}>Use now→</a>
      </div>
    ),
  },
  {
    id: "m5", time: "",
    text: (
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>Thanks for your order · enjoy a $10 coupon</p>
        <p className="text-sm" style={{ color: "#374151" }}>
          Your order HD120087XT1 is complete. As a thank-you, here's a{" "}
          <span className="font-semibold" style={{ color: RED }}>$10 coupon</span> for your next CNC order.
          We look forward to your next project ! Valid until 2028-08-31.
        </p>
        <a href="/account/coupons" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: RED }}>Use now→</a>
      </div>
    ),
  },
];

export default function MessageCenter() {
  const [readTab, setReadTab] = useState<ReadTab>("All");
  const [activeId, setActiveId] = useState("c5");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  const activeConv = CONVERSATIONS.find(c => c.id === activeId)!;

  const filtered = CONVERSATIONS.filter(c => {
    if (readTab === "Read") return !c.unread;
    if (readTab === "Unread") return c.unread;
    return true;
  }).filter(c =>
    search ? (c.orderNo ?? c.title).toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="flex h-[calc(100vh-56px)]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Left panel: conversation list ── */}
      <div className="w-72 shrink-0 flex flex-col border-r" style={{ borderColor: "#E5E7EB", background: "#fff" }}>
        {/* Search */}
        <div className="px-3 py-3 border-b" style={{ borderColor: "#F3F4F6" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded border bg-white"
            style={{ borderColor: "#E5E7EB" }}>
            <Search size={13} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Please enter the order search"
              className="flex-1 text-xs outline-none bg-transparent" style={{ color: "#374151" }} />
          </div>
        </div>

        {/* Read tabs */}
        <div className="flex border-b" style={{ borderColor: "#F3F4F6" }}>
          {(["All", "Read", "Unread"] as ReadTab[]).map(t => (
            <button key={t} onClick={() => setReadTab(t)}
              className="flex-1 py-2 text-xs border-b-2 transition-colors"
              style={{
                borderColor: readTab === t ? G : "transparent",
                color: readTab === t ? G : "#6B7280",
                fontWeight: readTab === t ? 600 : 400,
                background: "transparent",
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map(conv => {
            const isActive = conv.id === activeId;
            return (
              <button key={conv.id} onClick={() => setActiveId(conv.id)}
                className="w-full text-left px-4 py-3 border-b transition-colors"
                style={{
                  borderColor: "#F3F4F6",
                  background: isActive ? "#F0FDF4" : "#fff",
                  borderLeft: isActive ? `3px solid ${G}` : "3px solid transparent",
                }}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold truncate max-w-[140px]"
                    style={{ color: isActive ? G : "#111827" }}>
                    {conv.title}{" "}
                    {conv.orderNo && <span style={{ color: isActive ? G : "#374151" }}>{conv.orderNo}</span>}
                  </span>
                  <span className="text-[10px] shrink-0 ml-2" style={{ color: "#9CA3AF" }}>{conv.time}</span>
                </div>
                <p className="text-xs truncate" style={{ color: isActive ? G : "#9CA3AF" }}>
                  {conv.preview}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right panel: message detail ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: "#E5E7EB" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>
              {activeConv.isSystem ? "System Message" : `Order: ${activeConv.orderNo}`}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold"
                style={{ background: G, color: "#fff" }}>P</div>
              <span className="text-xs" style={{ color: "#6B7280" }}>Pcbasic</span>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>🕐 2026-07-22 17:44</span>
            </div>
          </div>
          <button className="p-2 rounded hover:bg-gray-50 transition-colors" style={{ color: "#9CA3AF" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Date separator */}
          <div className="flex items-center justify-center">
            <span className="text-[11px] px-3 py-0.5 rounded-full" style={{ background: "#F3F4F6", color: "#9CA3AF" }}>
              2026-07-22 17:44
            </span>
          </div>

          {/* System message bubbles */}
          {SYSTEM_MESSAGES.map(msg => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs mt-0.5"
                style={{ background: G, color: "#fff" }}>P</div>
              <div className="flex-1 max-w-xl rounded-lg px-4 py-3"
                style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="border-t" style={{ borderColor: "#E5E7EB" }}>
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 pt-2 pb-1">
            <button className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#9CA3AF" }}>
              <Smile size={18} />
            </button>
            <button className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#9CA3AF" }}>
              <Paperclip size={18} />
            </button>
            <button className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#9CA3AF" }}>
              <Image size={18} />
            </button>
          </div>
          {/* Input row */}
          <div className="flex items-center gap-3 px-4 pb-4">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setInput("")}
              placeholder="Please enter a message..."
              className="flex-1 px-3 py-2 rounded border text-sm outline-none"
              style={{ borderColor: "#E5E7EB", color: "#374151" }} />
            <button
              onClick={() => setInput("")}
              className="px-4 py-2 text-sm font-medium rounded transition-colors"
              style={{ background: input.trim() ? G : "#F3F4F6", color: input.trim() ? "#fff" : "#9CA3AF" }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
