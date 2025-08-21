"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: string, quantity: number }[];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/localLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password, cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return

      }

      localStorage.setItem('isLogged', 'true')
      localStorage.setItem('isAdmin', data.isAdmin.toString())
      localStorage.removeItem('cart');

      // if (typeof document !== 'undefined' && document.referrer.includes('/register')) {
        window.location.href = '/';
      // } else {
      //   window.location.href = document.referrer || '/';
      // }

    } catch (err) {
      setMessage('something went wrong please try again later')
      console.log(err)
    }
  };
  return (

    <div className="flex items-center justify-center bg-slate-50 min-h-screen">
      <div className="flex flex-col items-center justify-center p-2 m-auto rounded-2xl bg-slate-700  border-2 border-slate-900 w-full md:w-[60%] gap-3">
        <h1 className="mt-2 text-4xl font-bold">login</h1>
        <form onSubmit={handleSubmit} className="w-full  flex flex-col items-center justify-center p-2 m-auto rounded-2xl gap-2 ">
          <div className="p-1  w-full mb-4">
            <label htmlFor="username" className="text-black font-semibold mb-1">Username</label>
            <input type="text"
              id="username"
              placeholder="username"
              className=" rounded text-black   w-full p-1 bg-blue-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required />
          </div>
          <div className=" p-1  w-full">
            <label htmlFor="password" className="text-black font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className=" rounded text-black   w-full p-1 bg-blue-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {/* Error Message */}
          {message && (
            <div className="bg-red-600 text-white font-medium p-2 rounded w-full text-center">
              {message}
            </div>
          )}
          <button
            type="submit"
            className="bg-white cursor-pointer text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>

        <p
          onClick={() => {
            router.push("/register");
          }}
          className="text-gray-950 cursor-pointer hover:border-b-2 hover:text-amber-50 w-fit">
          don&apos;t have an account
        </p>

      </div>
    </div>


  );
}
