'use client'

import { useState } from "react";
import NewAddress from "./newAddress";
import ChooseAddress from "./chooseAddress";

interface userAddressesProps {
  addresses: address[]
}

export default function UserAddresses({ addresses }: userAddressesProps) {
  const [addAddress, setAddAddress] = useState<boolean>(false)
  const [editAddress, setEditAddress] = useState<boolean>(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          📍 My Addresses
        </h2>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
          {addresses.length} {addresses.length === 1 ? 'Address' : 'Addresses'}
        </span>
      </div>

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
            {addresses.map((address, index) => (
              <div 
                key={index} 
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">Gov:</span> {address.government}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">City:</span> {address.city}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">Area:</span> {address.area}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">Street:</span> {address.street}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">Building:</span> {address.buildingNumber.toString()}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-800">Apt:</span> {address.departmentNumber.toString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No addresses yet</h3>
            <p className="text-slate-500">Add your first address to get started with deliveries</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={() => setAddAddress(true)}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
        >
          ➕ Add New Address
        </button>
        
        {addresses.length > 0 && (
          <button
            onClick={() => setEditAddress(true)}
            className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition shadow-md flex items-center gap-2"
          >
            ✏️ Manage Addresses
          </button>
        )}
      </div>

      {/* Modals */}
      <NewAddress clicked={addAddress} setClicked={setAddAddress} />
      <ChooseAddress addresses={addresses} clicked={editAddress} setClicked={setEditAddress} />
    </div>
  );
}