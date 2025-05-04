'use client'

import AddToCart from "@/components/addToCart";
import Loading from "@/components/loading";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { json } from "stream/consumers";


export default function  Cart() {
  type CartItem = {
    productId: {
      _id: string,
      imageUrls: [string],
      title: string,
      price: number
    }
    quantity: number;
  };
  
const [loading, setLoading] = useState(true)
const [loading2, setLoading2] = useState(true)
const url = "http://localhost:3000";
const [cartRefreshFlag, setCartRefreshFlag] = useState(0); // لتحديث useEffect
const refreshCart = () => setCartRefreshFlag(prev => prev + 1);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleDelete= async(productId:string)=>{  
    if(localStorage.getItem('isLogged')==='true'){  
try{
    const res = await fetch(`${url}/deleteFromCart`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // تأكد من إرسال البيانات بصيغة JSON
      },
      body: JSON.stringify({ productId }),
    });
  


    if (res.ok) {
      refreshCart();
    } else {
      alert('failed');
    }
  } catch (err) {
    console.log(err);
    
  }
}

  else{
    let newCart=cart
    const existingItem = cart.find(item => item.productId._id === productId);

    if (existingItem) {
      
          newCart = cart.filter(item => item.productId._id !== productId);
      
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
 
setCart(newCart)
    refreshCart();
   
}

  }
  
  const handleIncrease = async (productId:string) => {
    if(localStorage.getItem('isLogged')==='true'){
    try{

        const res = await fetch(`${url}/increaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // تأكد من إرسال البيانات بصيغة JSON
          },
          body: JSON.stringify({ productId }),
         
        });
        
    
    
        if (res.ok) {
          refreshCart()
   
        } else {
          alert('failed');
        }
      } catch (err) {
        console.log(err);
        
      }
    }
    else{

  

    const existingItem = cart.find(item => item.productId._id === productId);
  
    if (existingItem) {
    
      existingItem.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));


    refreshCart();
    }
      }

  const handleDecrease=async(productId:string)=>{   
    if(localStorage.getItem('isLogged')==='true'){ 
    try{
        const res = await fetch(`${url}/decreaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // تأكد من إرسال البيانات بصيغة JSON
          },
          body: JSON.stringify({ productId }),
        });
      

        if (res.ok) {
          refreshCart();
        } else {
          alert('failed');
        }
      } catch (err) {
        console.log(err);
        
      }
      

      }
      else{
          let newCart=cart
        const existingItem = cart.find(item => item.productId._id === productId);
  
        if (existingItem) {
          if(existingItem.quantity>1){
                
            existingItem.quantity -= 1;
          }
          else{
             newCart = cart.filter(item => item.productId._id !== productId);
          }
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
    
    setCart(newCart)
        refreshCart();
      }
      }

useEffect(()=>{ 
  setLoading2(true)

if(localStorage.getItem('isLogged') ==='true'){
  const getCart= async()=>{
  try{
    const res= await fetch(`${url}/cart`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
      credentials: 'include',
   
    })
    const data = await res.json(); 
    if(res.ok){
      setCart(data.cart)
      setLoading2(false)

    }
  }catch(err){
    console.log(err)
  }
}
getCart()
}

else{

  setCart(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]);
 
  setLoading2(false)

}
setLoading(false)

},[cartRefreshFlag])
 
  const clearCart =async () => {
    if(localStorage.getItem('isLogged') ==='true'){
      try{
        const res= await fetch(`${url}/clearCart`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
         
          credentials: 'include',
       
        })
        const data = await res.json(); 
        if(res.ok){
          alert('clear cart success')
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
    setCart([]); // تحديث الحالة لتفريغ العرض أيضًا
 } }
    
  return (
    
<>
{loading ? (<><Loading/></>):(<>
  <main className="p-4 min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold mb-4">Cart</h1>

    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (

      <>
      {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2 p-2">
          {cart.map((item, index) => (
            <Link href={`/${item.productId._id}`}>
            <div className="p-2  flex flex-col bg-white rounded-2xl" >
              <div >
                <img src={item.productId.imageUrls[0]||'https://www.naftomar.gr/wp-content/uploads/2023/11/Image_not_available.png'} alt={item.productId.title} />
              </div>
              <p>{item.productId.title}</p>
              <p>{item.productId.price}</p>
              <div  onClick={(e)=>{e.preventDefault()}} className="flex flex-row justify-between  gap-4 ">
              { loading2 ?(<><h1 className="flex items-center justify-center py-1 px-2 rounded-2xl w-full border-2 border-amber-600"> loading...</h1></>):(<>
              <button onClick={()=>{handleDelete(item.productId._id)}} className="w-full py-1 px-2 rounded-2xl bg-red-600 hover:opacity-50 cursor-pointer ">del</button>
             
              <div className="w-full flex justify-between py-1 px-2 rounded-2xl border-2 border-amber-600  ">
              
                <button onClick={()=>{handleIncrease(item.productId._id)}} className="cursor-pointer">+</button>
                <p >{item.quantity}</p>
                <button onClick={()=>{handleDecrease(item.productId._id)}}  className="cursor-pointer">-</button>
              </div>
              
              </>)}
              </div>
             
            </div>
            </Link>
          ))}
        </div>



{/* ================================================================================ */}
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          حذف جميع العناصر
        </button>

      </>
    )
    
    }
  </main>


</>)}
</>
    
  );
}
