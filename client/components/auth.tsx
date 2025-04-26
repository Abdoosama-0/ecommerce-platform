interface AuthProps {
    error: string;
}

export default function Auth({ error }: AuthProps) {
    return (
        <div className='flex justify-center items-center h-screen'>
        <div className='w-[80%] h-[80%] text-3xl text-white bg-red-600 rounded-lg flex justify-center items-center'>
          <h1>{error ? error :" "}</h1>

        </div>

      </div>
  
    );
  }