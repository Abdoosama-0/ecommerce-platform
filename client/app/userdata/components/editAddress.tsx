'use client'

interface editAddressProps {
  clicked: boolean
  setClicked: (arg0: boolean) => void
  currentEditAddress: address
  setCurrentEditAddress: (arg0: address) => void
}

export default function EditAddress({ currentEditAddress, setCurrentEditAddress, setClicked, clicked }: editAddressProps) {
  const updateAddress = async (e: React.MouseEvent<HTMLButtonElement>, currentEditAddress: address, selectedAddressID: string) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateAddress/${selectedAddressID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ currentEditAddress }),
      })
      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }
      alert('updated successfully')
      window.location.reload()
    }
    catch (error) {
      console.log('Error fetching data:', error);
    }
  }

  const updateField = (field: string, value: string | number) => {
    setCurrentEditAddress({
      ...currentEditAddress,
      [field]: value,
    });
  }

  return (
    <>
      {clicked && (
        <div onClick={() => setClicked(false)} className="fixed inset-0 z-30 bg-slate-900/90 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl max-h-[90%] overflow-y-auto border border-slate-200 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-800">✏️ Edit Address</h1>
              <button 
                onClick={() => setClicked(false)} 
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              {/* Government */}
              <div>
                <label htmlFor="government" className="block text-sm font-semibold text-slate-700 mb-1">Government</label>
                <input
                  id="government"
                  type="text"
                  value={currentEditAddress?.government || ""}
                  onChange={(e) => updateField('government', e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Government"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">City</label>
                <input
                  id="city"
                  type="text"
                  value={currentEditAddress?.city || ""}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter City"
                />
              </div>

              {/* Area */}
              <div>
                <label htmlFor="area" className="block text-sm font-semibold text-slate-700 mb-1">Area</label>
                <input
                  id="area"
                  type="text"
                  value={currentEditAddress?.area || ""}
                  onChange={(e) => updateField('area', e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Area"
                />
              </div>

              {/* Street */}
              <div>
                <label htmlFor="street" className="block text-sm font-semibold text-slate-700 mb-1">Street</label>
                <input
                  id="street"
                  type="text"
                  value={currentEditAddress?.street || ""}
                  onChange={(e) => updateField('street', e.target.value)}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Street"
                />
              </div>

              {/* Building Number */}
              <div>
                <label htmlFor="buildingNumber" className="block text-sm font-semibold text-slate-700 mb-1">Building Number</label>
                <input
                  id="buildingNumber"
                  type="number"
                  value={Number(currentEditAddress?.buildingNumber || "")}
                  onChange={(e) => updateField('buildingNumber', Number(e.target.value))}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Building Number"
                />
              </div>

              {/* Department Number */}
              <div>
                <label htmlFor="departmentNumber" className="block text-sm font-semibold text-slate-700 mb-1">Apartment Number</label>
                <input
                  id="departmentNumber"
                  type="number"
                  value={Number(currentEditAddress?.departmentNumber || "")}
                  onChange={(e) => updateField('departmentNumber', Number(e.target.value))}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter Apartment Number"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setClicked(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-200 text-slate-700 font-semibold text-lg hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => updateAddress(e, currentEditAddress, currentEditAddress._id)}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-md"
                >
                  💾 Update Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}