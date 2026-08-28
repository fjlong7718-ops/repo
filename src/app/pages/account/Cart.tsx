import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Search, MessageCircle, FileText, Upload, Plus, AlertCircle, Check, CloudUpload, Pencil, X } from "lucide-react";
import { RemoveDialog } from "../../components/RemoveDialog";
import { PoNumberEditor } from "../../components/PoNumberEditor";

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors"
      style={{
        background: checked ? "#1A5C2A" : "#fff",
        border: `1.5px solid ${checked ? "#1A5C2A" : "#D1D5DB"}`,
      }}
    >
      {checked && <Check size={10} color="#fff" strokeWidth={3} />}
    </button>
  );
}

type TabKey = "cart" | "review" | "payment";

export interface ProductDetailItem {
  type: "PCB" | "PCBA" | "CNC";
  date: string;
  productNo: string;
  productName?: string;
  poNo: string;
  buildTime: string;
  qty: string;
  price: string;
  files: { name: string; missing?: boolean }[];
  status: string;
}

interface CartItem extends ProductDetailItem {
  id: string;
  specs: string;
  weight: string;
  status: "Awaiting Payment" | "Under Review" | "In Cart";
  hasMessages?: number;
  hasBadge?: number;
  feedbackQuestion?: string;
}

const CART_DATA: CartItem[] = [
  {
    id: "HB120087XT3", type: "PCB", date: "2026-07-30  12:00:05",
    productNo: "HB120087XT3", specs: "fr4, 2 Layers, 100 X 100mm, 1.6mm",
    poNo: "N/A", buildTime: "3 days",
    qty: "10PCS", weight: "0.32kg", price: "$28",
    files: [{ name: "Gerber-BR.zip" }],
    status: "Awaiting Payment",
  },
  {
    id: "HA120087XT3-1", type: "PCBA", date: "2026-07-30  12:00:04",
    productNo: "HA120087XT3", productName: "Robot",
    specs: "Single-sided SMD, No collage",
    poNo: "N/A", buildTime: "3 days",
    qty: "10PCS", weight: "0.32kg", price: "$18",
    files: [{ name: "Gerber-BR.zip" }, { name: "Bom-BR.xlx" }, { name: "Pick Place.xlx" }],
    status: "Awaiting Payment",
  },
  {
    id: "HA120087XT3-2", type: "PCBA", date: "2026-07-30  12:00:03",
    productNo: "HA120087XT3", productName: "Robot",
    specs: "Single-sided SMD, No collage",
    poNo: "22345", buildTime: "3 days",
    qty: "10PCS", weight: "0.32kg", price: "$18",
    files: [{ name: "Uploaded File", missing: true }],
    status: "Under Review",
    hasMessages: 1, hasBadge: 3,
    feedbackQuestion: "Please confirm whether this is an 8-layer or 2-layer board.",
  },
  {
    id: "HN120087XT3", type: "CNC", date: "2026-07-30  12:00:02",
    productNo: "HN120087XT3",
    specs: "Aluminium, Bead blasting...",
    poNo: "12345", buildTime: "10~15 days",
    qty: "100PCS", weight: "1kg", price: "$18",
    files: [{ name: "CNC-BR.zip" }, { name: "CNC.xlx" }],
    status: "Under Review",
    hasBadge: 1,
  },
];

const TABS: { key: TabKey; label: string; count: number }[] = [
  { key: "cart",    label: "Cart",             count: 4 },
  { key: "review",  label: "Under Review",     count: 2 },
  { key: "payment", label: "Awaiting Payment", count: 2 },
];

const TYPE_COLOR: Record<string, string> = {
  PCB:  "#166534",
  PCBA: "#1E40AF",
  CNC:  "#92400E",
};
const TYPE_BG: Record<string, string> = {
  PCB:  "#F0FDF4",
  PCBA: "#EFF6FF",
  CNC:  "#FFFBEB",
};

