'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { username, password, email, name, phone };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      alert('Registration successful!');
      router.push('/login');
    } catch (err) {
      alert('Something went wrong, please try again later');
      console.log(err);
    }
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-200'>
      <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 w-[90%] max-w-md'>
        <h1 className='text-2xl font-bold flex items-center gap-2'>
          <span role="img" aria-label="lock">🔒</span> Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500  focus:ring-indigo-200 outline-none transition"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500  focus:ring-indigo-200 outline-none transition pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 text-sm cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500  focus:ring-indigo-200 outline-none transition"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500  focus:ring-indigo-200 outline-none transition"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500  focus:ring-indigo-200 outline-none transition"
          />

          {message && <p className='text-sm text-red-500'>{message}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>

          <div className='flex justify-between text-sm '>
            <a href="/login" className='text-slate-700 hover:text-indigo-600 hover:underline '>Already have an account?</a>
          </div>
        </form>
      </div>
    </main>
  );
}