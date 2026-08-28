import { useParams, Link, Navigate } from "react-router";
import {
  ChevronRight, AlertTriangle, CheckCircle, Shield, Zap,
  ArrowRight, Phone, FileText, Thermometer, Cpu, Activity,
  Settings, BarChart3, Lock, Clock,
} from "lucide-react";
import NavBar from "../components/NavBar";

// ── Tokens ────────────────────────────────────────────────────────────────────
const G   = "#1A5C2A";
const DK  = "#1A1A2E";
const W   = "#F8F7F4";
const WH  = "#FFFFFF";
const BD  = "#E5E2DB";
const M   = "#5C5C75";
const GD  = "#C9A84C";

// ── PCBasic real factory images ───────────────────────────────────────────────
const FACTORY = {
  floor:    "https://www.pcbasic.com/public/static/images/DSC06348.webp",
  line1:    "https://www.pcbasic.com/Uploads/images/20260702/01.webp",
  line2:    "https://www.pcbasic.com/Uploads/images/20260702/02.webp",
  line3:    "https://www.pcbasic.com/Uploads/images/20260702/03.webp",
  line4:    "https://www.pcbasic.com/Uploads/images/20260702/04.webp",
  line5:    "https://www.pcbasic.com/Uploads/images/20260702/05.webp",
  line6:    "https://www.pcbasic.com/Uploads/images/20260702/06.webp",
  equip1:   "https://www.pcbasic.com/Uploads/images/20260210/030c3019c49c56cceb1f1a9013d792bc.webp",
  equip2:   "https://www.pcbasic.com/Uploads/images/20260210/2e112f0a39ebf63650ebfac9fe3193d7.webp",
  equip3:   "https://www.pcbasic.com/Uploads/images/20260210/56f5556d57c8eabf592c13c9b45a48ad.webp",
  equip4:   "https://www.pcbasic.com/Uploads/images/20260210/903f0150873d892d0a1cebdb07a94b39.webp",
  pcb1:     "https://www.pcbasic.com/Uploads/images/20250403/3f863f5b123a6180c28bde6b6c6be91f.webp",
  pcb2:     "https://www.pcbasic.com/Uploads/images/20250403/52657ac6ee76de98b50281376b8128e6.webp",
  pcb3:     "https://www.pcbasic.com/Uploads/images/20250403/74485fa7800d39a0db156d5d191886e7.jpg",
};

// ── Data types ────────────────────────────────────────────────────────────────
interface PainPoint { icon: React.ElementType; title: string; body: string }
interface Capability { label: string; detail: string }
interface CertBadge  { name: string; scope: string; color: string }
interface CaseStudy  { image: string; tag: string; title: string; specs: string[]; outcome: string }

interface IndustryData {
  slug:        string;
  name:        string;
  tagline:     string;
  heroImage:   string;
  heroSub:     string;
  stats:       { v: string; l: string }[];
  painPoints:  PainPoint[];
  capabilities:Capability[];
  certs:       CertBadge[];
  cases:       CaseStudy[];
  factoryNote: string;
}

