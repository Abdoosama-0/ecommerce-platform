'use client'

import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import UserMainData from "./components/userMainData";
import UserAddresses from "./components/userAddresses";

export default function UserData() {



  const [message, setMessage] = useState<string>("")
  const [data, setData] = useState<userData| null>(null)
  




  
const getUserData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/userData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
    
        return;
      }

      setData(data);
    
    } catch (error) {
       setMessage('something went wrong please try again later')
      console.error('Error fetching data:', error);
    
    }
  }
  useEffect(() => {
    getUserData();
  
  }, []);






  return (
 <>
 
         {data ? (
        
           <div className=" p-4 mx-auto space-y-4 rounded-2xl border-4 border-slate-600 m-2 max-w-[75%] shadow-2xl shadow-gray-500  ">
            <UserMainData data={data} setData={setData}/>
            <UserAddresses addresses={data.addresses}/>
           </div>
         ) : (
          
           <p>{message}</p>
         )}
     
    
</>
  );
}
