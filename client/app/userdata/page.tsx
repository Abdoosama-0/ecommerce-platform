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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {!data ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
                <ErrorMessage message={message} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <main className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-slate-200 space-y-6">
                <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">👤 User Profile</h1>
                
                {/* Main Data */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <UserMainData data={data} setData={setData} />
                </div>
                
                {/* User Addresses */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <UserAddresses addresses={data.addresses} />
                </div>
              </main>
            </div>
          )}
        </>
      )}
    </div>
  );
}