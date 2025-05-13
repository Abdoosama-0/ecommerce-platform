'use client'
import React, { useEffect, useState } from 'react'


interface AddProps {
  currentPrice?: number;
  currentTitle?: string;
  currentDetails?: string;
  currentCategory?: string;
  currentImages?: string[];
  setEditClicked:(arg0:boolean)=> void
  editClicked:boolean
}

export default function EditProduct({setEditClicked,editClicked ,currentPrice, currentTitle, currentDetails, currentCategory, currentImages }: AddProps) {




  const url = "http://localhost:3000";
const [message, setMessage] = useState('')
  const [price, setPrice] = useState<number>(currentPrice || 0)
  const [title, setTitle] = useState(currentTitle || '')
  
  const [details, setDetails] = useState(currentDetails || '')
  const [category, setCategory] = useState(currentCategory || '')
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(currentImages || []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price?.toString() );
      formData.append("details", details);
      formData.append("category", category);
      formData.append("existingImages", JSON.stringify(existingImages));
      // أضف الصور الجديدة
      if (images) {
        images.forEach((file) => {
          formData.append("images", file);
        });
      }

     

      const path = window.location.pathname;
      const segments = path.split('/');
      const productId = segments[3];

      const res = await fetch(`${url}/admin/editProduct?id=${productId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
 

      if (!res.ok) {
      
        setMessage(data.message)
        
      } 
        alert("updated successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
      
    }
  };

  return (

    <>

        {editClicked && (
    
     <div onClick={() => setEditClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90">  {/* استخدم '/' لتحديد opacity مباشرة في Tailwind */}
      <form onSubmit={handleSubmit}  onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
              
    
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
            {/* صور موجودة */}
           
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`} className="relative w-24 h-24 border rounded overflow-hidden">

   

                <img src={url} alt={`existing ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...existingImages];
                    updated.splice(index, 1);
                    setExistingImages(updated);
                  }}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded-bl"
                >
                  ×
                </button>
              </div>
            ))}

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


        {/**error message */}
        {message&&
        <h1 className='text-red-600 text-sm'>{message}</h1>
        }
        {/* Submit */}
        <button
          type="submit"
          className="rounded-lg w-full bg-black text-red-50 font-bold py-2 px-4 hover:bg-gray-200 hover:text-black cursor-pointer transition"
        >
         update Product
        </button>
      </div>
 


        
      <button onClick={() => setEditClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
    </form>
</div>
      
      
    )}



 </> );
}
