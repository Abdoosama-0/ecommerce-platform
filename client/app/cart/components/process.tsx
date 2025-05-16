'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import BuyCartForm from "./buyCartForm";


interface ProcessProps {
productsCount:number
totalPrice:number
cart:CartItem[]
setCart:(arg0:CartItem[])=> void
}

export default function  Process({productsCount,totalPrice,cart,setCart}:ProcessProps) {

  const clearCart =async () => {
    if(localStorage.getItem('isLogged') ==='true'){
      try{
        const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clearCart`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
         
          credentials: 'include',
       
        })
        const data = await res.json(); 
        if(res.ok){
         
          window.location.reload();

        }
        else{
          alert('clear cart failed')
        }
      }catch(err){
        console.log(err)
      }
    }
    else{
    localStorage.removeItem('cart');
    setCart([]);
 } }

const [clicked,setClicked]= useState<boolean>(false)
    const router = useRouter();
  return (
    <>
            <div className="w-full md:w-[25%]  flex flex-col gap-2 min-w-[25%] border-2 p-2 rounded-2xl h-fit">
              <div className="mt-2 flex flex-col break-words md:flex-row justify-around items-center bg-amber-300 rounded-2xl py-1 px-2">
                <p>products:{productsCount}</p>
                <p>total price: {totalPrice} </p>
              </div>
              
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition cursor-pointer"
            >
              حذف جميع العناصر
            </button>
            <button 
               onClick={() => {
                if (localStorage.getItem('isLogged') !== 'true') {
                  router.push('/login');
                } else {
                  setClicked(true);
                  
                }
              }} 
              className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 transition cursor-pointer"
            >
             Continue the purchase process
            </button>
            <BuyCartForm setClicked={setClicked} clicked={clicked} items={cart||[]} clearCart={clearCart}  products={productsCount} totalPrice={totalPrice}/>
    </div>
    
    
    </>

  );
}