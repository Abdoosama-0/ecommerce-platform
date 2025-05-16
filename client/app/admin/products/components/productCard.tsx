import React from 'react'
import Image from 'next/image'

import Link from 'next/link';

interface ProductCardProps {
  image?: string;
  title?: string;
  price?: number;
  productId?: string;
  quantity?: number;
}

const ProductCard = ({ image, title, price, productId ,quantity}: ProductCardProps) => {

    const deleteProduct = async (productId :string ) => {
    try {
        const res = await fetch(`http://localhost:3000/admin/deleteProduct/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.message)

            
        } 
        alert('Product deleted successfully');
        window.location.reload(); 
    } catch (error) {
      alert('something went wrong please try again later')
        console.log('Error deleting product:', error);
    }
}

  return (
    <Link  href={`/admin/products/${productId}/`}>
    <div className=' p-1 flex flex-col justify-between items-start gap-3 w-full h-fit mb-6 border-4  rounded-xl border-gray-200 bg-gray-100'>
      
      <div className="w-full h-auto aspect-[13/9] bg-white relative rounded-xl overflow-hidden">
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
        <span>quantity: {quantity}</span>

        <span
          onClick={(e) => {
            e.preventDefault();
            {productId && deleteProduct(productId);}
             
          
              
          }}
          className='bg-red-600 text-white rounded-xl py-1 px-4 cursor-default'
        >
          del
        </span>
      </div>
      
    </div></Link>
  )
}

export default ProductCard
