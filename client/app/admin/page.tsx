'use client';
import Auth from "@/components/errorMessage";
import Loading from "@/components/loading";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/adminWelcome", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        setMessage(data.message);
        if (res.ok) {
          setAuth(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (<><Loading/></>) : (<>
        {!auth &&
          <Auth error={message}/>
        }

        {auth && 
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
      </>)}
    </>
  );
}
