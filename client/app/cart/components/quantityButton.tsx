'use client'

import { useState } from "react"


interface QuantityButtonProps {
  productId: string
  quantity: number
  refreshCart: () => void
  setCart: (cart: CartItem[]) => void
  cart: CartItem[]
handleDeleteProduct: (productId: string) => void
  availableQuantity: number

}


export default function QuantityButton({ productId,handleDeleteProduct, quantity, refreshCart, availableQuantity, cart, setCart }: QuantityButtonProps) {
  const [loading, setLoading] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  
  const handleIncrease = async (productId: string) => {
    if (localStorage.getItem('isLogged') === 'true') {
      try {
        setLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/increaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),

        });
        const data = await res.json()



        if (res.ok) {
          setCurrentQuantity(prev => prev + 1)
          refreshCart()

        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false)
      }
    }
    else {


      const existingItem = cart.find(item => item.productId._id === productId);

      if (!availableQuantity) {
        alert('something went wrong try again later')
        return
      }
      if (existingItem) {
        if (availableQuantity < existingItem.quantity + 1) {
          alert(`you can just add ${availableQuantity} items`)
          return
        }
        setCurrentQuantity(prev => prev + 1)
        existingItem.quantity += 1;
      }

      localStorage.setItem('cart', JSON.stringify(cart));


      refreshCart();
    }
  }

  const handleDecrease = async (productId: string) => {

    if (localStorage.getItem('isLogged') === 'true') {
      if (currentQuantity === 1) {
        handleDeleteProduct(productId)
        return
      }
      try {
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/decreaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });


        if (res.ok) {
          if (currentQuantity > 1) {
          setCurrentQuantity(prev => prev - 1)
          refreshCart();}
      

        } else {
          alert('failed');
        }
      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false)
      }


    }
    else {
      let newCart = cart
      const existingItem = cart.find(item => item.productId._id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          setCurrentQuantity(prev => prev - 1)
          existingItem.quantity -= 1;
        }
        else {
          newCart = cart.filter(item => item.productId._id !== productId);
        }
      }
      localStorage.setItem('cart', JSON.stringify(newCart));

      setCart(newCart)

      refreshCart();

    }


  }

  return (
<>
    <div className="w-full flex justify-between py-1 px-2 rounded-2xl border-2 border-sky-600  ">

      <button onClick={() => { handleIncrease(productId) }} className="cursor-pointer">+</button>
      <div>
        {loading ? (
          <> <div onClick={(e) => { e.preventDefault() }} className="">  <div className="loader"></div></div></>
        ) : (
          < > {currentQuantity}</>)}

      </div>
      <button onClick={() => { handleDecrease(productId) }} className="cursor-pointer">-</button>
    </div>
       
</>
  );
}