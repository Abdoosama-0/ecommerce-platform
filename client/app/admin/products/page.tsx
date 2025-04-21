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
        products: Product[];
        currentPage: number;
        totalPages: number;
        totalProducts: number;
      };
      
    const searchParams = useSearchParams()
    const [data, setData] = useState<ProductResponse | null>(null);

    const page = parseInt(searchParams.get('page') || '1')
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/admin/getProducts?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const data = await res.json()
            setData(data)
            console.log(data.products)
        }
        fetchData()
    }
    , [page])
    return (
      <div>
        {data && <h2>عدد المنتجات: {data.totalProducts}</h2>}
  
       
     
        
          

  
  <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
    {data?.products.map((el,index) => (
      <Link href={`/admin/products/${el._id}/`}>
      <ProductCard key={el._id} title={el.title} image={el.imageUrls[0]} productId={el._id} price={el.price.toString()} />
      </Link>
    ))}
  </div>
  
          
         
      </div>)
  }
  