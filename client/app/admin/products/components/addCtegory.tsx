'use client'

import { useState } from "react";

interface addCategoryProps {

setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddCategory({setRefresh}: addCategoryProps) {
    const [clicked, setClicked] = useState(false)
    const [message, setMessage] = useState('')
    const [categoryName, setCategoryName] = useState('')

    const handleSubmit = async () => {
        
        if (!categoryName.trim()) {
            setMessage("Category name is required");
            return;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addCategory`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: categoryName }),
            });
            const data = await res.json();


            if (!res.ok) {
                setMessage(data.message || "something went wrong please try again later");
                return
            }

            alert("added successfully");
            setRefresh((prev) => prev + 1)
            setCategoryName('');
            setMessage('');
            setClicked(false);

        } catch (err) {
            setMessage("something went wrong please try again later")
            console.log(err);

        }
    };

    return (
        <>
            <div onClick={() => { setClicked(true) }} className="bg-slate-950 hover:bg-slate-800 rounded-xl py-1 px-4 cursor-pointer w-fit text-white font-bold">
                Add Category
            </div>
            {clicked && (

                <div onClick={() => setClicked(false)} className="fixed inset-0 z-40 bg-slate-900/90">
                    <div  onClick={(e) => e.stopPropagation()} className="absolute p-4 w-fit h-fit inset-0 m-auto z-50 flex flex-col gap-4  overflow-y-auto bg-white rounded">
                        <label >category Name</label>
                        <input type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="border-2 border-gray-300 rounded-md p-2 w-full"
                            placeholder="category name"

                        />
                        <p className="text-sm text-red-600 ">{message}</p>
                        <button onClick={(e) => { e.preventDefault(); ; handleSubmit()}} className="bg-slate-950 mx-auto hover:bg-slate-800 rounded-2xl py-1 px-3 cursor-pointer w-fit text-white font-sans"> submit</button>


                        <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
                    </div>
                </div>


            )}
        </>
    );
}