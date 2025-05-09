
import Image from 'next/image'

import Link from 'next/link';
import AddToCart from '@/app/components/addToCartButton'

interface ProductCardProps {
  image?: string;
  title?: string;
  price?: number;
  productId?: string;
}


const UserProductCard = ({ image, title, price, productId }: ProductCardProps) => {



  
  return (
    <Link  href={`/${productId}/`}>
    <div className=' flex flex-col justify-between items-start gap-3 w-full h-fit mb-6 border-2 rounded-xl border-gray-200 bg-gray-100'>
      
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

  
      </div> 
     {productId && <AddToCart productId={productId} name={title || "Unknown Product"} price={price|| 0} imageUrl={image || ""} />}
      
    </div></Link>
  )
}

export default UserProductCard
