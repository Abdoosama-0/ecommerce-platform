'use client';
import { useEffect, useState } from "react";
import EditProduct from "@/components/updateProduct";
import Loading from "@/components/loading";
import Auth from "@/components/auth";
import Images from "@/components/images";
import NewAddress from "@/components/newAddress";

export default function Product() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string >("");

  type data={
    imageUrls: string[];
    // حسب شكل المنتج في قاعدة البيانات
    _id: string;
    title: string;
    details: string;
    price: number;
    category: string;
    // ضيف باقي الخصائص لو فيه أكتر
  }
const [data, setData] = useState<data | null>(null); 
const [edit,setEdit]=useState(false)


useEffect(() => {
  const path = window.location.pathname;
const segments = path.split('/');
const productId = segments[1]; 
console.log(productId)
const fetchData = async () => {
    try {
    const res = await fetch(`http://localhost:3000/product?id=${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await res.json();
   
    if (!res.ok) {
        setMessage(data.message)
      
   
    } 
    else {
     
      setData(data); 
    }
    
    setLoading(false)
  }catch (error) {
    setLoading(false)
    console.error('Error fetching data:', error);
  }}

  fetchData();
}, []); 





useEffect(() => {
  console.log("productId");
  console.log(productId);

  console.log("productId");
}, []);
const url="http://localhost:3000"
type address={
  government: string,
 city:string,
  area :string,
  street: string,
  buildingNumber: string,
  departmentNumber: string,
  _id:string
}


const [addresses,setAddresses]= useState<address[]>([])
const getAddresses = async()=>{
  try{
    const res =await fetch(`${url}/addresses` ,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
      credentials: 'include',
      
    
    })
    const data = await res.json();
    if (res.ok) {
      setAddresses(data.addresses);
    }

  }
  catch(err){
    console.log(err)
  }
}
const [clicked,setClicked]=useState<boolean |null>(null)
const [add,setAdd]=useState<boolean >(false)


const [selectedAddress,setSelectedAddress] =useState<address | null>(null)
useEffect(() => {
  if (addresses.length > 0) {
    setSelectedAddress(addresses[addresses.length - 1]); // تعيين آخر عنوان كـ "راديو" افتراضي
  }
}, [addresses]);
const path = window.location.pathname;
const segments = path.split('/');
const productId = segments[1];
const [quantity,setQuantity]=useState<number>(1)
const [paymentMethod,setPaymentMethod]=useState<string>("cash on delivery")
const orderData = {
  products: [
    {
      productId: productId, // استخدام productId المستخرج من المسار
      quantity: quantity     // استخدام الكمية المدخلة
    }
  ],
  address: selectedAddress ? {
    government: selectedAddress.government,
    city: selectedAddress.city,
    area: selectedAddress.area,
    street: selectedAddress.street,
    buildingNumber: selectedAddress.buildingNumber,
    departmentNumber: selectedAddress.departmentNumber
  } : {
    government: "",
    city: "",
    area: "",
    street: "",
    buildingNumber: "",
    departmentNumber: ""
  },
  paymentMethod: paymentMethod // استخدام paymentMethod المدخل
};
const handleSubmit = async(e: React.FormEvent)=>{
  e.preventDefault();

  try{
    const res =await fetch(`${url}/order` ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     
      credentials: 'include',
      body:JSON.stringify(orderData),
    
    })
    if(res.ok){
      alert('success')
      window.location.reload()
    }
    else{
      alert('failed')
    }

  }
  catch(err){
    console.log(err)
  }
}
    return (
<main className="">

  {loading ? (<><Loading/></>):(<>

    
       {/* =============================part 1 (edit)=================================== */}
    
  <div className="bg-gray-700 min-h-screen w-full flex flex-col p-4 text-3xl text-white font-bold ">
        {/* =================================first elment=============================== */}
          <div className="flex flex-col md:flex-row   items-center gap-4 mb-4">
              <div className=""><span className="text-sm">name:</span> <span>{data?.title}</span></div> 
              <div className=""><span className="text-sm">price:</span> <span>{data?.price} EGP</span></div> 
              <div className=""><span className="text-sm">category:</span> <span>{data?.category}</span></div> 
          </div>
        {/* =============================second element=================================== */}

  <div className="flex flex-col  gap-2  ">
  <div className="flex flex-col gap-2 md:flex-row justify-center md:justify-start  border-2 p-2 ">
  {/* صورة بحجمها الطبيعي */}
  <div className="w-full md:w-[60%] ">
  <Images  imageUrls={data?.imageUrls} />
  </div>

  <div className=" border-2 p-2 flex flex-col  w-full md:w-[40%] gap-2">
      <button  onClick={()=>{setClicked(true) ; getAddresses()}} className="cursor-pointer w-full p-2 bg-slate-800 rounded-2xl hover:opacity-50">buy</button>
      <button className="cursor-pointer w-full p-2 bg-slate-800 rounded-2xl hover:opacity-50">add to cart</button>
   
  </div>
</div>

          <div className="w-full md:w-[40%]  rounded-xl p-4 mt-4">
              <h2 className="text-sm mb-2">Details:</h2>
              <p className="text-xl whitespace-pre-wrap">{data?.details}</p>

          </div>
        
  </div>
       
         
       
  </div>


      
</>) }
{clicked&&(
  <>
  <div onClick={()=>{setClicked(false)}} className=" fixed inset-0 bg-slate-900 opacity-90 z-40 ">

  </div>

  <form onSubmit={handleSubmit}  className= '  bg-white text-black fixed z-50 inset-0 m-auto rounded-lg w-[80%] h-[80%] overflow-hidden  flex flex-col gap-2'>
  <div className=' overflow-y-auto p-4 '>
  <label className="block mb-2 text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded-lg text-black mb-2"
        >
          <option value="cash on delivery">Cash on Delivery</option>
         
        </select>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          choose address
        </label>
        <div className="flex flex-col gap-2 w-full p-2 text-black max-h-80  overflow-y-auto">
  {addresses.slice().reverse().map((address, index)=> (
    <div
      key={index}
      className="flex flex-row justify-between items-center w-full p-2 border rounded-lg bg-gray-50"
    >
      <div>
      <input
              type="radio"
              name="address"
              value={address._id} // يمكن استخدام `address.id` أو أي قيمة فريدة
              onChange={() => setSelectedAddress(address)} // تعيين العنوان المحدد
              checked={selectedAddress?._id === address._id} // تحقق من العنوان المحدد
            />
            <label className="ml-2">
              <p>City: {address.city}, Government: {address.government}</p>
              <p>Area: {address.area}, Street: {address.street}</p>
              <p>Building: {address.buildingNumber}, Dept: {address.departmentNumber}</p>
            </label>
      </div>
    </div>
  ))}
  <button onClick={(e)=>{e.preventDefault();setAdd(true) }} className="mx-auto py-1  hover:opacity-50  px-2 rounded-2xl bg-amber-600 cursor-pointer">add new address</button>
</div>

          
  </div>

<button  type="submit" className="mx-auto rounded-2xl py-1 px-2 bg-amber-600 hover:opacity-50 cursor-pointer w-[40%]">submit</button>
    </form>
  </>)}

  {add&&(
  <>
  <div onClick={()=>{setAdd(false)}} className=" fixed inset-0 bg-slate-900 opacity-90 z-[60] ">

  </div>
  
  <NewAddress setAdd={setAdd} getAddresses={getAddresses} />



  </>
  )}

</main>
  
    );
  }
