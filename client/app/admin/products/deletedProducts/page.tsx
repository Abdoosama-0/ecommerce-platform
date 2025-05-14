'use client'

import ErrorMessage from "@/components/errorMessage"
import { useEffect, useState } from "react"



import React from 'react'
import Image from 'next/image'

import Link from 'next/link';
import RestoreButton from "./restoreButton"




export default function  DeletedProducts() {
  const [message,setMessage]= useState('')
  const [data,setData]= useState<adminProductResponse>()
  const getDeletedProducts =async ()=>{
   
    try {
      const res = await fetch(`http://localhost:3000/admin/getDeletedProducts`, {
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
    
     
  }
}
  useEffect(()=>{
getDeletedProducts()

  },[])

  
  return (
    <>
      {message ? (<>
    <ErrorMessage message={message}/>
    
    
    
    
    
    </>) : (<>
 <div>
            {data && <h2 className="mb-2 ">products: {data.totalProducts}</h2>}
    
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
              {data?.products.map((el, index) => (
              <>
              {/** card */}

               <Link  href={`/admin/products/${el._id}/`}>
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
        
        <RestoreButton  productId={el._id}/>

     
      </div>
      
    </div>
    </Link>












              {/**=========================================== */}
              
              
              
              </>
      
            ))}
            </div>
      </div>
    
    
    
    </>)}


    </>

  );
}