import { useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router";
import { MessageCircle, Plus, Search, Star, X } from "lucide-react";
import { CncProductDetailDialog, PcbProductDetailDialog, ProductInformationDialog, type ProductDetailItem } from "./Cart";
import { PoNumberEditor } from "../../components/PoNumberEditor";

type OrderStatus =
  | "Unfinished Payment"
  | "In Production"
  | "Shipped"
  | "Pay the difference"
  | "Awaiting Feedback"
  | "Completed";

interface OrderItem {
  productNo: string;
  productName?: string;
  specs: string;
  poNo: string;
  buildTime: string;
  qty: string;
  weight: string;
  price: string;
  files: string[];
  status: OrderStatus;
  paymentMethod?: string;
}

interface OrderGroup {
  id: string;
  typeTag: string;
  orderNo: string;
  date: string;
  subtotal: string;
  items: OrderItem[];
}

const ORDERS: OrderGroup[] = [
  {
    id: "g1", typeTag: "PCB|PCBA", orderNo: "B200048", date: "2026-07-30  12:00:20", subtotal: "$46.00",
    items: [
      {
        productNo: "HB120087XT3", specs: "fr4, 2 Layers, 100 X 100mm, 1.6mm",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$28",
        files: ["Gerber-BR.zip"], status: "Unfinished Payment", paymentMethod: "Bank Transfer",
      },
      {
        productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], status: "Unfinished Payment", paymentMethod: "Bank Transfer",
      },
    ],
  },
  {
    id: "g2", typeTag: "PCB", orderNo: "B200049", date: "2026-07-30  12:00:00", subtotal: "$18.00",
    items: [
      {
        productNo: "HB120087XT3", specs: "fr4, 2 Layers, 100 X 100mm, 1.6mm",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip"], status: "In Production",
      },
    ],
  },
  {
    id: "g3", typeTag: "PCBA", orderNo: "B200050", date: "2026-07-30  12:00:00", subtotal: "$18.00",
    items: [
      {
        productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], status: "In Production",
      },
    ],
  },
  {
    id: "g4", typeTag: "PCBA", orderNo: "B200051", date: "2026-07-30  12:00:00", subtotal: "$18.00",
    items: [
      {
        productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], status: "Shipped",
      },
    ],
  },
  {
    id: "g5", typeTag: "PCBA", orderNo: "B200052", date: "2026-07-30  12:00:00", subtotal: "$18.00",
    items: [
      {
        productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], status: "Pay the difference",
      },
    ],
  },
  {
    id: "g6", typeTag: "PCBA", orderNo: "B200053", date: "2026-07-30  12:00:00", subtotal: "$18.00",
    items: [
      {
        productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], status: "Awaiting Feedback",
      },
    ],
  },
  {
    id: "g7", typeTag: "PCBA", orderNo: "B200054", date: "2026-07-30  12:00:00", subtotal: "$18.00",
    items: [
      {
        productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage",
        poNo: "12345", buildTime: "3 days", qty: "10PCS", weight: "0.32kg", price: "$18",
        files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], status: "Completed",
      },
    ],
  },
];

const PARAM_TO_STATUS: Record<string, OrderStatus> = {
  "unfinished":        "Unfinished Payment",
  "in-production":     "In Production",
  "shipped":           "Shipped",
  "pay-difference":    "Pay the difference",
  "awaiting-feedback": "Awaiting Feedback",
  "completed":         "Completed",
};

const TABS = [
  { label: "All Orders",          param: null,                count: 7 },
  { label: "Unfinished Payment",  param: "unfinished",        count: 1 },
  { label: "In Production",       param: "in-production",     count: 2 },
  { label: "Shipped",             param: "shipped",           count: 1 },
  { label: "Pay The Difference",  param: "pay-difference",    count: 1 },
  { label: "Awaiting Feedback",   param: "awaiting-feedback", count: 1 },
  { label: "Completed",           param: "completed",         count: 1 },
];

