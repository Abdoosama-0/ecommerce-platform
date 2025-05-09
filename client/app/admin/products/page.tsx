'use client'
import EditProduct from '@/app/admin/products/[productId]/components/updateProduct';
import ProductCard from '@/app/admin/products/components/productCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddProduct from '@/app/admin/products/components/addProduct';
import Auth from '@/components/auth';
import Loading from '@/components/loading';
export default function Products() {

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
      const [clicked,setClicked] = useState(false)
    const searchParams = useSearchParams()
    const [data, setData] = useState<ProductResponse | null>(null);
    const [message, setMessage] = useState<string >("");
    const [auth, setAuth] = useState<boolean>(false);
    const page = parseInt(searchParams.get('page') || '1')
    useEffect(() => {
       const fetchData = async () => {
          try {
            const res = await fetch(`http://localhost:3000/admin/getProducts?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await res.json()
            if (res.ok) {
              setAuth(true)
              
              
            }
            setMessage(data.message)
            setData(data)
            setLoading(false)
        }
        catch (error) {
          setLoading(false)
          setAuth(false)
            setMessage(data?.message || 'حدث خطأ ما')
           
        }
      }
        fetchData()
    }
    , [])
    return (
      <>
        {loading ? (
          <>
          <Loading/>
          </>
      
        ):(<>
      
      

        {auth && (
          <>
          <div>
            {data && <h2>عدد المنتجات: {data.totalProducts}</h2>}
    
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el, index) => (
              
                  <ProductCard key={el._id}
                    title={el.title}
                    image={el.imageUrls[0]}
                    productId={el._id}
                    price={el.price.toString()}
                  />
      
            ))}
            </div>
          </div>


          <div onClick={() => setClicked(true)} className='fixed z-10 bottom-7 right-7 bg-gray-900 rounded-lg  py-2 px-4 text-white flex flex-col items-center justify-center cursor-pointer '>
            <h1>+</h1>

        </div>
   
    {clicked && 
     <>
     
      <div onClick={() => setClicked(false)} className='fixed z-10 top-0 left-0 w-full h-full bg-gray-900 opacity-90 flex items-center justify-center'> 
        </div>
    
            <AddProduct  /> 
    

        </>}

          
         </> )}
        {!auth &&(
       <Auth error={message}/>

            

        ) }
   </>

      )}
      
      </>
    )
    
  }
  