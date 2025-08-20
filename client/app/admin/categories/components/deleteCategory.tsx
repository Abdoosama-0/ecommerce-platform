'use client'

import { useState } from "react";

interface deleteCategoryProps {
    categoryDetails: categoriesDetails[];
    setCategoryDetails: (arg0: categoriesDetails[]) => void;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export default function DeleteCategory({ setRefresh, categoryDetails, setCategoryDetails }: deleteCategoryProps) {
    const [clicked, setClicked] = useState(false)
    const [message, setMessage] = useState('')

    const [categoryId, setCategoryId] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        if (!categoryId.trim()) {
            setMessage("you must select category ");
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/deleteCategory/${categoryId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const data = await res.json();


            if (!res.ok) {
                setMessage(data.message);
                return
            }

            alert("deleted successfully");
            if (categoryDetails.length === 1) {
                setCategoryDetails([]);
            }
            setRefresh((prev) => prev + 1)
            setCategoryId('');
            setMessage('');
            setClicked(false);

        } catch (err) {
            setMessage("something went wrong please try again later")
            console.log(err);

        }finally {
            setLoading(false)
        }   
    };

    return (
        <>
            <div onClick={() => { setClicked(true) }} className="bg-red-800 hover:bg-red-900 rounded-xl py-1 px-4 cursor-pointer w-fit text-white font-bold">
                Delete Category
            </div>
            {clicked && (

                <div onClick={() => setClicked(false)} className="fixed inset-0 z-40 bg-slate-900/90  ">
                    <div onClick={(e) => e.stopPropagation()} className="absolute p-4 w-fit h-fit inset-0  min-w-[80%] sm:min-w-[40%]  m-auto z-50 flex flex-col gap-4  overflow-y-auto bg-white rounded">
                                   {loading && (
                            <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 rounded">
                                <div className="loader"></div>
                            </div>
                        )}
                        <label >choose category:</label>
                        <div className="flex flex-col gap-2">
                            {[...categoryDetails].reverse().map((s) => (
                                <label key={s._id} className="flex items-center gap-2 cursor-pointer text-lg font-sans border-2  rounded-lg p-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={s.name}
                                        checked={categoryId === s._id}
                                        onChange={() => setCategoryId(s._id)}
                                        className="accent-slate-950 cursor-pointer"
                                    />
                                    <span >{s.name}</span>
                                </label>
                            ))}
                        </div>

                        <p className="text-sm text-red-600 ">{message}</p>
                        <button onClick={(e) => { e.preventDefault(); handleSubmit() }} className="bg-red-800 mx-auto hover:bg-red-900 rounded-2xl py-1 px-4 cursor-pointer w-fit text-white font-sans"> delete</button>


                        <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
                    </div>
                </div>


            )}
        </>
    );
}