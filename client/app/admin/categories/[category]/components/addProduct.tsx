'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import AddCategory from '../../components/addCtegory'
import DeleteCategory from '../../components/deleteCategory'
interface addProductProps {
  clicked: boolean
  setClicked: (arg0: boolean) => void
  currentCategory: string
}

export default function AddProduct({ clicked, setClicked, currentCategory }: addProductProps) {



  const [message, setMessage] = useState('')


  const [price, setPrice] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [category, setCategory] = useState(currentCategory)
  const [images, setImages] = useState<File[]>([]);
  const [quantity, setQuantity] = useState<number | null>(null)
  const [getCategoriesLoading, setGetCategoriesLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
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
      setGetCategoriesLoading(false)
    }
  }
  useEffect(() => {
    getCategories()

  }, [refresh])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!title.trim() || price === null || quantity === null || images.length === 0) {
      setMessage("All fields are required unless details .");
      return;
    }
    if (!category.trim()) {
      setMessage("category ? .");
      return;
    }
    try {

      const formData = new FormData();
      formData.append("title", title);
      formData.append("quantity", quantity.toString());
      formData.append("price", price.toString());
      formData.append("details", details);
      formData.append("category", category);


      if (images) {
        images.forEach((file) => {
          formData.append("images", file);
        });
      }



      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/addProduct`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();


      if (!res.ok) {

        setMessage(data.message)

        return
      }
      alert("added successfully");
      window.location.reload();
    } catch (err) {
      setMessage("something went wrong please try again later")
      console.log(err);

    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {clicked && (

        <div onClick={() => setClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90">
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
            {loading && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/70 rounded">
                <div className="loader3"></div>
              </div>
            )}
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
                value={price ?? ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
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
            {getCategoriesLoading ? (<div className='loader'></div>) : (<>
              {categoryDetails &&
                categoryDetails.length > 0 ? (<>


                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-slate-100  w-fit border-2 text-black border-slate-950 hover:bg-slate-200 px-2 text-lg py-1 rounded-lg cursor-pointer font-sans"
                  >
                    {
                      [...categoryDetails].reverse().map((s) => (
                        <option key={s._id} value={s.name} >
                          {s.name}
                        </option>
                      ))
                    }
                  </select>

                </>) : (<>
                  <p className='text-sm font-light text-neutral-700'>please add category first</p>
                </>)}
              <div className='flex gap-4'>
                <AddCategory setCurrentCategory={setCategory} setRefresh={setRefresh} />
                {categoryDetails && categoryDetails.length > 0 &&
                  (<DeleteCategory setCategoryDetails={setCategoryDetails} categoryDetails={categoryDetails} setRefresh={setRefresh} />)
                }


              </div>

            </>)}

            {/* quantity */}
            <div className='w-fit flex flex-col '>
              <label className='w-fit mb-1'>quantity:</label>
              <input
                value={quantity ?? ''}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                className='rounded-lg  p-2 border-2  w-[100px] '
                placeholder='quantity'
                min={0}
              />
            </div>

            {/* Images */}
            <div className="p-1 w-full mb-4 flex flex-col gap-2">
              <label> add photos</label>
              {/* all images*/}
              <div className="flex flex-wrap gap-2">

                {/* new images  */}
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


              {/* add images button*/}
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit"
              >add images </label>

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
            {message &&

              <h1 className='text-sm text-red-600'>{message}</h1>

            }


            {/* Submit */}
            <button
              type="submit"
              className="rounded-lg w-full bg-black text-red-50 font-bold py-2 px-4 hover:bg-gray-200 hover:text-black cursor-pointer transition"
            >
              add Product
            </button>



            <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
          </form>
        </div>


      )}





    </>

  );
}
