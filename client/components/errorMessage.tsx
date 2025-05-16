interface errorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: errorMessageProps) {
    return (
        <div className='flex justify-center items-center h-screen'>
        <div className='w-[97%] md:w-[80%] h-[60%]  font-bold text-xl md:text-2xl text-red-600 bg-gray-200 shadow-2xl border-2 border-red-400 shadow-gray-400 rounded-lg flex justify-center items-center p-4'>
          <h1>{message ? message :""}</h1>

        </div>

      </div>
  
    );
  }