'use client'
import Auth from "@/components/errorMessage";
import Images from "@/components/images";
import Loading from "@/components/loading";
import UpdateStatus from "@/app/admin/orders/[orderId]/components/updateStatus";
import { useEffect, useState } from "react";


export default function OrderId() {
  type address = {
    government: string,
    city: string,
    area: string,
    street: string,
    buildingNumber: string,
    departmentNumber: string,
    _id:string
  }

    type Order ={
        _id: string;
        userId: {
          _id: string;
          name: string;
          email: string;
          phone: string;
        };
        products: {
          productId: {
            _id: string;
            title: string;
            price: number;
            imageUrls: string[];
          };
          quantity: number;
          _id: string;
        }[];
        createdAt: string;
        totalQuantity: number;
        totalPrice: number; 
        address:address;
        status: string;
      }
      const [updateStatus, setUpdateStatus] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<string >("something went wrong");
    const [auth, setAuth] = useState<boolean>(false);
    const [data, setData] = useState<Order |null>(null)
    
    useEffect(() => {
        const path = window.location.pathname;
        const segments = path.split('/');
        const orderId = segments[3]; 
        const fetchData = async () => {
           try {
             const res = await fetch(`http://localhost:3000/admin/getOrder?id=${orderId}`, {
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
               setData(data.order)
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
    return (

        <>
{loading ? (<><Loading/></>):(<>
{!auth ? (<><Auth error={message}/></>) : (<>
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
            <h1 className="">products:</h1>
                    <div className="flex flex-col gap-4">
                {data?.products.map((product) => (
                    <div className=" p-2 border-2  rounded-lg w-[70%] h-[70%] " key={product._id}>
                        <h1 className="">productId : <span>{product.productId._id}</span></h1>
                        <h1 className="">productTitle : <span>{product.productId.title}</span></h1>
                        <h1 className="">productPrice : <span>{product.productId.price}</span></h1>
                        <h1 className="">quantity : <span>{product.quantity}</span></h1>
                        <div>
                              <Images imageUrls={product.productId.imageUrls}/>

                        </div>

                    </div>
                ))}
                </div>
        </div>
        <div className="mt-10 border-t-4 mb-20">
            <h1>totalPrice: {data?.totalPrice}</h1>

        </div>
      </main>
      <div onClick={()=>{setUpdateStatus(true)}} className="fixed bottom-12 right-12 rounded-lg bg-sky-950 text-white px-3 py-1 cursor-pointer">
        <h1 className="text-2xl font-bold text-center">update status</h1>
       </div>
       {updateStatus && (<>
       <div onClick={()=>{setUpdateStatus(false)}} className="fixed inset-0 z-20 bg-gray-950 opacity-50" ></div>
          <UpdateStatus currentStatus={data?.status} />

       </>)
}

</>) }

</>)}
</>

  
    );
  }
  