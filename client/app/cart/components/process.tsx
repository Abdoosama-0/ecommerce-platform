'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import BuyCartForm from "./buyCartForm";

interface ProcessProps {
  productsCount: number;
  totalPrice: number;
  cart: CartItem[];
  setCart: (arg0: CartItem[]) => void;
}

export default function Process({ productsCount, totalPrice, cart, setCart }: ProcessProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const router = useRouter();

  const clearCart = async () => {
    if (localStorage.getItem('isLogged') === 'true') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clearCart`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message);
          return;
        }
        router.push('/');
      } catch (err) {
        alert('Clear cart failed (something went wrong, please try again later)');
        console.log(err);
      }
    } else {
      localStorage.removeItem('cart');
      setCart([]);
    }
  };

  return (
    <div className="w-full md:w-[30%] bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex flex-col gap-4 h-fit">
      {/* Summary */}
      <div className="flex justify-between items-center bg-indigo-50 rounded-xl py-3 px-4">
        <p className="font-semibold text-slate-700">Products: <span className="text-indigo-600">{productsCount}</span></p>
        <p className="font-semibold text-slate-700">Total: <span className="text-indigo-600">${totalPrice}</span></p>
      </div>

      {/* Clear Cart */}
      <button
        onClick={clearCart}
        className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
      >
        Clear Cart
      </button>

      {/* Continue */}
      <button
        onClick={() => {
          if (localStorage.getItem('isLogged') !== 'true') {
            router.push('/login');
          } else {
            setClicked(true);
          }
        }}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
      >
        Continue Purchase
      </button>

      {/* Form */}
      <BuyCartForm
        setClicked={setClicked}
        clicked={clicked}
        items={cart || []}
        clearCart={clearCart}
        products={productsCount}
        totalPrice={totalPrice}
      />
    </div>
  );
}
