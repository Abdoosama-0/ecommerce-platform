'use client';
import { useEffect, useState } from "react";
import EditProduct from "@/components/updateProduct";
import Loading from "@/components/loading";
import Auth from "@/components/auth";
import Images from "@/components/images";
import NewAddress from "@/components/newAddress";
import AddToCart from "@/components/addToCart";
import { useRouter } from "next/navigation";
import Buy from "@/components/buy";



export default function Product() {
  const url="http://localhost:3000"
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string >("");
const router = useRouter();

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
  const [edit,setEdit]=useState(false)
const [data, setData] = useState<data | null>(null); 
const [productId,setProductId] =useState<string>('')
useEffect(() => {
 const path = window.location.pathname;
const segments = path.split('/');
const productId = segments[1];

if (!productId) {

  setLoading(false);
  return;
}else{
  setProductId(productId)
}


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
      console.log(data.price)
    }
    
    setLoading(false)
  }catch (error) {
    setLoading(false)
    console.error('Error fetching data:', error);
  }}

  fetchData();
}, []); 














const [clicked,setClicked]=useState<boolean |null>(null)









    return (
<main className="">

  {loading ? (<><Loading/></>):(<>

    
       {/* =============================part 1 (edit)=================================== */}
    
  <div className="bg-gray-700 min-h-screen w-full flex flex-col p-4 text-3xl text-white font-bold ">
        {/* =================================first elment=============================== */}
          <div className="flex flex-col md:flex-row   items-center gap-4 mb-4">
              <div className=""><span className="text-sm">name:</span> <span>{data?.title}</span></div> 
              <div className=""><span className="text-sm">price:</span> <span>{data?.price} EGP</span></div> 
              <div className=""><span className="text-sm">category:</span> <span>{data?.category}</span></div> 
          </div>
        {/* =============================second element=================================== */}

  <div className="flex flex-col  gap-2  ">
  <div className="flex flex-col gap-2 md:flex-row justify-center md:justify-start  border-2 p-2 ">
  {/* صورة بحجمها الطبيعي */}
  <div className="w-full md:w-[60%] ">
  <Images  imageUrls={data?.imageUrls} />
  </div>

  <div className=" border-2 p-2 flex flex-col  w-full md:w-[40%] gap-2">
      <button   onClick={() => {
    if (localStorage.getItem('isLogged') !== 'true') {
      router.push('/login');
    } else {
      setClicked(true);
       // استدعاء الدالة عند الضغط إذا لم يكن مسجلاً الدخول
    }
  }} className="cursor-pointer w-full p-2 bg-slate-800 rounded-2xl hover:opacity-50">buy</button>
        {productId && <AddToCart productId={productId} name={data?.title || "Unknown Product"} price={data?.price|| 0} imageUrl={data?.imageUrls[0] || ""} />}
   
  </div>
</div>

          <div className="w-full md:w-[40%]  rounded-xl p-4 mt-4">
              <h2 className="text-sm mb-2">Details:</h2>
              <p className="text-xl whitespace-pre-wrap">{data?.details}</p>

          </div>
        
  </div>
       
         
       
  </div>


      
</>) }

{clicked&&(
// =================================
  <>
{/* {localStorage.getItem('isLogged')==='true' ? (router.push('/login'))
:(<>  </>)} */}

  <div onClick={()=>{setClicked(false)}} className=" fixed inset-0 bg-slate-900 opacity-90 z-40 ">

  </div>

  <Buy productId={productId} price={data?.price || 0}/>

  
  
  
  
  
  </>
// =================================
)}



</main>
  
    );
  }
