import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  signSession,
  readSession,
  type Session,
} from "@/lib/session";

const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(session: Session) {
  const token = await signSession(session);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return readSession(token);
}

export type { Session };
