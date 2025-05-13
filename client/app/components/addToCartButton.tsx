'use client'

import { useEffect, useState } from "react";

interface AddToCartProps {
    productId:string
    name:string

    price:number
    imageUrl:string
}
export default function  AddToCartButton({productId,price,name,imageUrl}:AddToCartProps) {
  
  const [loading, setLoading] = useState(true)

  const [cartRefreshFlag, setCartRefreshFlag] = useState(0); 
const refreshCart = () => setCartRefreshFlag(prev => prev + 1);
  const [cart, setCart] = useState<CartItem[]>([]);

const url = "http://localhost:3000";
type CartItem = {
  productId: {
    _id: string,
    imageUrls: [string],
    title: string,
    price: number
  }
  quantity: number;
};
const handleIncrease = async (productId:string) => {
    if(localStorage.getItem('isLogged')==='true'){
    try{
        const res = await fetch(`${url}/increaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', 
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
        const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: {
            _id: string,
            imageUrls: string[],
            title: string,
            price: number
        }, quantity: number }[];
      
        const existingItem = cart.find(item => item.productId._id === productId);
      
        if (existingItem) {
        
          existingItem.quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();
        console.log(JSON.parse(localStorage.getItem('cart') || '[]')) 
    }
      }

  const handleDecrease=async(productId:string)=>{    
    if(localStorage.getItem('isLogged')==='true'){
    try{
        const res = await fetch(`${url}/decreaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
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
        
      }}
      else{
       let cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: {
            _id: string,
            imageUrls: string[],
            title: string,
            price: number
        }, quantity: number }[];
      
   
        const existingItem = cart.find(item => item.productId._id === productId);
      
        if (existingItem) {
            if(existingItem.quantity>1){
                
          existingItem.quantity -= 1;
        }
        else{
            cart = cart.filter(item => item.productId._id !== productId);
        }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();
   
    }

      }
  const handleClick = async(productId: string) => {


    if(localStorage.getItem('isLogged')==='true'){
              
      try{
        const res= await fetch(`${url}/addToCart`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
         
          credentials: 'include',
          body:JSON.stringify({ product: { productId, quantity: 1 } }),
        })
        if (res.ok) {
          refreshCart();
        }
        else {
          alert('فشل إضافة المنتج إلى السلة');
        }
       
      }catch(err){
        console.log(err)
      }

    }
    else{

    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: {
        _id: string,
        imageUrls: string[],
        title: string,
        price: number
    }, quantity: number }[];
  

    const existingItem = cart.find(item => item.productId._id === productId);
  
    if (existingItem) {
 
      existingItem.quantity += 1;
    } else {
        const imageUrls =[imageUrl]

      cart.push({ productId :{ _id:productId,imageUrls:imageUrls ,title:name,price:price },quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  
    refreshCart();
  }


  };
  useEffect(()=>{
    setLoading(true)
  
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
          setLoading(false)
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
      setLoading(false)
    
    }
    
    
    },[cartRefreshFlag])
    
  return (
    <>

  {
      (
        () => {
            const itemIndex = cart.findIndex((item) => item.productId?._id === productId);
            if (itemIndex !== -1 ) {
             
              return <div  onClick={(e) => {  e.preventDefault()}} className='w-full flex justify-between py-1 px-2 rounded-2xl border-2 border-amber-600  '>
                <button onClick={(e)=>{e.preventDefault();handleIncrease(cart[itemIndex].productId._id)}} className="cursor-pointer">+ </button>
                <p>  
                {loading ? (<> <h1 onClick={(e) => {  e.preventDefault()}} className=" "> loading...</h1></>):(
        < > {cart[itemIndex].quantity}</>)}
                  
                 </p>
                <button onClick={(e)=>{e.preventDefault();handleDecrease(cart[itemIndex].productId._id)}} className="cursor-pointer">- </button>
              </div>
     
            }else{
            return   <div  onClick={(e) => { e.preventDefault();productId && handleClick(productId)}} className='bg-sky-800 rounded-3xl w-full flex justify-center items-center  text-white font-bold cursor-pointer hover:bg-sky-900 transition-all duration-300 ease-in-out'>
            <h1>add to cart</h1>
            </div>
            }
          }
        )
        ()
          }
          
          </>
  );

}
