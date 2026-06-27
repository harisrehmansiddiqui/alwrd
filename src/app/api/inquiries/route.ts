import { NextResponse } from "next/server";
import { inquirySchema, makeReference } from "@/lib/inquiry";
import { prisma } from "@/lib/db";

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

  const data = parsed.data;
  const reference = makeReference();

  // Link to a package if the inquiry came from a package page.
  let packageId: string | undefined;
  if (data.packageSlug) {
    const pkg = await prisma.package.findUnique({
      where: { slug: data.packageSlug },
      select: { id: true },
    });
    packageId = pkg?.id;
  }

  try {
    await prisma.inquiry.create({
      data: {
        reference,
        travelerName: data.travelerName,
        phone: data.phone,
        email: data.email,
        passportNumber: data.passportNumber || null,
        travelDate: data.travelDate || null,
        groupSize: data.groupSize,
        specialRequests: data.specialRequests || null,
        status: "high_quality_lead",
        packageId,
      },
    });
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    return NextResponse.json(
      { error: "We couldn't submit your inquiry. Please try again." },
      { status: 500 },
    );
  }

  // Admin alert + pilgrim confirmation email are sent here once mail
  // credentials are configured.

  return NextResponse.json({ status: "received", reference }, { status: 201 });
}
