'use client'

import { useEffect, useState } from "react";
import NewAddress from "@/app/userdata/components/newAddress";

interface BuyProps {
  productId: string
  price: number
  clicked: boolean
  setClicked: (arg0: boolean) => void
}

export default function BuyForm({ productId, price, clicked, setClicked }: BuyProps) {

  // ======================type==========================


  const [selectedAddress, setSelectedAddress] = useState<address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("cash on delivery")
  const [newAddress, setNewAddress] = useState<boolean>(false)
  const [addresses, setAddresses] = useState<address[]| null>(null)
const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(quantity * price);
  const [message, setMessage] = useState('')
  const [getAddressesMessage, setGetAddressesMessage] = useState('')

  const getAddresses = async () => {
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',


      })
      const data = await res.json();
      if (!res.ok) {
        setGetAddressesMessage(data.message)
        return
        
      }
    setAddresses(data.addresses);
    }
    catch (err) {
      setGetAddressesMessage('something went wrong please try again later')
      console.log(err)
    }
  }
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',
        body: JSON.stringify(orderData),

      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.message)
        return

      }

      alert('added successfully')
      window.location.reload()

    }
    catch (err) {
      setMessage('something went wrong please try again later')
      console.log(err)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAddresses()

  }, [])
  useEffect(() => {

    setTotalPrice(quantity * price)

  }, [quantity, price])
  useEffect(() => {

    if (addresses && addresses.length > 0) {
      setSelectedAddress(addresses[addresses.length - 1]); 
    }
  }, [addresses]);
  const orderData = {
    products: [
      {
        productId: productId, 
        quantity: quantity     
      }
    ],
    address: selectedAddress ? {
      government: selectedAddress.government,
      city: selectedAddress.city,
      area: selectedAddress.area,
      street: selectedAddress.street,
      buildingNumber: selectedAddress.buildingNumber,
      departmentNumber: selectedAddress.departmentNumber
    } : {
      government: "",
      city: "",
      area: "",
      street: "",
      buildingNumber: "",
      departmentNumber: ""
    },
    paymentMethod: paymentMethod
  };

 

  return (
    <>
      {clicked && (

        <div onClick={() => setClicked(false)} className="fixed inset-0 z-20 bg-slate-900/90">
          <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="absolute inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
               {loading && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/70 rounded">
                <div className="loader3"></div>
              </div>
            )}
            <div className=' overflow-y-auto p-4 '>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className=" p-2 border rounded-lg text-black mb-2 w-fit"
                min={1}

              />

              <label className="block mb-2 text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-lg text-black mb-2"
              >
                <option value="cash on delivery">Cash on Delivery</option>

              </select>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                choose address
              </label>
              <div className="flex flex-col gap-2 w-full p-2 text-black max-h-72  overflow-y-auto">
                {addresses ? (<>
                {addresses.slice().reverse().map((address, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center w-full p-2 border rounded-lg bg-gray-50"
                  >
                    <div>
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        onChange={() => setSelectedAddress(address)}
                        checked={selectedAddress?._id === address._id}
                      />
                      <label className="ml-2">
                        <p>City: {address.city}, Government: {address.government}</p>
                        <p>Area: {address.area}, Street: {address.street}</p>
                        <p>Building: {String(address.buildingNumber)}, Dept: {String(address.departmentNumber)}</p>
                      </label>
                    </div>
                  </div>
                ))}</>) :(<>
                <p>{getAddressesMessage}</p>
                </>)}
                <button onClick={(e) => { e.preventDefault(); setNewAddress(true) }} className="mx-auto py-1  hover:opacity-50  px-2 rounded-2xl bg-amber-600 cursor-pointer">add new address</button>
              </div>


            </div>
            <h1>totalPrice : {totalPrice}</h1>
            {message &&
              <h1 className="text-sm text-red-500">{message}</h1>
            }
            <button type="submit" className="mx-auto rounded-2xl py-1 px-2 bg-amber-600 hover:opacity-50 cursor-pointer w-[40%]">submit</button>

            <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-1 right-2 text-gray-700 hover:opacity-70 text-2xl ">X</button>
          </form>

        </div>






      )
      }

      <NewAddress clicked={newAddress} setClicked={setNewAddress} />





    </>

  );
}
