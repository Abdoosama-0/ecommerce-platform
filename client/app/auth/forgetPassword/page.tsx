"use client"
import React, { useState } from 'react'

const ForgetPassword = () => {
    const [email,setEmail]= useState('')
    const [message,setMessage]= useState('')
    const handleSubmit =async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgetPassword`,
         {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
           body: JSON.stringify({email}),
          });
          const data = await res.json();
          if (!res.ok) {
            setMessage(data.message)
            return;
          }
    
          alert('email was sent to you to recreate password');
          
    }
  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-50'>
    <div className=' text-2xl flex flex-col h-fit w-fit border-2 border-slate-900 rounded-2xl shadow-2xl text-slate-900 px-4 py-10 gap-3  min-w-[95%]  md:min-w-[40%] '>
    <h1 className='font-bold mx-auto'>Forget Password</h1>
    <input className='border-2 rounded-2xl text-lg border-slate-900  p-2 w-full placeholder:text-lg '
    type='text'
    value={email}
    placeholder='your email'
    onChange={(e) => setEmail(e.target.value)}
    />
    {message &&(<h1 className='text-sm text-red-500'>{message}</h1>)}
    
    <button onClick={()=>handleSubmit()}  className='mx-auto px-2 py-1 font-bold text-md text-slate-900 border-2 border-slate-900  bg-slate-100 cursor-pointer hover:bg-slate-200 rounded-2xl w-fit'>submit</button>
    </div>
   

</main>
  )
}

export default ForgetPassword