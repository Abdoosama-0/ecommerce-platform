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
        {children}




      </body>
    </html>
  );
}
