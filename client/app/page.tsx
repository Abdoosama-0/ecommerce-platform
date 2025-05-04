'use client'
import Auth from "@/components/auth";
import Loading from "@/components/loading";
import UserProductCard from "@/components/userproductcard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function Home() {
  
  type Product = {
    imageUrls: string[];
    // حسب شكل المنتج في قاعدة البيانات
    _id: string;
    title: string;
    details: string;
    price: number;
    // ضيف باقي الخصائص لو فيه أكتر
  };
  
  type ProductResponse = {
    message: string;
    products: Product[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
const [loading, setLoading] = useState(true)
const [message, setMessage] = useState<string >("");
const [auth, setAuth] = useState<boolean>(false);
const [data, setData] = useState<ProductResponse | null>(null);
    const searchParams = useSearchParams()
const page = parseInt(searchParams.get('page') || '1')
useEffect(() => {
  const fetchData = async () => {
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
    setMessage( 'حدث خطأ ما')
       console.error('Error fetching data:', error);
   }
 }
   fetchData()
}
, [])
     useEffect(() => {
       
        const fetchData = async () => {
           try {
             const res = await fetch(`http://localhost:3000/admin/adminWelcome`, {
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
{loading ? (<><Loading/></>):(
  
  <>

   {auth &&(<>

        <Link href={"/admin"}>
       <div className="fixed bottom-12 right-12 rounded-lg bg-sky-950 text-white px-3 py-1 cursor-pointer">
        <h1 className="text-2xl font-bold text-center">go to Admin Dashboard</h1>
       </div>
       </Link>
   </>)}

   <main>
   <div>
            {data && <h2>عدد المنتجات: {data.totalProducts}</h2>}
    
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el, index) => (
              
                  <UserProductCard key={el._id}
                    title={el.title}
                    image={el.imageUrls[0]}
                    productId={el._id}
                    price={el.price}
                  />
      
            ))}
            </div>
          </div>
     

    </main>




</>

)}
</>
   

  );
}
