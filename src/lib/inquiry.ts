import { z } from "zod";

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
  specialRequests: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

// Short human-friendly reference for the pilgrim and the admin to quote.
export function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `ALW-${stamp}${rand}`;
}
