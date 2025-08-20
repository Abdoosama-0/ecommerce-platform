import React, { useState } from 'react'
import Image from 'next/image'
import { FaUpRightAndDownLeftFromCenter } from 'react-icons/fa6'
interface UpdateCategoryProps {
    selectedCategory: categoriesDetails
    setSelectedCategory: React.Dispatch<React.SetStateAction<categoriesDetails | null>>

}
const UpdateCategory = ({ selectedCategory, setSelectedCategory }: UpdateCategoryProps) => {
    const [clicked, setClicked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


    const [name, setName] = useState(selectedCategory.name)
    const [description, setDescription] = useState(selectedCategory.description)
    const [categoryPhoto, setCategoryPhoto] = useState<File | null>(null);

    const [showModal, setShowModal] = useState(false);
    const handleSubmit = async () => {
        try {
            if (!categoryPhoto && !selectedCategory.categoryPhoto) {
                setMessage('please provide a photo')
                return
            }


            const formData = new FormData();
            formData.append("name", name);

            formData.append("description", description);
            if (categoryPhoto)
                formData.append("categoryPhoto", categoryPhoto);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/category/${selectedCategory._id}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message);

                return;
            }
            setLoading(false)
            window.alert("Category updated successfully");
            window.location.reload();
        } catch (error) {
            setMessage('something went wrong please try again later');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }
    if (!selectedCategory) {
        return
    }
    return (<>
        {loading && (
            <div className='fixed flex items-center justify-center inset-0 z-100  bg-slate-950/50'>
                <div className='loader2'></div>
            </div>
        )}
        <button onClick={() => { setClicked(true) }} className='px-2 py-1 text-white bg-blue-900 hover:blue-800 cursor-pointer rounded-full'>Update Category</button>

        {clicked && (
            <div onClick={() => setClicked(false)} className="fixed inset-0 z-30 bg-slate-900/90 ">
                <div onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-40 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded h-fit">


                    <h1>update : {selectedCategory.name} data</h1>


                    <div>
                        <label >category Name</label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-gray-300 rounded-md p-2 w-full"
                            placeholder="category name"

                        />
                    </div>
                    <div>
                        <label htmlFor="categoryDescription">Category Description</label>
                        <textarea
                            id="categoryDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            accept="image/png, image/jpeg, image/jpg, image/gif ,image.avif"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/avif"];

                                    if (!allowedTypes.includes(file.type)) {
                                        setMessage("❌ مسموح ترفع صور فقط (PNG, JPG, JPEG, GIF,avif)");
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
                        {(categoryPhoto || selectedCategory.categoryPhoto) && (
                            <div onClick={(e) => { ; e.stopPropagation() }} className="mt-4">
                                <div onClick={(e) => { ; e.stopPropagation() }} className="relative  w-[30%] h-[200px]  overflow-hidden border-2 border-slate-300 bg-gray-100 rounded-2xl">
                                    <Image
                                        src={categoryPhoto ? (URL.createObjectURL(categoryPhoto)) : (selectedCategory.categoryPhoto)}
                                        alt="photo"
                                        fill
                                        priority
                                        sizes="400px"
                                        className="object-contain"
                                    />
                                    {/* view button*/}
                                    <button
                                        onClick={(e) => { setShowModal(true); e.stopPropagation() }}
                                        className="bg-gray-700/50 cursor-pointer text-white px-2 py-1 rounded hover:bg-gray-700/90 bottom-0 right-0 absolute"
                                    >
                                        <FaUpRightAndDownLeftFromCenter />

                                    </button>

                                    {/* delete button*/}
                                    <button
                                        onClick={() => {
                                            if (categoryPhoto) {
                                                setCategoryPhoto(null);
                                            } else {
                                                setSelectedCategory(prev =>
                                                    prev ? { ...prev, categoryPhoto: null } : prev
                                                );
                                            }

                                        }}
                                        className="bg-red-600/50   rounded cursor-pointer text-white px-2 py-0 hover:bg-red-600/90 absolute top-0 right-0"
                                    >
                                        x
                                    </button>

                                </div>
                                {/* big Preview photo */}
                                {showModal && (categoryPhoto || selectedCategory.categoryPhoto) && (
                                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                        <div className="relative bg-white p-4 rounded-lg shadow-lg">
                                            <button
                                                onClick={() => setShowModal(false)}
                                                className="absolute top-2 right-2 cursor-pointer bg-red-600/70 text-white px-2 py-0 rounded hover:bg-red-600/90"
                                            >
                                                x
                                            </button>
                                            <img
                                                src={categoryPhoto ? (URL.createObjectURL(categoryPhoto)) : (selectedCategory.categoryPhoto)}
                                                alt="Large Preview"
                                                className="max-w-[90vw] max-h-[80vh] object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )

                        }

                    </div>
                    {/* =================================== */}

                    <p className="text-sm text-red-600 ">{message}</p>
                    <button onClick={() => { handleSubmit(); setLoading(true) }} className="bg-slate-950 mx-auto hover:bg-slate-800 rounded-2xl py-1 px-3 cursor-pointer w-fit text-white font-sans"> submit</button>


                    <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
                </div>
            </div>
        )}
    </>
    )
}

export default UpdateCategory