// ── Industry dataset ──────────────────────────────────────────────────────────
const INDUSTRIES: Record<string, IndustryData> = {

  // ── INDUSTRIAL CONTROLS ────────────────────────────────────────────────────
  industrial: {
    slug: "industrial",
    name: "Industrial Controls",
    tagline: "Reliable PCBA for Automation, PLC & Drive Systems",
    heroImage: "https://images.unsplash.com/photo-1780034766295-43db0f2a0fb7?w=1400&h=700&fit=crop",
    heroSub: "PCBasic manufactures high-reliability PCBA for industrial automation, motor drives, PLC platforms, and elevator control systems — built for 24/7 continuous operation in demanding environments.",
    stats: [
      { v: "16",    l: "SMT Lines" },
      { v: "IPC3",  l: "Class III Standard" },
      { v: "ISO 9001", l: "Certified" },
      { v: "99.6%", l: "On-Time Delivery" },
    ],
    painPoints: [
      { icon: AlertTriangle, title: "Unplanned Downtime",       body: "A single PCB failure in a production line can cost thousands per hour. Industrial boards must survive 24/7 duty cycles without degradation." },
      { icon: Activity,      title: "EMC / EMI Interference",   body: "PLCs and motor drives operate near high-power switching circuits. Boards must pass stringent IEC 61000 EMC immunity standards." },
      { icon: Thermometer,   title: "Harsh Thermal Conditions", body: "Cabinet temperatures can reach 70 °C+. Wide thermal cycling demands robust solder joints and thermally stable laminates." },
      { icon: Cpu,           title: "Multi-Protocol Complexity", body: "Designs integrate CAN, RS-485, Ethernet/IP, and Modbus concurrently, requiring tight impedance control and careful layout." },
      { icon: Clock,         title: "Long Service Life",         body: "Industrial equipment is expected to operate 10–20 years. Component obsoletion, BOM lock-in, and re-spins must be planned from day one." },
      { icon: FileText,      title: "Regulatory Compliance",    body: "IEC 61508, UL, CE, and RoHS directives impose documentation, traceability, and process control requirements on every build." },
    ],
    capabilities: [
      { label: "16 Full SMT Lines",          detail: "YAMAHA YSM40R + FUJI NXT III, 72,000 CPH" },
      { label: "Flying Probe Testing",        detail: "No-fixture ICT for prototype to mid-volume builds" },
      { label: "BGA / QFN / LCC Assembly",   detail: "X-ray verification on all BGA placements" },
      { label: "Conformal Coating",           detail: "3-proof treatment for moisture, dust, and chemical resistance" },
      { label: "Selective Wave Soldering",    detail: "Automated selective soldering for mixed-technology boards" },
      { label: "Functional Testing (FCT)",    detail: "Custom test fixture development in-house" },
      { label: "IPC Class III Build",         detail: "Zero-compromise inspection per IPC-A-610 Class III" },
      { label: "MES Digital Tracking",        detail: "Real-time production traceability per serial number" },
    ],
    certs: [
      { name: "ISO 9001:2015",  scope: "Quality Management System",   color: GD },
      { name: "IPC-A-610 Class III", scope: "High-Reliability Electronics", color: "#3B82F6" },
      { name: "CE",             scope: "European Conformity",          color: "#6366F1" },
      { name: "RoHS",           scope: "Hazardous Substance Directive",color: "#22C55E" },
    ],
    cases: [
      {
        image: FACTORY.pcb1,
        tag: "PLC",
        title: "Medium PLC PCBA",
        specs: ["Layers: 6", "Material: FR4 TG170", "Surface: ENIG", "IPC Class III", "Flying Probe 100%"],
        outcome: "Handles 256 I/O points with Modbus RTU + Ethernet/IP. Deployed across 40+ automation lines in automotive stamping plants.",
      },
      {
        image: FACTORY.line3,
        tag: "Motion Control",
        title: "Multi-Axis Servo Drive Board",
        specs: ["Layers: 8", "Heavy Copper: 2 oz", "BGA + QFN", "X-ray 100%", "Burn-in 48h"],
        outcome: "Real-time 6-axis synchronization at 250 µs cycle time. Used in gantry pick-and-place systems for semiconductor packaging.",
      },
      {
        image: "https://images.unsplash.com/photo-1753272691001-4d68806ac590?w=600&h=400&fit=crop",
        tag: "Elevator",
        title: "Elevator Control PCBA",
        specs: ["Layers: 4", "EMC Shielding", "CAN + RS-485", "Conformal Coat", "-40°C to +85°C"],
        outcome: "Manages real-time floor dispatch, safety monitoring, and door control logic. Certified for 15+ year service life.",
      },
      {
        image: FACTORY.equip1,
        tag: "Inverter",
        title: "Medium-Voltage Inverter PCBA",
        specs: ["Layers: 6", "Copper: 3 oz", "Impedance ±5%", "AOI + X-ray", "FCT 100%"],
        outcome: "Power conversion efficiency >98%. Deployed in HVAC drives and industrial pump controllers across Southeast Asia.",
      },
    ],
    factoryNote: "All industrial PCBAs are built on our ISO 9001-certified lines in our 20,000 m² Shenzhen + Huizhou facilities, with real-time MES traceability from IQC through shipment.",
  },

  // ── ROBOTICS ──────────────────────────────────────────────────────────────
  robotics: {
    slug: "robotics",
    name: "Robotics",
    tagline: "High-Precision PCBA for Robot Control & Motion Systems",
    heroImage: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=1400&h=700&fit=crop",
    heroSub: "PCBasic builds the control and sensor boards that power industrial robots, collaborative arms, AMRs, and servo systems — with the precision and reliability that motion demands.",
    stats: [
      { v: "0.3mm", l: "Min BGA Pitch" },
      { v: "X-Ray", l: "100% BGA Verify" },
      { v: "IPC3",  l: "Class III Build" },
      { v: "20+",   l: "Process Patents" },
    ],
    painPoints: [
      { icon: Cpu,           title: "Multi-Axis Precision",      body: "Joint controllers must achieve sub-microsecond cycle times across 6+ axes. Board-level noise, EMI coupling, and power integrity directly impact trajectory accuracy." },
      { icon: Thermometer,   title: "Thermal Density",           body: "High-current servo drives and DSP processors pack enormous heat into compact form factors. Inadequate thermal management causes derating and premature failure." },
      { icon: AlertTriangle, title: "Vibration & Shock",         body: "Robot arms experience continuous vibration and high-G impact during operation. Solder joint integrity and component seating must withstand IEC 60068-2 vibration profiles." },
      { icon: Activity,      title: "Signal Integrity",          body: "High-speed encoder feedback and EtherCAT at 100 Mbps demand controlled-impedance routing, careful ground stitching, and minimal via stubs." },
      { icon: Lock,          title: "Long MTBF Requirements",    body: "Downtime in automated production is unacceptable. Robot PCBAs must demonstrate MTBF of 50,000+ hours with full traceability for field RCA." },
      { icon: BarChart3,     title: "Miniaturization Pressure",  body: "Collaborative arms and mobile robots demand ever-smaller boards. HDI, any-layer blind/buried vias, and 01005 component placement are standard requirements." },
    ],
    capabilities: [
      { label: "HDI & Any-Layer Vias",       detail: "Up to 20 build-up layers, laser micro-via 0.10 mm" },
      { label: "01005 Component Placement",  detail: "FUJI NXT III with vision-guided precision placement" },
      { label: "BGA / Micro-BGA 0.3 mm",    detail: "100% X-ray inspection on every BGA placement" },
      { label: "Flying Probe ICT",           detail: "No fixture needed — ideal for low-volume robot builds" },
      { label: "Aging / Burn-in Testing",    detail: "48–96h burn-in to screen infant mortality" },
      { label: "Impedance Control ±5%",      detail: "TDR-verified for EtherCAT, EnDat, and BiSS lines" },
      { label: "Conformal Coating (3-proof)",detail: "IP-rated protection for joint-level exposure" },
      { label: "In-House SMT Stencil Room",  detail: "Laser-cut stencils cut same-day for fast prototyping" },
    ],
    certs: [
      { name: "ISO 9001:2015",       scope: "Quality Management System",      color: GD },
      { name: "IPC-A-610 Class III", scope: "High-Reliability Electronics",   color: "#3B82F6" },
      { name: "ISO 14001:2015",      scope: "Environmental Management",        color: "#22C55E" },
      { name: "RoHS / REACH",        scope: "Substance Compliance",            color: "#22C55E" },
    ],
    cases: [
      {
        image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=600&h=400&fit=crop",
        tag: "Collaborative Robot",
        title: "6-Axis Cobot Joint Controller",
        specs: ["Layers: 10 HDI", "01005 components", "BGA 0.4mm pitch", "X-ray 100%", "Flying Probe"],
        outcome: "Torque sensor fusion at 1 kHz update rate. Deployed in 2,000+ cobot arms globally for automotive final assembly.",
      },
      {
        image: FACTORY.line4,
        tag: "AMR Navigation",
        title: "AMR SLAM Navigation Board",
        specs: ["Layers: 8", "LVDS + PCIe", "Impedance ±5%", "Conformal coat", "Burn-in 72h"],
        outcome: "Fuses LiDAR, IMU, and camera data for real-time SLAM. Powers AMR fleets in e-commerce fulfillment centers.",
      },
      {
        image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=600&h=400&fit=crop",
        tag: "Servo System",
        title: "High-Power Servo Drive PCBA",
        specs: ["Heavy copper 3 oz", "IGBT gate drivers", "AOI + X-ray", "FCT 100%", "EMC tested"],
        outcome: "Handles 5 kW continuous with <0.01% position error. Used in CNC milling centers and textile machinery.",
      },
      {
        image: FACTORY.equip2,
        tag: "Vision",
        title: "Machine Vision Controller Board",
        specs: ["Layers: 6", "GigE Vision", "FPGA BGA", "X-ray 100%", "Aging 48h"],
        outcome: "Processes 60 fps at 20 MP for inline inspection. Deployed in semiconductor wafer and display panel production.",
      },
    ],
    factoryNote: "Robotics PCBAs are manufactured on dedicated high-precision SMT lines with FUJI NXT III placement systems and 100% X-ray coverage — ensuring every BGA solder joint is verified before shipment.",
  },

  // ── MEDICAL ───────────────────────────────────────────────────────────────
  medical: {
    slug: "medical",
    name: "Medical",
    tagline: "ISO 13485-Certified PCBA for Life-Critical Medical Devices",
    heroImage: "https://images.unsplash.com/photo-1513224502586-d1e602410265?w=1400&h=700&fit=crop",
    heroSub: "PCBasic holds ISO 13485 certification and manufactures PCBAs for Class I–III medical devices — from diagnostic imaging and patient monitoring to ventilators and implantable device support electronics.",
    stats: [
      { v: "ISO 13485", l: "Medical Certified" },
      { v: "100%",      l: "Flying Probe" },
      { v: "100%",      l: "X-Ray on BGA" },
      { v: "Full",      l: "Lot Traceability" },
    ],
    painPoints: [
      { icon: Shield,        title: "Regulatory Compliance",     body: "FDA 21 CFR Part 820, EU MDR 2017/745, and ISO 13485 demand documented process control, CAPA, and Design History Files (DHF) — any gap risks market access." },
      { icon: AlertTriangle, title: "Zero-Defect Requirement",   body: "In life-critical devices, there is no tolerance for field failures. Every board must demonstrate functional correctness before leaving the facility." },
      { icon: FileText,      title: "Full Material Traceability",body: "Regulators require lot-level traceability for every component — from supplier CoC through board serialization to end-device record." },
      { icon: Activity,      title: "Signal Precision",          body: "Biosignal acquisition boards (ECG, EEG, EMG) operate at µV signal levels. PCB layout, shielding, and ground design are critical to noise floor." },
      { icon: Lock,          title: "Biocompatibility",          body: "Surface finishes, fluxes, and conformal coatings in patient-contact proximity must comply with ISO 10993 biocompatibility standards." },
      { icon: Thermometer,   title: "Environmental Qualification",body: "Medical devices must pass IEC 60068 thermal, humidity, and ESD tests. Drop testing and altitude qualification add further complexity." },
    ],
    capabilities: [
      { label: "ISO 13485:2016 Certified",    detail: "Dedicated medical production line with QMS controls" },
      { label: "Flying Probe 100%",           detail: "100% ICT coverage without custom fixture investment" },
      { label: "X-Ray 100% on BGA",           detail: "Unicomp AX7900 — BGA solder joint verification every board" },
      { label: "Aging / Burn-in Testing",     detail: "48–96h stress screening to catch infant-mortality failures" },
      { label: "Full Lot Traceability (MES)", detail: "Component lot → board serial → shipment, every step logged" },
      { label: "Conformal Coating",           detail: "Acrylic / silicone coating for humidity and corrosion resistance" },
      { label: "ESD-Protected Assembly",      detail: "IEC 61340-5-1 compliant floor and handling protocol" },
      { label: "DFM + DFT Engineering",       detail: "Pre-production review to catch testability gaps early" },
    ],
    certs: [
      { name: "ISO 13485:2016", scope: "Medical Devices Quality Management", color: "#EF4444" },
      { name: "ISO 9001:2015",  scope: "Quality Management System",          color: GD },
      { name: "ISO 14001:2015", scope: "Environmental Management",           color: "#22C55E" },
      { name: "ISO 45001:2018", scope: "Occupational Health & Safety",       color: "#22C55E" },
    ],
    cases: [
      {
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        tag: "Respiratory",
        title: "ICU Ventilator Control PCB",
        specs: ["Layers: 8", "ENIG finish", "Flying Probe 100%", "Burn-in 96h", "Full lot trace"],
        outcome: "Controls airflow, pressure/volume monitoring, and alarm integration. Supplied to 3 OEM ventilator manufacturers in EU and North America.",
      },
      {
        image: FACTORY.pcb2,
        tag: "Diagnostics",
        title: "Ultrasound Therapy Control Board",
        specs: ["Layers: 6", "HDI blind vias", "X-ray 100%", "ISO 13485 QMS", "FCT 100%"],
        outcome: "Drives high-frequency piezoelectric transducers in physiotherapy and aesthetic treatment devices. CE and FDA 510(k) supporting documentation provided.",
      },
      {
        image: "https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?w=600&h=400&fit=crop",
        tag: "Phototherapy",
        title: "Laser Therapy Control Board",
        specs: ["Layers: 4", "HASL-LF", "AOI + X-ray", "Conformal coat", "IEC 60601 ready"],
        outcome: "Precision PWM control for therapeutic laser modules (650–980 nm). Used in dermatology, rehabilitation, and surgical equipment.",
      },
      {
        image: FACTORY.equip3,
        tag: "Monitoring",
        title: "Patient Monitor Main PCB",
        specs: ["Layers: 10", "Rogers + FR4", "BGA 0.5mm", "X-ray 100%", "Aging 72h"],
        outcome: "Acquires ECG, SpO₂, NIBP, and temperature with <1 µV noise floor. Deployed in 500-bed ICU infrastructure projects.",
      },
    ],
    factoryNote: "Medical PCBA production runs on a segregated, ESD-protected line operating under our ISO 13485 QMS — with dedicated material quarantine, first-article sign-off, and batch release documentation for every order.",
  },

  // ── AUTOMOTIVE ────────────────────────────────────────────────────────────
  automotive: {
    slug: "automotive",
    name: "Automotive",
    tagline: "IATF 16949-Certified PCBA for EV, ADAS & Body Electronics",
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&h=700&fit=crop",
    heroSub: "PCBasic holds IATF 16949 certification and manufactures automotive-grade PCBAs for ECUs, EV powertrain controllers, ADAS camera modules, and intelligent body electronics — built to survive the road.",
    stats: [
      { v: "IATF 16949", l: "Automotive Certified" },
      { v: "-40–+125°C", l: "Thermal Range" },
      { v: "PFMEA",      l: "Risk-Driven Process" },
      { v: "APQP",       l: "NPI Support" },
    ],
    painPoints: [
      { icon: Thermometer,   title: "Extreme Thermal Cycling",   body: "Under-hood electronics face -40 °C to +125 °C cycling, causing solder joint fatigue and delamination in standard FR4 builds. Automotive-grade laminates and high-reliability alloys are non-negotiable." },
      { icon: Activity,      title: "Vibration & Mechanical Shock", body: "ISO 16750-3 defines severe vibration profiles for powertrain and chassis-mounted modules. Component retention and solder integrity must be demonstrated through HALT/HASS." },
      { icon: Shield,        title: "AEC-Q100/Q101 Components",  body: "All active devices must be automotive-qualified. OEM supply chains require traceable, authorized-distributor sourcing — no grey market or counterfeit risk." },
      { icon: FileText,      title: "PPAP / APQP Documentation", body: "Tier-1 OEM approval demands full PPAP submission including Control Plans, PFMEA, MSA, and Capability Studies before first production release." },
      { icon: AlertTriangle, title: "Functional Safety (ISO 26262)", body: "ADAS and powertrain boards increasingly require ASIL-B/D compliance — demanding traceability of safety requirements through design and manufacturing process." },
      { icon: Lock,          title: "Supplier Qualification Rigor", body: "OEM and Tier-1 audits evaluate production line capability (Cpk ≥ 1.67), equipment calibration records, and statistical process control data going back 3+ years." },
    ],
    capabilities: [
      { label: "IATF 16949:2016 Certified",  detail: "Automotive QMS covering design, production, and service" },
      { label: "PFMEA + Control Plans",       detail: "Risk-driven process design before first production run" },
      { label: "APQP / NPI Engineering",      detail: "Structured gate reviews from concept through PPAP approval" },
      { label: "AEC-Q Authorized Sourcing",   detail: "680,000+ components from original, authorized distributors only" },
      { label: "Environmental Stress Screening", detail: "Drop, vibration, salt spray, and thermal shock testing" },
      { label: "Selective Wave Soldering",    detail: "Automated selective soldering for mixed-tech power boards" },
      { label: "Conformal Coating",           detail: "Automotive-grade acrylic and silicone for IP67-level protection" },
      { label: "SPC / Cpk ≥ 1.67",          detail: "Statistical process control with real-time dashboards" },
    ],
    certs: [
      { name: "IATF 16949:2016", scope: "Automotive Quality Management",  color: "#EF4444" },
      { name: "ISO 9001:2015",   scope: "Quality Management System",       color: GD },
      { name: "ISO 14001:2015",  scope: "Environmental Management",        color: "#22C55E" },
      { name: "CE / FCC",        scope: "Market Access Certifications",    color: "#6366F1" },
    ],
    cases: [
      {
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop",
        tag: "EV Charging",
        title: "EV On-Board Charger (OBC) Control PCB",
        specs: ["Layers: 8", "Heavy Cu 3 oz", "IATF 16949", "PFMEA / CP", "PPAP Level 3"],
        outcome: "Manages PFC, LLC resonant conversion, and CAN communication for 22 kW OBC modules. Qualified by two Tier-1 EV suppliers in Germany.",
      },
      {
        image: FACTORY.line5,
        tag: "ADAS",
        title: "ADAS Front Camera Module PCB",
        specs: ["Layers: 10 HDI", "Rogers hybrid", "Impedance ±5%", "AEC-Q active ICs", "X-ray 100%"],
        outcome: "Supports 8 MP MIPI CSI-2 at 1.5 Gbps/lane. Used in forward-collision warning and lane-keep assist systems.",
      },
      {
        image: FACTORY.pcb3,
        tag: "Body Control",
        title: "Domain Control Unit (DCU) PCBA",
        specs: ["Layers: 12", "BGA + QFN", "CAN FD + LIN", "Conformal coat", "ASIL-B trace"],
        outcome: "Consolidates lighting, HVAC, and window control into a single domain. Reduces harness weight by 40% vs. distributed ECU approach.",
      },
      {
        image: "https://images.unsplash.com/photo-1676288176918-232f7caadfee?w=600&h=400&fit=crop",
        tag: "Instrument Cluster",
        title: "Digital Instrument Cluster Board",
        specs: ["Layers: 6", "ENIG + OSP", "LVDS display I/F", "EMC tested", "AEC-Q100 SoC"],
        outcome: "Drives 12.3\" TFT at 1920×720 with GPU acceleration. Certified for -40 to +85 °C, 95% RH. Deployed in 3 OEM model lines.",
      },
    ],
    factoryNote: "Automotive builds run under our IATF 16949-certified QMS with PFMEA-driven control plans, SPC dashboards, and full PPAP documentation support — from engineering prototype through high-volume production release.",
  },
};

