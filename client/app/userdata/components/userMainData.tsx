'use client'

import { useState } from "react"
import UpdateUserData from "./updateUserData"

interface UserMainDataProps {
data:userData
setData:(arg0:userData)=> void
}

export default function  UserMainData({data,setData}:UserMainDataProps) {
const [clicked,setClicked]=useState<boolean>(false)
  
  return (
    
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
                        <button onClick={()=>{setClicked(true)}} className=" px-4 py-1 rounded-2xl bg-amber-600 w-fit text-2xl font-bold cursor-pointer hover:opacity-50">edit data</button>
                      </div>
                      <UpdateUserData setData={setData} data={data}  clicked={clicked} setClicked={setClicked}/>

    </div>   
  );
}