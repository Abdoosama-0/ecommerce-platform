"use client";

import { useEffect, useState } from "react";
import NewAddress from "@/app/userdata/components/newAddress";
import Loading from "@/components/loading";
import ErrorMessage from "@/components/errorMessage";

interface address {
  _id: string;
  government: string;
  city: string;
  area: string;
  street: string;
  buildingNumber: string;
  departmentNumber: string;
}

interface BuyProps {
  productId: string;
  price: number;
  clicked: boolean;
  setClicked: (arg0: boolean) => void;
}

export default function BuyForm({ productId, price, clicked, setClicked }: BuyProps) {
  const [selectedAddress, setSelectedAddress] = useState<address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash on delivery");
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<address[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(quantity * price);
  const [message, setMessage] = useState("");
  const [getAddressesMessage, setGetAddressesMessage] = useState("");

  const getAddresses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      
      if (!res.ok) {
        setGetAddressesMessage(data.message);
        return;
      }
      
      setAddresses(data.addresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setGetAddressesMessage("Something went wrong, please try again later");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.message);
        return;
      }
      
      alert("Order placed successfully!");
      setClicked(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting order:', error);
      setMessage("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setSelectedAddress(addresses[addresses.length - 1]);
    }
  }, [addresses]);

  const orderData = {
    products: [
      {
        productId: productId,
        quantity: quantity,
      },
    ],
    address: selectedAddress
      ? {
          government: selectedAddress.government,
          city: selectedAddress.city,
          area: selectedAddress.area,
          street: selectedAddress.street,
          buildingNumber: selectedAddress.buildingNumber,
          departmentNumber: selectedAddress.departmentNumber,
        }
      : {
          government: "",
          city: "",
          area: "",
          street: "",
          buildingNumber: "",
          departmentNumber: "",
        },
    paymentMethod: paymentMethod,
  };

  return (
    <>
      {clicked && (
        <div 
          onClick={() => setClicked(false)} 
          className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-2xl rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden border border-slate-200 relative"
          >
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-50 bg-white/80 flex items-center justify-center rounded-2xl">
                <Loading />
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setClicked(false)}
              className="absolute top-4 right-4 z-20 text-slate-600 hover:text-slate-800 text-2xl font-bold transition-colors"
            >
              ×
            </button>

            {/* Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-200">
              <h1 className="text-3xl font-bold text-center text-slate-800">🛒 Place Your Order</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              
              {/* Quantity Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">📦 Quantity</h3>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min={1}
                  required
                />
              </div>

              {/* Payment Method Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">💳 Payment Method</h3>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg text-slate-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="cash on delivery">Cash on Delivery</option>
                </select>
              </div>

              {/* Address Selection Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">📍 Delivery Address</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {addresses ? (
                    addresses.slice().reverse().map((address, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <input 
                          type="radio" 
                          name="address" 
                          value={address._id}
                          onChange={() => setSelectedAddress(address)}
                          checked={selectedAddress?._id === address._id}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1 text-slate-700">
                          <p className="font-medium">
                            {address.city}, {address.government}
                          </p>
                          <p className="text-sm">
                            {address.area}, {address.street}
                          </p>
                          <p className="text-sm">
                            Building: {String(address.buildingNumber)}, Dept: {String(address.departmentNumber)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <ErrorMessage message={getAddressesMessage} />
                    </div>
                  )}
                </div>
                
                <button 
                  type="button"
                  onClick={() => setNewAddress(true)}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + Add New Address
                </button>
              </div>

              {/* Total Price Section */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">💰 Order Summary</h3>
                <div className="text-center">
                  <span className="text-2xl font-bold text-slate-800">
                    Total: <span className="text-green-600">{totalPrice}EGP</span>
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {message && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <ErrorMessage message={message} />
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading || !selectedAddress}
                className="w-full py-3 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}

      <NewAddress clicked={newAddress} setClicked={setNewAddress} />
    </>
  );
}