const G = "#1A5C2A";
const COL = "1fr 100px 110px 155px 175px 145px";
const ORDER_REMOVE_REASONS = [
  "Order review time is too long",
  "I wish to cancel the order immediately",
  "Price has increased",
  "Order details are incorrect, I would like to reorder",
  "Unprofessional customer service / my questions were not answered",
  "Other reasons",
];

function OrdersRemoveDialog({ onSubmit, onCancel }: { onSubmit: (reason: string) => void; onCancel: () => void }) {
  const [reason, setReason] = useState("Other reasons");
  const [details, setDetails] = useState("");
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="remove-orders-title" onMouseDown={onCancel}>
    <div className="w-full max-w-[560px] bg-white shadow-2xl" onMouseDown={event => event.stopPropagation()}>
      <div className="flex h-11 items-center justify-between border-b border-gray-200 bg-gray-50 px-5"><h2 id="remove-orders-title" className="text-sm text-gray-800">Remove Orders</h2><button type="button" onClick={onCancel} aria-label="Close remove orders dialog" className="text-gray-600 hover:text-gray-900"><X size={18}/></button></div>
      <div className="px-7 py-6 text-sm text-gray-800"><p className="mb-5">You can find the removed order in &quot;Cart&quot;</p><p className="mb-4 text-gray-600">Select a cancellation reason:</p><div className="space-y-3">{ORDER_REMOVE_REASONS.map(option => <label key={option} className="flex cursor-pointer items-start gap-2"><input type="radio" name="order-remove-reason" value={option} checked={reason === option} onChange={() => setReason(option)} className="mt-0.5 accent-green-700"/><span>{option}</span></label>)}</div>{reason === "Other reasons" && <textarea value={details} onChange={event => setDetails(event.target.value)} placeholder="Reasons" aria-label="Other cancellation reason" className="ml-5 mt-2 h-16 w-[calc(100%-1.25rem)] resize-none border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-700"/>}</div>
      <div className="flex justify-end gap-3 px-16 pb-4"><button type="button" onClick={() => onSubmit(reason === "Other reasons" && details.trim() ? details.trim() : reason)} className="min-w-24 rounded-md bg-emerald-600 px-5 py-1.5 text-sm text-white hover:bg-emerald-700">Submit</button><button type="button" onClick={onCancel} className="min-w-24 rounded-md border border-gray-300 px-5 py-1.5 text-sm text-gray-500 hover:bg-gray-50">Cancel</button></div>
    </div>
  </div>;
}

const RATING_LABELS = ["Overall Satisfaction", "Product Quality", "Shipping Speed", "Customer Service"];

function ReviewDialog({ readOnly, onClose }: { readOnly: boolean; onClose: () => void }) {
  const [ratings, setRatings] = useState<Record<string, number>>(() => Object.fromEntries(RATING_LABELS.map(label => [label, readOnly ? 5 : 0])));
  const [comments, setComments] = useState(readOnly ? "Good Job!" : "");
  const productImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop";
  return <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="review-dialog-title" onMouseDown={onClose}>
    <div className="h-[447px] w-[584px] max-w-full bg-white shadow-xl" onMouseDown={event => event.stopPropagation()}>
      <div className="flex h-9 items-center justify-between border-b border-gray-300 px-3"><h2 id="review-dialog-title" className="text-sm text-gray-600">Feedback</h2><button type="button" onClick={onClose} aria-label="Close feedback dialog" className="text-gray-500 hover:text-gray-900"><X size={16}/></button></div>
      <div className="px-7 pt-8"><div className="space-y-3">{RATING_LABELS.map(label => <div key={label} className="grid grid-cols-[130px_1fr] items-center"><span className="text-sm text-gray-800">{label}</span><div className="flex gap-2">{[1,2,3,4,5].map(value => <button key={value} type="button" disabled={readOnly} onClick={() => setRatings(previous => ({ ...previous, [label]: value }))} aria-label={`${value} stars for ${label}`}><Star size={18} className={value <= ratings[label] ? "fill-orange-500 text-orange-500" : "fill-gray-300 text-gray-300"}/></button>)}</div></div>)}</div>
        <div className="mt-5 grid grid-cols-[130px_1fr] items-start"><label htmlFor="review-comments" className="text-sm text-gray-800">Review Comments</label><textarea id="review-comments" value={comments} readOnly={readOnly} onChange={event => setComments(event.target.value)} className="h-[92px] resize-none border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-600"/></div>
        {readOnly ? <div className="ml-[136px] mt-2 flex gap-2"><img src={productImage} alt="Reviewed PCB sample 1" className="h-10 w-10 object-cover"/><img src={productImage} alt="Reviewed PCB sample 2" className="h-10 w-10 object-cover"/></div> : <div className="ml-[130px] mt-2"><label className="flex h-10 w-12 cursor-pointer flex-col items-center justify-center border border-gray-300 text-[9px] text-gray-400 hover:border-emerald-600"><Plus size={13}/><span>Add image</span><input type="file" accept="image/*" className="sr-only"/></label></div>}
        {!readOnly && <div className="ml-[130px] mt-[50px] flex gap-3"><button type="button" onClick={onClose} className="min-w-[92px] rounded-md bg-emerald-600 px-5 py-1.5 text-sm text-white hover:bg-emerald-700">Submit</button><button type="button" onClick={onClose} className="min-w-[92px] rounded-md border border-gray-300 px-5 py-1.5 text-sm text-gray-400 hover:bg-gray-50">Cancel</button></div>}
      </div>
    </div>
  </div>;
}

