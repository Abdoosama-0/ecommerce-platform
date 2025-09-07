'use client'

import { useState } from "react";
import Image from "next/image";
import BuyForm from "./buyform";
import { useRouter } from "next/navigation";

import AddToCartButton from "@/app/[category]/components/addToCartButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ProductDetailsProps = {
  imageUrls: string[];
  title: string;
  price: number;
  productID: string;
  quantity: number;
  category: string;
};

export default function ProductDetails({
  imageUrls,
  title,
  category,
  price,
  productID,
  quantity,
}: ProductDetailsProps) {
  const router = useRouter();
  const [buyClicked, setBuyClicked] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < imageUrls.length - 1 ? prev + 1 : 0
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : imageUrls.length - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 bg-white rounded-2xl p-6">

      {/* Image Gallery Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-md">
          <Image
            src={
              imageUrls[currentImageIndex] ||
              `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`
            }
            alt={title || "No title available"}
            fill
            priority
            className="object-contain bg-gray-50 transition-transform duration-300 hover:scale-105"
          />
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <FaArrowLeft className="text-gray-700" />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <FaArrowRight className="text-gray-700" />
              </button>
            </>
          )}
          
  
        </div>

        {/* Thumbnail Gallery */}
        {imageUrls.length > 1 && (
          <div className="flex gap-3 overflow-x-auto py-2">
            {imageUrls.map((url, index) => (
              <div 
                key={index} 
                className={`relative h-20 w-20 min-w-[80px] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => selectImage(index)}
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
          
          <div className="flex items-center mt-4">
            <span className="text-3xl font-bold text-blue-600">
              {Number(price).toLocaleString()}
            </span>
            <span className="text-gray-600 text-lg mr-1">EGP</span>
          </div>
          
          {quantity > 0 ? (
            <div className="mt-2 flex items-center">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                available
              </span>
              <span className="text-gray-600 text-sm mr-2">({quantity} remaining )</span>
            </div>
          ) : (
            <span className="text-red-600 font-medium mt-2"> out of stuck</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (localStorage.getItem("isLogged") !== "true") {
                  router.push("/login");
                } else {
                  setBuyClicked(true);
                }
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
            >
                buy now
              </button>
            
    
          </div>
          
          <AddToCartButton
            productId={productID}
            price={price}
            name={title}
            imageUrl={imageUrls[0]}
            availableQuantity={quantity}
            category={category}
          />
        </div>

        {/* Product Features */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
        Fast shipping within 24-48 hours
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
             Free returns within 14 days
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
Technical support available 24/7            </li>
          </ul>
        </div>
      </div>

      <BuyForm
        clicked={buyClicked}
        setClicked={setBuyClicked}
        productId={productID}
        price={price}
      />
    </div>
  );
}