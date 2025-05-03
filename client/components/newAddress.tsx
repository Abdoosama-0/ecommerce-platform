'use client'


// interface addressProps {
//   government: string,
//  city:string,
//   area :string,
//   street: string,
//   buildingNumber: string,
//   departmentNumber: string,
 
// }
// {government,city,area,street,buildingNumber,departmentNumber}:addressProps
import { useState } from 'react';
interface NewAddressProps {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>; // لاستقبال setAdd من الـ parent
  getAddresses: () => void; // لاستقبال دالة getAddresses من الـ parent
}
export default function NewAddress({ setAdd, getAddresses }: NewAddressProps) {
  const url = "http://localhost:3000";

  const [government, setGovernment] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [buildingNumber, setBuildingNumber] = useState<string>('');
  const [departmentNumber, setDepartmentNumber] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // لمنع الإعادة التلقائية للصفحة عند إرسال النموذج

    try {
      const res = await fetch(`${url}/address`, {
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
      });

      const data = await res.json();
      
      if (res.ok) {
        console.log('Address added successfully');
        // هنا يمكنك إضافة إشعار أو توجيه المستخدم إلى صفحة أخرى إذا رغبت
        setAdd(false); // إغلاق الـ modal بعد إضافة العنوان بنجاح
        getAddresses();
      } else {
        console.log('Error adding address:', data);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white text-black fixed z-70 inset-0 m-auto rounded-lg w-[80%] h-[80%] overflow-hidden flex flex-col gap-2'>
      <div className='overflow-y-auto p-4'>
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
            onChange={(e) => setBuildingNumber(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Building Number'
          />
        </div>

        {/* Department Number */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>Department Number:</label>
          <input
            value={departmentNumber}
            onChange={(e) => setDepartmentNumber(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='Enter Department Number'
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-lg  w-full bg-black text-red-50 font-bold py-2 px-4 hover:bg-gray-200 hover:text-black cursor-pointer transition"
        >
          Add Address
        </button>
      </div>
    </form>
  );
}
