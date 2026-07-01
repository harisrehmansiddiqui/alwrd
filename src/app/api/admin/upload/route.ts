import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
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
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      if (process.env.VERCEL) {
        return NextResponse.json(
          {
            error:
              "Blob storage is not set up. In Vercel: Storage → Create → Blob, connect to this project, then redeploy.",
          },
          { status: 503 },
        );
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(uploadsDir, safeName), buffer);
      return NextResponse.json({ url: `/uploads/${safeName}` });
    }

    const blob = await put(`alwrd/${safeName}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error("Upload failed:", err);
    const message =
      err instanceof Error && err.message.includes("No token found")
        ? "Invalid or missing BLOB_READ_WRITE_TOKEN. Reconnect Blob storage in Vercel and redeploy."
        : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
