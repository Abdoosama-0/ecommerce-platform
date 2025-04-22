'use client'
import ProductCard from '@/components/productCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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
      
    const searchParams = useSearchParams()
    const [data, setData] = useState<ProductResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<boolean>(true);
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
            if (!res.ok) {
              setStatus(false)
              setError(data.message)
              
            }
          
            setData(data)
           
        }
        catch (error) {
          setStatus(false)
            setError(data?.message || 'حدث خطأ ما')
           
        }
      }
        fetchData()
    }
    , [])
    return (
      <>
        {status && (
          <div>
            {data && <h2>عدد المنتجات: {data.totalProducts}</h2>}
    
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el, index) => (
                <Link key={el._id} href={`/admin/products/${el._id}/`}>
                  <ProductCard
                    title={el.title}
                    image={el.imageUrls[0]}
                    productId={el._id}
                    price={el.price.toString()}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
        {!status &&(
            <div className='flex justify-center items-center h-screen'>
              <div className='w-[80%] h-[80%] text-3xl text-white bg-red-600 rounded-lg flex justify-center items-center'>
                <h1>{error}</h1>

              </div>

            </div>

        ) }
      </>
    )
    
  }
  