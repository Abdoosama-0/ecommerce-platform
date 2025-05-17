'use client'


import UserProductCard from "./components/userproductcard"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";
  


  
  type ProductResponse = {
    message: string;
    products: productDetails[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  
  };
export default function Home() {
const [message, setMessage] = useState<string >("");
const [loading, setLoading] = useState(true);
const [data, setData] = useState<ProductResponse >();
const searchParams = useSearchParams()
const router = useRouter()
const page = parseInt(searchParams.get('page') || '1')


const handleNext =()=>{
  const nextPage = page + 1
  const params = new URLSearchParams(searchParams.toString())
  params.set('page', nextPage.toString())
  router.push(`?${params.toString()}`)
}
const handlePrevious =()=>{
  const nextPage = page - 1
  const params = new URLSearchParams(searchParams.toString())
  params.set('page', nextPage.toString())
  router.push(`?${params.toString()}`)
}
  const getProducts = async () => {
     try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}`, {
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
        setData(data)
       
   }
   catch (error) {
    setMessage('something went wrong please try again later')
    
       console.error('Error fetching data:', error);
   }finally{
    setLoading(false)
   }
 }


useEffect(() => {
  getProducts()
  
}
, [page])


  return (
    
<>
{loading ? (<><Loading/></>) : (<>
{!data?(<><ErrorMessage message={message}/></>):(<>

    
   <main className="p-2 border-2 m-2 rounded-lg border-slate-950 shadow-2xl shadow-slate-600">
    {/**products */}
      <div>
            {data && <h2 className="mb-2 ">products: {data.totalProducts}</h2>}
    
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el) => (
              
                  <UserProductCard key={el._id}
                    title={el.title}
                    image={el.imageUrls[0]}
                    productId={el._id}
                    price={el.price}
                    quantity={el.quantity}
                  />
      
            ))}
            </div>
      </div>

    {/**next and previous buttons  */}
      <div className="flex justify-center gap-4 w-full  ">
            {data&& data?.currentPage>1 &&
              <button onClick={handlePrevious} className="bg-slate-950 hover:bg-slate-700 text-white px-4 py-1 rounded-lg cursor-pointer ">previous</button>

            }
      
        {data && data?.totalPages - data?.currentPage >0 &&
        <button onClick={handleNext} className="bg-slate-950 hover:bg-slate-700 text-white px-4 py-1 rounded-lg  cursor-pointer">next</button>
      }
      </div>
     

    </main>
</>)}
</>)}
</>
   
  );
}
