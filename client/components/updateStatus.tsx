'use client'

interface AddProps {
    currentStatus?: string;
  
    
    }
export default function UpdateStatus({ currentStatus }: AddProps) {
    const url = "http://localhost:3000";
    const path = window.location.pathname;
    const segments = path.split('/');
    const orderId = segments[3];
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newStatus = formData.get('choice') as string;
      
        // تأكد أن newStatus موجود
        if (!newStatus) {
          console.error('No status selected!');
          return;
        }
      

        try {
          const response = await fetch(`${url}/admin/updateOrderStatus?id=${orderId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
           
            credentials: 'include',
            body:JSON.stringify({ status: newStatus }),
          }
        );
          console.log('==========================================================');
          console.log('Response:', response.json());
          console.log('==========================================================');
          if (response.ok) {
            alert('Status updated successfully!');
            window.location.reload(); // إعادة تحميل الصفحة بعد التحديث
            

            }
            else {
                alert('Failed to update status!');
                console.error('Failed to update status:', response.statusText);
              
                }
      
        } catch (error) {
          console.error('Error sending request:', error);
        }
      };
      
    

  return (
    <form onSubmit={handleSubmit} className= ' p-10 bg-white text-black fixed z-30 inset-0 m-auto rounded-lg w-fit sm:w-[80%] md:w-[60%] h-fit  overflow-hidden  flex flex-col gap-2'>
       <h1 className="mb-8" >choose status:</h1>
            <div className="flex flex-col sm:flex-row  items-center justify-around ">
                <div>
                    <label htmlFor="pending">pending </label>
                    <input type="radio" id="pending" name="choice" value="pending" defaultChecked={currentStatus === 'pending'} />
                </div>

                <div>
                    <label htmlFor="shipped">shipped </label>
                    <input type="radio" id="shipped" name="choice" value="shipped" defaultChecked={currentStatus === 'shipped'}/>
                </div>

                <div>
                    <label htmlFor="delivered">delivered </label>
                    <input type="radio" id="delivered" name="choice" value="delivered" defaultChecked={currentStatus === 'delivered'}/>
                </div>

                <div>
                    <label htmlFor="cancelled">cancelled </label>
                    <input type="radio" id="cancelled" name="choice" value="cancelled" defaultChecked={currentStatus === 'cancelled'}/>
                </div>

            </div> 
            <button
          type="submit"
          className=" rounded-lg w-full bg-black text-red-50 font-bold py-2 px-4 hover:bg-gray-200 hover:text-black cursor-pointer transition"
        >
         update status
        </button>
  
  </form>
  );
}


/**
      <h1 className="mb-8" >choose status:</h1>
            <div className="flex  items-center justify-between px-6 ">
                <div>
                    <label htmlFor="pending">pending</label>
                    <input type="radio" id="pending" name="choice" value="pending" />
                </div>

                <div>
                    <label htmlFor="shipped">shipped</label>
                    <input type="radio" id="shipped" name="choice" value="shipped" />
                </div>

                <div>
                    <label htmlFor="delivered">delivered</label>
                    <input type="radio" id="delivered" name="choice" value="delivered" />
                </div>

                <div>
                    <label htmlFor="cancelled">cancelled</label>
                    <input type="radio" id="cancelled" name="choice" value="cancelled" />
                </div>

            </div> 












 */