// ── Shared UI atoms ───────────────────────────────────────────────────────────
function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest mb-2"
      style={{ color: light ? "rgba(255,255,255,0.4)" : G }}>
      {children}
    </p>
  );
}
function SectionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: light ? "#fff" : DK }}>
      {children}
    </h2>
  );
}

// ── Fallback image ────────────────────────────────────────────────────────────
function Img({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={e => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop"; }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Solutions() {
  const { industry } = useParams<{ industry: string }>();
  const data = industry ? INDUSTRIES[industry] : undefined;
  if (!data) return <Navigate to="/solutions/industrial" replace />;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: W, color: DK, minHeight: "100vh" }}>
      <NavBar activePage="solutions" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <Img src={data.heroImage} alt={data.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.38)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Link to="/" className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Home</Link>
            <ChevronRight size={11} color="rgba(255,255,255,0.25)" />
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Solutions</span>
            <ChevronRight size={11} color="rgba(255,255,255,0.25)" />
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.7)" }}>{data.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-10">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ background: `${G}CC`, color: "#fff" }}>
                Industry Solution
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
                {data.tagline}
              </h1>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.55)" }}>
                {data.heroSub}
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 shrink-0 lg:min-w-[280px]">
              {data.stats.map(s => (
                <div key={s.l} className="rounded-lg p-3 text-center"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                  <p className="text-base font-bold leading-tight" style={{ fontFamily: "'Outfit', sans-serif", color: G }}>{s.v}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry switcher strip */}
        <div className="relative z-10 bg-black/30 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto py-0">
            {Object.values(INDUSTRIES).map(ind => (
              <Link key={ind.slug} to={`/solutions/${ind.slug}`}
                className="px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors shrink-0"
                style={{
                  borderColor: ind.slug === data.slug ? G : "transparent",
                  color: ind.slug === data.slug ? "#6EE78A" : "rgba(255,255,255,0.5)",
                }}>
                {ind.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-16" style={{ background: DK }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel light>Industry Challenges</SectionLabel>
          <SectionTitle light>The Pain Points We Solve</SectionTitle>
          <p className="text-sm mb-10 max-w-2xl" style={{ color: "rgba(255,255,255,0.45)" }}>
            Understanding the real manufacturing pressures facing {data.name.toLowerCase()} teams — and how our processes address each one.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.painPoints.map(pp => {
              const Icon = pp.icon;
              return (
                <div key={pp.title} className="rounded-xl p-5 flex gap-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: `rgba(26,92,42,0.35)` }}>
                    <Icon size={17} color={G} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1.5">{pp.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{pp.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-16 border-t" style={{ background: WH, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Manufacturing Capabilities</SectionLabel>
          <SectionTitle>Built for {data.name} Demands</SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Capability chips */}
            <div className="grid sm:grid-cols-2 gap-3">
              {data.capabilities.map(cap => (
                <div key={cap.label} className="rounded-lg border p-4 flex gap-3"
                  style={{ borderColor: BD, background: W }}>
                  <CheckCircle size={15} color={G} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: DK }}>{cap.label}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: M }}>{cap.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Factory photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {[FACTORY.floor, FACTORY.equip1, FACTORY.equip2, FACTORY.equip3].map((src, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ height: 150 }}>
                  <Img src={src} alt={`Factory ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Production line strip */}
          <div className="mt-10 grid grid-cols-3 lg:grid-cols-6 gap-2">
            {[FACTORY.line1, FACTORY.line2, FACTORY.line3, FACTORY.line4, FACTORY.line5, FACTORY.line6].map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden" style={{ height: 100 }}>
                <Img src={src} alt={`SMT Line ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-3" style={{ color: M }}>
            16 SMT production lines · 20,000 m² · Shenzhen + Huizhou factories
          </p>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-14 border-t" style={{ background: W, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Quality & Compliance</SectionLabel>
          <SectionTitle>Certifications That Matter for {data.name}</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.certs.map(cert => (
              <div key={cert.name} className="rounded-xl bg-white border p-5" style={{ borderColor: BD }}>
                <div className="flex items-start justify-between mb-3">
                  <Shield size={20} color={cert.color} />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ background: `${cert.color}15`, color: cert.color }}>Active</span>
                </div>
                <p className="text-sm font-bold" style={{ color: DK }}>{cert.name}</p>
                <p className="text-xs mt-0.5 leading-snug" style={{ color: M }}>{cert.scope}</p>
              </div>
            ))}
          </div>

          {/* Global stats bar */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "120,000+", l: "Global Customers" },
              { v: "100+",     l: "Countries Served" },
              { v: "96.15%",   l: "On-Time Delivery" },
              { v: "0.2%",     l: "Complaint Rate" },
            ].map(s => (
              <div key={s.l} className="rounded-xl p-4 text-center bg-white border" style={{ borderColor: BD }}>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: G }}>{s.v}</p>
                <p className="text-xs mt-1" style={{ color: M }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-16 border-t" style={{ background: WH, borderColor: BD }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Case Studies</SectionLabel>
          <SectionTitle>Real Boards. Proven Results.</SectionTitle>
          <p className="text-sm mb-10 max-w-xl" style={{ color: M }}>
            Representative PCBAs we have built for {data.name.toLowerCase()} customers — showing specs, process highlights, and deployment context.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.cases.map(cs => (
              <div key={cs.title} className="rounded-xl border overflow-hidden flex flex-col bg-white group"
                style={{ borderColor: BD }}>
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <Img src={cs.image} alt={cs.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                      style={{ background: G }}>
                      {cs.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color: DK }}>{cs.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cs.specs.map(s => (
                      <span key={s} className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ background: "#E8F0E9", color: G }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: M }}>{cs.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACTORY PROOF ── */}
      <section className="py-16 border-t" style={{ background: DK, borderColor: "#2A2A3E" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel light>Our Factory</SectionLabel>
          <SectionTitle light>See It to Believe It</SectionTitle>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "rgba(255,255,255,0.45)" }}>
            {data.factoryNote}
          </p>

          {/* Mosaic */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            <div className="col-span-2 row-span-2 rounded-xl overflow-hidden" style={{ height: 300 }}>
              <Img src={FACTORY.floor} alt="PCBasic factory floor"
                className="w-full h-full object-cover" />
            </div>
            {[FACTORY.equip4, FACTORY.line2, FACTORY.pcb1, FACTORY.pcb2].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ height: 142 }}>
                <Img src={src} alt={`Factory shot ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Process steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", label: "IQC Incoming Inspection",   icon: Shield },
              { n: "02", label: "SMT + AOI + SPI",           icon: Cpu },
              { n: "03", label: "X-Ray + Flying Probe",       icon: Activity },
              { n: "04", label: "FCT + QA + ESD Packaging",  icon: CheckCircle },
            ].map(({ n, label, icon: Icon }) => (
              <div key={n} className="flex gap-3 items-start p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-xs font-mono font-bold" style={{ color: G }}>{n}</span>
                <div className="flex gap-2 items-start">
                  <Icon size={14} color={G} className="shrink-0 mt-0.5" />
                  <span className="text-xs text-white">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: G }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
              {data.name} · Instant Quote
            </p>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Ready to build your next board?
            </h2>
            <p className="text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Upload your Gerber files and BOM for a same-day quote. Our engineers review every DFM before your order starts — catching issues before they reach production.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              {["Free DFM review", "No MOQ", "24h prototype turnaround", "Full lot traceability"].map(f => (
                <span key={f} className="flex items-center gap-1.5">
                  <CheckCircle size={11} color="#86efac" /> {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
            <Link to="/quote"
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-sm"
              style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}>
              <Zap size={15} /> Get Instant Quote
            </Link>
            <a href="mailto:JS@pcbasic.com"
              className="flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium rounded-sm"
              style={{ background: WH, color: G }}>
              <Phone size={14} /> Talk to an Engineer <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="py-5 border-t" style={{ background: "#0D0D1A", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 PCBasic</p>
          <Link to="/" className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
