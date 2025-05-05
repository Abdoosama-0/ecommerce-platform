'use client'

import Loading from "@/components/loading";
import NewAddress from "@/components/newAddress";
import { useEffect, useState } from "react";

export default function UserData() {
  type address = {
    government: string,
    city: string,
    area: string,
    street: string,
    buildingNumber: string,
    departmentNumber: string,
    _id:string
  }

  type res = {
    username: string,
    email: string,
    name: string,
    isAdmin: Boolean,
    phone: string,
    addresses: address[]
  }

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>("")
  const [data, setData] = useState<res | null>(null)
  
  const updateAddress =async (currentEditAddress:address,selectedAddressIndex:number) => {

    try {
      const res = await fetch(`http://localhost:3000/updateAddress`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ currentEditAddress ,selectedAddressIndex}),
      })
      const data = await res.json()
      
  if(!res.ok){
    alert('failed')
    return
  }
  alert('success')
  window.location.reload()
  
  
  }
  catch (error) {
  
    console.log('Error fetching data:', error);
    
     
  }
  }
  const getAddressData =async (selectedAddressIndex:number) => {
    if (!data) {
      console.error('Data is null');
      return;
    }
    const address = data.addresses[selectedAddressIndex];

    if (!address) {
      console.error('العنوان غير موجود');
      return;
    }
  return {
    government: address.government,
    city: address.city,
    area: address.area,
    street: address.street,
    buildingNumber: address.buildingNumber,
    departmentNumber: address.departmentNumber,
    _id: address._id
   }
  }

