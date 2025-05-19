'use client'

import { useEffect, useState } from "react";
import UserMainData from "./components/userMainData";
import UserAddresses from "./components/userAddresses";
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";

export default function UserData() {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<userData | null>(null)

  const getUserData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setData(data);

    } catch (error) {
      setMessage('something went wrong please try again later')
      console.error('Error fetching data:', error);

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUserData();

  }, []);

  return (
    <>
      {loading ? (<><Loading /></>) : (<>
        {!data ? (<ErrorMessage message={message} />) : (

          <main className=" p-4 mx-auto space-y-4 rounded-2xl border-4 border-slate-600 m-2 w-[97%] md:w-[75%] shadow-2xl shadow-gray-500  ">
            {/**main Data */}
            <UserMainData data={data} setData={setData} />
            {/**user Addresses */}
            <UserAddresses addresses={data.addresses} />
          </main>
        )
        }

      </>)}

    </>
  );
}
