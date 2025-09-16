'use client'


import Footer from "@/components/footer";
import Categories from "./Categories"
import Script from "next/script";






export default function Home() {

    return (
        <>
        <Categories/>
        <Footer/>
             <iframe
        src="https://a.magsrv.com/iframe.php?idzone=5725036&size=300x250"
        width="300"
        height="250"
        scrolling="no"
        marginWidth={0}
        marginHeight={0}
        frameBorder={0}
      ></iframe>




     
        </>
    );
}


