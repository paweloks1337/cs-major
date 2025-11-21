cat > app/api/auth/register/route.ts <<'EOF'
import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const existing = await findUserByEmail(email);
    if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });

    const user = await createUser(email, password);
    return NextResponse.json({ success: true, userId: user._id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
EOF