'use client'
import { useEffect, useState } from "react";
import ProductDetails from "./components/productDetails";
import ErrorMessage from "@/components/errorMessage";




export default  function ProductPage() {
    const [message, setMessage] = useState('')
  const [data,setData]= useState<productDetails| null>(null)
  const getProductData = async (productId:string) => {
    try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?id=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json()

    if (!res.ok) {
      setMessage(data.message)
      return
    }

    setData(data)
    }catch(err){
     setMessage('something went wrong please try again later')
      console.log(err)
    }
  }

useEffect(()=>{
 const path = window.location.pathname;
        const segments = path.split('/');
        const productId = segments[1]; 
       getProductData(productId)

},[])

  return (
    <>
      {data && (
        <main className="p-4 flex flex-col   gap-4">
          {/**main details */}
          <ProductDetails
            imageUrls={data?.imageUrls ?? []}
            price={data?.price ?? undefined}
            title={data?.title ?? 'not found'}
            productID={data?._id ?? 'not found'}
            quantity={data?.quantity}

          />
          {/**more details */}
          {data.details &&
            <div className="flex flex-col  justify-start items-start  gap-1">
              <p className="font-[fantasy] text-4xl">details:</p>
              <p>{data.details}</p>
            </div>
          }
        </main>
      ) } 
      {message&& <>
        <ErrorMessage message={message} />
      </>}
    </>);
}
