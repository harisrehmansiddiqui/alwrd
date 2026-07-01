"use client";

import Image from "next/image";
import { useRef, useState } from "react";

function isExternal(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function ImageUploadField({
  name,
  label,
  defaultValue = "",
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }
      setUrl(data.url);
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-ink">{label}</span>
      {hint && <p className="text-xs text-slate-muted">{hint}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-surface-tint">
          {url ? (
            isExternal(url) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="h-full w-full object-cover" />
            ) : (
              <Image src={url} alt="" fill className="object-cover" unoptimized />
            )
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-muted">
              No image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input type="hidden" name={name} value={url} />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Image URL or upload below"
            className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Upload image"}
            </button>
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-ink"
              >
                Clear
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0])}
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
