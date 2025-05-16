'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NewAddress from "@/app/userdata/components/newAddress";
interface BuyCartItem {
  productId: string;
  quantity: number;
}

interface BuyCartFormProps {
  items: any;
  totalPrice: number
  products: number
  clearCart: () => void
  clicked: boolean
  setClicked: (arg0: boolean) => void
}
export default function BuyCartForm({ items, totalPrice, products, clearCart, clicked, setClicked }: BuyCartFormProps) {
  const router = useRouter();
  


  const [selectedAddress, setSelectedAddress] = useState<address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("cash on delivery")
  const [addresses, setAddresses] = useState<address[]>([])
  const [newAdd, setNewAdd] = useState<boolean>(false)



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
      if (res.ok) {

        setAddresses(data.addresses);
      }

    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getAddresses()
  }, [])

  useEffect(() => {

    if (addresses.length > 0) {
      setSelectedAddress(addresses[addresses.length - 1]);
    }
  }, [addresses]);


  const orderData = {
    products: items,

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',
        body: JSON.stringify(orderData),

      })
      if (res.ok) {

        alert('success your order done successfully')
        clearCart()
        router.push('/')
      }
      else {
        alert('failed')
      }

    }
    catch (err) {
      console.log(err)
    }
  }
 
  return (
    <>
      {clicked && (

        <div onClick={() => setClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90">  {/* استخدم '/' لتحديد opacity مباشرة في Tailwind */}
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">

            <div className=' overflow-y-auto p-4 '>

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
                ))}
                <button onClick={(e) => { e.preventDefault(); setNewAdd(true) }} className="mx-auto py-1  hover:opacity-50  px-2 rounded-2xl bg-amber-600 cursor-pointer">add new address</button>
              </div>


            </div>
            <div className=" flex justify-start gap-10 mb-2 ml-2 rounded-2xl border-4 border-amber-700 w-fit p-2 text-white bg-amber-600 font-bold">
              <p>totalPrice:  {totalPrice}</p>
              <p>products:  {products}</p>
            </div>

            <button type="submit" className="mx-auto rounded-2xl py-1 px-2 bg-amber-600 hover:opacity-50 cursor-pointer w-[40%]">submit</button>

            <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
          </form>

          <NewAddress clicked={newAdd} setClicked={setNewAdd} />
        </div>


      )}

    </>

  );
}
