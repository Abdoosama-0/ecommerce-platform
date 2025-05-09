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


const [edit,setEdit]=useState(false)
const [editAddresses,setEditAddresses]=useState(false)
const [editAddress,setEditAddress]=useState(false)
const [add,setAdd]=useState(false)
const [selectedAddressIndex, setSelectedAddressIndex] = useState<null | number>(null);
const [currentEditAddress, setCurrentEditAddress] = useState<null | address>(null);
  return (
 <>
    {loading ? (<><Loading/></>):
    
    (
    
 <>
         {data ? (
          <>
           <div className=" p-4 mx-auto space-y-4 rounded-2xl border-4 border-slate-600 m-2 max-w-[75%] shadow-2xl shadow-gray-500  ">
            <UserMainData data={data} setData={setData}/>

            <UserAddresses addresses={data.addresses}/>
              {/* ======================== */}



           <div >
           

              


{editAddresses&&
(
  <>
 

</>
)

}
           </div>
           {/* ======================== */}
           </div>
          
           {editAddress&& (
         <>
         <div onClick={(e)=>{e.preventDefault();setEditAddress(false)}} className="fixed inset-0 z-[60] bg-slate-900 opacity-90">
  
         </div>
         
         <div className="fixed inset-0 z-[70] p-4 mx-auto space-y-4 rounded-2xl bg-white border-4 border-gray-900 m-2 max-w-[75%]">
  
</div>

       </>
       
     )}
   
</>

         ) : (
           <p>{message }</p>
         )}
       </>


)

}


    
  


     
    
</>
  );
}
