import type { Metadata } from "next";

import "./globals.css";
import Nav from "@/components/nav";



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
                     <iframe
        src="https://a.magsrv.com/iframe.php?idzone=5725036&size=300x250"
        width="300"
        height="250"
        scrolling="no"
        marginWidth={0}
        marginHeight={0}
        frameBorder={0}
      ></iframe>
        {children}




      </body>
    </html>
  );
}
