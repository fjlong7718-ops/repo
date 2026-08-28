import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { LogOut, MessageSquare, Bell, ChevronDown, Globe } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  path: string;
  badge?: number;
  badgeColor?: string;
  reward?: string;
}

const ORDERS_NAV: NavItem[] = [
  { id: "cart",              label: "Cart",                path: "/account/cart",                              badge: 4 },
  { id: "orders",            label: "My Orders",           path: "/account/orders",                            badge: 7 },
  { id: "unfinished",        label: "Unfinished Payment",  path: "/account/orders?status=unfinished",          badge: 1 },
  { id: "in-production",     label: "In Production",       path: "/account/orders?status=in-production",       badge: 2 },
  { id: "shipped",           label: "Shipped",             path: "/account/orders?status=shipped",             badge: 1 },
  { id: "pay-difference",    label: "Pay The Difference",  path: "/account/orders?status=pay-difference",      badge: 1 },
  { id: "awaiting-feedback", label: "Awaiting Feedback",   path: "/account/orders?status=awaiting-feedback",   badge: 1 },
  { id: "completed",         label: "Completed",           path: "/account/orders?status=completed" },
];

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "PT", label: "Português" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
];

const ACCOUNT_NAV: NavItem[] = [
  { id: "profile",   label: "My Profile",       path: "/account/profile", reward: "+$10" },
  { id: "messages",  label: "Message Center",   path: "/account/notifications", badge: 2, badgeColor: "#EF4444" },
  { id: "password",  label: "Password Change",  path: "/account/password" },
  { id: "address",   label: "Shipping Address", path: "/account/addresses" },
  { id: "coupons",   label: "Coupons",          path: "/account/coupons",       badge: 5 },
];

const G = "#1A5C2A";
const DIVIDER = "#E8F0E9";
const TEXT_DIM = "#9CA3AF";
const TEXT_MID = "#6B7280";

const PATH_LABELS: Record<string, string> = {
  "/account":               "Dashboard",
  "/account/cart":          "Cart",
  "/account/checkout":      "Checkout",
  "/account/orders":        "My Orders",
  "/account/profile":       "My Profile",
  "/account/notifications": "Message Center",
  "/account/password":      "Password Change",
  "/account/addresses":     "Shipping Address",
  "/account/coupons":       "Coupons",
  "/account/payment":       "Payment Methods",
  "/account/settings":      "Account Settings",
  "/account/team":          "Team Management",
};

function SideNavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      to={item.path}
      className="flex items-center px-3 py-2 rounded text-sm transition-colors"
      style={{
        background: active ? G : "transparent",
        color: active ? "#fff" : TEXT_MID,
        fontWeight: active ? 600 : 400,
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = "#F0F7F1";
          (e.currentTarget as HTMLElement).style.color = G;
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = TEXT_MID;
        }
      }}
    >
      <span className="flex-1">{item.label}</span>
      {item.reward && (
        <span
          className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded"
          style={{
            background: active ? "rgba(255,255,255,0.2)" : "#FEF3C7",
            color: active ? "#FDE68A" : "#92400E",
            border: active ? "1px solid rgba(255,255,255,0.25)" : "1px solid #FDE68A",
          }}
        >
          {item.reward}
        </span>
      )}
      {item.badge != null && (
        <span style={{ color: active ? "rgba(255,255,255,0.75)" : (item.badgeColor ?? TEXT_DIM) }}>
          ({item.badge})
        </span>
      )}
    </Link>
  );
}

