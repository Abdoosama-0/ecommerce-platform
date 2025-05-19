import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "@/animations/Animation - 1747617713528.json";

export default function Loading() {
  return (
    <main className="h-screen">
      <div className="m-auto flex justify-center items-center rounded-lg h-[80%] w-[80%] bg-transparent">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-[15rem] h-[15rem] text-black"
        />
      </div>
    </main>
  );
}
