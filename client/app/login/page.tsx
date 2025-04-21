"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function LoginPage() {
const url = "http://localhost:3000";
const router = useRouter(); // ← داخل الدالة الرئيسية

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // <-- هنا بنخزن رسالة الخطأ

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const res = await fetch(`${url}/auth/localLogin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
             credentials: 'include',
            body: JSON.stringify({ username, password }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            console.log(data.message); // ← هنا بنطبع البيانات المستلمة من السيرفر
            console.log(data.isadmin); 
            if (data.isadmin) {
              router.push("/admin"); // ← ينقلك لصفحة الادمن
            }else {
            router.push("/"); // ← ينقلك للصفحة الرئيسية
            }
            // ممكن تحفظ التوكن هنا أو تنقل المستخدم
          } else {
            setErrorMessage(data.message || 'Login failed'); // <-- عرض الخطأ للمستخدم

          }
        } catch (err) {
            setErrorMessage('حدث خطأ في الاتصال بالسيرفر');
        }
      };
    return (
<div className="flex items-center justify-center bg-white min-h-screen">
  <div className="flex flex-col items-center justify-center p-2 m-auto rounded-2xl bg-gray-700 w-[60%] gap-3">
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
               <input
            id="password"
            type="password"
            placeholder="Password"
            className="rounded text-black   w-full p-1  bg-blue-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
                    {/* Error Message */}
                    {errorMessage && (
            <div className="bg-red-600 text-white font-medium p-2 rounded w-full text-center">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-white text-red-900 font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>
    
     <h1 className="text-gray-950 w-full">don't have account </h1>
  </div>
</div>

  
    );
  }
  