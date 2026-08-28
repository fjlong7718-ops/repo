import { useState } from "react";
import { X } from "lucide-react";

export const REMOVE_REASONS = [
  "Order review time is too long",
  "I wish to cancel the order immediately",
  "Price has increased",
  "Order details are incorrect, I would like to reorder",
  "Unprofessional customer service / my questions were not answered",
  "Other reasons",
];

export function RemoveDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState(REMOVE_REASONS[0]);
  const [otherText, setOtherText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded shadow-xl w-[480px] max-w-[95vw] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "#E5E2DB" }}>
          <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Remove Orders</span>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100 transition-colors">
            <X size={16} color="#6B7280" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm mb-1" style={{ color: "#374151" }}>
            Would you like to cancel your order? We&apos;d love to know the reason so we can make things better for you.
          </p>
          <p className="text-sm mb-4" style={{ color: "#374151" }}>
            Select a cancellation reason:
          </p>
          <div className="flex flex-col gap-3">
            {REMOVE_REASONS.map(r => (
              <div key={r}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span
                    className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: reason === r ? "#1A5C2A" : "#D1D5DB", background: "#fff" }}
                  >
                    {reason === r && <span className="w-2 h-2 rounded-full" style={{ background: "#1A5C2A" }} />}
                  </span>
                  <input type="radio" className="sr-only" value={r} checked={reason === r} onChange={() => setReason(r)} />
                  <span className="text-sm" style={{ color: "#374151" }}>{r}</span>
                </label>
                {r === "Other reasons" && reason === "Other reasons" && (
                  <textarea
                    value={otherText}
                    onChange={e => setOtherText(e.target.value)}
                    placeholder="Reasons"
                    rows={3}
                    className="mt-2 ml-7 w-[calc(100%-1.75rem)] text-sm rounded border px-3 py-2 outline-none resize-none"
                    style={{ borderColor: "#D1D5DB", color: "#374151" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#1A5C2A")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#D1D5DB")}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3.5 border-t" style={{ borderColor: "#E5E2DB" }}>
          <button
            onClick={() => onConfirm(reason === "Other reasons" && otherText ? otherText : reason)}
            className="px-6 py-1.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
            style={{ background: "#1A5C2A" }}
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-1.5 text-sm font-medium rounded border transition-colors hover:bg-gray-50"
            style={{ color: "#6B7280", borderColor: "#D1D5DB" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
