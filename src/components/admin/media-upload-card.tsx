"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadAdminImage } from "@/lib/admin/client-upload";

function isExternal(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function MediaUploadCard({
  mediaKey,
  label,
  category,
  currentUrl,
  defaultUrl,
  isCustom,
  onSave,
  onReset,
}: {
  mediaKey: string;
  label: string;
  category: string;
  currentUrl: string;
  defaultUrl: string;
  isCustom: boolean;
  onSave: (formData: FormData) => Promise<void>;
  onReset: (formData: FormData) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const uploadedUrl = await uploadAdminImage(file);
      setUrl(uploadedUrl);
      const saveFd = new FormData();
      saveFd.set("key", mediaKey);
      saveFd.set("url", uploadedUrl);
      saveFd.set("label", label);
      saveFd.set("category", category);
      setSaving(true);
      try {
        await onSave(saveFd);
      } catch (saveErr) {
        setError(
          saveErr instanceof Error
            ? `Image uploaded but could not save: ${saveErr.message}`
            : "Image uploaded but could not save to the database.",
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Check your connection.");
    } finally {
      setUploading(false);
      setSaving(false);
    }
  }

  async function handleSaveUrl() {
    setSaving(true);
    setError("");
    try {
      const fd = new FormData();
      fd.set("key", mediaKey);
      fd.set("url", url);
      fd.set("label", label);
      fd.set("category", category);
      await onSave(fd);
    } catch {
      setError("Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    const fd = new FormData();
    fd.set("key", mediaKey);
    setUrl(defaultUrl);
    await onReset(fd);
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-surface-tint">
        {url ? (
          isExternal(url) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt={label} className="h-full w-full object-cover" />
          ) : (
            <Image src={url} alt={label} fill className="object-cover" unoptimized />
          )
        ) : null}
        {isCustom && (
          <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
            Custom
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-muted">{category}</p>
          <h3 className="font-medium text-ink">{label}</h3>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-2 py-1.5 text-xs outline-none focus:border-brand"
        />
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading || saving}
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
          <button
            type="button"
            onClick={handleSaveUrl}
            disabled={saving || url === currentUrl}
            className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium"
          >
            Save URL
          </button>
          {isCustom && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600"
            >
              Reset default
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </article>
  );
}
