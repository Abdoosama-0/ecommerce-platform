'use client'

import Link from "next/link";


export default function Nav() {
  const url = "http://localhost:3000";


  const handleClick = async () => {
    try {
      const res = await fetch(`${url}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data =await res.json()

      if (res.ok) {
        localStorage.setItem('isLogged', 'false');
        alert('Logged out successfully');
        window.location.reload()
       
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <main className="absolute top-0 left-0 w-full h-[64px] bg-slate-950 shadow-md z-10 flex items-center text-2xl text-white font-bold justify-between">
      <div className="ml-10 w-full">
        <Link href={`/`}>
          <h1>store</h1>
        </Link>
      </div>

      <div className="mr-10 flex justify-end items-center w-full gap-8">
        <Link href={`/cart`}>
          <h1>cart</h1>
        </Link>

        {localStorage.getItem("isLogged") === "false"? (
        <Link href={`/login`}>
          <h1>login</h1>
        </Link>
      ) : (
        <>
          <h1 className="cursor-pointer" onClick={handleClick}>
            logout
          </h1>
          <Link href={`/userdata`}>userData</Link>
        </>
      )}
      </div>
    </main>
  );
}
