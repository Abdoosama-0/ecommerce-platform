'use client'


import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Process from "./components/process";
import ErrorMessage from "@/components/errorMessage";
import QuantityButton from "@/app/cart/components/quantityButton";
import Loading from "@/components/loading";

export default function Cart() {

  const [message, setMessage] = useState('')
  const [cartRefreshFlag, setCartRefreshFlag] = useState(0);
  const refreshCart = () => setCartRefreshFlag(prev => prev + 1);
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [products, setProducts] = useState<number>(0)
  const [loading, setLoading] = useState(true);
  const handleDeleteProduct = async (productId: string) => {
    if (localStorage.getItem('isLogged') === 'true') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/deleteFromCart`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });



        if (res.ok) {
          refreshCart();
        } else {
          alert('failed');
        }
      } catch (err) {
        console.log(err);

      }
    }

    else {
      let newCart = cart
      const existingItem = cart?.find(item => item.productId._id === productId);

      if (existingItem) {

        newCart = (cart?.filter(item => item.productId._id !== productId)) || [];

      }
      localStorage.setItem('cart', JSON.stringify(newCart));

      setCart(newCart)
      refreshCart();

    }

  }

  const getCartItems = async () => {
    if (localStorage.getItem('isLogged') === 'true') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',

        })
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message)
          return
        }

        setCart(data.cart)
      } catch (err) {
        setMessage('something went wrong please try again later ')

        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    else {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]);
      setLoading(false)
    }
  }


  useEffect(() => {
    getCartItems()
  }, [cartRefreshFlag])

  useEffect(() => {

    let totalProducts = 0;
    let totalPrice = 0;
    cart?.forEach(item => {
      totalProducts += item?.quantity;
      totalPrice += item?.productId?.price * item?.quantity;
    });
    setTotalPrice(totalPrice)
    setProducts(totalProducts)
  }, [cart])






  return (

    <>
      {loading ? (<><Loading /></>) : (<>
        {!cart ? (<><ErrorMessage message={message} /></>) : (<>
          <div className="p-4 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>

            {cart?.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (




              <main className="md:flex md:justify-between  ">
                {/**products */}
                <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3  gap-4 w-full md:max-w-[75%] mb-3  md:mr-2">
                  {cart?.map((item, index) => (
                    <div key={index} className="p-2  flex flex-col    gap-2 relative w-full     h-fit rounded-2xl overflow-hidden shadow-lg border-2 border-gray-300">
                      <Link href={`/${item?.productId?._id ?? '#'}`} className="hover:opacity-80 transition">
                        <div className="w-full h-auto sm:aspect-[13/9]  aspect-[1/1] bg-white relative rounded-xl overflow-hidden">
                          <Image
                            src={item?.productId?.imageUrls?.[0] || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                            alt={item?.productId?.title || 'No title available'}
                            fill
                            priority
                            className="   object-contain "
                          />
                        </div>
                        <p className="font-semibold mt-2">{item?.productId?.title ?? "No title available"}</p>
                        <p className="text-gray-500">{item?.productId?.price ?? "No price available"}</p>
                      </Link>

                      <div className="flex flex-row justify-between gap-4 mt-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (item?.productId?._id) handleDeleteProduct(item.productId._id);
                          }}
                          className="w-full py-1 px-2 rounded-2xl bg-red-600 text-white hover:opacity-80 transition"
                        >
                          Delete
                        </button>

                        <QuantityButton
                          productId={item?.productId?._id}
                          quantity={item?.quantity ?? 1}
                          refreshCart={refreshCart}
                          setCart={setCart}
                          cart={cart}
                        />
                      </div>
                    </div>

                  ))}
                </div>
                {/**process */}
                {cart && (<Process cart={cart} setCart={setCart} productsCount={products} totalPrice={totalPrice} />)}

              </main>



            )

            }
          </div>


        </>
        )}
      </>)}
    </>

  );
}
