cat > app/api/auth/login/route.ts <<'EOF'
import { NextResponse } from "next/server";
import { findUserByEmail, validatePassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const user = await findUserByEmail(email);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const ok = await validatePassword(password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const { token, expiresAt, maxAgeSeconds } = await createSession(user._id.toString());

    const isDev = process.env.NODE_ENV !== "production";
    const cookieHeader = isDev
      ? `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`
      : `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSeconds}`;

    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", cookieHeader);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
EOF