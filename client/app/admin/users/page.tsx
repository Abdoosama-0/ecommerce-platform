'use client';

import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

type responseType = {
  usersCount: number;
  users: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isBanned: boolean;
  }[];
};

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<responseType | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleClick = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/banUser?id=${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isBanned: true }),
        }
      );

      if (!res.ok) {
        alert("Failed to update status!");
        return;
      }

      alert("Status updated successfully!");
      window.location.reload();
    } catch (error) {
      alert("Something went wrong, please try again later");
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getUsers`,
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

      setData(data);
    } catch (error) {
      setMessage("Something went wrong, please try again later");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : !data ? (
        <ErrorMessage message={message} />
      ) : (
        <main className="bg-gray-50 min-h-screen p-6">
          {/* العنوان */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Users ({data.usersCount})
          </h1>

          {/* جدول المستخدمين */}
          {data.users.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-md bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-sm md:text-base">
                    <th className="p-3">User ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-100 text-sm md:text-base"
                    >
                      <td className="p-3 break-words">{user._id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">
                        {user.isBanned ? (
                          <span className="text-red-600 font-semibold">
                            Banned
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleClick(user._id.toString())}
                          className={`px-4 py-1 rounded-lg text-white font-medium transition ${
                            user.isBanned
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {user.isBanned ? "Unban" : "Ban"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-gray-600 text-lg">There are no users yet.</h2>
          )}
        </main>
      )}
    </>
  );
}
