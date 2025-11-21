"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      router.push("/dashboard");
    } else {
      setErr(data.error || "Error");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <br />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}
