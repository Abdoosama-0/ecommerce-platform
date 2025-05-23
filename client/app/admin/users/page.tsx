'use client';

import ErrorMessage from "@/components/errorMessage";
import Loading from "@/components/loading";


import { useEffect, useState } from "react";


export default function Users() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<responseType | null>(null)

  const [message, setMessage] = useState<string>("");
  const handleClick = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/banUser?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isBanned: true }),
      });

      if (!res.ok) {
        alert('Failed to update status!');
        return
      }

      alert('Status updated successfully!');
      window.location.reload();





    } catch (error) {
      alert('something went wrong please try again later');
      console.log(error);
    }


  }
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/getUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await res.json()


      if (!res.ok) {
        setMessage(data.message)
        return
      }


      setData(data)

    }
    catch (error) {
      setMessage('something went wrong please try again later')
      console.error('Error fetching data:', error);


    } finally {
      setLoading(false)
    }
  }






  useEffect(() => {


    fetchData()
  }
    , [])

  return (
    <>
      {loading ? (<><Loading /></>) : (<>
        {!data ? (<><ErrorMessage message={message} /></>) : (<>
          <main className=" bg-gray-100 min-h-screen ">
            <div className="flex flex-col">
              <h1 className="m-4 text-gray-800 text-3xl font-semibold">Users Count: {data.usersCount} </h1>
              <div className="flex flex-col   gap-3 p-1">
                { data.users.length > 0 ? (
                  <>
                    {data.users.map((user) => (
                      <div key={user._id} className="relative p-2  text-sm md:text-xl flex flex-row gap-8 break-words overflow-x-auto  justify-start items-center bg-white rounded-xl  w-full flex-wrap  shadow-md ">
                        <div className="flex flex-row gap-8  flex-wrap    justify-start  w-[90%] ">

                          <h1>userId:{user._id}  </h1>
                          <h1>Name:{user.name}  </h1>
                          <h1>email:{user.email}  </h1>
                          <h1>Phone:{user.phone}  </h1>
                          <h1>isBanned:{`${user.isBanned}`}  </h1>
                        </div>

                        <div onClick={() => handleClick(user._id.toString())}
                          className='absolute bg-violet-700 bottom-1 right-1  w-fit   cursor-pointer  rounded-lg overflow-hidden  text-white flex flex-col items-center justify-center  '>

                          {user.isBanned ? <h1 className="bg-green-600 hover:bg-green-700 py-1 px-2">Unban</h1> : <h1 className="bg-red-600 hover:bg-red-700 py-1 px-2">Ban</h1>}


                        </div>

                      </div>

                    ))}
                  </>
                ) : (<><h1>there is no users yet</h1></>)}
              </div>



            </div>

          </main>

        </>)}

      </>)}
    </>
  );
}
