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

const ProductCard = ({ image, title, price, productId }: ProductCardProps) => {

  return (
    <Link  href={`/admin/products/${productId}/`}>
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

        <span
          onClick={(e) => {
            e.preventDefault();
            {productId && deleteProduct(productId);}
             
          
              
          }}
          className='bg-red-600 text-white rounded-xl  px-2 cursor-default'
        >
          del
        </span>
      </div>
      
    </div></Link>
  )
}

export default ProductCard
