'use client'



interface UserMainDataProps {
setClicked: (arg0:boolean)=> void
clicked: boolean
data:userData
setData:(arg0:any)=> void
}

export default function  UpdateUserData({setClicked,clicked,data,setData}:UserMainDataProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }
    const updateData = async () => {

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/UpdateUserData`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            name: data.name,
            phone: data.phone
          }),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          alert('فشل التحديث');
          return;
        }
  
        alert('تم التحديث بنجاح');
        window.location.reload()
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  return (
    
<> 
{clicked &&
<div onClick={() => setClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90 ">


      <form  onClick={(e) => e.stopPropagation()} className="absolute inset-0 p-4 m-auto z-20 flex flex-col gap-4 w-full md:w-[75%] max-h-[90%] overflow-y-auto bg-white rounded">
            <div>
               <label>الاسم الكامل:</label>
               <input type="text" name="name" value={data.name} onChange={(e) => handleChange(e)}  className="border p-2 w-full" />
             </div>
             <div>
               <label>اسم المستخدم:</label>
               <input type="text" name="username" value={data.username}  onChange={(e) => handleChange(e)}  className="border p-2 w-full" />
             </div>
             <div>
               <label>البريد الإلكتروني:</label>
               <input type="email" name="email" value={data.email}  onChange={(e) => handleChange(e)}   className="border p-2 w-full" />
             </div>
             <div>
               <label>رقم الهاتف:</label>
               <input type="text" name="phone" value={data.phone}  onChange={(e) => handleChange(e)}  className="border p-2 w-full" />
             </div>
          <div className=" flex justify-center">
             <button onClick={updateData} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              update
             </button>
             </div>


      <button onClick={() => setClicked(false)} className="absolute cursor-pointer top-3 right-6 text-gray-700 hover:opacity-70 text-lg font-bold">×</button>
   
    </form>


</div>

  }</>

  );
}