

import Footer from "@/components/footer";
import Categories from "./Categories"


declare global {
  interface Window {
    AdProvider?: any;
  }
}


export default function Home() {




    return (
        <>





        <Categories/>
        <Footer/>





     
        </>
    );
}


