import Link from "next/link";


export default function Admin() {
    return (
 
        <div className="flex flex-col  bg-blue-500 min-h-screen gap-5">
          <h1 className="m-2">Welcome  Admin</h1>

          <div className="grid sm:grid-cols-3 grid-cols-1 flex-row gap-5 justify-around items-center bg-amber-50 rounded-xl p-4 w-[80%] flex-wrap m-auto">
            <Link href="/admin/users">
            <div className="bg-black rounded-xl flex flex-col items-center w-full justify-center
             p-4 text-3xl text-amber-50 font-bold">users</div></Link>
              <Link href="/admin/products">
              <div className="bg-black rounded-xl flex flex-col items-center w-full justify-center
             p-4 text-3xl text-amber-50 font-bold">products</div>
              </Link>
              <Link href="/admin/orders">
              <div className="bg-black rounded-xl flex flex-col items-center  w-full justify-center
             p-4 text-3xl text-amber-50 font-bold">orders</div>
            </Link>
          </div>
        
        </div>
    
  
    );
  }
  