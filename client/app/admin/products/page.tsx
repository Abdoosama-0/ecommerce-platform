'use client'

import ProductCard from '@/app/admin/products/components/productCard';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddProduct from '@/app/admin/products/components/addProduct';
import ErrorMessage from '@/components/errorMessage';
export default function Products() {
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

      
   const router = useRouter();
 
      const [clicked,setClicked] = useState(false)
    const searchParams = useSearchParams()
    const [data, setData] = useState<adminProductResponse | null>(null);
    const [message, setMessage] = useState<string >("");
  
    const page = parseInt(searchParams.get('page') || '1')
      const getProducts = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getProducts?page=${page}`, {
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
            setMessage("something went wrong please try again later")
            console.log(error)
           
        }
      }
    useEffect(() => {
        getProducts()
   
    }
    , [page])

    return (
      <>
     
      
      

        {!message ?(
          <main className='p-2 border-2 m-2 rounded-lg  border-slate-950 shadow-2xl shadow-slate-600'>
          <div className=''>
            {/**products count */}
            {data && 
            <div className=' flex justify-between w-full items-center px-2 '>
            <h2>products:  {data.totalProducts}</h2>
            <button 
            onClick={()=>{
              router.push('/admin/products/deletedProducts')
            }}
            className="px-4 py-2 w-fit text-white font-bold rounded-xl hover:opacity-50 cursor-pointer bg-slate-600">deleted products</button>
            </div>
            }
            {/**products*/}
            <div className=' mt-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el) => (
              
                  <ProductCard key={el._id}
                    title={el.title}
                    image={el.imageUrls[0]}
                    productId={el._id}
                    price={el.price}
                    quantity={el.quantity}

                    
                  />
      
            ))}
            </div>
          </div>

              {/**add product */}
          <div onClick={() => setClicked(true)} className='fixed z-10 bottom-7 right-7 bg-gray-900 rounded-lg  py-2 px-4 text-white flex flex-col items-center justify-center cursor-pointer '>
            <h1>+</h1>
          </div>

            {/**add product form */}
            <AddProduct clicked={clicked} setClicked={setClicked} />
            
        
      <div className="flex justify-center gap-4 w-full  ">
            {data&& data?.currentPage>1 &&
              <button onClick={handlePrevious} className="bg-slate-950 hover:bg-slate-700 text-white px-4 py-1 rounded-lg cursor-pointer ">previous</button>

            }
      
        {data && data?.totalPages - data?.currentPage >0 &&
        <button onClick={handleNext} className="bg-slate-950 hover:bg-slate-700 text-white px-4 py-1 rounded-lg  cursor-pointer">next</button>
      }
      </div>

       

          
         </main> ):
        
         (<>
          {/**error message */}
         <ErrorMessage message={message}/>
         </>)
         
        }
 
  

    
      
      </>
    )
    
  }
  