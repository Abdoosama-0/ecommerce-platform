'use client'

import { useState } from "react";



interface RestoreButtonProps {
productId:string

}


export default function  RestoreButton({productId}:RestoreButtonProps) {
    const [message,setMessage]=useState('')
    const [clicked,setClicked]= useState(false)
const [quantity,setQuantity]= useState<number>()

const handleSubmit = async () => { 
  
     try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/restoreProduct/${productId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({quantity})
      })
      const data = await res.json()
      

      if (!res.ok) {
        setMessage(data.message)
       return
      }
      alert('restored')
      window.location.reload()
      
     
  }
  catch (error) {
    setMessage('something went wrong please try again later')
  
    console.log('Error fetching data:', error);
    
     
  }
}


  
  return (
    <>
    {/**restore button */}
    <button onClick={(e)=>{ e.preventDefault();setClicked(true)}} className="px-2 py-1 w-fit text-sm flex justify-center items-center  rounded-2xl hover:opacity-50 cursor-pointer bg-amber-600">
        restore
    </button>
    {/** form to submit*/}
        {clicked && (
    
     <div onClick={(e) =>{ e.preventDefault();setClicked(false)  } } className="cursor-default fixed inset-0 z-10 bg-slate-900/90">  {/* استخدم '/' لتحديد opacity مباشرة في Tailwind */}
      <form    onClick={(e) => {e.stopPropagation();e.preventDefault()}} className="cursor-default absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-fit h-fit min-w-[400px]  overflow-y-auto bg-white rounded">
     <div className="flex flex-col m-4 ">
  <label>Quantity</label>
  <input 
    type="number" 
    placeholder="Quantity"
    value={quantity} 
    onChange={(e) => setQuantity(Number(e.target.value))} 
    className=" flex items-center justify-start px-2 text-sm py-1   border-2 rounded-lg placeholder:text-sm"
  />
  {message&&
  <h1 className=" mt-1 text-sm text-red-600">{message}</h1>
  }
</div>


        <button onClick={() =>{handleSubmit()} } className="mx-auto px-2 py-1 w-fit text-sm flex justify-center items-center  rounded-2xl hover:opacity-50 cursor-pointer bg-amber-600">
        submit</button>
      <button onClick={() =>{setClicked(false)} } className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
    </form>
</div>
      
      
    )}




</>
  );
}