export default function AccountLayout() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const navigate = useNavigate();
  const location = useLocation();

  // On order detail pages, restore the search string from the tab the user came from
  const detailFromSearch: string | undefined =
    location.pathname.startsWith("/account/orders/")
      ? (location.state as { fromSearch?: string } | null)?.fromSearch
      : undefined;

  const isNavActive = (item: NavItem) => {
    const [itemPath, itemQuery] = item.path.split("?");

    // Checkout is a sub-flow of Cart — keep Cart highlighted
    if (location.pathname === "/account/checkout") {
      return itemPath === "/account/cart" && !itemQuery;
    }

    if (location.pathname.startsWith("/account/orders/")) {
      // Match against where the user came from
      const fromSearch = detailFromSearch ?? "";
      if (itemPath !== "/account/orders") return false;
      if (!itemQuery) return !fromSearch; // "My Orders" — active only if no status filter
      const need = new URLSearchParams(itemQuery);
      const from = new URLSearchParams(fromSearch);
      for (const [k, v] of need) {
        if (from.get(k) !== v) return false;
      }
      return true;
    }

    if (location.pathname !== itemPath) return false;
    if (itemQuery) {
      const need = new URLSearchParams(itemQuery);
      const curr = new URLSearchParams(location.search);
      for (const [k, v] of need) {
        if (curr.get(k) !== v) return false;
      }
      return true;
    }
    return !location.search;
  };

  const pageLabel =
    PATH_LABELS[location.pathname] ??
    (location.pathname.startsWith("/account/orders/") ? "My Orders" : "My Account");

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", background: "#F5F9F5" }}>

      {/* ── Full-width top bar ── */}
      <header className="sticky top-0 z-20 bg-white border-b" style={{ borderColor: "#CDDECE" }}>
        <div className="max-w-full px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col shrink-0 leading-none">
            <span className="font-black tracking-tight leading-none"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", color: G, letterSpacing: "-0.02em" }}>
              PCBasic
            </span>
            <span className="text-[9px] font-medium tracking-wide"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#4A6B4D", letterSpacing: "0.04em" }}>
              Precision Manufacturing. Under Your Control
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button type="button" aria-haspopup="listbox" aria-expanded={languageOpen} onClick={() => setLanguageOpen(open => !open)} className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#5C5C75] hover:bg-secondary"><Globe size={14}/>{language}<ChevronDown size={12}/></button>
              {languageOpen && <><button type="button" aria-label="Close language menu" className="fixed inset-0 z-30 cursor-default" onClick={() => setLanguageOpen(false)}/><div role="listbox" aria-label="Choose language" className="absolute right-0 top-full z-40 mt-2 w-40 overflow-hidden rounded-sm border border-gray-200 bg-white py-1 shadow-xl">{LANGUAGES.map(option => <button key={option.code} type="button" role="option" aria-selected={language === option.code} onClick={() => { setLanguage(option.code); setLanguageOpen(false); }} className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"><span>{option.label}</span><span className="text-xs text-gray-400">{option.code}</span></button>)}</div></>}
            </div>
            <Link to="/account/notifications" aria-label="Message Center, 2 unread messages" className="relative p-2 rounded-md hover:bg-secondary transition-colors" style={{ color: "#5C5C75" }}>
              <Bell size={18} />
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">2</span>
            </Link>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: G, color: "#fff" }}>M</div>
          </div>
        </div>
      </header>

      {/* ── Below navbar: sidebar + content ── */}
      {location.pathname === "/account/checkout" ? (
        /* Checkout: full-width, no sidebar, no page-title bar */
        <main className="flex-1" style={{ background: "#F5F9F5" }}>
          <Outlet />
        </main>
      ) : (
        <div className="flex flex-1 items-start">

          {/* Sidebar */}
          <aside className="w-60 shrink-0 min-h-full"
            style={{ background: "#fff", borderRight: `1px solid ${DIVIDER}` }}>
            <nav className="py-4">

              {/* My Orders */}
              <p className="px-5 pb-1.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: TEXT_DIM }}>My Orders</p>
              <div className="px-3 mb-4">
                {ORDERS_NAV.map(item => (
                  <SideNavLink key={item.id} item={item} active={isNavActive(item)} />
                ))}
              </div>

              {/* My Account */}
              <p className="px-5 pb-1.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: TEXT_DIM }}>My Account</p>
              <div className="px-3">
                {ACCOUNT_NAV.map(item => (
                  <SideNavLink key={item.id} item={item} active={isNavActive(item)} />
                ))}
              </div>

              {/* User card */}
              <div className="px-4 pt-6 pb-4 mt-4" style={{ borderTop: `1px solid ${DIVIDER}` }}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ background: G, color: "#fff" }}>M</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#162018" }}>PCBasic</p>
                    <p className="text-xs mt-0.5" style={{ color: TEXT_DIM }}>JS@pcbasic.com</p>
                  </div>
                  <button
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                    style={{ color: G, background: "#E8F0E9" }}
                    onMouseEnter={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#E8F0E9"; e.currentTarget.style.color = G; }}>
                    <MessageSquare size={12} /> Live Chat
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: TEXT_DIM }}
                    onMouseEnter={e => e.currentTarget.style.color = "#6B7280"}
                    onMouseLeave={e => e.currentTarget.style.color = TEXT_DIM}>
                    <LogOut size={12} /> Sign Out
                  </button>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Page title bar */}
            <div className="h-12 flex items-center px-8 border-b bg-white"
              style={{ borderColor: DIVIDER }}>
              <h1 className="text-base font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: "#162018" }}>
                {pageLabel}
              </h1>
            </div>
            <main className="flex-1" style={{ background: "#F5F9F5" }}>
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
