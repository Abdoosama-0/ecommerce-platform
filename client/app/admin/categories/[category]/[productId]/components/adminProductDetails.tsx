'use client'


import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";





type adminProductDetailsProps = {
  data: productDetails

};


export default function AdminProductDetails({ data }: adminProductDetailsProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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


  return (

    <div className="border-4 border-gray-300 shadow-2xl bg-gray-50 rounded-2xl p-4   flex flex-col sm:flex-row  justify-center items-center sm:justify-center  sm:items-stretch   gap-4 h-fit w-full  ">

      <div className="w-full h-auto aspect-[1/1]   sm:aspect-[13/9]  sm:max-w-[60%] lg:max-w-[40%]  bg-white relative overflow-hidden     gap-2    rounded-2xl shadow-lg border-2 border-gray-300">
        <Image
          src={data.imageUrls[currentImageIndex] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
          alt={data.title || 'No title available'}
          fill
          priority
          className="   object-contain "
        />
        {data.imageUrls.length > 1 && (<>
          <div onClick={goToNextImage} className="absolute right-0 p-1 h-full w-fit flex justify-center items-center  cursor-pointer "> <FaArrowRight /> </div>
          <div onClick={goToPreviousImage} className="absolute left-0 p-1 h-full w-fit flex justify-center items-center  cursor-pointer "> <FaArrowLeft /> </div>
        </>)}
      </div>
      <div className="relative w-full sm:w-[30%] flex flex-col gap-2 ">
        <p className="">{data.title}</p>
        <p className="text-sm"> <strong className="text-xl">{Number(data.price).toLocaleString()}</strong> EGP</p>
        <p className="text-sm"> {data.category}</p>

        <div className="sm:absolute bottom-2  right-2 left-2 flex flex-col gap-2  p-2">



        </div>
      </div>


    </div>

  )
}


