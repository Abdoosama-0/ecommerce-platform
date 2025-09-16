import type { Metadata } from "next";

import "./globals.css";
import Nav from "@/components/nav";

import Script from "next/script";


export const metadata: Metadata = {
  title: "muscular Store",
  description: "store for gym supplements",
  other: {
    "6a97888e-site-verification": "673dff43759a9f5951315b4f66201ccf"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={` antialiased `}
      >
        <Nav />
        {children}
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



      </body>
    </html>
  );
}
