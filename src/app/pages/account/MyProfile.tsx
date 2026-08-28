import { useState } from "react";

type AccountType = "Company" | "Personal";
type OrderPref = "Prototyping" | "Small Batch" | "Bulk Order";
type ProductType = "PCB" | "PCBA" | "CNC Machining" | "3D Printing";

const G = "#1A5C2A";
const BD = "#E5E7EB";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <label className="text-sm text-right shrink-0 pt-2" style={{ color: "#6B7280", width: 110 }}>
        {required && <span style={{ color: "#EF4444" }}>*</span>}{label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function TextInput({ placeholder = "", defaultValue = "", error = "" }: { placeholder?: string; defaultValue?: string; error?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-3 py-2 text-sm rounded border outline-none"
        style={{ borderColor: error ? "#EF4444" : focused ? G : BD, color: "#374151" }}
      />
      {error && <p className="text-xs mt-0.5" style={{ color: "#EF4444" }}>{error}</p>}
    </div>
  );
}

function Select({ placeholder, options }: { placeholder: string; options: string[] }) {
  return (
    <select defaultValue="" className="w-full px-3 py-2 text-sm rounded border outline-none appearance-none bg-white"
      style={{ borderColor: BD, color: "#374151" }}>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function MyProfile() {
  const [accountType, setAccountType] = useState<AccountType>("Company");
  const [orderPrefs, setOrderPrefs] = useState<Set<OrderPref>>(new Set());
  const [products, setProducts] = useState<Set<ProductType>>(new Set());
  const [companyNameError] = useState("Company Name cannot be empty");

  const togglePref = (p: OrderPref) => {
    const s = new Set(orderPrefs);
    s.has(p) ? s.delete(p) : s.add(p);
    setOrderPrefs(s);
  };
  const toggleProduct = (p: ProductType) => {
    const s = new Set(products);
    s.has(p) ? s.delete(p) : s.add(p);
    setProducts(s);
  };

  return (
    <div className="px-6 py-5 max-w-2xl w-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      <div className="space-y-6">
          {/* Info banner */}
          <div className="px-4 py-3 rounded border text-sm" style={{ background: "#F0FDF4", borderColor: "#BBF7D0", color: "#374151" }}>
            Filling in the following information will help you get more accurate service, and you'll get coupons up to{" "}
            <span className="font-bold" style={{ color: "#EF4444" }}>$10</span>.
            Coupons are only issued once on the first submission.
          </div>

          {/* Basic Information block */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 rounded" style={{ background: G }} />
              <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>Basic Information</h2>
            </div>

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4 pl-[126px]">
                <div className="w-16 h-16 rounded-full overflow-hidden border shrink-0" style={{ borderColor: BD }}>
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face"
                    alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <button className="px-4 py-1.5 text-xs font-semibold text-white rounded mb-1"
                    style={{ background: G }}>Upload Picture</button>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>Maximum 500Kb or 1∶1 in size.</p>
                </div>
              </div>

              {/* Read-only fields */}
              <Field label="User ID">
                <p className="text-sm py-2" style={{ color: "#1A5C2A", fontWeight: 600 }}>120087</p>
              </Field>
              <Field label="Email">
                <p className="text-sm py-2" style={{ color: "#374151" }}>tjlong7718@gmail.com</p>
              </Field>

              {/* Editable fields */}
              <Field label="Full Name" required><TextInput placeholder="" /></Field>
              <Field label="Your Birthday">
                <input type="date" className="w-full px-3 py-2 text-sm rounded border outline-none"
                  style={{ borderColor: BD, color: "#374151" }} />
              </Field>
              <Field label="Country/Region" required>
                <div className="relative">
                  <select className="w-full px-3 py-2 pl-8 text-sm rounded border outline-none appearance-none bg-white"
                    style={{ borderColor: BD, color: "#374151" }}>
                    <option>🇺🇸 United States</option>
                    <option>🇨🇳 China</option>
                    <option>🇩🇪 Germany</option>
                    <option>🇯🇵 Japan</option>
                    <option>🇬🇧 United Kingdom</option>
                  </select>
                </div>
              </Field>
              <Field label="Telephone No."><TextInput /></Field>
              <Field label="Mobile Phone."><TextInput /></Field>
              <Field label="Skype"><TextInput /></Field>
              <Field label="Address"><TextInput /></Field>
              <Field label="Postal code"><TextInput /></Field>
            </div>
          </div>

          {/* Personal/Company block */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 rounded" style={{ background: G }} />
              <h2 className="text-sm font-semibold" style={{ color: "#111827" }}>Personal / Company information</h2>
            </div>

            <div className="space-y-4">
              {/* Account type */}
              <Field label="Account Type" required>
                <div className="flex items-center gap-6 py-1">
                  {(["Company", "Personal"] as AccountType[]).map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#374151" }}>
                      <input type="radio" name="accountType" checked={accountType === t}
                        onChange={() => setAccountType(t)}
                        className="w-4 h-4 accent-green-700" />
                      {t}
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Company Name" required>
                <TextInput placeholder="Company Name" error={companyNameError} />
              </Field>
              <Field label="Website">
                <TextInput placeholder="Home page, Blog or Company site" />
              </Field>
              <Field label="Business Type" required>
                <Select placeholder="Choose Business Type" options={["Electronics", "Automotive", "Medical", "Industrial", "Consumer", "Other"]} />
              </Field>
              <Field label="Main Business">
                <TextInput placeholder="Main Business" />
              </Field>
              <Field label="Job Role" required>
                <Select placeholder="Choose Role" options={["Engineer", "Designer", "Purchasing", "Manager", "Student", "Other"]} />
              </Field>

              {/* Order Preference */}
              <Field label="Order Preference" required>
                <div className="flex flex-wrap gap-2 py-1">
                  {(["Prototyping", "Small Batch", "Bulk Order"] as OrderPref[]).map(p => (
                    <button key={p} onClick={() => togglePref(p)}
                      className="px-4 py-1.5 text-xs font-medium rounded border transition-colors"
                      style={{
                        background: orderPrefs.has(p) ? G : "#fff",
                        color: orderPrefs.has(p) ? "#fff" : "#374151",
                        borderColor: orderPrefs.has(p) ? G : BD,
                      }}>
                      {p}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Product checkboxes */}
              <Field label="">
                <div className="flex flex-wrap gap-4 py-1">
                  {(["PCB", "PCBA", "CNC Machining", "3D Printing"] as ProductType[]).map(p => (
                    <label key={p} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: "#374151" }}>
                      <input type="checkbox" checked={products.has(p)} onChange={() => toggleProduct(p)}
                        className="w-4 h-4 rounded accent-green-700" />
                      {p}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button className="px-8 py-2.5 text-sm font-bold text-white rounded transition-opacity hover:opacity-90"
              style={{ background: G }}>
              Update Information
            </button>
          </div>
      </div>
    </div>
  );
}
