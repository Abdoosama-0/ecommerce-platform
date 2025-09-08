"use client";
import React, { useEffect, useState } from "react";

//TypeScript
declare global {
  interface Window {
    fawaterkCheckout?: (config: unknown) => void;
    pluginConfig?: unknown;
  }
}
interface ProductOrder {
  productId: string; // أو number حسب نوع الـ productId عندك
  quantity: number;
}

interface Address {
  government: string;
  city: string;
  area: string;
  street: string;
  buildingNumber: string;
  departmentNumber: string;
}

interface PayOrder {
  products: ProductOrder[];
  address: Address;
  paymentMethod: string; // ممكن تحدد نوع تاني لو عندك enum مثلاً
  totalPrice: number;
}

const Pay = () => {
  const [orderDetails, setOrderDetails] = useState<PayOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل بيانات الطلب من localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("buyCart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrderDetails(parsed);
      } else {
        console.warn("لا توجد بيانات في السلة");
        setOrderDetails(null);
      }
    } catch (error) {
      console.error("خطأ في تحليل بيانات السلة:", error);
      setOrderDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // تحميل Fawaterk script عند توفر بيانات الطلب
  useEffect(() => {
    if (!orderDetails || !orderDetails.totalPrice) {
      return;
    }

    //load the script
    const script = document.createElement("script");
    script.src = "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
    script.async = true;

    //when the script loaded
    script.onload = () => { 
      console.log("✅ Fawaterk script loaded");

      // put config in window
      window.pluginConfig = {
        envType: "test",
        hashKey: "0efa4c28562b6028eb3b7cd51d8d0f5fb1ee728b925df6dc6119afcdcd586ab4",
        style: {
          listing: "horizontal",
        },
        version: "0",
        requestBody: {
          cartTotal: orderDetails.totalPrice,
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
            { 
              name: "this is test oop 112252", 
              price: orderDetails.totalPrice, 
              quantity: "1" 
            },
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
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [orderDetails]);

  // شاشة التحميل
  if (isLoading) {
    return (
      <div className="flex flex-col p-5 gap-5">
        <div className="flex items-center justify-center h-64">
          <p>جاري تحميل بيانات الطلب...</p>
        </div>
      </div>
    );
  }

  // التحقق من وجود بيانات صحيحة
  if (!orderDetails) {
    return (
      <div className="flex flex-col p-5 gap-5">
        <div className="flex items-center justify-center h-64">
          <p>لا توجد بيانات طلب. يرجى العودة إلى السلة.</p>
        </div>
      </div>
    );
  }

  // التحقق من وجود المنتجات
  const hasProducts = orderDetails.products && Array.isArray(orderDetails.products) && orderDetails.products.length > 0;
  const hasAddress = orderDetails.address && orderDetails.address.city;

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="flex flex-col gap-3">
        <h1>طلبك</h1>
        
        {hasProducts ? (
          <>
            <span>معرف المنتج: {orderDetails.products[0].productId}</span>
            <span>الكمية: {orderDetails.products[0].quantity}</span>
          </>
        ) : (
          <span>لا توجد منتجات في الطلب</span>
        )}
        
        {hasAddress ? (
          <span>المدينة: {orderDetails.address.city}</span>
        ) : (
          <span>لم يتم تحديد العنوان</span>
        )}
        
        <span>إجمالي السعر: {orderDetails.totalPrice || 0} جنيه</span>
      </div>

      <div id="fawaterkDivId"></div>
    </div>
  );
};

export default Pay;