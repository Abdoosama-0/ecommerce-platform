'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";


export default function AddProduct() {



  const router = useRouter();
  const url = "http://localhost:3000";

  const [price, setPrice] = useState<number>(0)
  const [title, setTitle] = useState( '')
  const [details, setDetails] = useState( '')
  const [category, setCategory] = useState( '')
  const [images, setImages] = useState<File[]>([]);
 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price?.toString() );
      formData.append("details", details);
      formData.append("category", category);
     
      
      if (images) {
        images.forEach((file) => {
          formData.append("images", file);
        });
      }

     

      const res = await fetch(`${url}/admin/addProduct`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
 

      if (res.ok) {
        alert(data?.message);
        window.location.reload();
      } else {
        alert(data?.message);
      }
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className= '  bg-white text-black fixed z-30 inset-0 m-auto rounded-lg w-[80%] h-[80%] overflow-hidden  flex flex-col gap-2'>
      <div className=' overflow-y-auto p-4 '>
        {/* Title */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='title'
          />
        </div>

        {/* Price */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>price:</label>
          <input
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='price'
          />
        </div>

        {/* Details */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>details:</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="rounded-lg w-[100%] p-2 border-2  h-40  resize-none  "
            placeholder="details"
          />
        </div>

        {/* Category */}
        <div className='p-1 w-full mb-4 flex flex-col gap-1'>
          <label className='w-fit'>category:</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            className='rounded-lg w-[100%] p-2 border-2'
            placeholder='category'
          />
        </div>
{/* ============================================================================================= */}
        {/* Images */}
        <div className="p-1 w-full mb-4 flex flex-col gap-2">
          <label>اختر الصور:</label>
      {/* كل الصور*/}
          <div className="flex flex-wrap gap-2">
          
            {/* صور جديدة */}
            {images.map((img, index) => (
              <div key={`new-${index}`} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={URL.createObjectURL(img)} alt={`new ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...images];
                    updated.splice(index, 1);
                    setImages(updated);
                  }}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded-bl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
{/* ============================================================================================= */}

          {/* زر اختيار الصور */}
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit"
          >اضافة صور </label>

          <input
            id="file-upload"
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setImages((prev) => [...prev, ...files]);
            }}
            className="hidden"
          />

        </div>
{/* ============================================================================================= */}
        {/* Submit */}
        <button
          type="submit"
          className="rounded-lg w-full bg-black text-red-50 font-bold py-2 px-4 hover:bg-gray-200 hover:text-black cursor-pointer transition"
        >
         add Product
        </button>
      </div>
    </form>
  );
}
