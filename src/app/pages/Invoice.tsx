import { useParams } from "react-router";
import { Download, Printer } from "lucide-react";

const rows = (items: [string, string][]) => items.map(([label, value]) => <tr key={label}><th className="w-[17%] bg-[#F3F4F3] text-left font-semibold">{label}</th><td>{value}</td></tr>);

const invoiceItems: Record<string, { product: string; type: string; qty: string; price: string; po: string; specification: string }> = {
  HB120087XT3: { product: "HB120087XT3", type: "PCB", qty: "10", price: "28.00", po: "N/A", specification: "FR-4, 2 Layers, 100 × 100mm, 1.6mm" },
  HA120087XT3: { product: "HA120087XT3", type: "PCBA", qty: "10", price: "18.00", po: "N/A", specification: "Robot · Single-sided SMD" },
  "HA120087XT3-2": { product: "HA120087XT3", type: "PCBA", qty: "10", price: "18.00", po: "22345", specification: "Robot · Single-sided SMD" },
  HN120087XT3: { product: "HN120087XT3", type: "CNC", qty: "100", price: "18.00", po: "12345", specification: "Aluminum · Bead blasting" },
};

export default function Invoice() {
  const { invoiceId = "HB120087XT3" } = useParams();
  const item = invoiceItems[invoiceId] || invoiceItems.HB120087XT3;
  const merchandise = Number(item.price);
  const freight = 18;
  const bankFee = 25.98;
  const total = merchandise + freight + bankFee;
  const invoiceNo = `B${invoiceId.replace(/\D/g, "").slice(0, 6) || "200057"}`;

  return <main className="min-h-screen bg-[#F7F8F7] py-5 px-4 text-[#4B514D]" style={{fontFamily:"Arial, sans-serif"}}>
    <article className="max-w-[980px] mx-auto bg-white border border-[#DDE2DF] px-5 py-5 shadow-sm print:border-0 print:shadow-none">
      <header className="grid grid-cols-3 items-start border-b border-[#D7DDD9] pb-4 mb-4"><div><div className="text-3xl font-black tracking-tight text-[#17683C]">PCBasic</div><div className="text-xs text-[#218653]">Fabrication starts here</div></div><h1 className="text-center text-2xl text-[#303632] mt-8">Invoice</h1><div className="text-right text-sm"><strong className="text-[#218653]">JS Technology co., ltd</strong><div className="text-xs mt-1">www.pcbasic.com</div><div className="print:hidden mt-1 flex justify-end gap-3"><button type="button" onClick={()=>window.print()} className="text-[#218653] underline inline-flex items-center gap-1"><Download size={13}/> Download</button><button type="button" onClick={()=>window.print()} className="text-[#218653] underline inline-flex items-center gap-1"><Printer size={13}/> Print</button></div></div></header>

      <table className="invoice-table w-full mb-5"><tbody><tr><th>Date</th><td>2026-07-30 12:00:05</td><th>Invoice No.</th><td>{invoiceNo}</td></tr><tr><th>Supplier</th><td>PCBasic</td><th>Buyer</th><td>customer@pcbasic.com</td></tr><tr><th>Contact Person</th><td>Betty Wang</td><th>Contact Person</th><td>Mil</td></tr><tr><th>Company</th><td>JS Technology Co., Ltd</td><th>Company</th><td>—</td></tr><tr><th>Web.</th><td>www.pcbasic.com</td><th>Web.</th><td>—</td></tr><tr><th>Address</th><td>Building E, Jianshi Industrial Park, Shenzhen, China</td><th>Address</th><td>Shenzhen, China</td></tr><tr><th>Tel</th><td>+86 755 2721 8592</td><th>Tel</th><td>—</td></tr></tbody></table>

      <h2 className="section-title">Terms and Conditions</h2><table className="invoice-table w-full mb-5"><tbody>{rows([["Shipping term","CIF"],["Payment term","Full amount in advance"],["Currency","USD"]])}</tbody></table>

      <h2 className="section-title">Information</h2><table className="invoice-table w-full mb-5"><thead><tr><th>Product</th><th>Type</th><th>Quantity</th><th>Price</th><th>PO No.</th><th className="w-[40%]">Specification</th></tr></thead><tbody><tr><td>{item.product}</td><td>{item.type}</td><td>{item.qty}</td><td>{item.price}</td><td>{item.po}</td><td>{item.specification}</td></tr></tbody></table>

      <h2 className="section-title">Quotation <span className="font-normal">(currency in USD)</span></h2><table className="invoice-table w-full mb-4"><thead><tr><th>Order No.</th><th>Items</th><th>Merchandise Total</th><th>Freight</th><th>Bank Fee</th><th>Discount</th><th>Remarks</th></tr></thead><tbody><tr><td>{invoiceNo}</td><td>1</td><td>{merchandise.toFixed(2)}</td><td>{freight.toFixed(2)}</td><td>{bankFee.toFixed(2)}</td><td>0.00</td><td/></tr></tbody></table><table className="invoice-table w-full mb-5"><tbody><tr><th>Version</th><td>V1.0</td><th>Total Amount</th><td className="font-bold">{total.toFixed(2)}</td></tr></tbody></table>

      <h2 className="section-title">Terms and Conditions</h2><div className="bg-[#F3F4F3] p-4 text-xs leading-6 mb-5"><ol className="list-decimal pl-5"><li>PCBA manufacture complies with IPC-A-610 Class II unless otherwise specified.</li><li>All PCBAs are processed through Automated Optical Inspection (AOI).</li><li>Functional testing is performed when test methods are supplied.</li><li>Products are packed to protect them from ESD and transportation damage.</li><li>The workmanship warranty period is one year after the ex-factory date.</li><li>Completed production remains payable according to the original schedule if shipment is delayed by the customer.</li></ol></div>

      <h2 className="section-title">Bank Information</h2><div className="bg-[#F3F4F3] p-4 text-xs leading-6 mb-8"><p>Account Number: 752379311063</p><p>Account Holder Name: JS Technology Co., Ltd</p><p>Supported Currencies: USD</p><p>Bank Name: BANK OF CHINA SONGGANG DONGFANG SUB-BRANCH, SHENZHEN</p><p>Country/Region: SHENZHEN, CHINA</p><p>Bank Address: NO.14 SHUGUANG ROAD, SONGGANG SUB-DISTRICT, BAOAN DISTRICT, SHENZHEN, CHINA</p><p>Swift Code/BIC: BKCHCNBJ45A</p><p>Bank Code: 104584002172</p></div>

      <footer className="border border-[#DDE2DF] min-h-28 p-5 grid grid-cols-2 items-end text-xs"><div><p>For and behalf of JS TECHNOLOGY CO., LTD</p><p className="mt-6">Signature: Betty Wang;</p></div><p>Signature:</p></footer>
    </article>
    <style>{`.invoice-table{border-collapse:collapse;font-size:12px}.invoice-table th,.invoice-table td{border:1px solid #d8ddda;padding:7px 10px}.invoice-table th{background:#f3f4f3;font-weight:600;text-align:left}.invoice-table thead th{text-align:center}.section-title{font-size:14px;font-weight:700;margin:14px 0 7px}@media print{body{background:white}.print\\:hidden{display:none!important}main{padding:0}article{max-width:none}}`}</style>
  </main>;
}
