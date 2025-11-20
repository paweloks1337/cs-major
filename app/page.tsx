"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Hello CS Major!</h1>
      <button onClick={() => signIn("discord")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
        Log in with Discord
      </button>
    </div>
  );
}