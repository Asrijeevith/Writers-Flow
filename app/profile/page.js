"use client";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-center mt-10">Not signed in</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h1>
      <p className="mb-4">{session.user.email}</p>
      <img src={session.user.image} alt="User Profile" className="rounded-full w-20 h-20 mb-4" />
      <button
        onClick={() => signOut()}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
