'use client'



import UpdateStatus from "@/app/admin/orders/[orderId]/components/updateStatus";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/errorMessage";
import Image from "next/image";

export default function OrderId() {

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


    }
  }
  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const orderId = segments[3];

    fetchData(orderId)
  }
    , [])
  return (

    <>

      {message ? (<>
        {/**error message */}
        <ErrorMessage message={message} />
      </>) : (<>
        <main className="min-h-screen  bg-gray-200 p-2 text-2xl font-bold ">
          <div className="">
            <h1 className="">orderId : <span>{data?._id}</span></h1>
            <h1 className="">userId : <span>{data?.userId._id}</span></h1>
            <h1 className="">userName : <span>{data?.userId.name}</span></h1>
            <h1 className="">userEmail : <span>{data?.userId.email}</span></h1>
            <h1 className="">userPhone : <span>{data?.userId.phone}</span></h1>
            <h1 className="">userAddress : <span>{data?.address && `${data.address.government}, ${data.address.city}, ${data.address.area}, ${data.address.street}, Building: ${data.address.buildingNumber}, Dept: ${data.address.departmentNumber}`}</span></h1>
            <h1 className="">createdAt : <span>{data?.createdAt}</span></h1>
            <h1>Status: <span>{data?.status}</span></h1>
          </div>
          <div className="mt-10 border-t-4 mb-5">
            <h1 className="mb-2">products:</h1>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
              {data?.products.map((product) => (
                <div className=" space-y-2 p-2 border-2  rounded-lg w-full bg-gray-300 border-gray-400 shadow-2xl shadow-gray-300 " key={product._id}>
                  <h1 className="">productId : <span>{product.productId._id}</span></h1>
                  <h1 className="">productTitle : <span>{product.productId.title}</span></h1>
                  <h1 className="">productPrice : <span>{product.productId.price}</span></h1>
                  <h1 className="">quantity : <span>{product.quantity}</span></h1>

                  
               <div className="w-full h-auto aspect-[13/9] max-w-[90%] bg-white relative rounded-xl overflow-hidden">
                        <Image
                          src={product.productId.imageUrls[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                          alt={product.productId.title || 'No title available'}
                          fill
                          priority
                          className="   object-contain "
                        />
                      </div>




                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t-4 mb-20">
            <h1>totalPrice: {data?.totalPrice}</h1>

          </div>
        </main>
        <div onClick={() => { setUpdateStatus(true) }} className="fixed bottom-12 right-12 rounded-lg bg-sky-950 text-white px-3 py-1 cursor-pointer">
          <h1 className="text-2xl font-bold text-center">update status</h1>
        </div>
        {updateStatus && (<>
          <div onClick={() => { setUpdateStatus(false) }} className="fixed inset-0 z-20 bg-gray-950 opacity-50" ></div>
          <UpdateStatus currentStatus={data?.status} />

        </>)
        }

      </>)}


    </>


  );
}
