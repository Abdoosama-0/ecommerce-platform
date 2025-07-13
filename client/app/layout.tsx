import type { Metadata } from "next";

import "./globals.css";
import Nav from "@/components/nav";



export const metadata: Metadata = {
  title: "Abdo's Store",
  description: "store for Abdo's products",
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
