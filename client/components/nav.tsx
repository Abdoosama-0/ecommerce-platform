'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

import MobNav from "./mobNavMenu";


export default function Nav() {


const [isLogged,setIsLogged]= useState<boolean>(false)
const [isAdmin,setIsAdmin]= useState<boolean>(false)

useEffect(()=>{

setIsLogged(JSON.parse(localStorage.getItem("isLogged")|| "false"))
setIsAdmin(JSON.parse(localStorage.getItem("isAdmin") || "false"))
},[])

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json()

      if (!res.ok) {
        alert(data.message);
        return
      }
      localStorage.setItem('isLogged', 'false');
      alert('Logged out successfully');
      window.location.reload()
    } catch (err) {
      alert('something went wrong please try again later')
      console.log(err);
    }
  };



const [clicked,setClicked]=useState(false)

  return (<>
    <main className="relative top-0 left-0 w-full h-[64px] bg-slate-950 shadow-md z-20 flex items-center text-2xl text-white font-bold justify-between">
    
    
    
    
      <div className="ml-10 w-fit ">
        <Link onClick={()=>{
          if(clicked){
          setClicked(false)}
          }}  href={`/`}>
          <h1>store</h1>
        </Link>
      </div>

      <div className="hidden md:flex pointer-events-none md:pointer-events-auto mr-10 justify-end items-center w-full gap-8">
        <Link href={`/cart`}>
          <h1>cart</h1>
        </Link>

        <>
          {!isLogged ? (
            <Link href={`/login`}>
              <h1>login</h1>
            </Link>
          ) : (
            <>
              <h1 className="cursor-pointer" onClick={handleLogout}>
                logout
              </h1>
              <Link href={`/userdata`}>userData</Link>
              {isAdmin &&
                <Link href={'/admin'}>
                  <h1>dashboard</h1>
                </Link>
              }
            </>

          )}
        </>
      </div>
    
      <MobNav clicked={clicked} setClicked={setClicked} logout={handleLogout} isAdmin={isAdmin}  isLogged={isLogged}/>
    </main>
     
  </>);
}
