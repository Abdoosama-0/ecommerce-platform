'use client';
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUsers, FaListAlt, FaShoppingCart } from "react-icons/fa";

export default function Admin() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/adminWelcome`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }
    } catch (error) {
      setMessage("Something went wrong, please try again later");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : message ? (
        <ErrorMessage message={message} />
      ) : (
        <div className="flex flex-col bg-gray-50 min-h-screen">
          {/* عنوان الصفحة */}
          <header className="bg-white shadow-md py-6 px-8">
            <h1 className="text-gray-800 text-3xl font-bold">
              Welcome, Admin 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Manage users, categories, and orders from here.
            </p>
          </header>

          {/* البانيل الرئيسية */}
          <main className="flex-1 flex justify-center items-start p-8">
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 w-full max-w-5xl">
              {/* Users */}
              <Link href="/admin/users">
                <div className="bg-indigo-600 hover:bg-indigo-700 rounded-xl flex flex-col items-center justify-center p-6 text-white font-semibold text-xl shadow-md transition-all cursor-pointer">
                  <FaUsers className="text-4xl mb-3" />
                  Users
                </div>
              </Link>

              {/* Categories */}
              <Link href="/admin/categories">
                <div className="bg-indigo-600 hover:bg-indigo-700 rounded-xl flex flex-col items-center justify-center p-6 text-white font-semibold text-xl shadow-md transition-all cursor-pointer">
                  <FaListAlt className="text-4xl mb-3" />
                  Categories
                </div>
              </Link>

              {/* Orders */}
              <Link href="/admin/orders">
                <div className="bg-indigo-600 hover:bg-indigo-700 rounded-xl flex flex-col items-center justify-center p-6 text-white font-semibold text-xl shadow-md transition-all cursor-pointer">
                  <FaShoppingCart className="text-4xl mb-3" />
                  Orders
                </div>
              </Link>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
