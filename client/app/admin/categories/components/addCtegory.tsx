'use client'

import { useState } from "react";
import Image from "next/image";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";

interface addCategoryProps {

    setRefresh: React.Dispatch<React.SetStateAction<number>>;
    setCurrentCategory?: (arg0: string) => void
}

export default function AddCategory({ setRefresh, setCurrentCategory }: addCategoryProps) {
    const [clicked, setClicked] = useState(false)
    const [message, setMessage] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categoryDescription, setCategoryDescription] = useState('')
    const [categoryPhoto, setCategoryPhoto] = useState<File | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
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
                body: JSON.stringify({ name: categoryName, description: "Default description", categoryPhoto: "default.jpg" })
            });
            const data = await res.json();


            if (!res.ok) {
                setMessage(data.message || "something went wrong please try again later");
                return
            }

            alert("added successfully");
            if (setCurrentCategory) {
                setCurrentCategory(categoryName)
            }
            setRefresh((prev) => prev + 1)
            setCategoryName('');
            setMessage('');
            setClicked(false);

        } catch (err) {
            setMessage("something went wrong please try again later")
            console.log(err);

        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <div onClick={() => { setClicked(true) }} className="bg-slate-950 hover:bg-slate-800 rounded-xl py-1 px-4 cursor-pointer w-fit text-white font-bold">
                Add Category
            </div>
            {clicked && (

                <div onClick={() => setClicked(false)} className="fixed inset-0 z-20 bg-slate-900/90">
                    <div onClick={(e) => e.stopPropagation()} className="absolute z-30 p-4 w-fit h-fit inset-0  min-w-[80%] sm:min-w-[40%] m-auto  flex flex-col gap-4  overflow-y-auto bg-white rounded">

                        {loading && (
                            <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 rounded">
                                <div className="loader"></div>
                            </div>
                        )}
                        <div>
                            <label >category Name</label>
                            <input type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                placeholder="category name"

                            />
                        </div>
                        <div>
                            <label htmlFor="categoryDescription">Category Description</label>
                            <textarea
                                id="categoryDescription"
                                value={categoryDescription}
                                onChange={(e) => setCategoryDescription(e.target.value)}
                                className="border-2 border-gray-300 rounded-md p-2 w-full resize-none"
                                placeholder="Category description"
                                rows={4} // عدد الأسطر اللي يظهر في الأول
                            />
                        </div>

                        {/* ===============add and view image==================== */}
                        <div>
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit"
                            >
                                Add Image
                            </label>

                            <input
                                id="file-upload"
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

                                        if (!allowedTypes.includes(file.type)) {
                                            setMessage("❌ مسموح ترفع صور فقط (PNG, JPG, JPEG, GIF)");
                                            setCategoryPhoto(null);
                                            return;
                                        }

                                        setCategoryPhoto(file); // ✅ ملف صحيح
                                        setMessage(""); // ✅ مسح الرسالة السابقة
                                    }
                                }

                                }
                                className="hidden"
                            />

                            {/* Preview photo */}
                            {categoryPhoto && (
                                <div className="mt-4">
                                    <div className="relative  w-[60%] h-[200px]  overflow-hidden border-2 border-gray-600 bg-gray-400 rounded-2xl">
                                        <Image
                                            src={URL.createObjectURL(categoryPhoto)}
                                            alt="photo"
                                            fill
                                            priority
                                            sizes="400px"
                                            className="object-contain"
                                        />
                                        {/* view button*/}
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="bg-gray-700/50 cursor-pointer text-white px-2 py-1 rounded hover:bg-gray-700/90 bottom-0 right-0 absolute"
                                        >
                                            <FaUpRightAndDownLeftFromCenter />

                                        </button>

                                        {/* delete button*/}
                                        <button
                                            onClick={() => setCategoryPhoto(null)}
                                            className="bg-red-600/50   rounded cursor-pointer text-white px-2 py-0 hover:bg-red-600/90 absolute top-0 right-0"
                                        >
                                            x
                                        </button>

                                    </div>
                                    {/* big Preview photo */}
                                    {showModal && categoryPhoto && (
                                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                            <div className="relative bg-white p-4 rounded-lg shadow-lg">
                                                <button
                                                    onClick={() => setShowModal(false)}
                                                    className="absolute top-2 right-2 cursor-pointer bg-red-600/70 text-white px-2 py-0 rounded hover:bg-red-600/90"
                                                >
                                                    x
                                                </button>
                                                <img
                                                    src={URL.createObjectURL(categoryPhoto)}
                                                    alt="Large Preview"
                                                    className="max-w-[90vw] max-h-[80vh] object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                        {/* =================================== */}

                        <p className="text-sm text-red-600 ">{message}</p>
                        <button onClick={(e) => { e.preventDefault();; handleSubmit() }} className="bg-slate-950 mx-auto hover:bg-slate-800 rounded-2xl py-1 px-3 cursor-pointer w-fit text-white font-sans"> submit</button>


                        <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
                    </div>
                </div>


            )}
        </>
    );
}