function FileList({ files, onAddFile, editable }: { files: CartItem["files"]; onAddFile: () => void; editable: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      {files.map((f, i) =>
        f.missing ? (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span style={{ color: "#EF4444", fontSize: 11 }}>✕</span>
              <span className="text-xs" style={{ color: "#EF4444" }}>{f.name}</span>
            </div>
            <button type="button" onClick={onAddFile} className="flex items-center gap-1 px-2 py-0.5 text-xs text-white rounded"
              style={{ background: "#1A5C2A", fontSize: 11, width: "fit-content" }}>
              <Upload size={10} /> Add File
            </button>
          </div>
        ) : (
          <a key={i} href="#" className="text-xs hover:underline" style={{ color: "#1A5C2A" }}>{f.name}</a>
        )
      )}
      {editable && !files.some(file => file.missing) && (
        <button type="button" onClick={onAddFile} aria-label="Edit and re-upload files" title="Edit and re-upload files" className="mt-1 inline-flex items-center justify-center text-blue-500 hover:text-blue-700 w-5 h-5 rounded hover:bg-blue-50">
          <Pencil size={13} />
        </button>
      )}
    </div>
  );
}

function UploadFilesDialog({ item, onClose }: { item: CartItem; onClose: () => void }) {
  const standardRows = [
    { label: "Upload Gerber File", accept: ".rar,.zip,.7z,.step,.stp,.stl", hint: "RAR, ZIP, 7Z, STEP, STP and STL files, maximum 50 MB.", value: "106106266.zip" },
    { label: "Upload BOM File", accept: ".xls,.xlsx,.csv", hint: "XLS, XLSX and CSV files, maximum 50 MB.", value: "" },
    { label: "Upload Coordinate File", accept: ".rar,.zip,.7z,.xls,.xlsx,.csv", hint: "RAR, ZIP, 7Z, XLS, XLSX and CSV files, maximum 50 MB.", value: "" },
    { label: "Upload Other File", accept: ".rar,.zip,.7z,.xls,.xlsx,.csv,.pdf", hint: "RAR, ZIP, 7Z, XLS, XLSX, CSV and PDF files, maximum 50 MB.", value: "" },
  ];
  const cncRows = [
    { label: "Upload File", accept: ".step,.stp,.stl,.x_t,.iges,.igs,.sldprt,.zip,.pdf", hint: "3D CAD: STEP, STP, STL, X_T, IGES, IGS, SLDPRT, ZIP and PDF files, maximum 50 MB.", value: item.files[0]?.name || "" },
  ];
  const isCnc = item.type === "CNC";
  const rows = isCnc ? cncRows : standardRows;

  return <div className="fixed inset-0 z-[100] bg-black/45 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="upload-files-title" onMouseDown={onClose}>
    <div className="w-full max-w-2xl bg-white shadow-2xl" onMouseDown={event => event.stopPropagation()}>
      <div className="h-11 bg-gray-50 border-t-2 border-gray-400 border-b border-gray-200 flex items-center justify-between px-5"><span className="text-sm text-gray-700">Upload Files</span><button type="button" aria-label="Close upload dialog" onClick={onClose} className="text-gray-500 hover:text-gray-900"><X size={19}/></button></div>
      <div className="px-6 py-6">
        <div className="flex items-start gap-2 mb-2"><CloudUpload size={28} className="text-emerald-600 shrink-0"/><div><h2 id="upload-files-title" className="text-xl font-bold leading-6">{isCnc ? "Attach Your Files" : "Attach Your Gerber Files"}</h2><p className="text-sm text-emerald-600">PCBasic will never disclose your files to third parties.</p></div></div>
        <div className="space-y-5 mt-3">{rows.map((row,index)=><div key={row.label} className="grid grid-cols-[30px_1fr] gap-3"><div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 font-bold flex items-center justify-center">{index+1}</div><div><div className="h-10 border border-gray-200 flex items-center gap-3 px-2"><span className="flex-1 text-sm text-gray-500 truncate">{row.value}</span><div className="hidden sm:block w-24 h-1.5 rounded bg-gray-200 overflow-hidden"><div className="w-0 h-full bg-emerald-500"/></div><span className="text-xs font-semibold text-gray-700">0%</span><label className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2"><CloudUpload size={13}/>{row.label}<input type="file" accept={row.accept} className="sr-only"/></label></div><p className="text-[11px] text-gray-500 mt-2">Only {row.hint}</p></div></div>)}</div>
        <div className="flex justify-center mt-8"><button type="button" onClick={onClose} className="min-w-64 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3">Submit Order Now</button></div>
      </div>
    </div>
  </div>;
}

