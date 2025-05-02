'use client'

import Loading from "@/components/loading";
import { use, useEffect, useState } from "react";


export default function  Cart() {
  type CartItem = {
    productId: string;
    quantity: number;
  };
  
const [loading, setLoading] = useState(true)
const url = "http://localhost:3000";
  
  const [cart, setCart] = useState<CartItem[]>([]);


useEffect(()=>{
  
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
    }
  }catch(err){
    console.log(err)
  }
}
getCart()
}

else{
  console.log('get cart from local storage :')
  setCart(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]);
  console.log(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[])

}
setLoading(false)

},[])
 
   /** 
    
    const [isUser, setIsUser] = useState<boolean | null>(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/welcomeUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (res.ok) {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsUser(false); // نعامل الخطأ كأن المستخدم غير مسجل
      }
    };
  
    fetchData();
  }, []);

 
  useEffect(() => {
    
    if (isUser === null) return; // لا تفعل شيء حتى يتم تحديد الحالة
  
    if (!isUser) {
      console.log('nooooooooooooooooooo');

      setCart(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]);
     
    } else {
      console.log('get cart from data base');

    }
  }, [isUser]);
  */
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
  <main className="p-4">
    <h1 className="text-2xl font-bold mb-4">Cart</h1>

    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        <ul className="mb-4">
          {cart.map((item, index) => (
            <li key={index} className="mb-2">
              {`ID: ${item.productId} | Quantity: ${item.quantity}`}
            </li>
          ))}
        </ul>

        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          حذف جميع العناصر
        </button>
      </>
    )}
  </main>


</>)}
</>
    
  );
}
