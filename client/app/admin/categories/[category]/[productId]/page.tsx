'use client';
import { useEffect, useState } from "react";

import EditProduct from "./components/updateProduct";

import Auth from "@/components/errorMessage";

import AdminProductDetails from "./components/adminProductDetails";
import Loading from "@/components/loading";

export default function Product() {

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<productDetails | null>(null);


  const getProduct = async (productId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getProductById?id=${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message)
        return


      }
      setData(data);

    } catch (error) {
      setMessage('something went wrong please try again later')
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const productId = segments[4];


    getProduct(productId);
  }, []);



  const [editClicked, setEditClicked] = useState(false)

  return (
    <>


{loading ? (<><Loading/></>) : (<>

      {!data ? (<>
        {/** error message */}
        <Auth message={message} />
      </>) : (
        <>

         
            {/** about the product */}
            <AdminProductDetails data={data} />

            {/** edit product button */}
            <div onClick={() => { setEditClicked(true) }} className="fixed min-w-[80px] cursor-pointer hover:opacity-50 flex justify-center items-center bottom-4 left-4 rounded-2xl px-2 py-1 w-fit bg-sky-700 shadow-2xl  ">edit</div>

            {/** edit product form */}
            <EditProduct setEditClicked={setEditClicked} editClicked={editClicked} currentCategory={data?.category} currentDetails={data?.details} currentPrice={data?.price} currentTitle={data?.title} currentImages={data?.imageUrls} />

        </>)}

</>)}
    </>

  );
}
