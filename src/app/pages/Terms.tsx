import NavBar from "../components/NavBar";
import { Link } from "react-router";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using PCBasic's website, platform, or services (collectively, "Services"), you agree to be bound by these Terms of Service ("Terms"). If you are using our Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms. If you do not agree, do not use our Services.`,
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `PCBasic provides printed circuit board (PCB) fabrication, PCB assembly (PCBA), CNC machining, 3D printing, and related manufacturing services. We offer instant online quoting, order management, file review, production tracking, and customer support through our platform. Service specifications, capabilities, and pricing are subject to change with reasonable notice.`,
  },
  {
    id: "account",
    title: "3. Account Registration & Responsibilities",
    content: `To place orders you must register an account. You agree to:`,
    items: [
      { label: "Accurate Information", text: "Provide truthful, current, and complete information during registration and keep it updated." },
      { label: "Account Security", text: "Maintain the confidentiality of your login credentials and notify us immediately of any unauthorized access." },
      { label: "Account Responsibility", text: "Accept responsibility for all activities that occur under your account." },
      { label: "Eligibility", text: "Be at least 18 years old and legally capable of entering into binding contracts." },
    ],
  },
  {
    id: "ordering",
    title: "4. Orders & Manufacturing",
    content: `All orders placed through our platform are subject to our review and acceptance. We reserve the right to reject any order that violates applicable laws, export regulations, or our policies. Key terms:`,
    items: [
      { label: "Order Confirmation", text: "An order is confirmed only after we send a written confirmation and payment is received. Quotes are valid for 7 days unless otherwise stated." },
      { label: "File Responsibility", text: "You are solely responsible for the accuracy and completeness of design files (Gerber, BOM, drawings) you submit. PCBasic manufactures to your specifications without engineering review unless a DFM service is purchased." },
      { label: "DFM Review", text: "Our engineers perform basic DFM (Design for Manufacturability) checks and will contact you for clarification on obvious issues, but this does not constitute a guarantee of design correctness." },
      { label: "Modifications", text: "Order modifications after production has commenced may not be possible and may incur additional charges." },
      { label: "Cancellations", text: "Orders may be cancelled before production begins at no charge. Once production has started, cancellation fees apply based on material and labor costs incurred." },
    ],
  },
  {
    id: "payment",
    title: "5. Payment Terms",
    items: [
      { label: "Payment Methods", text: "We accept major credit cards, PayPal, wire transfer, and other methods displayed at checkout. All transactions are processed in USD unless otherwise agreed." },
      { label: "Full Payment Required", text: "Payment in full is required before production begins unless a credit account has been established by written agreement." },
      { label: "Taxes & Duties", text: "Prices exclude applicable taxes, customs duties, and import fees. You are responsible for all such charges in your jurisdiction." },
      { label: "Late Payments", text: "Overdue invoices accrue interest at 1.5% per month or the maximum rate permitted by law, whichever is lower." },
      { label: "Disputes", text: "Payment disputes must be raised within 30 days of invoice date. We will work in good faith to resolve valid disputes promptly." },
    ],
  },
  {
    id: "shipping",
    title: "6. Shipping & Delivery",
    items: [
      { label: "Lead Times", text: "Production lead times begin upon order confirmation and receipt of approved files. Lead times are estimates and not guaranteed unless expressly agreed in writing." },
      { label: "Shipping Risk", text: "Risk of loss transfers to you upon handover to the carrier. We are not liable for delays or damage caused by the carrier, customs, or force majeure events." },
      { label: "Shipping Costs", text: "Shipping costs are calculated at checkout based on weight, dimensions, and destination. We are not responsible for additional brokerage or customs fees." },
      { label: "Inspection on Arrival", text: "Inspect all shipments upon receipt. Report any visible damage or shortage to us and the carrier within 3 business days of delivery." },
    ],
  },
  {
    id: "quality",
    title: "7. Quality & Warranty",
    content: `PCBasic warrants that products will conform to the agreed specifications at the time of shipment. Our warranty is limited as follows:`,
    items: [
      { label: "Warranty Period", text: "90 days from the date of shipment for manufacturing defects that render the product non-functional." },
      { label: "Claim Process", text: "Warranty claims must be submitted in writing with supporting evidence (photos, test data) within the warranty period." },
      { label: "Remedy", text: "At our sole discretion, we will repair, replace, or refund defective products. Replacement lead times apply to warranty replacements." },
      { label: "Exclusions", text: "The warranty does not cover defects arising from design errors in your files, misuse, unauthorized modifications, electrostatic discharge, or normal wear and tear." },
      { label: "IPC Standards", text: "Unless otherwise specified, PCBs are manufactured to IPC-A-600 Class 2 standards. Class 3 capability is available upon request and must be specified at time of order." },
    ],
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    content: `Your design files, schematics, and technical documents remain your exclusive intellectual property. By submitting files, you grant PCBasic a limited, non-exclusive license solely to manufacture the ordered products. We will not reproduce, reverse-engineer, or disclose your designs to third parties. PCBasic's website content, trademarks, logos, and proprietary manufacturing processes are owned by PCBasic and may not be used without written permission.`,
  },
  {
    id: "confidentiality",
    title: "9. Confidentiality",
    content: `Both parties agree to keep confidential any non-public information received from the other party in connection with these Terms. PCBasic employees and contractors are bound by confidentiality agreements. If you require a formal NDA for your project, please contact us before placing your order.`,
  },
  {
    id: "prohibited",
    title: "10. Prohibited Uses",
    content: `You may not use our Services to manufacture products that:`,
    items: [
      { label: "Illegal Products", text: "Violate any applicable law, regulation, or export control rule, including ITAR, EAR, or UN sanctions regimes." },
      { label: "Weapons", text: "Are designed for use in weapons of mass destruction, illegal firearms modifications, or other prohibited weaponry." },
      { label: "Counterfeit Goods", text: "Infringe the intellectual property rights of any third party or are intended to deceive consumers." },
      { label: "Harmful Devices", text: "Are intended to harm individuals, damage infrastructure, or facilitate illegal surveillance." },
    ],
  },
  {
    id: "liability",
    title: "11. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law:`,
    items: [
      { label: "Liability Cap", text: "PCBasic's total liability for any claim arising out of or related to these Terms or our Services shall not exceed the amount paid by you for the specific order giving rise to the claim." },
      { label: "Consequential Damages", text: "We are not liable for indirect, incidental, special, punitive, or consequential damages, including loss of profits, data, goodwill, or business interruption, even if advised of the possibility of such damages." },
      { label: "Force Majeure", text: "We are not liable for delays or failures caused by circumstances beyond our reasonable control, including natural disasters, pandemics, war, government actions, or supply chain disruptions." },
    ],
  },
  {
    id: "indemnification",
    title: "12. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless PCBasic, its directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to: (a) your design files or specifications; (b) your use of products manufactured to your order; (c) your violation of these Terms or applicable law; or (d) any claim that your designs infringe a third party's intellectual property rights.`,
  },
  {
    id: "governing",
    title: "13. Governing Law & Dispute Resolution",
    content: `These Terms are governed by the laws of the People's Republic of China. Any dispute arising out of or in connection with these Terms shall first be submitted to good-faith negotiation. If unresolved within 30 days, the dispute shall be submitted to the Shenzhen Court of International Arbitration (SCIA) for binding arbitration in accordance with its rules. The arbitration shall be conducted in English or Chinese as agreed by the parties. Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction.`,
  },
  {
    id: "changes",
    title: "14. Changes to These Terms",
    content: `We may update these Terms from time to time. Material changes will be communicated via email or a notice on our website at least 30 days before they take effect. Your continued use of our Services after the effective date of revised Terms constitutes your acceptance. If you disagree with the changes, you may close your account before the effective date.`,
  },
  {
    id: "contact",
    title: "15. Contact Information",
    content: `For questions about these Terms of Service, please contact our legal team:`,
    contact: true,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      {/* Hero */}
      <div className="bg-[#0C1F10] text-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#4CAF6E] uppercase tracking-widest mb-3">Legal</p>
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">Effective Date: January 1, 2025 · Last Updated: June 1, 2025</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 py-14 flex gap-10">

        {/* TOC — sticky sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-24">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Contents</p>
            <nav className="space-y-1">
              {SECTIONS.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-xs text-muted-foreground hover:text-foreground py-1 border-l-2 border-transparent hover:border-primary pl-3 transition-all"
                >
                  {s.title.replace(/^\d+\.\s/, "")}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-10">
          {SECTIONS.map(s => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-base font-bold text-foreground mb-3 pb-2 border-b border-border">
                {s.title}
              </h2>

              {s.content && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.content}</p>
              )}

              {s.items && (
                <ul className="space-y-3">
                  {s.items.map(item => (
                    <li key={item.label} className="flex gap-2 text-sm">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">{item.label}: </span>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {s.contact && (
                <div className="mt-4 rounded-sm border border-border bg-muted/40 px-5 py-4 space-y-1.5 text-sm text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Email:</span> legal@pcbasic.com</p>
                  <p>
                    <span className="font-semibold text-foreground">Address:</span> PCBasic Co., Ltd · Floor 12, Building B,
                    Skyworth Semiconductor Design Building, Gaoxin South Ave 4, Nanshan District, Shenzhen, China 518057
                  </p>
                  <p><span className="font-semibold text-foreground">Response Time:</span> We aim to respond to all legal inquiries within 10 business days.</p>
                </div>
              )}
            </section>
          ))}

          {/* Back link */}
          <div className="pt-6 border-t border-border">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
