'use client'

import { useState } from "react";
import NewAddress from "./newAddress";
import EditAddress from "./chooseAddress";
import ChooseAddress from "./chooseAddress";



interface userAddressesProps {
addresses:address[]

}


export default function  UserAddresses({addresses}:userAddressesProps) {
const [addAddress,setAddAddress]=useState<boolean>(false)
const [editAddress,setEditAddress]=useState<boolean>(false)
  
  return (
    <div >
     <h1 className="text-black text-2xl font-bold">addresses:</h1>
    <div className="max-h-56 overflow-y-auto flex flex-row gap-2 mb-4">
              {addresses.length > 0?  addresses.map((address, index) => (
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
                        <button onClick={()=>{setAddAddress(true)}} className="px-2 py-1 w-fit  rounded hover:opacity-50 cursor-pointer bg-amber-600">add new address</button>
                        {addresses.length > 0 &&(
                    <button onClick={()=>{setEditAddress(true)}} className="px-2 py-1 w-fit  rounded hover:opacity-50 
                        cursor-pointer bg-amber-300">edit addresses</button>)}
              </div>

         <NewAddress clicked={addAddress} setClicked={setAddAddress}  />     
         <ChooseAddress addresses={addresses} clicked={editAddress} setClicked={setEditAddress}  />     
    
  </div>

  );
}