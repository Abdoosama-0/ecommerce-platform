'use client'

import { useState } from "react";
import EditChosenAddress from "./editAddress";
import EditAddress from "./editAddress";



interface chooseAddressProps {
clicked:boolean
setClicked:(arg0:boolean)=> void
addresses:address[]
}

export default function  ChooseAddress({clicked,setClicked,addresses}:chooseAddressProps) {
const deleteAddress =async (e: React.MouseEvent<HTMLButtonElement>,selectedAddressId:string) => {
 e.preventDefault();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteAddress/${selectedAddressId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
  
    })
    const data = await res.json()
    if(!res.ok){
      alert(data.message)
      return
    }
    alert('deleted successfully')
    window.location.reload()
    
}
catch (error) {
  console.log('Error fetching data:', error);
}
}

const getAddressData = async (selectedAddressId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAddressById/${selectedAddressId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // إذا كنت تستخدم الـ JWT أو الـ Cookies
    });

    if (!res.ok) {
      alert('something went wrong')
    }

    const data = await res.json();
 
  setCurrentEditAddress(data.address)


    return data;
  } catch (error) {
    console.error('Error fetching address data:', error);
    throw error;
  }
};





const [currentEditAddress, setCurrentEditAddress] = useState<null | address>(null);
const [selectedAddressId, setSelectedAddressId] = useState<null | string>(null);

const [editChosenAddress,setEditChosenAddress]=useState<boolean>(false);
  return (
    
<>


    {clicked && (
    
     <div onClick={() => setClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90">  {/* استخدم '/' لتحديد opacity مباشرة في Tailwind */}
      <form  onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] h-fit  overflow-y-auto bg-white rounded">
        
  {addresses && addresses.length > 0 ? (
        addresses.map((address) => (
          <div
            key={address._id}
            className={`p-4 border-2 w-fit h-fit rounded-2xl border-gray-500 shadow-sm flex items-start gap-4 ${
              selectedAddressId === address._id ? 'bg-gray-100' : ''
            }`}
          >
            <input
              type="radio"
              name="selectedAddress"
              checked={selectedAddressId === address._id}
              onChange={() => setSelectedAddressId(address._id)}
              className="mt-1"
            />

            <div>
              <p><strong>Government:</strong> {address.government}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>Area:</strong> {address.area}</p>
              <p><strong>Street:</strong> {address.street}</p>
              <p><strong>Building Number:</strong> {address.buildingNumber.toString()}</p>
              <p><strong>Department Number:</strong> {address.departmentNumber.toString()}</p>
            </div>
          </div>
        ))
      ) : (
        <h1>No addresses</h1>
      )}

  <div className="w-full flex justify-center items-center gap-4">
  <button

    onClick={(e) => {
      if (selectedAddressId !== null) deleteAddress(e,selectedAddressId);
    }}

    disabled={selectedAddressId === null }
    className={`px-4 py-2 w-fit rounded-2xl transition${selectedAddressId !== null  ? 'cursor-pointer bg-red-600 hover:opacity-75' : 'cursor-not-allowed bg-slate-600 opacity-50 pointer-events-none'}`}
  >
    Delete
  </button>
  <button

  onClick={async (e) => {e.preventDefault();
  if (selectedAddressId !== null) {
    await getAddressData(selectedAddressId);
   
      setEditChosenAddress(true)
   
  }
}}


    disabled={selectedAddressId === null }
    className={`px-4 py-2 w-fit rounded-2xl transition ${selectedAddressId !== null ? 'cursor-pointer bg-amber-600 hover:opacity-75' : 'cursor-not-allowed bg-slate-600 opacity-50 pointer-events-none'}`}
  >
    edit
  </button>
</div>

        
      <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
    </form>
    {currentEditAddress && (
      <EditAddress
        clicked={editChosenAddress}
        setClicked={setEditChosenAddress}
        currentEditAddress={currentEditAddress}
        setCurrentEditAddress={setCurrentEditAddress}
      />
    )}
</div>
      
      
    )}


  



       


</>
  );
}