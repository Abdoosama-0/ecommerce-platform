'use client'


import Footer from "@/components/footer";
import Categories from "./Categories"
import Script from "next/script";






export default function Home() {

    return (
        <>
        <Categories/>
        <Footer/>
                <Script
          async
          src="https://a.magsrv.com/ad-provider.js"
          strategy="afterInteractive"
        />
        <ins className="ea56a97888e2" data-zoneid="5725036"></ins>
        <Script
          id="exoclick-init"
          strategy="afterInteractive"
        >{`
          (AdProvider = window.AdProvider || []).push({"serve": {}});
        `}
        </Script>




     
        </>
    );
}


