interface errorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: errorMessageProps) {
    return (
      
               <div className='flex justify-center items-start h-screen mt-5'>
        <div className='w-[97%] md:w-[80%] h-[70%]    bg-gray-200 shadow-2xl border-2 border-slate-400 shadow-gray-400 rounded-lg flex justify-center items-center p-4'>
          <h1 className="text-black text-2xl font-[fantasy] sm:text-4xl md:text-5xl">{message ? message :""}</h1>

        </div>

      </div>
       
  
    );
  }

      //     <div className='flex justify-center items-center h-screen'>
      //   <div className='w-[97%] md:w-[80%] h-[60%]  font-bold text-xl md:text-2xl text-red-600 bg-gray-200 shadow-2xl border-2 border-red-400 shadow-gray-400 rounded-lg flex justify-center items-center p-4'>
      //     <h1>{message ? message :""}</h1>

      //   </div>

      // </div>