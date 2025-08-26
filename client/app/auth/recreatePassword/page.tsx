"use client"
import React, { useState } from 'react'
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const RecreatePasswordContent = () => {
  const router = useRouter();
  const [message,setMessage]= useState('')
  const [newPassword,setNewPassword]= useState('')
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/recreatePassword?token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    alert('Password recreated successfully, please log in');
    router.push('/login');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">🔑 Recreate Password</h1>
        
        <input 
          className="border rounded-xl w-full p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition mb-3"
          type="password"
          value={newPassword}
          placeholder="Enter your new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {message && (
          <p className="text-sm text-red-500 mb-3">{message}</p>
        )}
        
        <button 
          onClick={handleSubmit} 
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
        >
          Submit
        </button>
      </div>
    </main>
  )
}

export default function RecreatePassword() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RecreatePasswordContent />
    </Suspense>
  );
}
