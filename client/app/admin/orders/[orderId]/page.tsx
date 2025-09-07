'use client'

import UpdateStatus from "@/app/admin/orders/[orderId]/components/updateStatus";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/errorMessage";
import Image from "next/image";
import Loading from "@/components/loading";

export default function OrderId() {
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("");

  const [data, setData] = useState<Order | null>(null)

  const fetchData = async (orderId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getOrder?id=${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message)
        return
      }
      setData(data.order)
    }
    catch (error) {
      setMessage('something went wrong please try again later')
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const orderId = segments[3];
    fetchData(orderId)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!data ? (
            <ErrorMessage message={message} />
          ) : (
            <main className="min-h-screen bg-gray-100 p-6">
              {/* Order Info */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <p><span className="font-semibold">Order ID:</span> {data?._id}</p>
                  <p><span className="font-semibold">Created At:</span> {new Date(data?.createdAt).toLocaleString()}</p>
                  <p><span className="font-semibold">Status:</span> {data?.status}</p>
                  <p><span className="font-semibold">Total Price:</span> ${data?.totalPrice}</p>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6 space-y-3">
                <h2 className="text-xl font-bold text-gray-800">User Info</h2>
                <p><span className="font-semibold">User ID:</span> {data?.userId._id}</p>
                <p><span className="font-semibold">Name:</span> {data?.userId.name}</p>
                <p><span className="font-semibold">Email:</span> {data?.userId.email}</p>
                <p><span className="font-semibold">Phone:</span> {data?.userId.phone}</p>
                <p><span className="font-semibold">Address:</span> {data?.address && `${data.address.government}, ${data.address.city}, ${data.address.area}, ${data.address.street}, Building: ${data.address.buildingNumber}, Dept: ${data.address.departmentNumber}`}</p>
              </div>

              {/* Products */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data?.products.map((product) => (
                    <div key={product._id} className="border border-slate-200  rounded-lg p-4 bg-gray-50 shadow-sm">
                      <h3 className="font-semibold text-gray-800">{product.productId.title}</h3>
                      <p className="text-gray-600">Price: ${product.productId.price}</p>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                      <div className="w-full h-40 relative mt-3 bg-white rounded-lg overflow-hidden">
                        <Image
                          src={product.productId.imageUrls[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                          alt={product.productId.title || 'No title available'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Update Button */}
              <div
                onClick={() => setUpdateStatus(true)}
                className="fixed bottom-8 right-8 rounded-lg bg-sky-950 text-white px-5 py-3 cursor-pointer shadow-lg hover:bg-sky-800 transition"
              >
                <h1 className="text-lg font-bold text-center">Update Status</h1>
              </div>

              {/* Overlay & Modal */}
              {updateStatus && (
                <>
                  <div
                    onClick={() => setUpdateStatus(false)}
                    className="fixed inset-0 z-20 bg-slate-900/80"
                  ></div>
                  <UpdateStatus currentStatus={data?.status} />
                </>
              )}
            </main>
          )}
        </>
      )}
    </>
  );
}
