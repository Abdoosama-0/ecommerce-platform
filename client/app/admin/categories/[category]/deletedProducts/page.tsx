'use client'

import ErrorMessage from "@/components/errorMessage"
import { useEffect, useState } from "react"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import RestoreButton from "./restoreButton"
import Loading from "@/components/loading"

export default function DeletedProducts() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('')
  const [data, setData] = useState<adminProductResponse>()

  const getDeletedProducts = async (category: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getDeletedProducts/${category}`, {
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
      setMessage('Something went wrong, please try again later')
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const category = segments[3];
    getDeletedProducts(category)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!data ? (
            <ErrorMessage message={message} />
          ) : (
            <div className="m-6">
              <h1 className="text-slate-900 text-4xl font-bold tracking-wide mb-4">Deleted Products</h1>
              {data.totalProducts === 0 ? (
                <h2 className="text-center text-lg font-medium text-slate-600">
                  No Deleted Products
                </h2>
              ) : (
                <>
                  <h2 className="mb-6 text-slate-700 text-lg">
                    Products: <span className="font-semibold">{data.totalProducts}</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.products.map((el, index) => (
                      <Link key={index} href={`/admin/products/${el._id}/`}>
                        <div className="p-3 flex flex-col justify-between gap-3 h-full border rounded-2xl border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                          
                          {/* Product Image */}
                          <div className="w-full aspect-[13/9] relative rounded-xl overflow-hidden bg-gray-50">
                            <Image
                              src={el.imageUrls[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                              alt={el.title || 'Product'}
                              layout="fill"
                              objectFit="contain"
                              className="object-cover"
                            />
                          </div>

                          {/* Title */}
                          <h1 className="text-lg font-semibold text-slate-800 line-clamp-2">
                            {el.title}
                          </h1>

                          {/* Price + Restore Button */}
                          <div className="flex justify-between items-center w-full mt-auto">
                            <span className="text-indigo-600 font-medium">{el.price} EGP</span>
                            <RestoreButton productId={el._id} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
