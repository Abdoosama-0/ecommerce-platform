import Loading from '@/components/loading'
import React, { useEffect, useState } from 'react'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
const Categories = () => {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(true)
    const [loadPhoto, setLoadPhoto] = useState<boolean>(false)
    const [categoryDetails, setCategoryDetails] = useState<categoriesDetails[]>()
    const [selectedCategory, setSelectedCategory] = useState<categoriesDetails>()
    const [currentIndex, setCurrentIndex] = useState(0);
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
            if (data.categories.length > 0) {
                setSelectedCategory(data.categories[0]);
            }
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

    const change = (num: number) => {
        setLoadPhoto(true)
        if (!categoryDetails) return
        if (categoryDetails?.length === 0 || categoryDetails?.length === 1) return;
        let newIndex = currentIndex + num;
        if (newIndex < 0) newIndex = categoryDetails.length - 1;
        if (newIndex >= categoryDetails.length) newIndex = 0;

        setCurrentIndex(newIndex);
        setSelectedCategory(categoryDetails[newIndex]);
        setLoadPhoto(false)
    }


    return (
        <>


            {loading ? (
                <Loading />
            ) : (
                <div className='flex flex-col items-center justify-center  '>
                    <div className=' flex items-center justify-center h-screen bg-slate-600/50 relative w-full  overflow-hidden     '>
             
                        <button onClick={()=>change(1)} className='h-full px-1 w-fit absolute right-0 z-20 cursor-pointer hover:bg-gray-900/40 text-white'><IoIosArrowForward />
                        </button>
                        <button onClick={()=>change(-1)}  className='h-full px-1 w-fit absolute left-0 z-20 cursor-pointer hover:bg-gray-900/40 text-white'><IoIosArrowBack />
                        </button>


                        <div className='absolute inset-0 z-10 bg-gray-900/70'></div>
                        {!categoryDetails ? (<>
                            <h1>{message}</h1>
                        </>) : (
                            <>


                                <img
                                    src="/danielle-cerullo-CQfNt66ttZM-unsplash.jpg"
                                    alt="Gym"
                                    className="w-full h-full object-cover"
                                />
                                <div className='flex flex-col-reverse md:flex-row justify-around  absolute w-full  text-white text-4xl font-[cursive] z-10'>

                                    <div className='flex flex-col items-center justify-center'>
                                        <h1 className='md:mb-3 md:flex hidden'>{selectedCategory?.name}</h1>
                                        <p className='md:ml-10 max-w-[600px] text-xl md:flex hidden'>{selectedCategory?.description}</p>
                                        < Link href={`/${selectedCategory?.name}`} className='rounded md:ml-10 mt-4 bg-blue-900 hover:bg-blue-700 cursor-pointer px-2 py-1 w-fit text-xl'>discover {selectedCategory?.name}</Link>
                                    </div>
                                    
                                        { loadPhoto ?(
                                            <div className=' loader2'></div>

                                        ):(    
                                             <div className='flex items-center justify-center'>
                                        <img
                                            src={selectedCategory?.categoryPhoto}
                                            alt={selectedCategory?.name}
                                            className="w-full h-full md:max-w-[1000px] max-w-[400px] md:max-h-[1000px] max-h-[400px]   object-cover"
                                        />
                                        </div>
                                    )  }
                                   

                                </div>
                            </>

                        )}





                    </div>
                </div>)
            }


        </>
    )


}
export default Categories