const deleteAddress =async (selectedAddressIndex:number) => {

  try {
    const res = await fetch(`http://localhost:3000/deleteAddress`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ addressIndex: selectedAddressIndex }),
    })
    const data = await res.json()
    



}
catch (error) {

  console.log('Error fetching data:', error);
  
   
}
}

  const updateData = async () => {
    if (!data) return;
    try {
      const response = await fetch(`http://localhost:3000/UpdateUserData`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          name: data.name,
          phone: data.phone
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert('فشل التحديث');
        return;
      }

      alert('تم التحديث بنجاح');
      window.location.reload()
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/userData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        setLoading(false);
        return;
      }

      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
const [edit,setEdit]=useState(false)
const [editAddresses,setEditAddresses]=useState(false)
const [editAddress,setEditAddress]=useState(false)
const [add,setAdd]=useState(false)
const [selectedAddressIndex, setSelectedAddressIndex] = useState<null | number>(null);
const [currentEditAddress, setCurrentEditAddress] = useState<null | address>(null);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
     <>
   <>
         {data ? (
          <>
           <div className=" p-4 mx-auto space-y-4 rounded-2xl border-4 border-gray-900 m-2 max-w-[75%]  ">
             <div className="border-b-4 border-gray-600">
             <div>
               <label>الاسم الكامل:</label>
               
               <p className="p-2  rounded border-2 border-black bg-neutral-100 text-neutral-500 text-sm w-full ">
  {data.name}</p>

             </div>
             <div>
               <label>اسم المستخدم:</label>
               <p className="p-2  rounded border-2 border-black bg-neutral-100 text-neutral-500 text-sm w-full ">
               {data.username}</p>
             </div>
             <div>
               <label>البريد الإلكتروني:</label>
               <p className="p-2  rounded border-2 border-black bg-neutral-100 text-neutral-500 text-sm w-full ">
               {data.email}</p>
             </div>
             <div>
               <label>رقم الهاتف:</label>
               <p className="p-2  rounded border-2 border-black bg-neutral-100 text-neutral-500 text-sm w-full ">
               {data.phone}</p>
             </div>
             <div className="flex justify-center my-4">
                 <button onClick={()=>{setEdit(true)}} className=" px-4 py-1 rounded-2xl bg-amber-600 w-fit text-2xl font-bold cursor-pointer hover:opacity-50">edit data</button>
              </div>
</div>   
           
           <div >
            <h1 className="text-black text-2xl font-bold">addresses:</h1>

            <div className="max-h-56 overflow-y-auto flex flex-row gap-2 mb-4">
              {data.addresses.length > 0?  data.addresses.map((address, index) => (
                <div key={index} className="p-2 border-2 w-fit rounded-2xl border-b-gray-500">
                  <p>Government: {address.government}</p>
                  <p>City: {address.city}</p>
                  <p>Area: {address.area}</p>
                  <p>Street: {address.street}</p>
                  <p>Building Number: {address.buildingNumber}</p>
                  <p>Department Number: {address.departmentNumber}</p>
                </div>
              ))
              :
              (<h1 className="text-black text-sm ">no addresses</h1>)
              
              }
            </div>


              <div className="w-full flex justify-start items-center gap-4">
              <button onClick={()=>{setAdd(true)}} className="px-2 py-1 w-fit  rounded hover:opacity-50 cursor-pointer bg-amber-600">add new address</button>
             {data.addresses.length > 0 &&(    <button onClick={()=>{setEditAddresses(true)}} className="px-2 py-1 w-fit  rounded hover:opacity-50 
              cursor-pointer bg-amber-300">edit addresses</button>)}
          

              </div>
{add&&
(
  <>
  <div onClick={()=>{setAdd(false)}} className="fixed inset-0 z-40 bg-slate-900 opacity-90">
  
  </div>
  <NewAddress  />
</>
)

}

{editAddresses&&
(
  <>
  <div onClick={()=>{setEditAddresses(false)}} className="fixed inset-0 z-40 bg-slate-900 opacity-90">
  
  </div>
  <form className="fixed  inset-0 m-auto p-4  z-50 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] h-fit overflow-y-auto bg-white rounded" >

  {data.addresses && data.addresses.length > 0 ? (
        data.addresses.map((address, index) => (
          <div
            key={index}
            className={`p-4 border-2 w-fit h-fit rounded-2xl border-gray-500 shadow-sm flex items-start gap-4 ${
              selectedAddressIndex === index ? 'bg-gray-100' : ''
            }`}
          >
            <input
              type="radio"
              name="selectedAddress"
              checked={selectedAddressIndex === index}
              onChange={() => setSelectedAddressIndex(index)}
              className="mt-1"
            />

            <div>
              <p><strong>Government:</strong> {address.government}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>Area:</strong> {address.area}</p>
              <p><strong>Street:</strong> {address.street}</p>
              <p><strong>Building Number:</strong> {address.buildingNumber}</p>
              <p><strong>Department Number:</strong> {address.departmentNumber}</p>
            </div>
          </div>
        ))
      ) : (
        <h1>No addresses</h1>
      )}
  <div className="w-full flex justify-center items-center gap-4">
  <button
    onClick={() => {
      if (selectedAddressIndex !== null) deleteAddress(selectedAddressIndex);
    }}
    disabled={selectedAddressIndex === null || selectedAddressIndex < 0}
    className={`px-4 py-2 w-fit rounded-2xl transition 
      ${selectedAddressIndex !== null && selectedAddressIndex >= 0 
        ? 'cursor-pointer bg-red-600 hover:opacity-75' 
        : 'cursor-not-allowed bg-slate-600 opacity-50 pointer-events-none'}
    `}
  >
    Delete
  </button>
  <button
onClick={async (e) => {e.preventDefault();
  if (selectedAddressIndex !== null) {
    const address = await getAddressData(selectedAddressIndex);
    if (address) {
      setEditAddress(true);
      // احفظ البيانات في state لتظهر في الفورم مثلًا
      setCurrentEditAddress(address);
    }
  }
}}
    disabled={selectedAddressIndex === null || selectedAddressIndex < 0}
    className={`px-4 py-2 w-fit rounded-2xl transition 
      ${selectedAddressIndex !== null && selectedAddressIndex >= 0 
        ? 'cursor-pointer bg-amber-600 hover:opacity-75' 
        : 'cursor-not-allowed bg-slate-600 opacity-50 pointer-events-none'}
    `}
  >
    edit
  </button>
</div>


       

  </form>
</>
)

}
           </div>
           
           </div>
          
           {editAddress&& (
         <>
         <div onClick={(e)=>{e.preventDefault();setEditAddress(false)}} className="fixed inset-0 z-[60] bg-slate-900 opacity-90">
  
         </div>
         
         <div className="fixed inset-0 z-[70] p-4 mx-auto space-y-4 rounded-2xl bg-white border-4 border-gray-900 m-2 max-w-[75%]">
  {/* Government */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Government:</label>
    <input
      value={currentEditAddress?.government || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          government: e.target.value,
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || "",
          departmentNumber: currentEditAddress?.departmentNumber || "",
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Government"
    />
  </div>

  {/* City */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">City:</label>
    <input
      value={currentEditAddress?.city || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          city: e.target.value,
          government: currentEditAddress?.government || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || "",
          departmentNumber: currentEditAddress?.departmentNumber || "",
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter City"
    />
  </div>

  {/* Area */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Area:</label>
    <input
      value={currentEditAddress?.area || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          area: e.target.value,
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || "",
          departmentNumber: currentEditAddress?.departmentNumber || "",
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Area"
    />
  </div>

  {/* Street */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Street:</label>
    <input
      value={currentEditAddress?.street || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          street: e.target.value,
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          buildingNumber: currentEditAddress?.buildingNumber || "",
          departmentNumber: currentEditAddress?.departmentNumber || "",
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Street"
    />
  </div>

  {/* Building Number */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Building Number:</label>
    <input
      value={currentEditAddress?.buildingNumber || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          buildingNumber: e.target.value,
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          departmentNumber: currentEditAddress?.departmentNumber || "",
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Building Number"
    />
  </div>

  {/* Department Number */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Department Number:</label>
    <input
      value={currentEditAddress?.departmentNumber || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          departmentNumber: e.target.value,
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || "",
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Department Number"
    />
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
    <button
      onClick={() => {
        // Call update address API or function here
        updateAddress(currentEditAddress as address,selectedAddressIndex as number);
      }}
      className="w-[100%] py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
    >
      Update Address
    </button>
  </div>
</div>

       </>
       
     )}
     {edit&& (
         <>
         <div onClick={()=>{setEdit(false)}} className="fixed inset-0 z-40 bg-slate-900 opacity-90">
  
         </div>
         
         <div className="fixed inset-0 z-50  p-4 mx-auto space-y-4 rounded-2xl bg-white border-4 border-gray-900 m-2 max-w-[75%]">
             <div>
               <label>الاسم الكامل:</label>
               <input type="text" name="name" value={data.name} onChange={handleChange} className="border p-2 w-full" />
             </div>
             <div>
               <label>اسم المستخدم:</label>
               <input type="text" name="username" value={data.username} onChange={handleChange} className="border p-2 w-full" />
             </div>
             <div>
               <label>البريد الإلكتروني:</label>
               <input type="email" name="email" value={data.email} onChange={handleChange} className="border p-2 w-full" />
             </div>
             <div>
               <label>رقم الهاتف:</label>
               <input type="text" name="phone" value={data.phone} onChange={handleChange} className="border p-2 w-full" />
             </div>
          <div className=" flex justify-center">
             <button onClick={updateData} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              update
             </button>
             </div>
           </div>
       </>
       
     )}
</>

         ) : (
           <p>{message || "لم يتم العثور على بيانات"}</p>
         )}
       </>


     
     </>



      )}
    </>
  );
}
