import NavBar from "../components/NavBar";
import { Link } from "react-router";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    content: `PCBasic ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or place an order with us. By using our services, you agree to the terms described in this policy.`,
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    items: [
      { label: "Account Information", text: "Name, email address, phone number, company name, and password when you register an account." },
      { label: "Order & Transaction Data", text: "Billing address, shipping address, payment method details (processed securely via third-party providers), and order history." },
      { label: "Design & Technical Files", text: "Gerber files, BOM files, design documents, and specifications you upload for manufacturing purposes." },
      { label: "Communications", text: "Messages, support tickets, and chat records when you contact our team." },
      { label: "Usage Data", text: "IP address, browser type, device information, pages visited, time spent, and clickstream data collected automatically." },
      { label: "Cookies & Tracking", text: "We use cookies and similar technologies to enhance your experience, remember preferences, and analyze site traffic. See Section 7 for details." },
    ],
  },
  {
    id: "use",
    title: "3. How We Use Your Information",
    items: [
      { label: "Order Fulfillment", text: "To process, manufacture, and deliver your PCB and PCBA orders." },
      { label: "Account Management", text: "To create and maintain your account, authenticate logins, and manage your preferences." },
      { label: "Customer Support", text: "To respond to inquiries, resolve issues, and provide technical assistance." },
      { label: "Service Improvement", text: "To analyze usage patterns, improve our website, and develop new features." },
      { label: "Marketing Communications", text: "To send promotional emails, product updates, and newsletters (only with your consent, and you may unsubscribe at any time)." },
      { label: "Legal Compliance", text: "To comply with applicable laws, regulations, and export control requirements." },
    ],
  },
  {
    id: "sharing",
    title: "4. Information Sharing & Disclosure",
    content: `We do not sell, rent, or trade your personal information to third parties. We may share your data only in the following circumstances:`,
    items: [
      { label: "Service Providers", text: "Logistics partners (DHL, FedEx, UPS), payment processors, cloud hosting providers, and analytics services — all bound by confidentiality agreements." },
      { label: "Manufacturing Partners", text: "Authorized production facilities that assist in fulfilling your orders, operating under strict data protection agreements." },
      { label: "Legal Requirements", text: "When required by law, court order, or governmental authority, or to protect the rights and safety of PCBasic and its users." },
      { label: "Business Transfers", text: "In connection with a merger, acquisition, or sale of assets, with prior notice to you." },
    ],
  },
  {
    id: "files",
    title: "5. Design Files & Intellectual Property",
    content: `Your uploaded design files (Gerber, BOM, CAD, etc.) remain your intellectual property at all times. We use these files solely to fulfill your manufacturing orders. We do not share, reproduce, or use your design files for any purpose other than order production, and we will never disclose your designs to competitors or unauthorized third parties. Files are stored securely and deleted upon your request or in accordance with our data retention schedule.`,
  },
  {
    id: "security",
    title: "6. Data Security",
    content: `We implement industry-standard technical and organizational measures to protect your information, including:`,
    items: [
      { label: "Encryption", text: "SSL/TLS encryption for all data transmitted between your browser and our servers." },
      { label: "Access Controls", text: "Role-based access restrictions ensuring only authorized personnel can access sensitive data." },
      { label: "Secure Infrastructure", text: "Data stored on ISO 27001-compliant cloud infrastructure with regular security audits." },
      { label: "Incident Response", text: "A documented breach response plan with notification procedures in compliance with applicable regulations." },
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies & Tracking Technologies",
    content: `We use the following types of cookies:`,
    items: [
      { label: "Essential Cookies", text: "Required for the website to function, including session management and authentication." },
      { label: "Analytics Cookies", text: "Help us understand how visitors interact with our site (e.g., Google Analytics). Data is aggregated and anonymized." },
      { label: "Preference Cookies", text: "Remember your settings such as language, currency, and display preferences." },
      { label: "Marketing Cookies", text: "Used to deliver relevant advertisements. You may opt out via our cookie settings or browser controls." },
    ],
  },
  {
    id: "retention",
    title: "8. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. Order records are retained for 7 years to comply with accounting and legal requirements. Design files are retained for 2 years after your last order unless you request earlier deletion. You may request deletion of your account and associated data at any time, subject to our legal retention obligations.`,
  },
  {
    id: "rights",
    title: "9. Your Rights",
    content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:`,
    items: [
      { label: "Access", text: "Request a copy of the personal data we hold about you." },
      { label: "Correction", text: "Request correction of inaccurate or incomplete information." },
      { label: "Deletion", text: "Request deletion of your personal data ('right to be forgotten')." },
      { label: "Portability", text: "Receive your data in a structured, machine-readable format." },
      { label: "Objection", text: "Object to processing based on legitimate interests or for direct marketing." },
      { label: "Withdraw Consent", text: "Withdraw consent at any time where processing is based on consent." },
    ],
  },
  {
    id: "transfers",
    title: "10. International Data Transfers",
    content: `PCBasic is headquartered in Shenzhen, China, and your information may be processed and stored in China or other countries where our service providers operate. We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses where required by applicable data protection law.`,
  },
  {
    id: "children",
    title: "11. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: `We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. When we make material changes, we will notify you via email or a prominent notice on our website at least 30 days before the changes take effect. Your continued use of our services after the effective date constitutes acceptance of the revised policy.`,
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Privacy Team:`,
    contact: true,
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      {/* Hero */}
      <div className="bg-[#0C1F10] text-white py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#4CAF6E] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Privacy Policy
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
                  <p><span className="font-semibold text-foreground">Email:</span> privacy@pcbasic.com</p>
                  <p><span className="font-semibold text-foreground">Address:</span> PCBasic Co., Ltd · Floor 12, Building B, Skyworth Semiconductor Design Building, Gaoxin South Ave 4, Nanshan District, Shenzhen, China 518057</p>
                  <p><span className="font-semibold text-foreground">Response Time:</span> We aim to respond to all privacy inquiries within 15 business days.</p>
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
