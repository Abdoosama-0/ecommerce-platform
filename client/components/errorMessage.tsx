interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex justify-center items-center  bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm shadow-xl border border-gray-300 rounded-2xl p-6 sm:p-10 flex justify-center items-center">
        <h1 className="text-gray-800 text-center text-sm   font-semibold tracking-wide">
          {message || ""}
        </h1>
      </div>
    </div>
  );
}
