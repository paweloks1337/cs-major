"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h1>Hello CS Major!</h1>

      {session ? (
        <>
          <p>Logged in as {session.user?.name}</p>
          <button onClick={() => signOut()} style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}>
            Log out
          </button>
        </>
      ) : (
        <button onClick={() => signIn("discord")} style={{ marginTop: 20, padding: "10px 20px", cursor: "pointer" }}>
          Log in with Discord
        </button>
      )}
    </div>
  );
}
