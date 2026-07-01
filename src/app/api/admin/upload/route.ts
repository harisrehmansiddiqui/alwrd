import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Blob storage is not set up. Connect a Blob store in Vercel and redeploy.",
      },
      { status: 503 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const session = await getSession();
        if (!session) {
          throw new Error("Unauthorized");
        }

        if (!pathname.startsWith("alwrd/")) {
          throw new Error("Invalid upload path");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: false,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("Blob client upload failed:", err);
    const message = err instanceof Error ? err.message : "Upload failed";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
