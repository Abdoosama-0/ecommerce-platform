"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("📧 Please check your email for reset instructions.");
    } catch (err) {
      setMessage("Something went wrong, please try again later.");
      console.log(err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          🔑 Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          {message && (
            <div className="bg-indigo-500 text-white font-medium p-2 rounded-xl text-center">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="flex justify-center mt-6 text-sm text-slate-700">
          <p
            onClick={() => router.push("/login")}
            className="cursor-pointer hover:text-indigo-600 hover:underline"
          >
            Back to Login
          </p>
        </div>
      </div>
    </main>
  );
}
