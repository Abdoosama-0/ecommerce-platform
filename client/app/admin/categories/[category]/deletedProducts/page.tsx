'use client'

import ErrorMessage from "@/components/errorMessage"
import { useEffect, useState } from "react"



import React from 'react'
import Image from 'next/image'

import Link from 'next/link';
import RestoreButton from "./restoreButton"
import Loading from "@/components/loading"




export default function DeletedProducts() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('')
  const [data, setData] = useState<adminProductResponse>()
  const getDeletedProducts = async (category: string) => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getDeletedProducts/${category}`, {
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

      console.log('Error fetching data:', error);


    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const category = segments[3];
    getDeletedProducts(category)

  }, [])


  return (
    <>
      {loading ? (<><Loading /></>) : (<>
        {!data ? (<>
          <ErrorMessage message={message} />





        </>) : (<>
          <div className="m-4">
            <h1 className=" text-slate-900 text-4xl font-[fantasy]">Deleted Products</h1>
            {data.totalProducts === 0 ? (<h1 className="text-center text-lg font-sans text-slate-700">No Deleted Products</h1>) : (<>
              <h2 className="my-2 ">products: {data.totalProducts}</h2>

              <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>

                {data.products.map((el, index) => (



                  <Link key={index} href={`/admin/products/${el._id}/`}>
                    <div className=' p-1 flex flex-col justify-between items-start gap-3 w-full h-fit mb-6 border-2  rounded-xl border-gray-200 bg-gray-100'>

                      <div className="w-full h-auto aspect-[13/9] bg-white relative rounded-xl overflow-hidden">
                        <Image
                          src={el.imageUrls[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                          alt={el.title || 'Product'}
                          layout="fill"
                          objectFit="contain"
                          className="object-cover"
                        />
                      </div>

                      <h1 className='text-2xl font-[Serif] font-bold'>{el.title}</h1>

                      <div className='flex flex-row w-full flex-wrap justify-between pr-4 items-center text-xl'>
                        <span>{el.price} EGP</span>

                        <RestoreButton productId={el._id} />


                      </div>

                    </div>
                  </Link>



                ))}

              </div>
            </>)}
          </div>



        </>)
        }

      </>)}
    </>

  );
}