'use client'
import { useEffect, useState } from "react";
import ProductDetails from "./components/productDetails";
import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";

export default function ProductPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [data, setData] = useState<productDetails | null>(null);

  const getProductData = async (productId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?id=${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setData(data);
    } catch (err) {
      setMessage('something went wrong please try again later');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const productId = segments[2];
    getProductData(productId);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!data ? (
            <ErrorMessage message={message} />
          ) : (
            <main className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6  mx-auto">
              
              {/* main details */}
              <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <ProductDetails
                  imageUrls={data?.imageUrls ?? []}
                  price={data?.price ?? undefined}
                  title={data?.title ?? 'not found'}
                  productID={data?._id ?? 'not found'}
                  quantity={data?.quantity}
                  category={data?.category ?? 'not found'}
                />
              </section>

              {/* more details */}
              {data.details && (
                <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-xl font-bold text-primary mb-3">Product Details</h2>
                  <p className="text-gray-700 leading-relaxed">{data.details}</p>
                </section>
              )}

            </main>
          )}
        </>
      )}
    </>
  );
}
