

'use client'



interface editAddressProps {
clicked:boolean
setClicked:(arg0:boolean)=> void
currentEditAddress:address
setCurrentEditAddress:(arg0:address)=>void


}

export default function  EditAddress({currentEditAddress,setCurrentEditAddress,setClicked,clicked }:editAddressProps) {
  const updateAddress =async (e: React.MouseEvent<HTMLButtonElement>,currentEditAddress:address,selectedAddressID:string) => {
 e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateAddress/${selectedAddressID}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ currentEditAddress}),
      })
      const data = await res.json()
      
  if(!res.ok){
    alert(data.message)
    return
  }
  alert('updated successfully')
  window.location.reload()
  
  
  }
  catch (error) {
  
    console.log('Error fetching data:', error);
    
     
  }
  }
  
  return (
    <>
    {clicked && (
    
     <div onClick={() => setClicked(false)} className="fixed inset-0 z-30 bg-slate-900/90">  {/* استخدم '/' لتحديد opacity مباشرة في Tailwind */}
      <form  onClick={(e) => e.stopPropagation()} className="absolute p-4 inset-0 m-auto z-40 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
                    {/* Government */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Government:</label>
    <input
      value={currentEditAddress?.government || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          government: e.target.value,
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || 0,
          departmentNumber: currentEditAddress?.departmentNumber || 0,
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Government"
    />
  </div>

  {/* City */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">City:</label>
    <input
      value={currentEditAddress?.city || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          city: e.target.value,
          government: currentEditAddress?.government || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || 0,
          departmentNumber: currentEditAddress?.departmentNumber || 0,
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter City"
    />
  </div>

  {/* Area */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Area:</label>
    <input
      value={currentEditAddress?.area || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          area: e.target.value,
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || 0,
          departmentNumber: currentEditAddress?.departmentNumber || 0,
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Area"
    />
  </div>

  {/* Street */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Street:</label>
    <input
      value={currentEditAddress?.street || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          street: e.target.value,
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          buildingNumber: currentEditAddress?.buildingNumber || 0,
          departmentNumber: currentEditAddress?.departmentNumber || 0,
          _id: currentEditAddress?._id || "",
        })
      }
      type="text"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Street"
    />
  </div>

  {/* Building Number */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Building Number:</label>
    <input
      value={Number(currentEditAddress?.buildingNumber) || ""}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          buildingNumber: Number(e.target.value),
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          departmentNumber: currentEditAddress?.departmentNumber || 0,
          _id: currentEditAddress?._id || "",
        })
      }
      type="number"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Building Number"
    />
  </div>

  {/* Department Number */}
  <div className="p-1 w-full mb-4 flex flex-col gap-1">
    <label className="w-fit">Department Number:</label>
    <input
      value={Number(currentEditAddress?.departmentNumber) || 0}
      onChange={(e) =>
        setCurrentEditAddress({
          ...currentEditAddress,
          departmentNumber: Number(e.target.value),
          government: currentEditAddress?.government || "",
          city: currentEditAddress?.city || "",
          area: currentEditAddress?.area || "",
          street: currentEditAddress?.street || "",
          buildingNumber: currentEditAddress?.buildingNumber || 0,
          _id: currentEditAddress?._id || "",
        })
      }
      type="number"
      className="rounded-lg w-[100%] p-2 border-2"
      placeholder="Enter Department Number"
    />
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
    <button
      onClick={(e) => {
        // Call update address API or function here

        updateAddress(e,currentEditAddress ,currentEditAddress._id );
      }}
      className="w-[100%] py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
    >
      Update Address
    </button>
  </div>

        
      <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
    </form>
</div>
      
      
    )}



    </>

  );
}







