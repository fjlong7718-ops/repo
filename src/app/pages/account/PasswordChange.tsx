import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const G = "#1A5C2A";

function PasswordField({
  label, placeholder, highlight = false,
}: {
  label: string; placeholder: string; highlight?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  const borderColor = highlight ? "#EF4444" : focused ? G : "#D1D5DB";

  return (
    <div className="flex items-center gap-0" style={{ marginBottom: 20 }}>
      <label className="text-sm text-right shrink-0 pr-4" style={{ color: "#6B7280", width: 140 }}>
        {label}<span style={{ color: "#EF4444" }}>*</span>
      </label>
      <div className="flex items-center rounded border overflow-hidden transition-colors"
        style={{ borderColor, width: 280 }}>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 px-3 py-2 text-sm outline-none bg-white"
          style={{ color: "#374151" }}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="px-3 py-2 transition-colors"
          style={{ color: "#9CA3AF", background: "#fff" }}>
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function PasswordChange() {
  return (
    <div className="px-6 py-5 max-w-2xl w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top hint */}
      <p className="text-sm mb-6" style={{ color: G }}>
        If you want to change your password, enter your current password and the password you want to use in the future.
      </p>

      <div className="border-t pt-6" style={{ borderColor: "#F3F4F6" }}>
        <PasswordField label="Current Password" placeholder="Current Password" />
        <PasswordField label="New Password"     placeholder="New Password"     highlight />
        <PasswordField label="Confirm Password" placeholder="Confirm Password" />
      </div>

      <div className="border-t pt-6 pl-36 mt-2" style={{ borderColor: "#F3F4F6" }}>
        <button
          className="px-6 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
          style={{ background: G }}>
          Update Password
        </button>
      </div>
    </div>
  );
}
