'use client'

import { useState } from 'react';

interface newAddressProps {
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
  getAddresses?: () => void;
  clicked: boolean
  setClicked: (arg0: boolean) => void
}

export default function NewAddress({ setAdd, getAddresses, clicked, setClicked }: newAddressProps) {
  const [loading, setLoading] = useState(false)
  const [government, setGovernment] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [buildingNumber, setBuildingNumber] = useState<number>(0);
  const [departmentNumber, setDepartmentNumber] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          newAddress: {
            government,
            city,
            area,
            street,
            buildingNumber,
            departmentNumber
          }
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (setAdd && getAddresses) {
          setAdd(false);
          getAddresses();
        } else {
          alert('address added successfully')
          window.location.reload()
        }
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage('something went wrong please try again later')
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {clicked && (
        <div onClick={() => setClicked(false)} className="fixed inset-0 z-60 bg-slate-900/90 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl max-h-[90%] overflow-y-auto border border-slate-200 relative">
            
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-60 flex items-center justify-center bg-white/90 rounded-2xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-800">📍 Add New Address</h1>
              <button 
                onClick={() => setClicked(false)} 
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Government */}
              <div>
                <label htmlFor="government" className="block text-sm font-semibold text-slate-700 mb-1">Government</label>
                <input
                  id="government"
                  type="text"
                  value={government}
                  onChange={(e) => setGovernment(e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Government"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter City"
                  required
                />
              </div>

              {/* Area */}
              <div>
                <label htmlFor="area" className="block text-sm font-semibold text-slate-700 mb-1">Area</label>
                <input
                  id="area"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Area"
                  required
                />
              </div>

              {/* Street */}
              <div>
                <label htmlFor="street" className="block text-sm font-semibold text-slate-700 mb-1">Street</label>
                <input
                  id="street"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Street"
                  required
                />
              </div>

              {/* Building Number */}
              <div>
                <label htmlFor="buildingNumber" className="block text-sm font-semibold text-slate-700 mb-1">Building Number</label>
                <input
                  id="buildingNumber"
                  type="number"
                  value={buildingNumber || ''}
                  onChange={(e) => setBuildingNumber(Number(e.target.value))}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Building Number"
                  min={1}
                  required
                />
              </div>

              {/* Apartment Number */}
              <div>
                <label htmlFor="departmentNumber" className="block text-sm font-semibold text-slate-700 mb-1">Apartment Number</label>
                <input
                  id="departmentNumber"
                  type="number"
                  value={departmentNumber || ''}
                  onChange={(e) => setDepartmentNumber(Number(e.target.value))}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Apartment Number"
                  min={1}
                  required
                />
              </div>

              {/* Error Message */}
              {message && (
                <div className="bg-red-500 text-white font-medium p-3 rounded-xl text-center">
                  {message}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setClicked(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-300 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '⏳ Adding...' : '📍 Add Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}