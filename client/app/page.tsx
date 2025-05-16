'use client'


import UserProductCard from "./components/userproductcard"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import ErrorMessage from "@/components/errorMessage";
  


  
  type ProductResponse = {
    message: string;
    products: productDetails[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  
  };
export default function Home() {
const [message, setMessage] = useState<string >("");

const [data, setData] = useState<ProductResponse | null>(null);
const searchParams = useSearchParams()
const page = parseInt(searchParams.get('page') || '1')

  const getProducts = async () => {
     try {
       const res = await fetch(`http://localhost:3000/products?page=${page}`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
           },
           credentials: 'include',
       })
       const data = await res.json()
       if (!res.ok) {
        setMessage(data.message)
         
       }
        setData(data)
     
   }
   catch (error) {
    setMessage('something went wrong please try again later')
       console.error('Error fetching data:', error);
   }
 }


useEffect(() => {
   
   getProducts()
  
}
, [])

  return (
    
<>

{message?(<><ErrorMessage message={message}/></>):(<>

    {/**products */}
   <main className="p-2">
      <div>
            {data && <h2 className="mb-2 ">products: {data.totalProducts}</h2>}
    
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el, index) => (
              
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
     

    </main>
</>)}
</>
   
  );
}
