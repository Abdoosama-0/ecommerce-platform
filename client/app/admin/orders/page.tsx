'use client'
import Auth from "@/components/errorMessage";
import Loading from "@/components/loading";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Orders() {

  type Order ={
    _id: string;
    userId: {
      _id: string;
      name: string;
      email: string;
    };
    products: {
      productId: {
        _id: string;
        title: string;
        price: number;
      };
      quantity: number;
      _id: string;
    }[];
    createdAt: string;
    totalQuantity: number;
    totalPrice: number;
    status: string;
  }
  const[data,setData]=useState<Order[]>([])
 const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<string >("");
     const [auth, setAuth] = useState<boolean>(false);
 

     useEffect(() => {
         const fetchData = async () => {
            try {
              const res = await fetch(`http://localhost:3000/admin/getOrders`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  credentials: 'include',
              })
              const data = await res.json()
              setMessage(data.message)
              
              if (res.ok) {
                setAuth(true)
                setData(data.orders)
              }
          
              setLoading(false)
          }
          catch (error) {
            setLoading(false)
            console.error('Error fetching data:', error);

              
          }
        }
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
{loading ? (<><Loading/></>):(<>
{!auth ? (<><Auth message={message}/></>) : (<>

<main className="min-h-screen bg-gray-100 p-4 ">
  <div className=" flex flex-col gap-2">
{data.map((order,index) => (
<Link href={`/admin/orders/${order._id}/`}>
<div key={index} className="flex flex-col gap-1  text-xl font-bold bg-blue-400 rounded-lg p-4 ">
 
    <div className="flex flex-row gap-10 ">
    <span>name: {order.userId.name} </span>
    <span>email: {order.userId.email}</span>
    </div>
    <div className="flex flex-row gap-10 ">
    <span>Number of products: {order.totalQuantity}</span>
    <span>total price: {order.totalPrice}</span>
    <span>status: {order.status}</span>
    </div>
    <span>time: { new Date(order.createdAt).toLocaleString('en-GB', options)}</span>

  </div>


  </Link>
))}

</div>
</main>






</>) }

</>)}
</>
  
    );
  }
  