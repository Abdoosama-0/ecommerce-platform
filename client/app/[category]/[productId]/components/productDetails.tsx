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

  return (
    <div className="w-full flex flex-col sm:flex-row gap-6 bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">

      {/* Image Section */}
      <div className="relative w-full sm:w-2/3 lg:w-1/2 aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <Image
          src={
            imageUrls[currentImageIndex] ||
            `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`
          }
          alt={title || "No title available"}
          fill
          priority
          className="object-contain bg-gray-50"
        />
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
              <FaArrowLeft className="text-gray-700" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
              <FaArrowRight className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          <p className="mt-2 text-lg text-gray-700">
            <span className="text-2xl font-bold text-primary">
              {Number(price).toLocaleString()}
            </span>{" "}
            <span className="text-gray-500 text-sm">EGP</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (localStorage.getItem("isLogged") !== "true") {
                router.push("/login");
              } else {
                setBuyClicked(true);
              }
            }}
            className="bg-sky-700 hover:bg-sky-800 text-white font-semibold py-3 rounded-xl shadow-sm transition-all"
          >
            Buy Now
          </button>
          <AddToCartButton
            productId={productID}
            price={price}
            name={title}
            imageUrl={imageUrls[0]}
            availableQuantity={quantity}
            category={category}
          />
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
