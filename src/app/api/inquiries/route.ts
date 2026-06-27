import { NextResponse } from "next/server";
import { inquirySchema, makeReference } from "@/lib/inquiry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const reference = makeReference();

  // The inquiry is captured here. Persisting it to the inquiries table and
  // sending the admin alert + pilgrim confirmation email are wired in once the
  // database and mail credentials are connected.
  const inquiry = { reference, ...parsed.data, receivedAt: new Date().toISOString() };
  console.log("New inquiry received:", inquiry);

  return NextResponse.json(
    { status: "received", reference },
    { status: 201 },
  );
}
