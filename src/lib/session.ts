import { SignJWT, jwtVerify } from "jose";

// Edge-safe (jose only, no next/headers) so middleware can import it.
export const SESSION_COOKIE = "alwrd_admin";

export type Session = {
  sub: string;
  name: string;
  role: string;
};

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(value);
}

export async function signSession(session: Session): Promise<string> {
  return new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function readSession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      sub: String(payload.sub),
      name: String(payload.name),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  return (await readSession(token)) !== null;
}