function StatusCell({ status, paymentMethod }: { status: OrderStatus; paymentMethod?: string }) {
  const dot = (color: string) => (
    <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
  );
  switch (status) {
    case "Unfinished Payment":
      return (
        <div className="flex items-start gap-1.5">
          <span style={{ color: "#3B82F6", fontSize: 15, lineHeight: 1 }}>◉</span>
          <div><div className="text-xs" style={{ color: "#374151" }}>Unfinished Payment</div>{paymentMethod && <div className="mt-1 text-xs" style={{ color: "#6B7280" }}>({paymentMethod})</div>}</div>
        </div>
      );
    case "In Production":
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">{dot(G)}<span className="text-xs" style={{ color: "#374151" }}>In Production</span></div>
          <a href="#" className="text-xs hover:underline" style={{ color: G }}>Production Progress</a>
        </div>
      );
    case "Shipped":
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5"><span className="text-xs" style={{ color: "#9CA3AF" }}>✕</span><span className="text-xs" style={{ color: "#374151" }}>Shipped</span></div>
          <a href="#" className="text-xs hover:underline" style={{ color: G }}>Shipment Tracking</a>
        </div>
      );
    case "Pay the difference":
      return <div className="flex items-center gap-1.5">{dot("#3B82F6")}<span className="text-xs" style={{ color: "#374151" }}>Pay the difference</span></div>;
    case "Awaiting Feedback":
      return <div className="flex items-center gap-1.5">{dot("#3B82F6")}<span className="text-xs" style={{ color: "#374151" }}>Awaiting Feedback</span></div>;
    case "Completed":
      return <div className="flex items-center gap-1.5">{dot("#9CA3AF")}<span className="text-xs" style={{ color: "#374151" }}>Completed</span></div>;
  }
}

function PrimaryBtn({ label, onClick, to }: { label: string; onClick?: () => void; to?: string }) {
  if (to) return <Link to={to} className="mb-0.5 rounded px-3 py-1 text-center text-xs font-bold text-white" style={{ background: G }}>{label}</Link>;
  return (
    <button type="button" onClick={onClick} className="px-3 py-1 text-xs font-bold text-white rounded mb-0.5"
      style={{ background: G }}>{label}</button>
  );
}
function TextBtn({ label, onClick, to, state }: { label: string; onClick?: () => void; to?: string; state?: unknown }) {
  if (to) {
    return <Link to={to} state={state} className="text-xs hover:underline text-left block" style={{ color: G }}>{label}</Link>;
  }
  return (
    <button className="text-xs hover:underline text-left block" style={{ color: G }} onClick={onClick}>{label}</button>
  );
}

