"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await signIn("email", { email, redirect: false });
    setSent(true);
  }

  if (sent)
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Check your email</h1>
        <p>A magic sign-in link has been sent to {email}</p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="you@example.com"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Send Magic Link
        </button>
      </form>
    </div>
  );
}
