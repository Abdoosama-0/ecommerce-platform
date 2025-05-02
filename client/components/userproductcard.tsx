import React from 'react'
import Image from 'next/image'
import deleteProduct from '@/utils/deleteProduct';
import Link from 'next/link';

interface ProductCardProps {
  image?: string;
  title?: string;
  price?: string;
  productId?: string;
}
const url = "http://localhost:3000";
const UserProductCard = ({ image, title, price, productId }: ProductCardProps) => {
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
      }catch(err){
        console.log(err)
      }

    }
    else{
    // الحصول على العربة الحالية أو إنشاء واحدة جديدة
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as { productId: string, quantity: number }[];
  
    // البحث عن العنصر داخل العربة
    const existingItem = cart.find(item => item.productId === productId);
  
    if (existingItem) {
      // إذا كان المنتج موجود، زيادة الكمية
      existingItem.quantity += 1;
    } else {
      // إذا لم يكن موجود، إضافته مع كمية 1
      cart.push({ productId: productId, quantity: 1 });
    }
  
    // حفظ التحديث في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // عرض النتيجة في الكونسول (اختياري)
    console.log('=========================================');
    console.log(localStorage.getItem('cart'));
    console.log('=========================================');
  }

  };
  
  
  return (
    <Link  href={`/${productId}/`}>
    <div className=' flex flex-col justify-between items-start gap-3 w-full h-fit mb-6 border-2 rounded-xl border-gray-200'>
      
      <div className="w-full h-auto aspect-[13/9] bg-zinc-800 relative rounded-xl overflow-hidden">
        <Image
          src={image || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
          alt={title || 'Product'}
          layout="fill"
          objectFit="contain"
          className="object-cover"
        />
      </div>

      <h1 className='text-2xl font-[Serif] font-bold'>{title}</h1>

      <div className='flex flex-row w-full flex-wrap justify-between pr-4 items-center text-xl'>
        <span>{price} EGP</span>

  
      </div>
      <div  onClick={(e) => {  e.preventDefault();productId && handleClick(productId)}} className='bg-sky-800 rounded-3xl w-full flex justify-center items-center  text-white font-bold cursor-pointer hover:bg-sky-900 transition-all duration-300 ease-in-out'>
        <h1>add to cart</h1>
      </div>
      
    </div></Link>
  )
}

export default UserProductCard
