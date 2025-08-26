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
        headers: { 'Content-Type': 'application/json' },
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
  }, [page])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!data ? (
            <ErrorMessage message={message} />
          ) : (
            <>
              <Suspense fallback={<div className="text-gray-800 font-bold text-2xl mx-auto mt-5">Loading...</div>}>
                <SearchParamsHandler onPageChange={setPage} />
              </Suspense>

              {data.totalProducts === 0 ? (
                <p className="m-6 text-center text-2xl sm:text-3xl font-semibold text-gray-700">
                  There are no products available yet
                </p>
              ) : (
                <main className="p-6  mx-auto rounded-2xl shadow-lg bg-white">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold capitalize text-gray-900">{category}</h1>
                    {data && (
                      <h2 className="text-gray-600 mt-2 sm:mt-0">Total Products: <span className="font-medium">{data.totalProducts}</span></h2>
                    )}
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data?.products.map((el) => (
                      <UserProductCard
                        key={el._id}
                        category={category}
                        title={el.title}
                        image={el.imageUrls[0]}
                        productId={el._id}
                        price={el.price}
                        availableQuantity={el.quantity}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-4 mt-8">
                    {data && data?.currentPage > 1 && (
                      <button
                        onClick={() => { changePage(page - 1); }}
                        className="px-6 py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-medium shadow-md transition"
                      >
                        Previous
                      </button>
                    )}

                    {data && data?.totalPages - data?.currentPage > 0 && (
                      <button
                        onClick={() => { changePage(page + 1); }}
                        className="px-6 py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-medium shadow-md transition"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </main>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
