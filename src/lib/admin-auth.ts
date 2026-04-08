import { cookies } from "next/headers";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(token.value, "base64").toString());
    return decoded;
  } catch {
    return null;
  }
}

export async function requireAdminAuth() {
  const session = await getAdminSession();
  if (!session) {
    return false;
  }
  return true;
}