'use client'

import Loading from "@/components/loading";
import { useEffect, useState } from "react";

export default function UserData() {
  type address = {
    government: string,
    city: string,
    area: string,
    street: string,
    buildingNumber: string,
    departmentNumber: string,
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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
     <>
   <>
         {data ? (
          <>
           <div className=" p-4 mx-auto space-y-4 rounded-2xl border-4 border-gray-900 m-2 max-w-[75%]">
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
             <div className="flex justify-center">
             <button onClick={()=>{setEdit(true)}} className=" px-4 py-1 rounded-2xl bg-amber-600 w-fit text-2xl font-bold cursor-pointer">edit data</button>
</div>
       
           </div>

           
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