function ActionButtons({ status, groupId, invoiceId, fromSearch, onRemove = () => {}, onConfirmReceipt = () => {}, onFeedback = () => {}, onViewReviews = () => {} }: { status: OrderStatus; groupId: string; invoiceId: string; fromSearch: string; onRemove?: () => void; onConfirmReceipt?: () => void; onFeedback?: () => void; onViewReviews?: () => void }) {
  const detailTo = `/account/orders/${groupId}`;
  const detailState = { fromSearch };
  const openInvoice = () => window.open(`/invoice/${encodeURIComponent(invoiceId)}`, "_blank", "noopener,noreferrer");
  switch (status) {
    case "Unfinished Payment":
      return <><PrimaryBtn label="Pay" /><TextBtn label="Update Payment" to={`/account/checkout?source=orders&order=${encodeURIComponent(groupId)}`} /><TextBtn label="View Detail" to={detailTo} state={detailState} /><TextBtn label="Invoice" onClick={openInvoice} /><TextBtn label="Copy Order" /><TextBtn label="Remove" onClick={onRemove} /><TextBtn label="+ PCB Assembly" to="/quote/pcba" /></>;
    case "In Production":
      return <><TextBtn label="View Detail" to={detailTo} state={detailState} /><TextBtn label="Invoice" onClick={openInvoice} /><TextBtn label="Copy Order" /><TextBtn label="+ PCB Assembly" to="/quote/pcba" /></>;
    case "Shipped":
      return <><PrimaryBtn label="Confirm Receipt" onClick={onConfirmReceipt} /><TextBtn label="View Detail" to={detailTo} state={detailState} /><TextBtn label="Invoice" onClick={openInvoice} /><TextBtn label="Copy Order" /></>;
    case "Pay the difference":
      return <><PrimaryBtn label="Balance Payment" to={`/account/checkout?source=balance&order=${encodeURIComponent(groupId)}`} /><TextBtn label="View Detail" to={detailTo} state={detailState} /><TextBtn label="Invoice" onClick={openInvoice} /><TextBtn label="Copy Order" /></>;
    case "Awaiting Feedback":
      return <><PrimaryBtn label="Feedback" onClick={onFeedback} /><TextBtn label="View Detail" to={detailTo} state={detailState} /><TextBtn label="Invoice" onClick={openInvoice} /><TextBtn label="Copy Order" /></>;
    case "Completed":
      return <><TextBtn label="View Detail" to={detailTo} state={detailState} /><TextBtn label="View Reviews" onClick={onViewReviews} /><TextBtn label="Invoice" onClick={openInvoice} /><TextBtn label="Copy Order" /></>;
  }
}

