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
                setMessage(data.message)
                return
            }
            setCategoryDetails(data.categories)


        }
        catch (error) {
            setMessage('something went wrong please try again later')

            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getCategories()

    }, [])
    return (
        <>


            {loading ? (<Loading/>) : (<>
                {!categoryDetails ? (<p><ErrorMessage message={message}/></p>) :
                    (<div className="m-2">
                    <h1 className="text-4xl font-[fantasy]">Categories:</h1>
                    

                    {categoryDetails.length === 0 ? (<p className="text-center text-2xl font-bold">No categories found</p>) : (<>
                        <div className="grid grid-cols-1   gap-4 m-2">
                            {categoryDetails.map((category) => (

                                <Link href={`/admin/categories/${category.name}`} key={category._id} className="w-full rounded-lg p-20 text-white font-[fantasy] text-5xl flex justify-center items-center border-2 border-gray-900 bg-slate-900 ">
                                   
                                        
                                   
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


