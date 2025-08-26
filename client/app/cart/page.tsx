'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Process from "./components/process";
import ErrorMessage from "@/components/errorMessage";
import QuantityButton from "@/app/cart/components/quantityButton";
import Loading from "@/components/loading";

export default function Cart() {
  const [message, setMessage] = useState('');
  const [cartRefreshFlag, setCartRefreshFlag] = useState(0);
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const refreshCart = () => setCartRefreshFlag(prev => prev + 1);

  const handleDeleteProduct = async (productId: string) => {
    if (localStorage.getItem('isLogged') === 'true') {
      setDeleteLoading(productId);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteFromCart`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message);
          return;
        }
        refreshCart();
      } catch (err) {
        alert('Something went wrong, please try again later');
        console.log(err);
      }
    } else {
      let newCart = cart?.filter(item => item.productId._id !== productId) || [];
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
      refreshCart();
    }
  };

  const getCartItems = async () => {
    if (localStorage.getItem('isLogged') === 'true') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message);
          return;
        }
        setCart(data.cart);
      } catch (err) {
        setMessage('Something went wrong, please try again later');
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [cartRefreshFlag]);

  useEffect(() => {
    let totalProducts = 0;
    let totalPrice = 0;
    cart?.forEach(item => {
      totalProducts += item.quantity;
      totalPrice += item.productId.price * item.quantity;
    });
    setTotalPrice(totalPrice);
    setProducts(totalProducts);
  }, [cart]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {!cart ? (
            <ErrorMessage message={message} />
          ) : (
            <div className="p-6 min-h-screen bg-gray-100">
              <h1 className="text-3xl font-bold mb-6 text-slate-800">🛒 Your Cart</h1>

              {cart.length === 0 ? (
                <div className="text-center p-10 bg-white shadow-md rounded-2xl border">
                  <p className="text-lg font-medium text-gray-600">Your cart is empty.</p>
                  <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline">
                    Continue Shopping →
                  </Link>
                </div>
              ) : (
                <main className="md:flex md:justify-between gap-6">
                  {/* products */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:max-w-[70%]">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-md border border-gray-200"
                      >
                        {/* loader overlay */}
                        {deleteLoading === item.productId._id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-600/60 text-white z-20 rounded-2xl">
                            <div className="loader2"></div>
                          </div>
                        )}

                        <Link
                          href={`/${item.productId.category}/${item.productId._id ?? '#'}`}
                          className="hover:opacity-80 transition"
                        >
                          <div className="w-full aspect-[4/3] bg-gray-50 relative rounded-xl overflow-hidden">
                            <Image
                              src={
                                item.productId.imageUrls?.[0] ||
                                `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`
                              }
                              alt={item.productId.title || 'No title available'}
                              fill
                              priority
                              className="object-contain"
                            />
                          </div>
                          <p className="font-semibold mt-3">{item.productId.title ?? 'No title available'}</p>
                          <p className="text-gray-500">${item.productId.price ?? 'N/A'}</p>
                        </Link>

                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.productId._id) handleDeleteProduct(item.productId._id);
                            }}
                            className="w-1/2 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                          >
                            Delete
                          </button>

                          <QuantityButton
                            productId={item.productId._id}
                            quantity={item.quantity ?? 1}
                            refreshCart={refreshCart}
                            setCart={setCart}
                            handleDeleteProduct={handleDeleteProduct}
                            availableQuantity={item.productId.availableQuantity}
                            cart={cart}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* process summary */}
                  <Process
                    cart={cart}
                    setCart={setCart}
                    productsCount={products}
                    totalPrice={totalPrice}
                  />
                </main>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
