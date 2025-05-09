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
const [message,setMessage]=useState('');
const [showPassword, setShowPassword] = useState(false); // 👈 حالة إظهار كلمة المرور

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
      const res = await fetch('http://localhost:3000/auth/register', {
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
      setMessage('')
      router.push('/login');
  
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error, please try again.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
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
  );
}
