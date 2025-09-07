"use client";
import React, { useEffect } from "react";

//TypeScript
declare global {
  interface Window {
    fawaterkCheckout?: (config: any) => void;
    pluginConfig?: any;
  }
}

const Pay = () => {
  useEffect(() => {
    //load the script
    const script = document.createElement("script");
    script.src ="https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
    script.async = true;
    //when the script loaded
    script.onload = () => { 
      console.log("✅ Fawaterk script loaded");

      // put config in window
      window.pluginConfig = {
        envType: "test",
        hashKey:
          "0efa4c28562b6028eb3b7cd51d8d0f5fb1ee728b925df6dc6119afcdcd586ab4",
        style: {
          listing: "horizontal",
        },
        version: "0",
        requestBody: {
          cartTotal: "50",
          currency: "EGP",
          customer: {
            first_name: "test",
            last_name: "fawaterk",
            email: "test@fawaterk.com",
            phone: "0123456789",
            address: "test address",
          },
          redirectionUrls: {
            successUrl: "https://dev.fawaterk.com/success",
            failUrl: "https://dev.fawaterk.com/fail",
            pendingUrl: "https://dev.fawaterk.com/pending",
          },
          cartItems: [
            { name: "this is test oop 112252", price: "25", quantity: "1" },
            { name: "this is test oop 112252", price: "25", quantity: "1" },
          ],
          payLoad: {
            custom_field1: "xyz",
            custom_field2: "xyz2",
          },
        },
      };

      // call checkout
      if (window.fawaterkCheckout) {
        window.fawaterkCheckout(window.pluginConfig);
      } else {
        console.error("❌ fawaterkCheckout not found on window");
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
 
      <div id="fawaterkDivId"></div>
 
  );
};

export default Pay;