function OrderGroupRow({ group, fromSearch, onRemove, onConfirmReceipt, onFeedback, onViewReviews, onProductDetails, poNumbers, onPoChange }: { group: OrderGroup; fromSearch: string; onRemove: (id: string) => void; onConfirmReceipt: (id: string) => void; onFeedback: (id: string) => void; onViewReviews: (id: string) => void; onProductDetails: (item: OrderItem, date: string) => void; poNumbers: Record<string, string>; onPoChange: (key: string, value: string) => void }) {
  return (
    <div className="mb-3 rounded border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
      {/* Group header */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ background: "#E8F0E9", color: G }}>[{group.typeTag}]</span>
          <span className="text-xs" style={{ color: "#6B7280" }}>Order No.</span>
          <span className="text-xs font-bold font-mono" style={{ color: "#111827" }}>{group.orderNo}</span>
          <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>{group.date}</span>
          <Link to="/account/notifications" title="Live Chat" className="hover:opacity-70 transition-opacity">
            <MessageCircle size={14} color="#9CA3AF" />
          </Link>
        </div>
        <div className="text-sm shrink-0 ml-4" style={{ color: "#6B7280" }}>
          Subtotal:&nbsp;
          <span className="text-base font-bold" style={{ color: "#EF4444" }}>{group.subtotal}</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid text-xs font-medium px-4 py-2"
        style={{ gridTemplateColumns: COL, color: "#9CA3AF", background: "#fff", borderBottom: "1px solid #F3F4F6" }}>
        <div>Order Details</div><div>Quantity</div><div>Price</div><div>Files</div><div>Status</div><div>Actions</div>
      </div>

      {/* Product rows */}
      {group.items.map((item, i) => {
        const itemKey = `${group.id}-${item.productNo}-${i}`;
        const effectiveItem = { ...item, poNo: poNumbers[itemKey] ?? item.poNo };
        return (
        <div key={i} className="grid items-start px-4 py-3"
          style={{ gridTemplateColumns: COL, borderTop: i > 0 ? "1px solid #F3F4F6" : undefined, background: "#fff" }}>

          {/* Product details */}
          <div className="flex items-start gap-3 min-w-0 pr-3">
            <div className="w-14 h-14 rounded border shrink-0 overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop"
                alt="PCB" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Product NO. <span className="font-semibold" style={{ color: "#111827" }}>{item.productNo}</span>
              </p>
              {item.productName && <p className="text-xs" style={{ color: "#374151" }}>Product Name: {item.productName}</p>}
              <p className="text-xs font-medium" style={{ color: G }}>{item.specs}</p>
              <p className="text-xs" style={{ color: "#6B7280" }}>
                PO No: <PoNumberEditor value={effectiveItem.poNo} onChange={value => onPoChange(itemKey, value)}/>
              </p>
              <button type="button" onClick={() => onProductDetails(effectiveItem, group.date)} className="text-xs hover:underline block text-left" style={{ color: G }}>Product Details</button>
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Build Time: <span style={{ color: "#111827" }}>{item.buildTime}</span>
              </p>
            </div>
          </div>

          {/* Qty */}
          <div className="pt-0.5">
            <p className="text-sm font-medium" style={{ color: "#111827" }}>{item.qty}</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>({item.weight})</p>
          </div>

          {/* Price */}
          <div className="pt-0.5">
            <p className="text-sm font-semibold" style={{ color: "#111827" }}>{item.price}</p>
            {item.status === "Pay the difference" && (
              <span className="text-[10px] px-1.5 py-0.5 rounded mt-1 inline-block"
                style={{ background: "#FEF3C7", color: "#92400E" }}>Pay the difference: $0.00</span>
            )}
          </div>

          {/* Files */}
          <div className="pt-0.5 flex flex-col gap-1">
            {item.files.map((f, fi) => (
              <a key={fi} href="#" className="text-xs hover:underline" style={{ color: G }}>{f}</a>
            ))}
          </div>

          {/* Status */}
          <div className="pt-0.5">{i === 0 && <StatusCell status={item.status} paymentMethod={item.paymentMethod} />}</div>

          {/* Actions — only on first item row */}
          <div className="pt-0.5 flex flex-col gap-1">
            {i === 0 && <ActionButtons status={item.status} groupId={group.id} invoiceId={item.productNo} fromSearch={fromSearch} onRemove={() => onRemove(group.id)} onConfirmReceipt={() => onConfirmReceipt(group.id)} onFeedback={() => onFeedback(group.id)} onViewReviews={() => onViewReviews(group.id)} />}
          </div>
        </div>
      )})}
    </div>
  );
}

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<ProductDetailItem | null>(null);
  const [poNumbers, setPoNumbers] = useState<Record<string, string>>({});
  const [confirmReceiptId, setConfirmReceiptId] = useState<string | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [reviewId, setReviewId] = useState<string | null>(null);

  const openProductDetails = (item: OrderItem, date: string) => {
    const type = item.productNo.startsWith("HA") ? "PCBA" : item.productNo.startsWith("HN") ? "CNC" : "PCB";
    setDetailItem({ type, date, productNo: item.productNo, productName: item.productName, poNo: item.poNo, buildTime: item.buildTime, qty: item.qty, price: item.price, files: item.files.map(name => ({ name })), status: item.status });
  };

  const statusParam = searchParams.get("status");
  const filterStatus = statusParam ? (PARAM_TO_STATUS[statusParam] ?? null) : null;

  const filtered = ORDERS
    .filter(g => filterStatus ? g.items.some(i => i.status === filterStatus) : true)
    .filter(g => search
      ? g.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        g.items.some(i => i.productNo.toLowerCase().includes(search.toLowerCase()))
      : true)
    .map(g => ({
      ...g,
      items: filterStatus ? g.items.filter(i => i.status === filterStatus) : g.items,
    }));

  return (
    <div className="px-6 py-5 max-w-5xl w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Search */}
      <div className="flex justify-end mb-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded border"
          style={{ borderColor: "#D1D5DB" }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Order No./ File Name"
            className="outline-none bg-transparent text-sm w-44" style={{ color: "#111827" }} />
          <Search size={14} color="#9CA3AF" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-end border-b mb-4" role="tablist" aria-label="Filter orders by status" style={{ borderColor: "#E5E7EB" }}>
        {TABS.map(tab => {
          const isActive = tab.param === statusParam;
          return (
            <button key={tab.label ?? "all"} type="button" role="tab" aria-selected={isActive}
              onClick={() => tab.param ? setSearchParams({ status: tab.param }) : setSearchParams({})}
              className="px-3 py-2 text-xs whitespace-nowrap border-b-2 transition-colors shrink-0"
              style={{
                borderColor: isActive ? G : "transparent",
                color: isActive ? G : "#6B7280",
                fontWeight: isActive ? 600 : 400,
                background: "transparent",
              }}>
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Order groups */}
      {filtered.length > 0
        ? filtered.map(g => <OrderGroupRow key={g.id} group={g} fromSearch={location.search} onRemove={setRemoveId} onConfirmReceipt={setConfirmReceiptId} onFeedback={setFeedbackId} onViewReviews={setReviewId} onProductDetails={openProductDetails} poNumbers={poNumbers} onPoChange={(key, value) => setPoNumbers(previous => ({ ...previous, [key]: value }))} />)
        : <div className="text-center py-16 text-sm" style={{ color: "#9CA3AF" }}>No orders found</div>}

      {removeId && (
        <OrdersRemoveDialog
          onSubmit={() => setRemoveId(null)}
          onCancel={() => setRemoveId(null)}
        />
      )}
      {detailItem && (detailItem.type === "PCB"
        ? <PcbProductDetailDialog item={detailItem} onClose={() => setDetailItem(null)} />
        : detailItem.type === "CNC"
          ? <CncProductDetailDialog item={detailItem} onClose={() => setDetailItem(null)} />
          : <ProductInformationDialog item={detailItem} onClose={() => setDetailItem(null)} />)}
      {confirmReceiptId && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-receipt-title" aria-describedby="confirm-receipt-description" onMouseDown={() => setConfirmReceiptId(null)}><div className="h-[223px] w-[362px] max-w-full bg-white shadow-xl" onMouseDown={event => event.stopPropagation()}><div className="flex h-9 items-center justify-between border-b border-gray-300 px-3"><h2 id="confirm-receipt-title" className="text-sm text-gray-600">Confirm Receipt</h2><button type="button" aria-label="Close confirm receipt dialog" onClick={() => setConfirmReceiptId(null)} className="text-gray-500 hover:text-gray-900"><X size={16}/></button></div><p id="confirm-receipt-description" className="px-5 pt-10 text-sm text-gray-600">Have you confirmed receipt of the goods?</p><div className="mt-[67px] flex justify-end gap-4 px-4"><button type="button" onClick={() => setConfirmReceiptId(null)} className="min-w-[92px] rounded-md bg-emerald-600 px-5 py-1 text-sm text-white hover:bg-emerald-700">Yes</button><button type="button" onClick={() => setConfirmReceiptId(null)} className="min-w-[92px] rounded-md border border-gray-300 px-5 py-1 text-sm text-gray-400 hover:bg-gray-50">Cancel</button></div></div></div>}
      {feedbackId && <ReviewDialog readOnly={false} onClose={() => setFeedbackId(null)}/>} 
      {reviewId && <ReviewDialog readOnly onClose={() => setReviewId(null)}/>} 
    </div>
  );
}