export function ProductInformationDialog({ item, onClose }: { item: ProductDetailItem; onClose: () => void }) {
  const basicRows = [
    ["Order Number", item.productNo, "Order Status", item.status],
    ["Order Date", item.date.replace(/\s+/g, " "), "Order Total", item.status === "Under Review" ? "Under Review" : item.price],
    ["Production Time", item.buildTime, "Estimated Shipping Date", ""],
    ["Files", item.files.map(file => file.name).join(", "), "", ""],
  ];
  const parameterRows = [
    ["Product Name", item.productName || "Robot", "BOM Material Type", "122 kinds"],
    ["BOM total components", "1 pcs", "Layer", "Single-sided SMD"],
    ["PCB Panel Array", "No collage", "PCB Type", "Rigid PCB"],
    ["Number of ICs with 16 pins or more such as QFP/BGA", "0 pcs", "DIP solder joints", "0 pcs"],
    ["Size", "0 × 0 mm", "Remaining material processing method", "Keep in the factory"],
    ["Purchasing components", "Yes", "Purchasing PCB", "Yes"],
    ["Purchasing only, no processing required", "", "BOM File", "200631.xlsx"],
    ["Functional test", "", "Split board", ""],
    ["X-Ray", "", "Aging test", ""],
    ["Paste label", "", "Conformal", ""],
    ["Assemble", "", "OEM Package", ""],
    ["Patch part first", "", "Remark", ""],
    ["Add PO No", item.poNo === "N/A" ? "" : item.poNo, "Ref. Order No", ""],
  ];
  const renderRows = (data: string[][]) => data.map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=><td key={cellIndex} className={cellIndex%2===0 ? "bg-[#F4F9F2] text-[#47554A] w-1/4" : "bg-white text-[#152018] w-1/4"}>{cell}</td>)}</tr>);

  return <div className="fixed inset-0 z-[100] bg-black/45 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="product-info-title" onMouseDown={onClose}>
    <div className="w-full max-w-6xl bg-white shadow-2xl" onMouseDown={event=>event.stopPropagation()}>
      <div className="h-11 bg-gray-50 border-t-2 border-gray-500 border-b border-gray-200 flex items-center justify-between px-5"><span id="product-info-title" className="text-sm text-gray-700">Product Information</span><button type="button" aria-label="Close product information" onClick={onClose}><X size={19} className="text-gray-600"/></button></div>
      <div className="p-5 max-h-[80vh] overflow-y-auto"><h2 className="text-sm font-bold mb-2">Basic Information</h2><table className="product-info-table w-full mb-3"><tbody>{renderRows(basicRows)}</tbody></table><h2 className="text-sm font-bold mb-2">Parameters Information</h2><table className="product-info-table w-full"><tbody>{renderRows(parameterRows)}</tbody></table></div>
      <style>{`.product-info-table{border-collapse:collapse;font-size:12px}.product-info-table td{border:1px solid #cfddcb;padding:7px 12px;line-height:1.2}`}</style>
    </div>
  </div>;
}

