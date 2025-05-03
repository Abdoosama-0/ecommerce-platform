'use client';
import {  useState } from "react";
import Image from "next/image";

type ImagesProps = {
    imageUrls?: string[];
  };
  
export default function Images({imageUrls}: ImagesProps) {

    
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

const goToNextImage = () => {
    if (imageUrls && currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };
  
  
  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(imageUrls ? imageUrls.length - 1 : 0);
    }
  };
  

    return (
      <div className="min-w-[17rem] min-h-[25rem]  aspect-[auto] bg-zinc-800 relative rounded-xl overflow-hidden">
  <Image
    src={imageUrls ? imageUrls[currentImageIndex] : 'https://wallpapers.com/images/hd/blank-white-background-xbsfzsltjksfompa.jpg'}
    alt="Product"
    layout="fill"
    objectFit="cover"//contain fill cover none scale-down
    priority
  />
           
           {/* زر التبديل للصورة السابقة */}
           <button
             onClick={goToPreviousImage}
             className="absolute cursor-pointer  bg-transparent px-1  h-full    text-white    "
           >
             ←
           </button>
     
           {/* زر التبديل للصورة التالية */}
           <button
             onClick={goToNextImage}
             className="absolute right-0 cursor-pointer  bg-transparent px-1  h-full    text-white    "
           >
             →
           </button>
         </div>
  
    );
  }
  