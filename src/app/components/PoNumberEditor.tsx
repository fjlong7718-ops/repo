import { useEffect, useRef, useState } from "react";
import { Check, Pencil, X } from "lucide-react";

export function PoNumberEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(value), [value]);
  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  const save = () => {
    const next = draft.trim() || "N/A";
    onChange(next);
    setEditing(false);
  };
  const cancel = () => { setDraft(value); setEditing(false); };

  if (!editing) return <span className="inline-flex items-center gap-1"><span style={{ color: "#111827" }}>{value}</span><button type="button" onClick={() => setEditing(true)} aria-label="Edit PO number" title="Edit PO number" className="inline-flex h-5 w-5 items-center justify-center rounded text-[#1A5C2A] hover:bg-green-50"><Pencil size={12}/></button></span>;

  return <span className="inline-flex items-center gap-1 align-middle"><input ref={inputRef} value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter") save(); if (event.key === "Escape") cancel(); }} aria-label="PO number" className="h-6 w-24 rounded border border-green-600 bg-white px-1.5 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-green-600"/><button type="button" onClick={save} aria-label="Save PO number" title="Save" className="inline-flex h-5 w-5 items-center justify-center rounded bg-green-700 text-white"><Check size={12}/></button><button type="button" onClick={cancel} aria-label="Cancel PO number editing" title="Cancel" className="inline-flex h-5 w-5 items-center justify-center rounded bg-gray-100 text-gray-600"><X size={12}/></button></span>;
}
