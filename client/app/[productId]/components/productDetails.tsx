'use client'

import { useState } from "react";
import Image from "next/image";
import BuyForm from "./buyform";

import AddToCartButton from "@/app/components/addToCartButton";


type ImagesProps = {
    imageUrls: string[];
    title:string
    price:number
    productID:string
    quantity:number
  };
  

export default function  ProductDetails({imageUrls ,  title ,price,productID ,quantity}: ImagesProps) {
 

    const [buyClicked,setBuyClicked]=useState<boolean>(false)
    return(
        
<div className="border-4 border-gray-300 shadow-2xl bg-gray-50 rounded-2xl p-4   flex flex-col sm:flex-row  justify-center items-center sm:justify-center  sm:items-stretch   gap-4 h-fit w-full  ">

   <div className="w-full h-auto aspect-[1/1]   sm:aspect-[13/9]  sm:max-w-[60%] lg:max-w-[40%]  bg-white relative overflow-hidden     gap-2    rounded-2xl shadow-lg border-2 border-gray-300">
                        <Image
                          src={imageUrls[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                          alt={title || 'No title available'}
                          fill
                          priority
                          className="   object-contain "
                        />
                      </div> 
  <div className="relative w-full sm:w-[30%] flex flex-col gap-2 ">
   <p className="">{title}</p>
   <p>available quantity : just {quantity}</p>
   <p className="text-sm"> <strong className="text-xl">{Number(price).toLocaleString()}</strong> EGP</p>
   
   <div className="sm:absolute bottom-2  right-2 left-2 flex flex-col gap-2  p-2">
   <button onClick={()=>{setBuyClicked(true)}}  className="bg-sky-800 rounded-3xl w-full flex justify-center items-center  text-white font-bold cursor-pointer hover:bg-sky-900 transition-all duration-300 ease-in-out"> buy </button>
  <AddToCartButton productId={productID} price={price} name={title} imageUrl={imageUrls[0]} productQuantity={quantity}  />
  
   </div>
  </div>

  <BuyForm clicked={buyClicked} setClicked={setBuyClicked} productId={productID} price={price} />
</div>
 
    )
}


