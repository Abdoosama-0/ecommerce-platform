'use client';
import { useEffect, useState } from "react";
import EditProduct from "@/components/updateProduct";
import Loading from "@/components/loading";
import Auth from "@/components/auth";
import Images from "@/components/images";

export default function Product() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string >("");

  type data={
    imageUrls: string[];
    // حسب شكل المنتج في قاعدة البيانات
    _id: string;
    title: string;
    details: string;
    price: number;
    category: string;
    // ضيف باقي الخصائص لو فيه أكتر
  }
const [data, setData] = useState<data | null>(null); 
const [edit,setEdit]=useState(false)


useEffect(() => {
  const path = window.location.pathname;
const segments = path.split('/');
const productId = segments[1]; 
console.log(productId)
const fetchData = async () => {
    try {
    const res = await fetch(`http://localhost:3000/product?id=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json();
   
    if (!res.ok) {
        setMessage(data.message)
      
   
    } 
    else {
     
      setData(data); 
    }
    
    setLoading(false)
  }catch (error) {
    setLoading(false)
    console.error('Error fetching data:', error);
  }}

  fetchData();
}, []); 



const [currentImageIndex, setCurrentImageIndex] = useState(0);


const goToNextImage = () => {
  if (data?.imageUrls && currentImageIndex < data.imageUrls.length - 1) {
    setCurrentImageIndex(currentImageIndex + 1);
  } else {
    setCurrentImageIndex(0);
  }
};


const goToPreviousImage = () => {
  if (currentImageIndex > 0) {
    setCurrentImageIndex(currentImageIndex - 1);
  } else {
    setCurrentImageIndex(data?.imageUrls ? data.imageUrls.length - 1 : 0);
  }
};

    return (
<main className="">

  {loading ? (<><Loading/></>):(<>

    
       {/* =============================part 1 (edit)=================================== */}
    
  <div className="bg-gray-700 min-h-screen w-full flex flex-col p-4 text-3xl text-white font-bold ">
        {/* =================================first elment=============================== */}
          <div className="flex flex-col md:flex-row   items-center gap-12 mb-4">
              <div className=""><span className="text-sm">name:</span> <span>{data?.title}</span></div> 
              <div className=""><span className="text-sm">price:</span> <span>{data?.price} EGP</span></div> 
              <div className=""><span className="text-sm">category:</span> <span>{data?.category}</span></div> 
          </div>
        {/* =============================second element=================================== */}

  <div className="flex flex-col  gap-2  ">
  <Images imageUrls={data?.imageUrls}/>

          <div className="w-full md:w-[40%]  rounded-xl p-4 mt-4">
              <h2 className="text-sm mb-2">Details:</h2>
              <p className="text-xl whitespace-pre-wrap">{data?.details}</p>

          </div>
        
  </div>
  {/* ==================================third element============================================ */}
       
         
       
  </div>


      
</>) }

</main>
  
    );
  }
