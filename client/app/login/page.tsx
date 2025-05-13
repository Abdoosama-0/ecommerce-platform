"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

export default function LoginPage() {
const url = "http://localhost:3000";
const router = useRouter(); 
useEffect(() => {
  const value = localStorage.getItem('isLogged');
  if (value === 'true') {
    router.push('/');
    alert('you are already logged in')
  }
}, []);

const [showPassword, setShowPassword] = useState(false); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: string, quantity: number }[];
        
          const res = await fetch(`${url}/auth/localLogin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
             credentials: 'include',
            body: JSON.stringify({ username, password,cart }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            localStorage.setItem('isLogged','true')
       
            localStorage.removeItem('cart');
          
       
            if (typeof document !== 'undefined' && document.referrer.includes('/register')) {
              window.location.href = '/';
            } else {
              window.location.href = document.referrer || '/'; 
            }
            
            
            

          } else {
            setErrorMessage(data.message || 'Login failed'); 

          }
        } catch (err) {
            setErrorMessage('حدث خطأ في الاتصال بالسيرفر');
        }
      };
    return (
   
<div className="flex items-center justify-center bg-white min-h-screen">
  <div className="flex flex-col items-center justify-center p-2 m-auto rounded-2xl bg-gray-700 w-full md:w-[60%] gap-3">
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
            <div  className=" p-1  w-full">
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
                    {errorMessage && (
            <div className="bg-red-600 text-white font-medium p-2 rounded w-full text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-white cursor-pointer text-red-900 font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>
    
     <h1 onClick={()=>{router.push('register')}} className="text-gray-950  cursor-pointer hover:border-b-2 hover:text-amber-50 w-fit">don't have account </h1>
  </div>
</div>

  
    );
  }
  