import React, { useState } from 'react'
import UpdateCategory from './updateCategory'

const ChooseCategory = () => {
    const [clicked,setClicked]= useState(false)
 
    const [message,setMessage]= useState('')
    const [selectedCategory,setSelectedCategory]= useState<categoriesDetails|null>(null)
    const [categoryDetails,setCategoryDetails]= useState<categoriesDetails[]|null>(null)
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
                console.log(data.categories)
            } catch (error) {
                setMessage('something went wrong please try again later');
                console.error('Error fetching data:', error);
            } 
        }
    
  return (<main>
    <button onClick={()=>{fetchCategories();setClicked(true)}} className='px-2 py-1 text-white bg-blue-900 hover:blue-800 cursor-pointer rounded-full'>UpdateCategory</button>

  {clicked && (
  
   
         <div onClick={() => {setClicked(false); }} className="fixed inset-0 z-10 bg-slate-900/90">  
      <div onClick={(e) => e.stopPropagation()}  className="absolute p-4 inset-0 m-auto z-20 flex flex-col gap-4 w-full h-fit md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
        
        <h1 className='text-2xl font-bold'>choose category</h1>

        {categoryDetails?.map((category) => (
    <label
      key={category._id}
      className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-gray-100"
    >
      <input
        type="radio"
        name="category"
        value={category._id}
        checked={selectedCategory?._id === category._id}
        onChange={() => setSelectedCategory(category)}
        className="form-radio text-blue-600"
      />
      <span>{category.name}</span>
    </label>
  ))}

  <h1 className='text-red-400'>{message}</h1>

{selectedCategory && (
  <UpdateCategory selectedCategory={selectedCategory}  setSelectedCategory={setSelectedCategory}/>
)}
    
     
      <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
    </div>
</div>


  )}

</main>
  )
}

export default ChooseCategory