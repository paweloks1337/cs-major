import { cookies } from "next/headers";
import { getSessionByToken } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value || null;

  if (!sessionCookie) {
    return (
      <div style={{ padding: 20 }}>
        <p>You are not logged in. <Link href="/login">Login</Link></p>
      </div>
    );
  }

  const sessionData = await getSessionByToken(sessionCookie);
  if (!sessionData) {
    return (
      <div style={{ padding: 20 }}>
        <p>Session expired or invalid. <Link href="/login">Login</Link></p>
      </div>
    );
  }

  const user = sessionData.user;
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <form method="post" action="/api/auth/logout">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
