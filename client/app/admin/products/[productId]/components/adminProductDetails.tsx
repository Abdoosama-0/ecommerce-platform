'use client'


import Image from "next/image";





type adminProductDetailsProps = {
   data:productDetails

  };
  

export default function  AdminProductDetails({data  }: adminProductDetailsProps) {


 
   
    return(
        
<div className="border-4 border-gray-300 shadow-2xl bg-gray-50 rounded-2xl p-4   flex flex-col sm:flex-row  justify-center items-center sm:justify-center  sm:items-stretch   gap-4 h-fit w-full  ">

    <div className="w-full h-auto aspect-[1/1]   sm:aspect-[13/9]  sm:max-w-[60%] lg:max-w-[40%]  bg-white relative overflow-hidden     gap-2    rounded-2xl shadow-lg border-2 border-gray-300">
                        <Image
                          src={data.imageUrls[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                          alt={data.title || 'No title available'}
                          fill
                          priority
                          className="   object-contain "
                        />
                      </div>
  <div className="relative w-full sm:w-[30%] flex flex-col gap-2 ">
   <p className="">{data.title}</p>
   <p className="text-sm"> <strong className="text-xl">{Number(data.price).toLocaleString()}</strong> EGP</p>
   <p className="text-sm"> {data.category }</p>
   
   <div className="sm:absolute bottom-2  right-2 left-2 flex flex-col gap-2  p-2">

  
  
   </div>
  </div>


</div>
 
    )
}


