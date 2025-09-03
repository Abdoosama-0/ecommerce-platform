"use client";

import { useEffect, useState } from "react";
import NewAddress from "@/app/userdata/components/newAddress";

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
    } catch (err) {
      console.log(err);
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
      alert("Added successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
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
      <div onClick={() => setClicked(false)} className="fixed inset-0 z-20 bg-slate-900/90">
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="mt-20 h-fit absolute inset-0 m-auto z-30 bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200 flex flex-col gap-4 max-h-[90%] overflow-y-auto"
          >
            {loading && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/70 rounded-2xl">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">🛒 Place Your Order</h1>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold text-slate-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                min={1}
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-semibold text-slate-700 mb-1">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              >
                <option value="cash on delivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Addresses */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Choose Address</label>
              <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                {addresses ? (
                  addresses.slice().reverse().map((address, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border border-slate-300 rounded-xl bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        onChange={() => setSelectedAddress(address)}
                        checked={selectedAddress?._id === address._id}
                        className="mr-2"
                      />
                      <label className="text-sm text-slate-700">
                        <p>
                          City: {address.city}, Government: {address.government}
                        </p>
                        <p>
                          Area: {address.area}, Street: {address.street}
                        </p>
                        <p>
                          Building: {String(address.buildingNumber)}, Dept: {String(address.departmentNumber)}
                        </p>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="bg-red-500 text-white font-medium p-2 rounded-xl text-center">
                    {getAddressesMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Add New Address Button */}
            <button
              type="button"
              onClick={() => setNewAddress(true)}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
            >
              Add New Address
            </button>

            {/* Total Price */}
            <div className="text-center text-lg font-semibold text-slate-800">
              Total Price: ${totalPrice}
            </div>

            {/* Error Message */}
            {message && (
              <div className="bg-red-500 text-white font-medium p-2 rounded-xl text-center">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
            >
              Submit Order
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setClicked(false)}
              className="absolute top-4 right-4 text-indigo-600 hover:text-indigo-800 text-2xl font-medium cursor-pointer"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      <NewAddress clicked={newAddress} setClicked={setNewAddress} />
    </>
  );
}