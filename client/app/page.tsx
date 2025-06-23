'use client'


import ErrorMessage from "@/components/errorMessage"
import Loading from "@/components/loading"
import Link from "next/link"
import { useEffect, useState } from "react"





export default function Home() {
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState('')
    const [categoryDetails, setCategoryDetails] = useState<categoriesDetails[]>()
    const getCategories = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCategories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',

            })
            const data = await res.json()
            if (!res.ok) {
                setMessage(` ${data.message } :  ${process.env.NEXT_PUBLIC_API_URL}`)
                return
            }
            setCategoryDetails(data.categories)


        }
        catch (error) {
            setMessage(`something went wrong please try again later :, ${process.env.NEXT_PUBLIC_API_URL}`)

            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_API_URL)
        getCategories()

    }, [])
    return (
        <>


            {loading ? (<Loading/>) : (<>
                {!categoryDetails ? (<p><ErrorMessage message={message}/></p>) :
                    (<div className="m-2">
                    <h1 className="text-4xl font-[fantasy]">Categories:</h1>
                    

                    {categoryDetails.length === 0 ? (<p className="text-center text-2xl font-bold">No categories found</p>) : (<>
                        <div className="grid grid-cols-1   gap-4 m-2 ">
                            {categoryDetails.map((category) => (

                                <Link href={`/${category.name}`}
                                 key={category._id}
                                  className="w-full rounded-lg p-20 lg:max-w-[800px] xl:max-w-[1200px] text-white font-[fantasy] text-5xl flex justify-center items-center border-2 border-gray-900 bg-slate-900 mx-auto hover:bg-slate-800 transition-all duration-300 ease-in-out ">
                                   
                                        
                                   
                                        <h1>{category.name}</h1>
                                    

                                </Link>
                            ))}

                        </div>


                        </>)}
                    </div>)}
            </>)} 
        </>
    );
}