export function PcbProductDetailDialog({ item, onClose }: { item: ProductDetailItem; onClose: () => void }) {
  const basicRows = [
    ["Product NO", item.productNo, "Status", item.status],
    ["Create Time", item.date.replace(/\s+/g, " "), "Merchandise Total", item.price.replace("$", "")],
    ["Build Time", item.buildTime, "Estimated Shipping Date", ""],
    ["Files", item.files.map(file => file.name).join(", "), "", ""],
  ];
  const parameterRows = [
    ["Material type", "FR-4", "Layer count", "2"],
    ["TG", "TG130", "Size", "100 × 100 mm"],
    ["Quantity", item.qty.replace("PCS", " pcs"), "Board type", "Single piece"],
    ["Panelization Method", "—", "Depaneling Method", "Routing"],
    ["Different designs", "1", "Thickness", "1.6 mm"],
    ["Outer copper weight", "1 oz", "Inner copper weight", "1 oz"],
    ["Solder mask color", "Green", "Silkscreen", "White"],
    ["Minimum Trace Width/Spacing", "10/13 mil", "Min. drill hole", "0.20 mm"],
    ["Test method", "100% flying probe testing", "Surface finish", "HASL with lead"],
    ["Impedance control", "No", "Profiling Method", "Mold forming"],
    ["Pre-Plating process", "Electroless copper plating", "Special technique", "—"],
    ["Quality compensation", "Standard product contract", "Four-Wire resistance test for vias", "None"],
    ["Project file confirm", "Yes", "Test report", "Quality assurance certificate"],
    ["Test report type", "Electronic", "Routing outline tolerance", "±0.2 mm"],
    ["IPC level", "IPC-II", "Interleaving paper", "Yes"],
    ["If Data Conflicts", "Follow Order Parameters", "Add PO No", item.poNo === "N/A" ? "" : item.poNo],
    ["Special requirement", "", "Ref. Order No", ""],
  ];
  const renderRows = (data: string[][]) => data.map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=><td key={cellIndex} className={cellIndex%2===0 ? "bg-[#F4F9F2] text-[#47554A] w-1/4" : "bg-white text-[#152018] w-1/4"}>{cell}</td>)}</tr>);

  return <div className="fixed inset-0 z-[100] bg-black/45 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="pcb-detail-title" onMouseDown={onClose}><div className="w-full max-w-6xl bg-white shadow-2xl" onMouseDown={event=>event.stopPropagation()}><div className="h-11 bg-gray-50 border-t-2 border-gray-500 border-b border-gray-200 flex items-center justify-between px-5"><span id="pcb-detail-title" className="text-sm text-gray-700">Product Detail</span><button type="button" aria-label="Close product detail" onClick={onClose}><X size={19} className="text-gray-600"/></button></div><div className="p-5 max-h-[80vh] overflow-y-auto"><h2 className="text-sm font-bold mb-2">Basic Information</h2><table className="pcb-detail-table w-full mb-3"><tbody>{renderRows(basicRows)}</tbody></table><h2 className="text-sm font-bold mb-2">Parameters Information</h2><table className="pcb-detail-table w-full"><tbody>{renderRows(parameterRows)}</tbody></table></div><style>{`.pcb-detail-table{border-collapse:collapse;font-size:12px}.pcb-detail-table td{border:1px solid #cfddcb;padding:7px 12px;line-height:1.2}`}</style></div></div>;
}

export function CncProductDetailDialog({ item, onClose }: { item: ProductDetailItem; onClose: () => void }) {
  const basicRows = [
    ["Product NO", item.productNo, "Status", item.status],
    ["Create Time", item.date.replace(/\s+/g, " "), "Merchandise Total", item.status === "Under Review" ? "Under Review" : item.price.replace("$", "")],
    ["Build Time", item.buildTime, "Estimated Shipping Date", ""],
    ["Files", item.files.map(file => file.name).join(", "), "", ""],
  ];
  const parameterRows = [
    ["Material", "Aluminium", "Finishing", "Bead blasting"],
    ["Add PO No", item.poNo === "N/A" ? "" : item.poNo, "", ""],
    ...Array.from({ length: 13 }, () => ["", "", "", ""]),
  ];
  const renderRows = (data: string[][]) => data.map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=><td key={cellIndex} className={cellIndex%2===0 ? "bg-[#F4F9F2] text-[#47554A] w-1/4" : "bg-white text-[#152018] w-1/4"}>{cell}</td>)}</tr>);

  return <div className="fixed inset-0 z-[100] bg-black/45 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="cnc-detail-title" onMouseDown={onClose}><div className="w-full max-w-6xl bg-white shadow-2xl" onMouseDown={event=>event.stopPropagation()}><div className="h-11 bg-gray-50 border-t-2 border-gray-500 border-b border-gray-200 flex items-center justify-between px-5"><span id="cnc-detail-title" className="text-sm text-gray-700">Product Detail</span><button type="button" aria-label="Close product detail" onClick={onClose}><X size={19} className="text-gray-600"/></button></div><div className="p-5 max-h-[80vh] overflow-y-auto"><h2 className="text-sm font-bold mb-2">Basic Information</h2><table className="cnc-detail-table w-full mb-3"><tbody>{renderRows(basicRows)}</tbody></table><h2 className="text-sm font-bold mb-2">Parameters Information</h2><table className="cnc-detail-table w-full"><tbody>{renderRows(parameterRows)}</tbody></table></div><style>{`.cnc-detail-table{border-collapse:collapse;font-size:12px}.cnc-detail-table td{border:1px solid #cfddcb;padding:7px 12px;line-height:1.2;height:27px}`}</style></div></div>;
}

