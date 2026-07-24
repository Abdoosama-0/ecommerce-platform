"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOtpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyOtp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Invalid OTP");
        return;
      }

      alert("registered successfully please login");
      router.push("/login");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="page-container-narrow">
        <div className="card empty-state py-12">
          <p className="text-destructive font-medium">Invalid access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="   flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <form
        onSubmit={handleVerify}
        className="card rounded-2xl  p-6 sm:p-8 space-y-5 border w-fit"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold mb-1">Verify OTP</h1>
          <p className="text-sm text-muted">
            Code sent to: <span className="text-foreground">{email}</span>
          </p>
        </div>

        <div>
          <label htmlFor="otp" className="label">
            Verification code
          </label>
          <input
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input p-1 "
            placeholder="Enter OTP"
            autoComplete="one-time-code"
          />
        </div>

        {error && (
          <p className=" text-sm text-center" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className=" hover:bg-slate-600 rounded-2xl w-fit  bg-slate-700 text-white px-4 py-2 mx-auto block cursor-pointer"
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}