'use client'
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Orders() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Order[]>([])

  const [message, setMessage] = useState<string>("");

  const [status, setStatus] = useState<string>('pending')
  const fetchData = async (status:string) => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getOrders/${status}`, {
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


    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {

    fetchData(status)
  }
    , [status])
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
      {loading ? (<><Loading /></>) : (<>
        {!data ? (<><ErrorMessage message={message} /></>) : (<>
            
          <main className="min-h-screen bg-gray-100 p-4 ">
            <div className='flex justify-between items-center pr-5 mb-1'>
              <h1 className="text-2xl font-bold">Orders:</h1>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-slate-300 border-2 text-black border-slate-500 hover:bg-slate-400 px-2 text-sm py-1 rounded-lg cursor-pointer font-bold"
              >
                {['pending', 'shipped', 'delivered', 'cancelled'].map((s) => (
                  <option key={s} value={s} >
                    {s}
                  </option>
                ))}
              </select>

            </div>
            {/**Check if there are any orders. */}
            {data.length > 0 ? (
              <div className=" flex flex-col gap-2">
                {[...data].reverse().map((order, index) => (
                  <Link key={index} href={`/admin/orders/${order._id}/`}>
                    <div className="flex flex-col gap-1  text-xl font-bold bg-blue-400 rounded-lg p-4 overflow-y-auto ">

                      <div className="flex flex-row flex-wrap gap-2">
                        <span>| name:  {order.userId.name} </span>
                        <span>| email:  {order.userId.email}</span>
                      </div>
                      <div className="flex flex-row flex-wrap gap-2 ">
                        <span>| Number of products:  {order.totalQuantity}</span>
                        <span>| total price:  {order.totalPrice}</span>
                        <span>| status:  {order.status}</span>
                      </div>
                      <span>time: {new Date(order.createdAt).toLocaleString('en-GB', options)}</span>

                    </div>


                  </Link>
                ))}

              </div>

            ) : (<>
              {/**if there are no orders yet */}
              <h1>there is no {status} orders </h1>
            </>)}
          </main>






        </>)}

      </>)}
    </>

  );
}
