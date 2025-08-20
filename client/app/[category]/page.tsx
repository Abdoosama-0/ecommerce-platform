'use client'


import UserProductCard from "./components/userproductcard";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";




type ProductResponse = {
  message: string;
  products: productDetails[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;

};
function SearchParamsHandler({ onPageChange }: { onPageChange: (page: number) => void }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return null;
}
export default function Category() {
  const router = useRouter()
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProductResponse>();
  const [category, setCategory] = useState<string>("");

  const [page, setPage] = useState(1);
  const changePage = (newPage: number) => {
    router.push(`?page=${newPage}`, { scroll: false });

  };



  const getProducts = async (page: number, category: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${category}?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',

      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.message)
        return
      }
      setData(data)

    }
    catch (error) {
      setMessage('something went wrong please try again later')

      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const category = segments[1];
    setCategory(category);
    getProducts(page, category);
  }
    , [page])


  return (

    <>


      {loading ? (<><Loading /></>) : (<>
        {!data ? (<><ErrorMessage message={message} /></>) : (<>
          <Suspense fallback={<div className="text-white font-bold text-4xl mx-auto mt-5">Loading...</div>}>
            <SearchParamsHandler onPageChange={setPage} />
          </Suspense>
          {data.totalProducts === 0 ? (<p className="m-2 text-2xl sm:text-4xl font-[fantasy] text-black">there is no products available yet</p>)
            : (<>
              <main className="p-2 border-2 m-2 rounded-lg border-slate-950 shadow-2xl shadow-slate-300">

                {/**products */}
                <div>
                  <div className="flex flex-col justify-between px-2 my-1">
                  <h1 className="text-4xl font-[fantasy]">{category}</h1>
                  {data && <h2 className="mb-2 ">products: {data.totalProducts}</h2>}
                    </div>
                  <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
                    {data?.products.map((el) => (

                      <UserProductCard key={el._id}
                        category={category}
                        title={el.title}
                        image={el.imageUrls[0]}
                        productId={el._id}
                        price={el.price}
                        availableQuantity={el.quantity}
                      />

                    ))}
                  </div>
                </div>

                {/**next and previous buttons  */}
                <div className="flex justify-center gap-4 w-full  ">
                  {data && data?.currentPage > 1 &&
                    <button onClick={() => { changePage(page - 1); }} className="bg-slate-950 hover:bg-slate-700 text-white px-4 py-1 rounded-lg cursor-pointer ">previous</button>

                  }

                  {data && data?.totalPages - data?.currentPage > 0 &&
                    <button onClick={() => { changePage(page + 1); }} className="bg-slate-950 hover:bg-slate-700 text-white px-4 py-1 rounded-lg  cursor-pointer">next</button>
                  }
                </div>


              </main>
            </>)}
        </>)}
      </>)}
    </>

  );
}




