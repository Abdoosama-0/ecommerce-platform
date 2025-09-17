import type { Metadata } from "next";

import "./globals.css";
import Nav from "@/components/nav";



export const metadata: Metadata = {
  title: "muscular Store",
  description: "store for gym supplements",
  other: {
    "google-adsense-account": "ca-pub-4436694169822850"
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
