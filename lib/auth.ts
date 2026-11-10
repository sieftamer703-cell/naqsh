import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "naqsh_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "naqsh@2026";
}

function sessionToken() {
  return createHmac("sha256", adminPassword())
    .update("naqsh-admin-session-v1")
    .digest("hex");
}

export function checkPassword(input: string) {
  const a = createHmac("sha256", "cmp").update(input).digest();
  const b = createHmac("sha256", "cmp").update(adminPassword()).digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(sessionToken());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function createSession() {
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}
