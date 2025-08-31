'use client'
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";
import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  userId: { name: string; email: string };
  totalQuantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Order[]>([]);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");

  const fetchData = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getOrders/${status}`,
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

      setData(data.orders);
    } catch (error) {
      setMessage("Something went wrong, please try again later");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(status);
  }, [status]);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Cairo",
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : !data ? (
        <ErrorMessage message={message} />
      ) : (
        <main className="min-h-screen bg-gray-50 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-gray-300 shadow-sm text-gray-700 px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {["pending", "shipped", "delivered", "cancelled"].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Orders List */}
          {data.length > 0 ? (
            <div className="grid gap-4">
              {[...data].reverse().map((order, index) => (
                <Link
                  key={index}
                  href={`/admin/orders/${order._id}/`}
                  className="bg-white shadow-md rounded-lg p-5 transition hover:shadow-lg hover:scale-[1.01]"
                >
                  {/* User Info */}
                  <div className="flex flex-wrap gap-4 text-gray-800 font-medium">
                    <span>
                      👤 <strong>Name:</strong> {order.userId.name}
                    </span>
                    <span>
                      📧 <strong>Email:</strong> {order.userId.email}
                    </span>
                  </div>

                  {/* Order Info */}
                  <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                    <span>
                      🛒 <strong>Products:</strong> {order.totalQuantity}
                    </span>
                    <span>
                      💵 <strong>Total:</strong> ${order.totalPrice}
                    </span>
                    <span>
                      📦 <strong>Status:</strong>{" "}
                      <span
                        className={`px-2 py-1 rounded-md text-white text-sm ${
                          order.status === "pending"
                            ? "bg-yellow-500"
                            : order.status === "shipped"
                            ? "bg-blue-500"
                            : order.status === "delivered"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </span>
                  </div>

                  {/* Time */}
                  <div className="mt-2 text-gray-500 text-sm">
                    ⏰ {new Date(order.createdAt).toLocaleString("en-GB", options)}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <h2 className="text-gray-600 text-lg">
              There are no <span className="font-semibold">{status}</span> orders.
            </h2>
          )}
        </main>
      )}
    </>
  );
}
