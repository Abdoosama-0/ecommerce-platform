'use client'

import { useState } from 'react';
interface newAddressProps {
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
  getAddresses?: () => void; 
  clicked:boolean
  setClicked:(arg0:boolean)=> void
}
export default function NewAddress({ setAdd, getAddresses, clicked  ,setClicked }: newAddressProps) {

 const [loading, setLoading] = useState(false)
  const [government, setGovernment] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [buildingNumber, setBuildingNumber] = useState<number>(0);
  const [departmentNumber, setDepartmentNumber] = useState<number>(0);

 const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({newAddress:{
          government,
          city,
          area,
          street,
          buildingNumber,
          departmentNumber
        }
        }),

      }
    );

      const data = await res.json();
      
      if (res.ok) {
       if (setAdd&&getAddresses){
        setAdd(false); 
        getAddresses();
}else{
  alert('address added successfully')
  window.location.reload()
}
      } else {
        setMessage(data.message)
        
     
      }
    } catch (error) {
      setMessage('something went wrong please try again later')
      console.log('Error fetching data:', error);
    }finally {
      setLoading(false)
    }
  };

  return (
    
<>

 
    {clicked && (
    
<div onClick={() =>setClicked(false)} className="fixed inset-0  z-30 bg-slate-900/90">  

      <form onSubmit={handleSubmit}  onClick={(e) => e.stopPropagation()} className="absolute  p-4 inset-0 m-auto z-40 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
                   {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 rounded">
                <div className="loader3"></div>
              </div>
            )}
        {/* Government */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>Government:</label>
          <input
            value={government}
            onChange={(e) => setGovernment(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Government'
          />
        </div>

        {/* City */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>City:</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter City'
          />
        </div>

        {/* Area */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>Area:</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Area'
          />
        </div>

        {/* Street */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>Street:</label>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Street'
          />
        </div>

        {/* Building Number */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>Building Number:</label>
          <input
            value={buildingNumber}
            onChange={(e) => setBuildingNumber(Number(e.target.value))}
            type="number"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Building Number'
            min={0}
          />
        </div>

        {/* Department Number */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>Department Number:</label>
          <input
            value={departmentNumber}
            onChange={(e) => setDepartmentNumber(Number(e.target.value))}
            type="number"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Department Number'
            min={0}
          />
        </div>
        {/* error message */}
        <div>
          <h1 className='text-red-500 text-sm  '>{message}</h1>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-lg  w-full bg-black text-red-50 font-bold py-2 px-4 hover:bg-gray-200 hover:text-black cursor-pointer transition"
        >
          Add Address
        </button>
        {/* exit button */}
      <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">
        ×</button>
   
    </form>
</div>
      
      
    )}
 
  </>
  

);
}
