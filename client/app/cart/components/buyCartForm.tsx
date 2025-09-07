'use client'
import { useEffect, useState } from "react";
import NewAddress from "@/app/userdata/components/newAddress";
import Loading from "@/components/loading";
import ErrorMessage from "@/components/errorMessage";

export default function BuyCartForm({ items, totalPrice, products, clearCart, clicked, setClicked }: BuyCartFormProps) {
  const [message, setMessage] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash on delivery");
  const [addresses, setAddresses] = useState<address[]>([]);
  const [newAdd, setNewAdd] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const getAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      
      if (res.ok) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      setMessage('something went wrong please try again later');
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[addresses.length - 1]);
    }
  }, [addresses]);

  const orderData = {
    products: items,
    address: selectedAddress ? {
      government: selectedAddress.government,
      city: selectedAddress.city,
      area: selectedAddress.area,
      street: selectedAddress.street,
      buildingNumber: selectedAddress.buildingNumber,
      departmentNumber: selectedAddress.departmentNumber
    } : {
      government: "",
      city: "",
      area: "",
      street: "",
      buildingNumber: "",
      departmentNumber: ""
    },
    paymentMethod: paymentMethod
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.message);
        return;
      }
      
      alert('Success! Your order has been placed successfully');
      clearCart();
      setClicked(false);
    } catch (error) {
      setMessage('something went wrong please try again later');
      console.error('Error submitting order:', error);
    } finally {
      setLoading(false);
    }
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
            className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200 relative"
          >
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-10 bg-white/80 flex items-center justify-center rounded-2xl">
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
              <h2 className="text-2xl font-bold text-center text-slate-800">🛒 Complete Your Order</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              
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
                  {addresses.slice().reverse().map((address, index) => (
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
                  ))}
                </div>
                
                <button 
                  type="button"
                  onClick={() => setNewAdd(true)}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + Add New Address
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">📋 Order Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Total Products: <strong>{products}</strong></span>
                  <span className="text-xl font-bold text-slate-800">
                    Total: <span className="text-blue-600">{totalPrice}EGP</span>
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

          <NewAddress clicked={newAdd} setClicked={setNewAdd} />
        </div>
      )}
    </>
  );
}