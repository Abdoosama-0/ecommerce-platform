'use client'
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";


interface MobNavProps{
isAdmin:boolean
logout:()=>void
}
export default function MobNav({isAdmin,logout}:MobNavProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative cursor-pointer mr-10 text-white md:hidden flex pointer-events-auto  justify-end items-center w-full gap-8">
      <div onClick={() => setClicked(!clicked)}>
        {clicked ?(<h1 className="font-light">X</h1>):(<AiOutlineMenu />)}
       
        </div>

      {clicked && (
            <div onClick={() => setClicked(false)} className="cursor-default w-full fixed right-0 left-0 bottom-0 top-[64px] z-10 bg-slate-900/50">  
 

      
        <div className=" font-light flex flex-col  gap-5 w-full fixed right-0 top-[64px] z-20 bg-slate-200 p-2  rounded-sm shadow-lg ">
            {localStorage.getItem("isLogged") === "false"? (
              <Link href={`/login`}>
                <h1 className="cursor-pointer  border-b-2 text-black border-gray-400  hover:bg-slate-400 rounded-sm p-2 ">login</h1>
              </Link>
            ) : (
              <>
                <h1 className="cursor-pointer  border-b-2 text-black border-gray-400 hover:bg-slate-400 rounded-sm p-2" onClick={logout}>
                  logout
                </h1>
                <Link href={`/userdata`}><h1 className="cursor-pointer  text-black border-b-2 border-gray-400 hover:bg-slate-400 rounded-sm p-2">userData</h1></Link>
                {isAdmin &&
                           <Link href={'/admin'}>
                          <h1  className="cursor-pointer  border-b-2 text-black border-gray-400 hover:bg-slate-400 rounded-sm p-2" >dashboard</h1>
                          </Link>
                }
                </>
            
            )}
               <Link href={'/cart'}>
                          <h1  className="cursor-pointer  border-b-2 text-black border-gray-400 hover:bg-slate-400 rounded-sm p-2" >cart</h1>
                          </Link>
        </div>
        </div>
      )}
    </div>
  );
}
