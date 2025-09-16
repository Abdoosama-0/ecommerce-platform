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

        {/* ExoClick Banner Zone */}
        <script
          async
          type="application/javascript"
          src="https://a.magsrv.com/ad-provider.js"
        ></script>
        <ins className="ea56a97888e2" data-zoneid="5725036"></ins>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (AdProvider = window.AdProvider || []).push({"serve": {}});
            `,
          }}
        />
      </body>
    </html>
  );
}
