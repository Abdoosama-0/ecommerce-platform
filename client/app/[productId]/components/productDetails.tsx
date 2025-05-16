'use client'

import { useState } from "react";
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
 

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [buyClicked,setBuyClicked]=useState<boolean>(false)
    return(
        
<div className="border-4 border-gray-300 shadow-2xl bg-gray-50 rounded-2xl p-4   flex flex-col sm:flex-row  justify-center items-center sm:justify-center  sm:items-stretch   gap-4 h-fit w-full  ">

<div className="flex flex-col h-96  gap-2 relative w-full max-w-[280px] sm:w-[70%] rounded-2xl overflow-hidden shadow-lg border-2 border-gray-300">
    <img 
      src= {imageUrls[currentImageIndex] || "https://thumbs.dreamstime.com/b/web-324671699.jpg"} 
      alt="img" 
      className="w-full h-full   object-cover object-center" 
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


