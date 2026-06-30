import { getSession, type Session } from "@/lib/auth";

export async function requireAdmin(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requireSuperAdmin(): Promise<Session> {
  const session = await requireAdmin();
  if (session.role !== "super_admin") throw new Error("Forbidden");
  return session;
}
