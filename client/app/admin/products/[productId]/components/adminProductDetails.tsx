'use client'

import { useState } from "react";





type adminProductDetailsProps = {
   data:productDetails
setData:(arg0:productDetails)=>void
  };
  

export default function  AdminProductDetails({data , setData }: adminProductDetailsProps) {
    const goToNextImage = () => {
        if (data.imageUrls && currentImageIndex < data.imageUrls.length - 1) {
          setCurrentImageIndex(currentImageIndex + 1);
        } else {
          setCurrentImageIndex(0);
        }
      };

      const goToPreviousImage = () => {
        if (currentImageIndex > 0) {
          setCurrentImageIndex(currentImageIndex - 1);
        } else {
          setCurrentImageIndex(data.imageUrls ? data.imageUrls.length - 1 : 0);
        }
      };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
   
    return(
        
<div className="border-4 border-gray-300 shadow-2xl bg-gray-50 rounded-2xl p-4   flex flex-col sm:flex-row  justify-center items-center sm:justify-center  sm:items-stretch   gap-4 h-fit w-full  ">

<div className="flex flex-col h-96  gap-2 relative w-full max-w-[280px] sm:w-[70%] rounded-2xl overflow-hidden shadow-lg border-2 border-gray-300">
    <img 
      src= {data.imageUrls[currentImageIndex] || "https://thumbs.dreamstime.com/b/web-324671699.jpg"} 
      alt="img" 
      className="w-full h-full   object-cover object-center" 
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


