import React from 'react'
import Image from 'next/image'

interface ProductCardProps {
    image?: string;
    title?: string;
    price?:string
    productId?:string
    } 

 
const ProductCard = ({ image, title,price,productId }: ProductCardProps) => {
  const deleteProduct = async () => {
    try {

      
    

        const res = await fetch(`http://localhost:3000/admin/deleteProduct?id=${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
            alert('Product deleted successfully');
            window.location.reload(); // إعادة تحميل الصفحة بعد الحذف
            console.log('Product deleted successfully:', data);
        } else {
            console.error('Error deleting product:', data.message);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}
  return (
 <div className='flex flex-col justify-between items-start  gap-3 w-full h-fit mb-6 border-2 rounded-xl border-gray-200  '>
    <div className="w-full h-auto    aspect-[13/9] bg-zinc-800  relative rounded-xl overflow-hidden ">
                          <Image
                            src={image || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`} 
                            alt={title||'Product'}
                            layout="fill" 
                            objectFit="contain"
                            className="object-cover " 
                          />
                    </div>
                 
                   <h1 className='text-2xl font-[Serif] font-bold	'>{title}</h1>
                    <div className='flex flex-row flex-wrap   gap-4 text-xl '>

                             <h1>{price} EGP</h1>

                      <span   onClick={(e) => {
    e.preventDefault(); // منع تنفيذ الإجراء الافتراضي (الانتقال إلى الرابط)
    deleteProduct(); // تنفيذ دالة الحذف

  }} className='bg-red-900 text-white rounded-lg mb-2 p-1 cursor-default'>del</span>

                            
                    
                        </div> 




 </div>
  )
}

export default ProductCard