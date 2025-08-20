import Loading from '@/components/loading'
import React, { useEffect, useState } from 'react'

const Categories = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(true)
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
                setMessage(data.message);
                return;
            }
            setCategoryDetails(data.categories);
        } catch (error) {
            setMessage('something went wrong please try again later');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>


            {loading ? (
                <Loading />
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-4xl font-[cursive] my-6'>our products</h1>
                    <div className='min-h-screen bg-slate-600/50 w-full'>
                        {!categoryDetails ? (<>
                            <h1>{message}</h1>
                        </>) : (

                            <div className=''>
                                <img
                                    src={categoryDetails[0].categoryPhoto}
                                    alt="Large Preview"
                                    className="max-w-[90vw] max-h-[80vh] object-contain"
                                />
                            

                            </div>
                        )}





                    </div>
                </div>)
            }


        </>
    )


}
export default Categories