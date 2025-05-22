'use client'
import Link from "next/link";
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";


interface MobNavProps {
  isAdmin: boolean
  isLogged: boolean
  logout: (e: React.MouseEvent<HTMLElement>) => void
  setClicked: (arg0: boolean) => void
  clicked: boolean
}
export default function MobNav({ logout, isAdmin, isLogged, setClicked, clicked }: MobNavProps) {

  useEffect(() => {
    const handleScroll = () => {
      setClicked(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setClicked]);
  return (
    <>
      <div className="relative cursor-pointer mr-10 text-white md:hidden flex pointer-events-auto  justify-end items-center w-fit gap-8 ">
        <div onClick={() => setClicked(!clicked)}>
          {clicked ? (<h1 className="font-light">X</h1>) : (<AiOutlineMenu />)}

        </div>

        {clicked && (
          <div onClick={() => setClicked(false)} className="cursor-default w-full fixed right-0 left-0 bottom-0 top-[64px] z-10 bg-slate-900/50">




          </div>
        )}
      </div>
      {clicked && (
        <div className=" font-light flex flex-col  gap-5 w-full absolute right-0 top-full z-20 bg-slate-200 p-2  rounded-sm shadow-lg ">
          {!isLogged ? (
            <Link onClick={() => { setClicked(false) }} href={`/login`}>
              <h1 className="cursor-pointer  border-b-2 text-black border-gray-400  hover:bg-slate-400 rounded-sm p-2 ">login</h1>
            </Link>
          ) : (
            <>
              <h1 className="cursor-pointer  border-b-2 text-black border-gray-400 hover:bg-slate-400 rounded-sm p-2" onClick={logout}>
                logout
              </h1>
              <Link className="cursor-pointer  text-black border-b-2 border-gray-400 hover:bg-slate-400 rounded-sm p-2" onClick={() => { setClicked(false) }} href={`/userdata`}>
                userData
              </Link>
              <Link className="cursor-pointer  text-black border-b-2 border-gray-400 hover:bg-slate-400 rounded-sm p-2" onClick={() => { setClicked(false) }} href={`/userOrders`}>
                userOrders
              </Link>
              {isAdmin &&
                <Link onClick={() => { setClicked(false) }} href={'/admin'}>
                  <h1 className="cursor-pointer  border-b-2 text-black border-gray-400 hover:bg-slate-400 rounded-sm p-2" >dashboard</h1>
                </Link>
              }
            </>

          )}
          <Link onClick={() => { setClicked(false) }} href={'/cart'}>
            <h1 className="cursor-pointer  border-b-2 text-black border-gray-400 hover:bg-slate-400 rounded-sm p-2" >cart</h1>
          </Link>
        </div>

      )}
    </>);
}
