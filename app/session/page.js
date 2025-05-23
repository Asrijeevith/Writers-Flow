"use client";
import { useSession } from "next-auth/react";

export default function SessionPage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Session Data</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
