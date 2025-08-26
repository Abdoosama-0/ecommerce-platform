'use client'


import {  useState } from "react";

interface AddToCartProps {
  
  productId: string
  name: string
  availableQuantity: number
  price: number
  imageUrl: string
  category: string

}
export default function AddToCartButton({ availableQuantity, productId, price, category,name, imageUrl }: AddToCartProps) {
  const [loading, setLoading] = useState(false)
  const [addClicked, setAddClicked] = useState(false);


  const [quantityInCart, setQuantityInCart] = useState<number>(0);

  const handleIncrease = async (productId: string) => {
    if (localStorage.getItem('isLogged') === 'true') {
      setLoading(true)
      try {
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
      
          setQuantityInCart(prev => prev + 1)

        } else {
          alert(data.message);
          setLoading(false)
        }
      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false)
      }
    }
    else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as {
        productId: {
          _id: string,
          imageUrls: string[],
          title: string,
          price: number
                   category: string
        }, quantity: number
      }[];
      console.log(cart)
      const existingItem = cart.find(item => item.productId._id === productId);

      if (existingItem) {
        if (availableQuantity < existingItem.quantity + 1) {
          alert(`you can just buy ${availableQuantity}  items`)
          return
        }
        setQuantityInCart(prev => prev + 1)
        existingItem.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      console.log(JSON.parse(localStorage.getItem('cart') || '[]'))
    }
  }

  const handleDecrease = async (productId: string) => {
    if (localStorage.getItem('isLogged') === 'true') {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/decreaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });


        if (res.ok) {
          if (quantityInCart === 1) {
            setAddClicked(false)
          }
          setQuantityInCart(prev => prev - 1)
    

        } else {
          alert('failed');
          setLoading(false)
        }
      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false)
      }
    }
    else {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]') as {
        productId: {
          _id: string,
          imageUrls: string[],
          title: string,
          price: number
          category: string
        }, quantity: number
      }[];


      const existingItem = cart.find(item => item.productId._id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          setQuantityInCart(prev => prev - 1)
          existingItem.quantity -= 1;
        }
        else {
          setQuantityInCart(prev => prev - 1)
          setAddClicked(false)
          cart = cart.filter(item => item.productId._id !== productId);
        }
      }
      localStorage.setItem('cart', JSON.stringify(cart));
 

    }

  }

  const handleAddToCart = async (productId: string) => {


    if (localStorage.getItem('isLogged') === 'true') {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addToCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          credentials: 'include',
          body: JSON.stringify({ product: { productId, quantity: 1 } }),
        })
        const data = await res.json()
        if (!res.ok) {
          alert(data.message)
          setLoading(false)
          return
        }
        setQuantityInCart(data.quantity)
    
      } catch (err) {
        alert('some thing went wrong please try again later');
        console.log(err)
      } finally {
        setLoading(false)
      }

    }
    else {

      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as {
        productId: {
          _id: string,
          imageUrls: string[],
          title: string,
          price: number
          category: string
          availableQuantity:number
        }, quantity: number
      }[];


      const existingItem = cart.find(item => item.productId._id === productId);

      if (existingItem) {

        existingItem.quantity += 1;
        setQuantityInCart(existingItem.quantity)
      } else {
        const imageUrls = [imageUrl]

        cart.push({ productId: { _id: productId, imageUrls: imageUrls, title: name, price: price,category:category,availableQuantity }, quantity: 1 });
        setQuantityInCart(prev => prev + 1)
      }

      localStorage.setItem('cart', JSON.stringify(cart));

   
    }


  };



  return (
    <>
      {loading ? (
        <div onClick={(e) => { e.preventDefault(); }} className=" py-1  border-2 border-sky-600 text-black rounded-3xl w-full flex justify-center items-center  cursor-default  ">
          <div className="loader"></div>
        </div>
      )
        : (
          <>

            {addClicked && quantityInCart>0 ? (
              <div onClick={(e) => { e.preventDefault() }} className=' px-2    py-1  border-2 border-sky-600 text-black rounded-3xl w-full flex justify-between items-center    '>
                <button onClick={(e) => { e.preventDefault(); handleIncrease(productId) }} className="cursor-pointer">+ </button>
                <div>
                  {
                    loading ? (<> <h1 onClick={(e) => { e.preventDefault() }} className=" "></h1></>) : (
                      < > {quantityInCart}</>)
                  }

                </div>
                <button onClick={(e) => { e.preventDefault(); handleDecrease(productId) }} className="cursor-pointer">- </button>
              </div>
            ) : (
              <div onClick={(e) => { e.preventDefault(); handleAddToCart(productId); setAddClicked(true) }} className='py-1 bg-sky-800 rounded-3xl w-full flex justify-center items-center  text-white font-bold cursor-pointer hover:bg-sky-900 '>
                add to cart
              </div>
            )}


          </>)}
    </>
  );

}
