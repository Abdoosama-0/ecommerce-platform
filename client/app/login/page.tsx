"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const googleLogin = () => {
  window.location.href = `http://localhost:5000/auth/google`;
};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: string, quantity: number }[];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/localLogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }
      alert("Logged")

      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('isAdmin', data.isAdmin.toString());
      localStorage.removeItem('cart');

      window.location.href = '/';
    } catch (err) {
      setMessage('Something went wrong, please try again later');
      console.log(err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">🔐 Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-indigo-600 font-medium hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <div className="bg-red-500 text-white font-medium p-2 rounded-xl text-center">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
          >
            Login
          </button>
               <button
               onClick={()=>googleLogin()}
         
            className="w-full py-3 rounded-xl bg-slate-50 text-black gap-2 flex items-center justify-center cursor-pointer font-semibold text-lg hover:bg-slate-200 transition shadow-md"
          >
        <FcGoogle />google

          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between items-center mt-6 text-sm text-slate-700">
          <p
            onClick={() => router.push("/register")}
            className="cursor-pointer hover:text-indigo-600 hover:underline"
          >
            Don&apos;t have an account?
          </p>
          <p
            onClick={() => router.push("/auth/forgetPassword")}
            className="cursor-pointer hover:text-indigo-600 hover:underline"
          >
            Forgot password?
          </p>
        </div>
      </div>
    </main>
  );
}
