'use client'
import React, { useState } from 'react'
import Image from 'next/image'


interface AddProps {
  currentPrice?: number;
  currentTitle?: string;
  currentDetails?: string;
  currentCategory?: string;
  currentImages?: string[];
  setEditClicked: (arg0: boolean) => void
  editClicked: boolean
}

export default function EditProduct({ setEditClicked, editClicked, currentPrice, currentTitle, currentDetails, currentCategory, currentImages }: AddProps) {





  const [message, setMessage] = useState('')
  const [price, setPrice] = useState<number>(currentPrice || 0)
  const [title, setTitle] = useState(currentTitle || '')
 const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(currentDetails || '')
  const [category, setCategory] = useState(currentCategory || '')
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(currentImages || []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
setLoading(true)
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price?.toString());
      formData.append("details", details);
      formData.append("category", category);
      formData.append("existingImages", JSON.stringify(existingImages));

      if (images) {
        images.forEach((file) => {
          formData.append("images", file);
        });
      }



      const path = window.location.pathname;
      const segments = path.split('/');
      const productId = segments[4];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/editProduct?id=${productId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();


      if (!res.ok) {
        setMessage(data.message)
        return
      }


      alert("updated successfully");
      window.location.reload();
    } catch (err) {
      setMessage('something went wrong please try again later')
      console.log(err);

    }finally {
      setLoading(false)
    }
  };

  return (

    <>

      {editClicked && (

        <div onClick={() => setEditClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90">
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[80%] overflow-y-auto bg-white rounded h-fit">

            {loading && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/70 rounded">
                <div className="loader3"></div>
              </div>
            )}
            <div className='  '>
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

              {/* Images */}
              <div className="p-1 w-full mb-4 flex flex-col gap-2">
                <label>Images: </label>
                {/*all photos */}
                <div className="flex flex-wrap gap-2">
                  {/* existingImages*/}

                  {existingImages.map((url, index) => (
                    <div key={index} className=" h-auto aspect-[1/1] w-[100%] sm:w-[20%] max-w-[40%] border-2 border-gray-300 bg-white relative rounded-xl overflow-hidden">
                      <Image
                        src={url || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                        alt={index.toString() || 'No title available'}
                        fill
                        priority
                        className="   object-contain "
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...existingImages];
                          updated.splice(index, 1);
                          setExistingImages(updated);
                        }}
                        className="absolute top-0 right-0 bg-red-600 hover:bg-red-800 cursor-pointer text-white text-xs px-1 py-0.5 rounded-bl"
                      >
                        ×
                      </button>
                    </div>

                  ))}

                  {/* new images*/}
                  {images.map((img, index) => (
                    <div key={index} className=" h-auto aspect-[1/1] w-[100%] sm:w-[20%] max-w-[40%] border-2 border-gray-300 bg-white relative rounded-xl overflow-hidden">
                      <Image
                        src={URL.createObjectURL(img) || `https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg`}
                        alt={index.toString() || 'No title available'}
                        fill
                        priority
                        className="   object-contain "
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...images];
                          updated.splice(index, 1);
                          setImages(updated);
                        }}
                        className="absolute top-0 right-0 bg-red-600 hover:bg-red-800 cursor-pointer text-white text-xs px-1 py-0.5 rounded-bl"
                      >
                        ×
                      </button>
                    </div>

                  ))}
                </div>


                {/*   add photos button */}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit"
                >add photos</label>

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
              {message &&
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



    </>);
}
