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

  let packageId: string | undefined;
  if (data.packageSlug) {
    const pkg = await prisma.package.findUnique({
      where: { slug: data.packageSlug },
      select: { id: true },
    });
    packageId = pkg?.id;
  }

  const bookingMeta =
    data.roomPreference || data.paymentOption || data.travelers?.length
      ? {
          roomPreference: data.roomPreference,
          paymentOption: data.paymentOption,
          couponCode: data.couponCode || null,
          bookingTotal: data.bookingTotal ?? null,
          travelers: data.travelers ?? [],
        }
      : null;

  const specialRequests = [
    data.specialRequests?.trim(),
    bookingMeta ? `[Booking]\n${JSON.stringify(bookingMeta, null, 2)}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

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
        specialRequests: specialRequests || null,
        status: "high_quality_lead",
        packageId,
        departureId: data.departureId || null,
        notes: bookingMeta ?? undefined,
      },
    });
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    return NextResponse.json(
      { error: "We couldn't submit your inquiry. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: "received", reference }, { status: 201 });
}
