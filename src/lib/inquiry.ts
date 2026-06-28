import { z } from "zod";

const travelerSchema = z.object({
  name: z.string().trim().min(2),
  gender: z.string().trim().min(1),
  dob: z.string().trim().optional().or(z.literal("")),
  passportNumber: z.string().trim().min(5),
  passportExpiry: z.string().trim().optional().or(z.literal("")),
});

export const inquirySchema = z.object({
  travelerName: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20),
  email: z.string().trim().email("Please enter a valid email"),
  passportNumber: z.string().trim().max(20).optional().or(z.literal("")),
  travelDate: z.string().trim().optional().or(z.literal("")),
  groupSize: z.coerce.number().int().min(1).max(50),
  packageSlug: z.string().trim().optional().or(z.literal("")),
  departureId: z.string().trim().optional().or(z.literal("")),
  specialRequests: z.string().trim().max(2000).optional().or(z.literal("")),
  roomPreference: z.enum(["quad", "triple"]).optional(),
  paymentOption: z.enum(["full", "partial", "office"]).optional(),
  couponCode: z.string().trim().max(32).optional().or(z.literal("")),
  bookingTotal: z.coerce.number().int().optional(),
  travelers: z.array(travelerSchema).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `ALW-${stamp}${rand}`;
}
