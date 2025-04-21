'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Add from "@/components/add";

export default function Product() {
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

  const fetchData = async (productId:string) => {
    try {
    const res = await fetch(`http://localhost:3000/admin/getProductById?id=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) {
      console.log('Product data:', data); // هنا بنطبع البيانات في الكونسول
      setData(data); // هنا بنخزن البيانات في الحالة
    } 
    else {
      console.error('Error fetching product data:', data.message);
    }
  }catch (error) {
    console.error('Error fetching data:', error);
  }}
useEffect(() => {
  const path = window.location.pathname; // "/admin/products/680588d2e9ffa84d37b2516e"
const segments = path.split('/'); // ["", "admin", "products", "680588d2e9ffa84d37b2516e"]
const productId = segments[3]; // "680588d2e9ffa84d37b2516e"

console.log(productId); // هنا بنجيب الـ ID من الرابط
  fetchData(productId); // استدعاء الدالة عند تحميل الصفحة
}, []); 


// إنشاء حالة لتخزين الصورة المعروضة حاليًا
const [currentImageIndex, setCurrentImageIndex] = useState(0);

// دالة للتبديل إلى الصورة التالية
const goToNextImage = () => {
  if (data?.imageUrls && currentImageIndex < data.imageUrls.length - 1) {
    setCurrentImageIndex(currentImageIndex + 1);
  } else {
    setCurrentImageIndex(0); // العودة إلى أول صورة عند الوصول للنهاية
  }
};

// دالة للتبديل إلى الصورة السابقة
const goToPreviousImage = () => {
  if (currentImageIndex > 0) {
    setCurrentImageIndex(currentImageIndex - 1);
  } else {
    setCurrentImageIndex(data?.imageUrls ? data.imageUrls.length - 1 : 0); // العودة إلى آخر صورة عند العودة للخلف
  }
};

    return (
<main className="">
       {/* =============================part 1 (edit)=================================== */}
    
  <div className="bg-gray-700 min-h-screen w-full flex flex-col p-4 text-3xl text-white font-bold">
        {/* =================================first elment=============================== */}
          <div className="flex flex-col md:flex-row   items-center gap-12 mb-4">
              <div className=""><span className="text-sm">name:</span> <span>{data?.title}</span></div> 
              <div className=""><span className="text-sm">price:</span> <span>{data?.price} EGP</span></div> 
              <div className=""><span className="text-sm">category:</span> <span>{data?.category}</span></div> 
          </div>
        {/* =============================second element=================================== */}

  <div className="flex flex-col  gap-2  ">
  <div className="w-[95%] h-auto aspect-[4/5] md:aspect-[16/10] bg-zinc-800 relative rounded-xl overflow-hidden">
      <Image
        src={data?.imageUrls[currentImageIndex] || ''}
        alt={'Product'}
        layout="fill"
        objectFit="contain"
        className="object-cover"
      />
      
      {/* زر التبديل للصورة السابقة */}
      <button
        onClick={goToPreviousImage}
        className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        ←
      </button>

      {/* زر التبديل للصورة التالية */}
      <button
        onClick={goToNextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer"
      >
        →
      </button>
    </div>

          <div className="w-full md:w-[40%]  rounded-xl p-4 mt-4">
              <h2 className="text-sm mb-2">Details:</h2>
              <p className="text-xl whitespace-pre-wrap">{data?.details}</p>

          </div>
        
  </div>
  {/* ==================================third element============================================ */}
       
          <button onClick={() => setEdit(true)} className="bg-gray-900 w-fit mt-4 text-white p-2 rounded-xl  cursor-pointer">Edit</button>
       
  </div>


        {/* =============================part 2 (edit)=================================== */}
        {edit && 
        <>
        <div onClick={() => setEdit(false)} className='fixed z-10 top-0 left-0 w-full h-full bg-gray-900 opacity-90 flex items-center justify-center'>
        </div>
        <Add currentCategory={data?.category } currentDetails={data?.details}
         currentPrice={data?.price} currentTitle={data?.title} currentImages={data?.imageUrls}/>
        
        </>
        }

       
</main>
  
    );
  }
