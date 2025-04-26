'use client';
import Auth from "@/components/auth";
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
      {loading ? (<><Loading/></>):(<>
      {!auth &&
      <Auth error={message}/>
      }


      {auth && 
        <div className="flex flex-col  bg-blue-500 min-h-screen gap-5">
          <h1 className="m-2">Welcome  Admin</h1>

          <div className="grid sm:grid-cols-3 grid-cols-1 flex-row gap-5 justify-around items-center bg-amber-50 rounded-xl p-4 w-[80%] flex-wrap m-auto">
            <Link href="/admin/users">
            <div className="bg-black rounded-xl flex flex-col items-center w-full justify-center
             p-4 text-3xl text-amber-50 font-bold">users</div></Link>
              <Link href="/admin/products">
              <div className="bg-black rounded-xl flex flex-col items-center w-full justify-center
             p-4 text-3xl text-amber-50 font-bold">products</div>
              </Link>
              <Link href="/admin/orders">
              <div className="bg-black rounded-xl flex flex-col items-center  w-full justify-center
             p-4 text-3xl text-amber-50 font-bold">orders</div>
            </Link>
          </div>
        
        </div>
       }
  </>)}</>
    );
  }
  