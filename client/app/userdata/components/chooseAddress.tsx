'use client'

import { useState } from "react";
import EditAddress from "./editAddress";

interface chooseAddressProps {
  clicked: boolean
  setClicked: (arg0: boolean) => void
  addresses: address[]
}

export default function ChooseAddress({ clicked, setClicked, addresses }: chooseAddressProps) {
  const deleteAddress = async (e: React.MouseEvent<HTMLButtonElement>, selectedAddressId: string) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteAddress/${selectedAddressId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
        return
      }
      alert('deleted successfully')
      window.location.reload()
    }
    catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const getAddressData = async (selectedAddressId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAddressById/${selectedAddressId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        alert('something went wrong')
      }

      const data = await res.json();
      setCurrentEditAddress(data.address)
      return data;
    } catch (error) {
      console.error('Error fetching address data:', error);
      throw error;
    }
  };

  const [currentEditAddress, setCurrentEditAddress] = useState<null | address>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<null | string>(null);
  const [editChosenAddress, setEditChosenAddress] = useState<boolean>(false);

  return (
    <>
      {clicked && (
        <div onClick={() => setClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl max-h-[90%] overflow-y-auto border border-slate-200 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-800">📍 Choose Address</h1>
              <button 
                onClick={() => setClicked(false)} 
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
              >
                ×
              </button>
            </div>

            {/* Addresses List */}
            <div className="space-y-4 mb-6">
              {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`p-6 border-2 rounded-xl transition cursor-pointer ${
                      selectedAddressId === address._id 
                        ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedAddressId(address._id)}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddressId === address._id}
                        onChange={() => setSelectedAddressId(address._id)}
                        className="mt-1 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p className="text-slate-700"><span className="font-semibold text-slate-800">Government:</span> {address.government}</p>
                          <p className="text-slate-700"><span className="font-semibold text-slate-800">City:</span> {address.city}</p>
                          <p className="text-slate-700"><span className="font-semibold text-slate-800">Area:</span> {address.area}</p>
                          <p className="text-slate-700"><span className="font-semibold text-slate-800">Street:</span> {address.street}</p>
                          <p className="text-slate-700"><span className="font-semibold text-slate-800">Building:</span> {address.buildingNumber.toString()}</p>
                          <p className="text-slate-700"><span className="font-semibold text-slate-800">Apartment:</span> {address.departmentNumber.toString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <h2 className="text-xl font-semibold text-slate-600">📭 No addresses found</h2>
                  <p className="text-slate-500 mt-2">Add your first address to get started</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={(e) => {
                  if (selectedAddressId !== null) deleteAddress(e, selectedAddressId);
                }}
                disabled={selectedAddressId === null}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
                  selectedAddressId !== null 
                    ? 'bg-red-500 hover:bg-red-600 cursor-pointer shadow-md' 
                    : 'bg-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                🗑️ Delete
              </button>
              
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (selectedAddressId !== null) {
                    await getAddressData(selectedAddressId);
                    setEditChosenAddress(true)
                  }
                }}
                disabled={selectedAddressId === null}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
                  selectedAddressId !== null 
                    ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer shadow-md' 
                    : 'bg-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                ✏️ Edit
              </button>
            </div>
          </div>

          {currentEditAddress && (
            <EditAddress
              clicked={editChosenAddress}
              setClicked={setEditChosenAddress}
              currentEditAddress={currentEditAddress}
              setCurrentEditAddress={setCurrentEditAddress}
            />
          )}
        </div>
      )}
    </>
  );
}