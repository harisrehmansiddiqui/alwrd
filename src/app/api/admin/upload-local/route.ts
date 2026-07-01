import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

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

/** Local dev only — production uploads go browser → Blob directly. */
export async function POST(request: Request) {
  if (process.env.VERCEL) {
    return NextResponse.json(
      { error: "Use client-side Blob upload in production" },
      { status: 400 },
    );
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!resolveMimeType(file)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be under 8 MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, safeName), buffer);
    return NextResponse.json({ url: `/uploads/${safeName}` });
  } catch (err) {
    console.error("Local upload failed:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
