'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser, FiLogOut, FiLogIn } from "react-icons/fi";
import { MdOutlineArrowDropDown, MdOutlineArrowLeft, MdOutlineArrowRight, MdOutlineDashboard } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";

interface MobNavProps {
  categoryDetails: categoriesDetails[]
  isAdmin: boolean
  isLogged: boolean | null
  logout: (e: React.MouseEvent<HTMLElement>) => void
  setClicked: (arg0: boolean) => void
  clicked: boolean
}

export default function MobNav({ logout, isAdmin, isLogged, setClicked, clicked, categoryDetails }: MobNavProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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
      {/* زرار المينيو */}
      <div className="relative cursor-pointer mr-6 text-white lg:hidden flex justify-end items-center w-fit gap-8">
        <div onClick={() => setClicked(!clicked)}>
          {clicked ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </div>

        {/* خلفية مظللة عند الفتح */}
        {clicked && (
          <div
            onClick={() => setClicked(false)}
            className="cursor-default w-full fixed right-0 left-0 bottom-0 top-[64px] z-30 bg-slate-900/40 backdrop-blur-sm"
          />
        )}
      </div>

      {/* القائمة المنسدلة */}
      {clicked && (
        <div className="font-light flex flex-col gap-3 w-[75%] absolute right-4 top-full z-40 bg-white p-4 rounded-xl shadow-2xl">


          {!isLogged ? (
            <Link
              onClick={() => setClicked(false)}
              href={`/login`}
              className="flex items-center gap-3 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md"
            >
              <FiLogIn /> <span>Login</span>
            </Link>
          ) : (
            <>
              <button
                onClick={(e) => { logout(e); setClicked(false) }}
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md text-left"
              >
                <FiLogOut /> <span>Logout</span>
              </button>

              <Link
                onClick={() => setClicked(false)}
                href={`/userdata`}
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md"
              >
                <FiUser /> <span>User Data</span>
              </Link>

              <Link
                onClick={() => setClicked(false)}
                href={`/userOrders`}
                className="flex items-center gap-3 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md"
              >
                <BsClipboardCheck /> <span>User Orders</span>
              </Link>

              {isAdmin && (
                <Link
                  onClick={() => setClicked(false)}
                  href={`/admin`}
                  className="flex items-center gap-3 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md"
                >
                  <MdOutlineDashboard /> <span>Dashboard</span>
                </Link>
              )}
            </>
          )}

          <Link
            onClick={() => setClicked(false)}
            href={`/cart`}
            className="flex items-center gap-3 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md"
          >
            <AiOutlineShoppingCart /> <span>Cart</span>
          </Link>
          {/* Categories */}
          <div className="relative">
            <div
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex cursor-pointer items-center justify-between gap-1 text-slate-700 hover:text-indigo-400 border-b border-slate-200 hover:bg-slate-100 p-2 rounded-md"
            >
              <span>Categories</span>
              <MdOutlineArrowDropDown
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </div>
            
            {categoriesOpen && (
              <div className="mt-2 border border-slate-200 w-full rounded-md bg-white shadow-md">
                <ul className="py-2">
                  {categoryDetails?.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        onClick={() => { setClicked(false); setCategoriesOpen(false); }}
                        href={`/${cat.name}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