function StatusBadge({ status, feedbackQuestion, feedbackOpen, onFeedbackToggle }: { status: CartItem["status"]; feedbackQuestion?: string; feedbackOpen?: boolean; onFeedbackToggle?: () => void }) {
  const map = {
    "Awaiting Payment": { color: "#92400E", bg: "#FFFBEB", icon: <AlertCircle size={11} /> },
    "Under Review":     { color: "#1E40AF", bg: "#EFF6FF", icon: <AlertCircle size={11} /> },
    "In Cart":          { color: "#166534", bg: "#F0FDF4", icon: null },
  };
  const s = map[status];
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="flex items-center gap-1" style={{ color: s.color }}>
        {s.icon}
        <span className="text-xs font-medium">{status}</span>
      </div>
      {feedbackQuestion && (
        <div className="relative">
          <button type="button" aria-expanded={feedbackOpen} onClick={onFeedbackToggle} className="text-xs font-semibold text-red-500 hover:underline">Awaiting Feedback</button>
          {feedbackOpen && <div role="note" className="mt-1 w-40 border border-red-200 bg-red-50 px-2 py-1.5 text-[10px] leading-4 text-red-600 shadow-sm">
            <span className="font-semibold">Action required:</span> {feedbackQuestion}
          </div>}
        </div>
      )}
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const [openFeedback, setOpenFeedback] = useState<Set<string>>(
    () => new Set(CART_DATA.filter(item => item.feedbackQuestion).map(item => item.id))
  );
  const [activeTab, setActiveTab] = useState<TabKey>("cart");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [allChecked, setAllChecked] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [uploadItem, setUploadItem] = useState<CartItem | null>(null);
  const [detailItem, setDetailItem] = useState<CartItem | null>(null);
  const [poNumbers, setPoNumbers] = useState<Record<string, string>>(() => Object.fromEntries(CART_DATA.map(item => [item.id, item.poNo])));

  const normalizedSearch = search.trim().toLowerCase();
  const visibleItems = CART_DATA.filter(item => {
    const matchesTab = activeTab === "cart"
      || (activeTab === "review" && item.status === "Under Review")
      || (activeTab === "payment" && item.status === "Awaiting Payment");
    const matchesSearch = !normalizedSearch
      || item.productNo.toLowerCase().includes(normalizedSearch)
      || item.files.some(file => file.name.toLowerCase().includes(normalizedSearch));
    return matchesTab && matchesSearch;
  });

  const toggleAll = () => {
    if (allChecked) {
      setChecked(previous => {
        const next = new Set(previous);
        visibleItems.forEach(item => next.delete(item.id));
        return next;
      });
      setAllChecked(false);
    } else {
      setChecked(previous => {
        const next = new Set(previous);
        visibleItems.forEach(item => next.add(item.id));
        return next;
      });
      setAllChecked(true);
    }
  };

  const toggleItem = (id: string) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id); else next.add(id);
    setChecked(next);
    setAllChecked(visibleItems.length > 0 && visibleItems.every(item => next.has(item.id)));
  };

  const selectedCount = checked.size;
  const selectedTotal = selectedCount > 0
    ? CART_DATA.filter(i => checked.has(i.id)).reduce((sum, i) => sum + parseFloat(i.price.replace("$", "")), 0)
    : 0;

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#F5F7FA" }}>
      {/* Content */}
      <div className="flex-1 px-6 py-6 max-w-6xl w-full">
        {/* Tabs + search row */}
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-end gap-0">
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setActiveTab(t.key); setAllChecked(false); }}
                className="px-5 py-3 text-sm font-medium border-b-2 transition-colors"
                style={{
                  borderColor: activeTab === t.key ? "#1A5C2A" : "transparent",
                  color:       activeTab === t.key ? "#1A5C2A" : "#5C5C75",
                  background:  "transparent",
                }}>
                {t.label} ({t.count})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded border text-sm"
            style={{ borderColor: "#D9D9D9" }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Product No./ File Name"
              className="outline-none bg-transparent text-sm w-44" style={{ color: "#1A1A2E" }} />
            <Search size={14} color="#8B8BA0" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-b" style={{ borderColor: "#E5E2DB" }}>
          {/* Table header */}
          <div className="grid border-b px-4 py-3 text-xs font-semibold uppercase tracking-wide"
            style={{
              borderColor: "#E5E2DB",
              color: "#8B8BA0",
              gridTemplateColumns: "32px 1fr 120px 80px 160px 160px 140px",
            }}>
            <div />
            <div>Product Details</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Files</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Rows */}
          {visibleItems.map(item => {
            const effectiveItem = { ...item, poNo: poNumbers[item.id] ?? item.poNo };
            return (
            <div key={item.id} className="border-b last:border-0" style={{ borderColor: "#F0F0F0" }}>
              {/* Group header row */}
              <div className="flex items-center gap-3 px-4 py-2" style={{ background: "#FAFAFA" }}>
                <Checkbox checked={checked.has(item.id)} onChange={() => toggleItem(item.id)} />
                <span className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: TYPE_BG[item.type], color: TYPE_COLOR[item.type] }}>
                  [{item.type}]
                </span>
                <span className="text-xs font-mono" style={{ color: "#5C5C75" }}>{item.date}</span>
                <div className="relative">
                  <Link to="/account/notifications" title="Live Chat" className="hover:opacity-70 transition-opacity">
                    <MessageCircle size={16} color="#8B8BA0" />
                  </Link>
                  {item.hasMessages && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center"
                      style={{ fontSize: 9, background: "#EF4444" }}>{item.hasMessages}</span>
                  )}
                </div>
              </div>

              {/* Product row */}
              <div className="grid items-start px-4 py-3 gap-2"
                style={{ gridTemplateColumns: "32px 1fr 120px 80px 160px 160px 140px" }}>
                {/* Checkbox spacer */}
                <div />

                {/* Product details */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-14 h-14 rounded border shrink-0 overflow-hidden flex items-center justify-center"
                    style={{ borderColor: "#E5E2DB", background: "#F5F5F5" }}>
                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop"
                      alt="PCB" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs text-gray-500 mb-0.5">Product NO. <span style={{ color: "#1A1A2E", fontWeight: 600 }}>{item.productNo}</span></p>
                    {item.productName && (
                      <p className="text-xs mb-0.5">Product Name: <span style={{ color: "#1A1A2E" }}>{item.productName}</span></p>
                    )}
                    <p className="text-xs font-medium mb-0.5" style={{ color: "#1A5C2A" }}>{item.specs}</p>
                    <p className="text-xs mb-0.5" style={{ color: "#5C5C75" }}>
                      PO No: <PoNumberEditor value={effectiveItem.poNo} onChange={poNo => setPoNumbers(previous => ({ ...previous, [item.id]: poNo }))}/>
                    </p>
                    <button type="button" onClick={() => (((item.type === "PCBA" && item.productNo.startsWith("HA")) || (item.type === "PCB" && item.productNo.startsWith("HB")) || (item.type === "CNC" && item.productNo.startsWith("HN")))) ? setDetailItem(effectiveItem) : undefined} className="text-xs hover:underline block mb-0.5 text-left" style={{ color: "#1A5C2A", cursor: ((item.type === "PCBA" && item.productNo.startsWith("HA")) || (item.type === "PCB" && item.productNo.startsWith("HB")) || (item.type === "CNC" && item.productNo.startsWith("HN"))) ? "pointer" : "default" }}>Product Details</button>
                    <p className="text-xs" style={{ color: "#5C5C75" }}>Build Time: <span style={{ color: "#1A1A2E" }}>{item.buildTime}</span></p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="pt-1">
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{item.qty}</p>
                  <p className="text-xs" style={{ color: "#8B8BA0" }}>({item.weight})</p>
                </div>

                {/* Price */}
                <div className="pt-1">
                  <p className="text-sm font-bold" style={{ color: "#1A1A2E" }}>{item.price}</p>
                </div>

                {/* Files */}
                <div className="pt-1">
                  <FileList files={item.files} editable={item.status === "Under Review"} onAddFile={() => setUploadItem(item)} />
                </div>

                {/* Status */}
                <div className="pt-1">
                  <StatusBadge
                    status={item.status}
                    feedbackQuestion={item.feedbackQuestion}
                    feedbackOpen={openFeedback.has(item.id)}
                    onFeedbackToggle={() => setOpenFeedback(previous => {
                      const next = new Set(previous);
                      next.has(item.id) ? next.delete(item.id) : next.add(item.id);
                      return next;
                    })}
                  />
                </div>

                {/* Actions */}
                <div className="pt-1 flex flex-col gap-1.5">
                  {item.status === "Awaiting Payment" ? (
                    <button
                      className="px-4 py-1.5 text-xs font-bold text-white rounded"
                      style={{ background: "#1A5C2A" }}
                      onClick={() => navigate("/account/checkout")}
                    >
                      Pay
                    </button>
                  ) : (
                    <button className="px-4 py-1.5 text-xs font-bold text-white rounded"
                      style={{ background: "#D1D5DB", cursor: "not-allowed" }}>
                      Pay
                    </button>
                  )}
                  <button onClick={() => window.open(`/invoice/${encodeURIComponent(item.id)}`, "_blank", "noopener,noreferrer")} className="text-xs text-left hover:underline" style={{ color: "#1A5C2A" }}>
                    <FileText size={11} className="inline mr-0.5" /> Invoice
                  </button>
                  <button
                    className="text-xs text-left hover:underline"
                    style={{ color: "#1A5C2A" }}
                    onClick={() => setRemoveId(item.id)}
                  >
                    Remove
                  </button>
                  {item.type === "PCB" && (
                    <button onClick={() => window.open("/quote/pcba", "_blank", "noopener,noreferrer")} className="text-xs text-left hover:underline" style={{ color: "#1A5C2A" }}>
                      <Plus size={10} className="inline mr-0.5" /> PCB Assembly
                    </button>
                  )}
                </div>
              </div>
            </div>
          )})}
          {visibleItems.length === 0 && <div className="py-16 text-center text-sm text-gray-400">No orders match this filter.</div>}
        </div>
      </div>

      {/* Remove dialog */}
      {removeId && (
        <RemoveDialog
          onConfirm={(_reason) => {
            setChecked(prev => { const n = new Set(prev); n.delete(removeId); return n; });
            setRemoveId(null);
          }}
          onCancel={() => setRemoveId(null)}
        />
      )}

      {uploadItem && <UploadFilesDialog item={uploadItem} onClose={() => setUploadItem(null)} />}
      {detailItem && (detailItem.type === "PCB" ? <PcbProductDetailDialog item={detailItem} onClose={() => setDetailItem(null)} /> : detailItem.type === "CNC" ? <CncProductDetailDialog item={detailItem} onClose={() => setDetailItem(null)} /> : <ProductInformationDialog item={detailItem} onClose={() => setDetailItem(null)} />)}

      {/* Bottom checkout bar — aligned to content grid */}
      <div className="sticky bottom-0 border-t bg-white py-3 flex items-center"
        style={{ borderColor: "#E5E2DB", paddingLeft: "16px", paddingRight: "16px" }}>
        {/* All checkbox — aligned to content checkbox column (32px) */}
        <label className="flex items-center gap-2 text-sm cursor-pointer select-none shrink-0"
          style={{ color: "#5C5C75", width: 32 + 8 }}>
          <Checkbox checked={allChecked} onChange={toggleAll} />
        </label>
        <span className="text-sm mr-auto" style={{ color: "#5C5C75" }}>All</span>

        {/* Price + Checkout — aligned to right */}
        <div className="flex items-center gap-6">
          <span className="text-sm" style={{ color: "#5C5C75" }}>
            ({selectedCount} Items)&nbsp; Price:&nbsp;
            <span className="text-xl font-bold" style={{ color: "#EF4444" }}>
              $ {selectedTotal.toFixed(2)}
            </span>
          </span>
          {/* Checkout aligned to Actions column width (140px) */}
          <div style={{ width: 140 }}>
            <button
              onClick={() => selectedCount > 0 && navigate("/account/checkout")}
              className="w-full py-2.5 text-sm font-bold text-white rounded transition-opacity"
              style={{
                background: selectedCount > 0 ? "#1A5C2A" : "#D1D5DB",
                cursor: selectedCount > 0 ? "pointer" : "not-allowed",
              }}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
