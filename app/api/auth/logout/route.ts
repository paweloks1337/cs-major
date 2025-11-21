cat > app/api/auth/logout/route.ts <<'EOF'
import { NextResponse } from "next/server";
import { deleteSessionByToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/(?:^|; )session=([^;]+)/);
    const token = match ? match[1] : null;
    if (token) {
      await deleteSessionByToken(token);
    }
    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", `session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
EOF