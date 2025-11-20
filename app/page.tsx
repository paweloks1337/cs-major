"use client";
export const dynamic = "force-dynamic";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession() || {};

  return (
    <div style={{ padding: "40px", textAlign: "center", fontSize: "20px" }}>
      <h1>CS Major</h1>

      {!session && (
        <button
          onClick={() => signIn("discord")}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Login with Discord
        </button>
      )}

      {session && (
        <div>
          <p>Logged in as {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            style={{ padding: "10px 20px", marginTop: "20px" }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}