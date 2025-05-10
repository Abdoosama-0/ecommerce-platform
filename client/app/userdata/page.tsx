'use client'

import Loading from "@/components/loading";
import NewAddress from "@/app/userdata/components/newAddress";
import { useEffect, useState } from "react";
import UserMainData from "./components/userMainData";
import UserAddresses from "./components/userAddresses";

export default function UserData() {


  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>("")
  const [data, setData] = useState<userData| null>(null)
  




  
const getUserData = async () => {
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
    getUserData();
    setLoading(false)
  }, []);



const [editAddresses,setEditAddresses]=useState(false)
const [editAddress,setEditAddress]=useState(false)


  return (
 <>
    {loading ? (<><Loading/></>):
    
    (
    
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


)

}


    
  


     
    
</>
  );
}
