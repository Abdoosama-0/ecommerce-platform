'use client';
import ErrorMessage from "@/components/errorMessage";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Admin() {

  const [message, setMessage] = useState<string | null>(null);
 

  const isAdmin = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/adminWelcome", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
       
        if (!res.ok) {
          setMessage(data.message);
          return
        }
       
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };
  useEffect(() => {
    isAdmin();

  }, []);

  return (
    <>
     
        {!message &&


      

      
          <div className="flex flex-col bg-gray-100 min-h-screen gap-5">
            <h1 className="m-4 text-gray-800 text-3xl font-semibold">Welcome Admin</h1>

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 justify-around items-center bg-white rounded-xl p-6 w-[80%] flex-wrap m-auto shadow-md">
              <Link href="/admin/users">
                <div className="bg-blue-600 hover:bg-blue-700 rounded-lg flex flex-col items-center w-full justify-center p-5 text-2xl text-white font-semibold transition-all">
                  Users
                </div>
              </Link>
              <Link href="/admin/products">
                <div className="bg-blue-600 hover:bg-blue-700 rounded-lg flex flex-col items-center w-full justify-center p-5 text-2xl text-white font-semibold transition-all">
                  Products
                </div>
              </Link>
              <Link href="/admin/orders">
                <div className="bg-blue-600 hover:bg-blue-700 rounded-lg flex flex-col items-center w-full justify-center p-5 text-2xl text-white font-semibold transition-all">
                  Orders
                </div>
              </Link>
            </div>
          </div>
      
       } 
      {message &&
       <ErrorMessage message={message}/>
       }
      
    </>
  );
}
