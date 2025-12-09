"use client";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="text-red-600">
      Logout
    </button>
  );
}
