'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

import MobNav from "./mobNavMenu";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";




export default function Nav() {
  

const [isLogged,setIsLogged]= useState<boolean |null >(null)
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
      window.location.href = '/'; 
    } catch (err) {
      alert('something went wrong please try again later')
      console.log(err);
    }
  };



const [clicked,setClicked]=useState(false)

  return (<>
    <main className="relative top-0 left-0 w-full h-[64px] bg-slate-900 border-b-2 border-slate-400/20  shadow-xl z-40 flex items-center text-2xl text-white font-bold justify-between">

    
    
    
      <div className="ml-10 w-fit ">
        <Link onClick={()=>{
          if(clicked){
          setClicked(false)}
          }}  href={`/`}>
          <h1>store</h1>
        </Link>
      </div>

      <div className="hidden md:flex pointer-events-none md:pointer-events-auto mr-10 justify-end items-center w-full gap-8">
        <Link title="cart" href={`/cart`}>
          <h1><IoCartOutline />
</h1>
        </Link>

        <>
        {isLogged === null ? (<></>) : (<>
          {!isLogged ? (
            <Link href={`/login`}>
              <h1 title="log in"><CiLogin />
</h1>
            </Link>
          ) : (
            <>
              <h1 title="Log out" className="cursor-pointer" onClick={handleLogout}>
                <IoLogOutOutline />

              </h1>
              <Link title="user data" href={`/userdata`}><FaRegUser />
</Link>
              <Link  title=" orders" href={`/userOrders`}><MdOutlineLocalShipping />
</Link>
              {isAdmin &&
                <Link href={'/admin'}>
                  <h1  title="admin dashboard"><RiAdminLine />
</h1>
                </Link>
              }
            </>

          )}
          </>)}
        </>
      </div>
    
      <MobNav clicked={clicked} setClicked={setClicked} logout={handleLogout} isAdmin={isAdmin}  isLogged={isLogged}/>
    </main>
     
  </>);
}
