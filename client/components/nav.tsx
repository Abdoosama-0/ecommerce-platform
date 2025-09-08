'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

import MobNav from "./mobNavMenu";

import { MdOutlineArrowDropDown, MdOutlineDashboard } from "react-icons/md";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";

import { GiGymBag } from "react-icons/gi";




export default function Nav() {


  const [isLogged, setIsLogged] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('isLogged',"true")
           setIsLogged(JSON.parse("true"))
           if(data.isAdmin){
             setIsAdmin(JSON.parse("true"))
           }
        } else {
              setIsLogged(JSON.parse("false"))
        }
      } catch (err) {
        console.error("Error verifying user:", err);
      }
    };

    verify();
  }, []);


  // useEffect(() => {

  //   setIsLogged(JSON.parse(localStorage.getItem("isLogged") || "false"))
  //   setIsAdmin(JSON.parse(localStorage.getItem("isAdmin") || "false"))
  // }, [])

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
  const [categoryDetails, setCategoryDetails] = useState<categoriesDetails[]>()
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCategories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
      setCategoryDetails(data.categories);

    } catch (error) {
      alert('something went wrong please try again later');
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCategories()

  }, [])
  const [clicked, setClicked] = useState(false)

  return (<>
    <main className="relative top-0 left-0 w-full h-[64px] bg-slate-900 border-b-2 border-slate-400/20  shadow-xl z-40 flex items-center text-2xl text-white font-bold justify-between">




      <div className="ml-10 w-fit ">
        <Link className="flex gap-1 items-center  hover:text-indigo-300 text-3xl"
          onClick={() => {
            if (clicked) {
              setClicked(false)
            }
          }}
          href={`/`}>
          <p className=" font-extrabold">muscular</p><GiGymBag />



        </Link>
      </div>

      <div className="hidden lg:flex pointer-events-none md:pointer-events-auto mr-10 justify-end items-center w-full gap-8">
        <div className="relative group">
          <Link
            className="  flex items-center hover:text-indigo-400"
            title="categories"
            href="#"
          >
            <MdOutlineArrowDropDown className="mr-1" />
            <span>Categories</span>
          </Link>


          {/* Dropdown */}
          <div className="absolute right-[20%]  top-full hidden w-40 rounded-md bg-white shadow-md group-hover:block">
            <ul className="py-2">
              {categoryDetails?.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/${cat.name}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link className="hover:text-indigo-400  items-center gap-1 flex" title="cart" href={`/cart`}>
          <AiOutlineShoppingCart />
          <span>cart</span>
        </Link>

        <>
          {isLogged === null ? (<></>) : (<>
            {!isLogged ? (
              <Link title="log in" className="hover:text-indigo-400 flex gap-1 items-center" href={`/login`}>
                <FiLogIn /><span>login</span>

              </Link>
            ) : (
              <>

                <Link className="hover:text-indigo-400 flex gap-1" title="user data" href={`/userdata`}>   <FiUser />  <span>userdata</span>
                </Link>
                <Link className="hover:text-indigo-400 flex gap-1" title=" orders" href={`/userOrders`}>      <BsClipboardCheck />  <span>orders</span>
                </Link>
                {isAdmin &&
                  <Link title="admin dashboard" className="hover:text-indigo-400 flex gap-1" href={'/admin'}>

                    <MdOutlineDashboard />  <span>dashboard</span>

                  </Link>
                }
                <h1 className="hover:text-indigo-400 cursor-pointer flex gap-1" title="Log out" onClick={handleLogout}>
                  <FiLogOut />
                  <span>Log out</span>
                </h1>
              </>

            )}
          </>)}
        </>
      </div>

      {categoryDetails &&
        (<MobNav categoryDetails={categoryDetails} clicked={clicked} setClicked={setClicked} logout={handleLogout} isAdmin={isAdmin} isLogged={isLogged} />
        )
      }</main>

  </>);
}
