import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, ChevronDown, FileText, Search, User, Settings, Truck, MessageSquare,
} from "lucide-react";

const G = "#1A5C2A";

// ── Types ─────────────────────────────────────────────────────────────────────
type OrderStatus =
  | "Unfinished Payment"
  | "In Production"
  | "Shipped"
  | "Pay the difference"
  | "Awaiting Feedback"
  | "Completed";

interface OrderDetail {
  id: string;
  typeTag: string;
  orderNo: string;
  date: string;
  paymentMethod: string;
  merchandiseTotal: string;
  shippingCost: string;
  bankFee: string;
  discount: string;
  total: string;
  balancePending: string;
  status: OrderStatus;
  shipping: {
    name: string;
    address: string;
    postalCode: string;
    phone: string;
    method: string;
    trackingNo: string;
  };
  products: {
    id: string;
    typeTag: string;
    productNo: string;
    productName?: string;
    specs: string;
    date: string;
    qty: string;
    weight: string;
    poNo: string;
    buildTime: string;
    price: string;
    subtotal: string;
    files: string[];
    image: string;
  }[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const ORDER_MAP: Record<string, OrderDetail> = {
  g1: {
    id: "g1", typeTag: "PCB|PCBA", orderNo: "B200048", date: "2026-07-30 12:00:20",
    paymentMethod: "Pingpong", merchandiseTotal: "$46.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "-$0.00", balancePending: "$2.00",
    status: "Unfinished Payment",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "1234567890" },
    products: [
      { id: "p1", typeTag: "PCB", productNo: "HB120087XT3", specs: "fr4, 2 Layers, 100 X 100mm, 1.6mm", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$28", subtotal: "$28.00", files: ["Gerber-BR.zip"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
      { id: "p2", typeTag: "PCBA", productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
  g2: {
    id: "g2", typeTag: "PCB", orderNo: "B200049", date: "2026-07-30 12:00:00",
    paymentMethod: "Pingpong", merchandiseTotal: "$18.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "$38.00", balancePending: "$0.00",
    status: "In Production",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "—" },
    products: [
      { id: "p1", typeTag: "PCB", productNo: "HB120087XT3", specs: "fr4, 2 Layers, 100 X 100mm, 1.6mm", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
  g3: {
    id: "g3", typeTag: "PCBA", orderNo: "B200050", date: "2026-07-30 12:00:00",
    paymentMethod: "Pingpong", merchandiseTotal: "$18.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "$38.00", balancePending: "$0.00",
    status: "In Production",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "—" },
    products: [
      { id: "p1", typeTag: "PCBA", productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
  g4: {
    id: "g4", typeTag: "PCBA", orderNo: "B200051", date: "2026-07-30 12:00:00",
    paymentMethod: "Pingpong", merchandiseTotal: "$18.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "$38.00", balancePending: "$0.00",
    status: "Shipped",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "1234567890" },
    products: [
      { id: "p1", typeTag: "PCBA", productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
  g5: {
    id: "g5", typeTag: "PCBA", orderNo: "B200052", date: "2026-07-30 12:00:00",
    paymentMethod: "Pingpong", merchandiseTotal: "$18.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "-$54.00", balancePending: "$2.00",
    status: "Pay the difference",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "1234567890" },
    products: [
      { id: "p1", typeTag: "PCBA", productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
  g6: {
    id: "g6", typeTag: "PCBA", orderNo: "B200053", date: "2026-07-30 12:00:00",
    paymentMethod: "Pingpong", merchandiseTotal: "$18.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "$38.00", balancePending: "$0.00",
    status: "Awaiting Feedback",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "1234567890" },
    products: [
      { id: "p1", typeTag: "PCBA", productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
  g7: {
    id: "g7", typeTag: "PCBA", orderNo: "B200054", date: "2026-07-30 12:00:00",
    paymentMethod: "Pingpong", merchandiseTotal: "$18.00", shippingCost: "$20.00",
    bankFee: "$18.00", discount: "-$0.00", total: "$38.00", balancePending: "$0.00",
    status: "Completed",
    shipping: { name: "Michael", address: "60 Airport Blvd., Singapore 819643", postalCode: "66666666", phone: "+65 65956868", method: "DHL", trackingNo: "1234567890" },
    products: [
      { id: "p1", typeTag: "PCBA", productNo: "HA120087XT3", productName: "Robot", specs: "Single-sided SMD, No collage", date: "2026-07-30  12:00:00", qty: "10PCS", weight: "0.32kg", poNo: "12345", buildTime: "3 days", price: "$18", subtotal: "$18.00", files: ["Gerber-BR.zip", "Bom-BR.xlx", "Pick Place.xlx"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop" },
    ],
  },
};

// ── Progress tracker ──────────────────────────────────────────────────────────
const STAGES: { label: string; Icon: React.ElementType }[] = [
  { label: "Online Quote",  Icon: FileText },
  { label: "Order Review",  Icon: Search },
  { label: "Payment",       Icon: User },
  { label: "Production",    Icon: Settings },
  { label: "Shipping",      Icon: Truck },
  { label: "Feedback",      Icon: MessageSquare },
];

const STATUS_STAGE: Record<OrderStatus, number> = {
  "Unfinished Payment": 2,
  "In Production":      3,
  "Shipped":            4,
  "Pay the difference": 2,
  "Awaiting Feedback":  5,
  "Completed":          6,
};

function ProgressTracker({ status }: { status: OrderStatus }) {
  const activeIndex = STATUS_STAGE[status];

  return (
    <div className="flex items-center">
      {STAGES.map(({ label, Icon }, i) => {
        const done    = i < activeIndex;
        const current = i === activeIndex;
        const future  = i > activeIndex;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Node */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: done ? G : current ? "#fff" : "#F3F4F6",
                  border: `2px solid ${done || current ? G : "#D1D5DB"}`,
                }}
              >
                <Icon
                  size={18}
                  color={done ? "#fff" : current ? G : "#9CA3AF"}
                  strokeWidth={done ? 2.5 : 1.8}
                />
              </div>
              <span
                className="text-xs font-medium whitespace-nowrap"
                style={{ color: future ? "#9CA3AF" : G }}
              >
                {label}
              </span>
            </div>

            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div className="flex-1 mx-2 mb-5 flex items-center">
                <div className="w-full flex items-center gap-0.5">
                  {Array.from({ length: 8 }).map((_, di) => (
                    <div
                      key={di}
                      className="flex-1 h-px"
                      style={{ background: i < activeIndex ? G : "#D1D5DB" }}
                    />
                  ))}
                  <span style={{ color: i < activeIndex ? G : "#D1D5DB", lineHeight: 0, fontSize: 10 }}>▶</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block w-1 h-5 rounded-sm" style={{ background: G }} />
        <h3 className="text-sm font-semibold" style={{ color: "#111827" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline text-sm py-0.5 gap-1">
      <span style={{ color: "#374151", minWidth: 170 }}>{label}:</span>
      <span style={{ color: "#111827" }}>{value}</span>
    </div>
  );
}

// ── Status helpers ────────────────────────────────────────────────────────────
function statusDotColor(status: OrderStatus) {
  switch (status) {
    case "Unfinished Payment": return "#F59E0B";
    case "In Production":      return G;
    case "Shipped":            return "#9CA3AF";
    case "Pay the difference": return "#3B82F6";
    case "Awaiting Feedback":  return "#3B82F6";
    case "Completed":          return "#9CA3AF";
  }
}

function ActionRow({ status }: { status: OrderStatus }) {
  const btnPrimary = (label: string) => (
    <button key={label}
      className="px-5 py-1.5 text-sm font-semibold text-white rounded"
      style={{ background: G }}>
      {label}
    </button>
  );
  const btnGhost = (label: string) => (
    <button key={label} className="text-sm hover:underline" style={{ color: G }}>
      {label}
    </button>
  );
  const btnMore = () => (
    <button key="more" className="flex items-center gap-0.5 text-sm hover:underline" style={{ color: G }}>
      more <ChevronDown size={13} />
    </button>
  );

  switch (status) {
    case "Unfinished Payment":
      return <div className="flex items-center gap-5 mt-4">{btnPrimary("Pay")}{btnGhost("Invoice")}{btnGhost("Copy Order")}{btnMore()}</div>;
    case "In Production":
      return <div className="flex items-center gap-5 mt-4">{btnGhost("Invoice")}{btnGhost("Copy Order")}{btnMore()}</div>;
    case "Shipped":
      return <div className="flex items-center gap-5 mt-4">{btnPrimary("Confirm Receipt")}{btnGhost("Invoice")}{btnGhost("Copy Order")}{btnMore()}</div>;
    case "Pay the difference":
      return <div className="flex items-center gap-5 mt-4">{btnPrimary("Pay")}{btnGhost("Invoice")}{btnGhost("Copy Order")}{btnMore()}</div>;
    case "Awaiting Feedback":
      return <div className="flex items-center gap-5 mt-4">{btnPrimary("Feedback")}{btnGhost("Invoice")}{btnGhost("Copy Order")}{btnMore()}</div>;
    case "Completed":
      return <div className="flex items-center gap-5 mt-4">{btnGhost("View Reviews")}{btnGhost("Invoice")}{btnGhost("Copy Order")}{btnMore()}</div>;
  }
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = orderId ? ORDER_MAP[orderId] : undefined;

  if (!order) {
    return (
      <div className="px-6 py-10 text-center text-sm" style={{ color: "#9CA3AF" }}>
        Order not found.{" "}
        <button className="underline" style={{ color: G }} onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div className="px-6 py-5 max-w-4xl w-full space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Back */}
      <button
        className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
        style={{ color: "#374151" }}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Progress tracker */}
      <div className="bg-white rounded border px-6 py-5" style={{ borderColor: "#E5E7EB" }}>
        <ProgressTracker status={order.status} />
      </div>

      {/* Order Information */}
      <div className="bg-white rounded border px-6 py-5" style={{ borderColor: "#E5E7EB" }}>
        <Section title="Order Information">
          <div className="space-y-0.5">
            <InfoRow label="Order  NO" value={<span className="font-medium">{order.orderNo}</span>} />
            <InfoRow label="Created Time" value={order.date} />
            <InfoRow label="Payment Method" value={order.paymentMethod} />
            <InfoRow label="Merchandise Total" value={`$ ${order.merchandiseTotal.replace("$", "")}`} />
            <InfoRow label="Shipping Cost" value={`$ ${order.shippingCost.replace("$", "")}`} />
            <InfoRow label="Bank Fee" value={`$ ${order.bankFee.replace("$", "")}`} />
            <InfoRow label="Discount" value={
              <span style={{ color: "#EF4444" }}>-$ {order.discount.replace(/[-$]/g, "")}</span>
            } />
            <InfoRow label="Total" value={
              <span style={{ color: "#EF4444" }}>-$ {order.total.replace(/[-$]/g, "")}</span>
            } />
            <InfoRow label="Order Status" value={
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: statusDotColor(order.status) }} />
                {order.status}
              </span>
            } />
          </div>
          <ActionRow status={order.status} />
        </Section>
      </div>

      {/* Shipping & Delivery Details */}
      <div className="bg-white rounded border px-6 py-5" style={{ borderColor: "#E5E7EB" }}>
        <Section title="Shipping & Delivery Details">
          <div className="space-y-0.5">
            <InfoRow label="Name" value={order.shipping.name} />
            <InfoRow label="Address" value={order.shipping.address} />
            <InfoRow label="Postal Code" value={order.shipping.postalCode} />
            <InfoRow label="Phone Number" value={order.shipping.phone} />
            <InfoRow label="Shipping Method" value={order.shipping.method} />
            <InfoRow label="Tracking Number" value={
              order.shipping.trackingNo !== "—"
                ? <a href="#" className="hover:underline" style={{ color: G }}>{order.shipping.trackingNo}</a>
                : "—"
            } />
          </div>
        </Section>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded border px-6 py-5" style={{ borderColor: "#E5E7EB" }}>
        <Section title="Product Details">
          <div className="rounded border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>

            {/* Table header */}
            <div
              className="grid text-xs font-medium px-4 py-2.5"
              style={{
                gridTemplateColumns: "1fr 130px 110px 180px",
                color: "#6B7280",
                background: "#F9FAFB",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <div>Product  Details</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Files</div>
            </div>

            {order.products.map((product, gi) => (
              <div key={product.id}>
                {/* Product type sub-header */}
                <div
                  className="flex items-center justify-between px-4 py-2"
                  style={{
                    background: "#F9FAFB",
                    borderTop: gi === 0 ? undefined : "1px solid #E5E7EB",
                    borderBottom: "1px solid #F3F4F6",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: "#E8F0E9", color: G }}
                    >
                      [{product.typeTag}]
                    </span>
                    <span className="text-xs font-mono" style={{ color: "#6B7280" }}>{product.date}</span>
                    <MessageSquare size={13} color="#9CA3AF" />
                  </div>
                  <div className="text-xs" style={{ color: "#6B7280" }}>
                    Subtotal:&nbsp;
                    <span className="font-semibold text-sm" style={{ color: "#EF4444" }}>{product.subtotal}</span>
                  </div>
                </div>

                {/* Product row */}
                <div
                  className="grid items-start px-4 py-4 bg-white"
                  style={{ gridTemplateColumns: "1fr 130px 110px 180px" }}
                >
                  {/* Product info */}
                  <div className="flex items-start gap-3 pr-4">
                    <div
                      className="w-14 h-14 rounded border shrink-0 overflow-hidden"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <img src={product.image} alt="PCB" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-0.5 text-xs">
                      <p style={{ color: "#6B7280" }}>
                        Product NO.&nbsp;
                        <span className="font-semibold" style={{ color: "#111827" }}>{product.productNo}</span>
                      </p>
                      {product.productName && (
                        <p style={{ color: "#374151" }}>Product Name: {product.productName}</p>
                      )}
                      <p className="font-medium" style={{ color: G }}>{product.specs}</p>
                      <p style={{ color: "#6B7280" }}>
                        PO No:&nbsp;<span style={{ color: "#111827" }}>{product.poNo}</span>
                      </p>
                      <a href="#" className="hover:underline block" style={{ color: G }}>Product Details</a>
                      <p style={{ color: "#6B7280" }}>
                        Build Time:&nbsp;<span style={{ color: "#111827" }}>{product.buildTime}</span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="pt-0.5 text-sm">
                    <p className="font-medium" style={{ color: "#111827" }}>{product.qty}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>({product.weight})</p>
                  </div>

                  {/* Price */}
                  <div className="pt-0.5 text-sm font-semibold" style={{ color: "#111827" }}>
                    {product.price}
                  </div>

                  {/* Files */}
                  <div className="pt-0.5 flex flex-col gap-1">
                    {product.files.map((f, fi) => (
                      <a key={fi} href="#" className="text-xs hover:underline" style={{ color: G }}>{f}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

    </div>
  );
}
