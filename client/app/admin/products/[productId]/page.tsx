'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import EditProduct from "@/app/admin/products/[productId]/components/updateProduct";
import Loading from "@/components/loading";
import Auth from "@/components/errorMessage";
import Images from "@/components/images";
import ProductDetails from "@/app/[productId]/components/productDetails";
import AdminProductDetails from "./components/adminProductDetails";

export default function Product() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string >("");
  const [auth, setAuth] = useState<boolean>(false);
 
const [data, setData] = useState<productDetails | null>(null); 


  const getProduct = async (productId:string) => {
    try {
    const res = await fetch(`http://localhost:3000/admin/getProductById?id=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json();
    setMessage(data.message)
    if (res.ok) {
      console.log('Product data:', data); // هنا بنطبع البيانات في الكونسول
      setData(data); // هنا بنخزن البيانات في الحالة
      setAuth(true); 
    } 
    else {
      console.error('Error fetching product data:', data.message);
    }
    setLoading(false)
  }catch (error) {
    setLoading(false)
    console.error('Error fetching data:', error);
  }}

useEffect(() => {
const path = window.location.pathname;
const segments = path.split('/');
const productId = segments[3]; 


  getProduct(productId); 
}, []); 



const [editClicked,setEditClicked]=useState(false)

    return (
<>

  {loading ? (<><Loading/></>):(<>

    {!auth ? (<><Auth message={message}/></>) : (<>
       {/* =============================part 1 (edit)=================================== */}
    {data?(<>
      <AdminProductDetails data={data} setData={setData} />
      <div onClick={()=>{setEditClicked(true)}} className="fixed min-w-[80px] cursor-pointer hover:opacity-50 flex justify-center items-center bottom-4 left-4 rounded-2xl px-2 py-1 w-fit bg-sky-700 shadow-2xl  ">edit</div>
       <EditProduct setEditClicked={setEditClicked} editClicked={editClicked}  currentCategory={data?.category } currentDetails={data?.details} currentPrice={data?.price} currentTitle={data?.title} currentImages={data?.imageUrls}/>
      
      </>):(<>
      <h1>product not found</h1>
      </>)}
    
       
        
       
</>) }
</>)}

</>
  
    );
  }
