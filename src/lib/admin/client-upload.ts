"use client";

import { upload } from "@vercel/blob/client";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function resolveMimeType(file: File): string | null {
  if (ALLOWED.has(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = EXT_TO_MIME[ext];
  return mime && ALLOWED.has(mime) ? mime : null;
}

async function uploadLocal(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload-local", {
    method: "POST",
    body,
    credentials: "same-origin",
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) throw new Error(data.error ?? `Upload failed (${res.status})`);
  if (!data.url) throw new Error("Upload succeeded but no URL was returned.");
  return data.url;
}

/** Upload image via Vercel Blob client (production) or local disk (dev). */
export async function uploadAdminImage(file: File): Promise<string> {
  const mime = resolveMimeType(file);
  if (!mime) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be under 8 MB");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const pathname = `alwrd/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  if (process.env.NODE_ENV === "development") {
    try {
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        contentType: mime,
      });
      return blob.url;
    } catch {
      return uploadLocal(file);
    }
  }

  const blob = await upload(pathname, file, {
    access: "public",
    handleUploadUrl: "/api/admin/upload",
    contentType: mime,
  });
  return blob.url;
}
