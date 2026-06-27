"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";

export type SelectOption = { value: string; label: string };

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  id?: string;
  placeholder?: string;
  /** Compact trigger for use inside icon fields */
  variant?: "field" | "standalone";
  compact?: boolean;
};

export function CustomSelect({
  value,
  onChange,
  options,
  id,
  placeholder = "Select…",
  variant = "field",
  compact = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const listboxId = id ?? autoId;

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  const triggerClass =
    variant === "field"
      ? `flex w-full min-w-0 items-center justify-between gap-2 text-left text-sm text-on-surface outline-none ${compact ? "py-1.5 sm:py-2" : "py-2 sm:py-2.5"}`
      : "flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-left text-sm text-on-surface outline-none transition-colors hover:border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <button
        type="button"
        id={listboxId}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${triggerClass} ${open && variant === "standalone" ? "border-primary ring-1 ring-primary" : ""}`}
      >
        <span className="truncate">
          {selected?.label ?? (
            <span className="text-on-surface-variant">{placeholder}</span>
          )}
        </span>
        <MaterialIcon
          name="expand_more"
          className={`shrink-0 text-lg text-neutral transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={listboxId}
          className="absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-auto rounded-lg border border-outline-variant bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value || "__empty"} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? "bg-primary-10 font-semibold text-primary"
                      : "text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
