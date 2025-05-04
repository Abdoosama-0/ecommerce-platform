'use client'

import AddToCart from "@/components/addToCart";
import Loading from "@/components/loading";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import Buy from "@/components/buy";
import BuyCart from "@/components/buyCart";
import Add from "@/components/add";

export default function  Cart() {
  const router = useRouter();
  type CartItem = {
    productId: {
      _id: string,
      imageUrls: [string],
      title: string,
      price: number
    }
    quantity: number;
  };
  const [clicked,setClicked]= useState(false)
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
    const [totalPrice,setTotalPrice]=useState<number>(0)
    const [products,setProducts]=useState<number>(0)
 useEffect(()=>{
  let totalProducts = 0;
  let totalPrice = 0;
  
  cart.forEach(item => {
    totalProducts += item.quantity;
    totalPrice += item.productId.price * item.quantity;
  });
  setTotalPrice(totalPrice)
  setProducts(totalProducts)
 },[cart])
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
      <div className="flex justify-between ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2 p-2 max-w-[75%]">
          {cart.map((item, index) => (
            <Link href={`/${item.productId._id}`}>
            <div className="p-2  flex flex-col bg-white rounded-2xl" >
              <div >
                <img src={item.productId.imageUrls[0]||'https://www.naftomar.gr/wp-content/uploads/2023/11/Image_not_available.png'} alt={item.productId.title} />
              </div>
              <p>{item.productId.title}</p>
              <p>{item.productId.price}</p>
              <div  onClick={(e)=>{e.preventDefault()}} className="flex flex-row justify-between  gap-4 ">
          
              <button onClick={()=>{handleDelete(item.productId._id)}} className="w-full py-1 px-2 rounded-2xl bg-red-600 hover:opacity-50 cursor-pointer ">del</button>
           
           <Add  productId={item.productId._id} quantity={item.quantity} refreshCart={refreshCart} setCart={setCart}  cart={cart} />
       
           
              </div>
             
            </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 min-w-[25%] border-2 p-2 rounded-2xl h-fit">
          <div className="mt-2 flex justify-around items-center bg-amber-300 rounded-2xl py-1 px-2">
            <p>products:{products}</p>
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
              // استدعاء الدالة عند الضغط إذا لم يكن مسجلاً الدخول
            }
          }} 
          className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 transition cursor-pointer"
        >
         Continue the purchase process
        </button>
</div>
        </div>
{/* ================================================================================ */}
{clicked &&
<>
<div onClick={()=>{setClicked(false)}} className="fixed inset-0 z-40 bg-slate-800 opacity-90 ">

</div>
{(() => {
  const simplifiedCart = cart.map(item => ({
    productId: item.productId._id,
    quantity: item.quantity
  }));

  return (
    <BuyCart items={simplifiedCart||[]} clearCart={clearCart}  products={totalPrice} totalPrice={products}/>
  );
})()}



</>
}
      </>
    )
    
    }
  </main>


</>)}
</>
    
  );
}
