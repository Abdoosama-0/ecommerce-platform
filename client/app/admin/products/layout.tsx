'use client'
import React, { use, useState } from 'react'
import { useRouter } from "next/navigation";


export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    type Product = {
        _id: string;
        title: string;
        price: number;
        details: string;
        category: string;
        __v: number;
      };
      
      type NewProduct = {
        message: string;
        product: Product;
      };

    const router = useRouter(); 
    const url = "http://localhost:3000";
     
    const [data,setData] = useState<NewProduct | null>(null)    
    const [clicked,setClicked] = useState(false)
    const [price,setPrice] = useState<number>()
    const [title,setTitle] = useState('')
    const [details,setDetails] = useState('')
    const [category,setCategory] = useState('') 
    const [images, setImages] = useState<FileList | null>(null); // <-- الصور هنا

     const [errorMessage, setErrorMessage] = useState(''); // <-- هنا بنخزن رسالة الخطأ
     

    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price?.toString() || "");
      formData.append("details", details);
      formData.append("category", category);

      if (images) {
        Array.from(images).forEach((file) => {
          formData.append("images", file); // لازم تكون نفس الاسم في multer.array('images')
        });
      }

      const res = await fetch(`${url}/admin/addProduct`, {
        method: 'POST',
        credentials: 'include',
        body: formData, // مفيش headers هنا علشان FormData يحطهم لوحده
      });

      const data = await res.json();

      if (res.ok) {
        alert('تمت الاضافة بنجاح');
        window.location.reload();
      } else {
        console.log(data.message);
        setErrorMessage(data.message || 'حدث خطأ');
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('حدث خطأ في الاتصال بالسيرفر');
    }
  };
      
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      > 

<div className='fixed right-10  z-50 bottom-10 w-fit h-fit rounded-2xl bg-gray-900 flex flex-col items-center justify-center'>
        <div onClick={() => setClicked(true)} className='py-2 px-4 text-white flex flex-col items-center justify-center cursor-pointer '>
            <h1>+</h1>

        </div>
     {clicked && 
     <>
     
     <div onClick={() => setClicked(false)} className='fixed z-10 top-0 left-0 w-full h-full bg-gray-900 opacity-90 flex items-center justify-center'> 
        </div>
   
            <form   onSubmit={handleSubmit} className=' fixed z-30 inset-0 m-auto  rounded-lg  w-[80%] h-[80%] overflow-hidden bg-white  flex flex-col  gap-2  '>
                <div className='overflow-y-auto  p-4'>
                <div className='p-1  w-full mb-4  flex flex-col gap-1 '>
                <label htmlFor="" className=' w-fit '>title:</label>
                <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" className='rounded-lg w-[100%] p-2 border-2' placeholder='title'/>
                </div>
                <div className='p-1  w-full mb-4 b flex flex-col gap-1 '>
                <label htmlFor="" className=' w-fit '>price:</label>
                <input 
                 value={price}
                 onChange={(e) => setPrice(parseInt(e.target.value))}
                type="text" className='rounded-lg w-[100%] p-2 border-2' placeholder='price'/>
                </div>
                <div className='p-1  w-full mb-4 b flex flex-col gap-1 '>
                <label htmlFor="" className=' w-fit '>details:</label>
                <textarea
                 value={details}
                 onChange={(e) => setDetails(e.target.value)}
                            className="rounded-lg border-2 h-40 w-full resize-none overflow-auto p-2"
                            placeholder="details"
                            />
                </div>
                <div className='p-1  w-full mb-4 b flex flex-col gap-1 '>
                <label htmlFor="" className=' w-fit '>category:</label>
                <input 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                type="text" className='rounded-lg w-[100%] p-2 border-2 ' placeholder='category'/>
                </div>
                <div className="p-1 w-full mb-4 flex flex-col gap-1">
                      <label >اختر الصور:</label>

                      {/* إظهار اسم الصور المختارة */}
                      {images && <p className="text-sm text-gray-600">{images.length} صورة/صور تم اختيارها</p>}

                      {/* الزر المخصص */}
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-fit"
                      >
                        اختيار الصور
                      </label>

                      {/* الإيمبوت نفسه مخفي */}
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="hidden"
                      />
                </div>

                <button
            type="submit"
            className=" rounded-lg  w-full bg-black text-red-50 font-bold py-2 px-4  hover:bg-gray-200 hover:text-black cursor-pointer transition "
          > 
   
            add Product
          </button>
          </div>
            </form>

        
            </>  }

    </div>




        {children}
      </body>
    </html>
  );
}
