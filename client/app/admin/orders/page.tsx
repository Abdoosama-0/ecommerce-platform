'use client'
import ErrorMessage from "@/components/errorMessage";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Orders() {


  const [data, setData] = useState<Order[]>([])

  const [message, setMessage] = useState<string>("");


  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getOrders`, {
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

      setData(data.orders)
    }
    catch (error) {
      setMessage('something went wrong please try again later')
      console.error('Error fetching data:', error);


    }
  }
  useEffect(() => {

    fetchData()
  }
    , [])
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Cairo'
  };
  return (

    <>

      {message ? (<><ErrorMessage message={message} /></>) : (<>

        <main className="min-h-screen bg-gray-100 p-4 ">
          {/**Check if there are any orders. */}
          {data.length > 0 ? (
            <div className=" flex flex-col gap-2">
              {[...data].reverse().map((order, index) => (
                <Link key={index} href={`/admin/orders/${order._id}/`}>
                  <div className="flex flex-col gap-1  text-xl font-bold bg-blue-400 rounded-lg p-4 ">

                    <div className="flex flex-row gap-10 ">
                      <span>name: {order.userId.name} </span>
                      <span>email: {order.userId.email}</span>
                    </div>
                    <div className="flex flex-row gap-10 ">
                      <span>Number of products: {order.totalQuantity}</span>
                      <span>total price: {order.totalPrice}</span>
                      <span>status: {order.status}</span>
                    </div>
                    <span>time: {new Date(order.createdAt).toLocaleString('en-GB', options)}</span>

                  </div>


                </Link>
              ))}

            </div>
           
          ) : (<> 
          {/**if there are no orders yet */}
          <h1>there is no orders yet</h1>
          </>)}
        </main>






      </>)}


    </>

  );
}
