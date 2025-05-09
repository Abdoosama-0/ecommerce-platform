'use client'

import { useEffect, useState } from "react";
import NewAddress from "@/app/userdata/components/newAddress";
interface BuyProps {
    productId:string
    price:number
    clicked:boolean
    setClicked:(arg0: boolean)=> void
}

export default function  BuyForm({productId,price , clicked ,setClicked}:BuyProps) {

    // ======================type==========================
  type address={
    government: string,
   city:string,
    area :string,
    street: string,
    buildingNumber: string,
    departmentNumber: string,
    _id:string
  }
//   =====================================const=======================
  const url="http://localhost:3000"
  const [selectedAddress,setSelectedAddress] =useState<address | null>(null)
  const [paymentMethod,setPaymentMethod]=useState<string>("cash on delivery")
  const [add,setAdd]=useState<boolean >(false)
  const [addresses,setAddresses]= useState<address[]>([])

  const [quantity,setQuantity]=useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(quantity * price);


const getAddresses = async()=>{
  try{
    const res =await fetch(`${url}/addresses` ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
      credentials: 'include',
      
    
    })
    const data = await res.json();
    if (res.ok) {
        console.log('=================================================')
        console.log(data.addresses)
        console.log('=================================================')
      setAddresses(data.addresses);
    }

  }
  catch(err){
    console.log(err)
  }
}


useEffect(()=>{
    getAddresses()
},[])
  useEffect(()=>{
  
  setTotalPrice(quantity*price)
  
  },[quantity, price])
  useEffect(() => {
    
    if (addresses.length > 0) {
      setSelectedAddress(addresses[addresses.length - 1]); // تعيين آخر عنوان كـ "راديو" افتراضي
    }
  }, [addresses]);
  const orderData = {
    products: [
      {
        productId: productId, // استخدام productId المستخرج من المسار
        quantity: quantity     // استخدام الكمية المدخلة
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
    paymentMethod: paymentMethod // استخدام paymentMethod المدخل
  };
const handleSubmit = async(e: React.FormEvent)=>{
  e.preventDefault();

  try{
    const res =await fetch(`${url}/order` ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
      credentials: 'include',
      body:JSON.stringify(orderData),
    
    })
    if(res.ok){
      alert('success')
      window.location.reload()
    }
    else{
      alert('failed')
    }

  }
  catch(err){
    console.log(err)
  }
}
    
  return (
    <>
    {clicked &&(

<div onClick={() => setClicked(false)} className="fixed inset-0 z-20 bg-slate-900/90">
<form onClick={(e) => e.stopPropagation()}  onSubmit={handleSubmit} className="absolute inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
<div className=' overflow-y-auto p-4 '>
<label className="block mb-2 text-sm font-medium text-gray-700">
Quantity
</label>
<select
value={quantity}
onChange={(e) => setQuantity(Number(e.target.value))}
className="w-full p-2 border rounded-lg text-black mb-2"
>
{Array.from({ length: 10 }, (_, i) => (
<option key={i + 1} value={i + 1}>
 {i + 1}
</option>
))}
</select>

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
{addresses.slice().reverse().map((address, index)=> (
<div
 key={index}
 className="flex flex-row justify-between items-center w-full p-2 border rounded-lg bg-gray-50"
>
 <div>
 <input
         type="radio"
         name="address"
         value={address._id} // يمكن استخدام `address.id` أو أي قيمة فريدة
         onChange={() => setSelectedAddress(address)} // تعيين العنوان المحدد
         checked={selectedAddress?._id === address._id} // تحقق من العنوان المحدد
       />
       <label className="ml-2">
         <p>City: {address.city}, Government: {address.government}</p>
         <p>Area: {address.area}, Street: {address.street}</p>
         <p>Building: {address.buildingNumber}, Dept: {address.departmentNumber}</p>
       </label>
 </div>
</div>
))}
<button onClick={(e)=>{e.preventDefault();setAdd(true) }} className="mx-auto py-1  hover:opacity-50  px-2 rounded-2xl bg-amber-600 cursor-pointer">add new address</button>
</div>

     
</div>
<h1>totalPrice : {totalPrice}</h1>
<button  type="submit" className="mx-auto rounded-2xl py-1 px-2 bg-amber-600 hover:opacity-50 cursor-pointer w-[40%]">submit</button>

<button onClick={() => setClicked(false)} className="absolute cursor-pointer top-1 right-2 text-gray-700 hover:opacity-70 text-2xl ">X</button>
</form>

</div>






)
}

{add&&(
<>
<div onClick={()=>{setAdd(false)}} className=" fixed inset-0 bg-slate-900 opacity-90 z-[60] ">

</div>

<NewAddress setAdd={setAdd} getAddresses={getAddresses} />



</>
)}

    </>

  );
}
