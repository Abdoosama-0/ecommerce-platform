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

    const formData = {
      username,
      password,
      email,
      name,
      phone
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message)
        return;
      }

      alert('Registration successful!');
      router.push('/login');

    } catch (err) {
      alert('something went wrong please try again later');
      console.log(err);

    }
  };

  return (
    <div className='min-h-screen flex items-center bg-slate-50 justify-center'>
    <div className="p-6 max-w-[700px] w-[80%]  h-fit  bg-white border-2 border-slate-900 rounded-xl shadow-2xl   space-y-4">
      <h1 className="text-xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border rounded p-2"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // 👈 تبديل النوع
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded p-2 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border rounded p-2"
        />

        <div className='w-full flex justify-start items-end text-red-600'>
          <p>{message}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
 </div> );
}