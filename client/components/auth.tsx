interface AuthProps {
    error: string;
}

export default function Auth({ error }: AuthProps) {
    return (
        <div className='flex justify-center items-center h-screen'>
        <div className='w-full sm:w-[80%] h-[60%] text-3xl text-white bg-red-600 rounded-lg flex justify-center items-center p-4'>
          <h1>{error ? error :" "}</h1>

        </div>

      </div>
  
    );
  }