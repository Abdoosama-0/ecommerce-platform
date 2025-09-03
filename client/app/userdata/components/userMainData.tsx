'use client'

import { useState } from "react"
import UpdateUserData from "./updateUserData"

interface UserMainDataProps {
  data: userData
  setData: (arg0: userData) => void
}

export default function UserMainData({ data, setData }: UserMainDataProps) {
  const [clicked, setClicked] = useState<boolean>(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          👤 Personal Information
        </h2>
        <button
          onClick={() => setClicked(true)}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* User Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-800 font-medium">{data.name || 'Not provided'}</p>
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Username</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-800 font-medium">{data.username || 'Not provided'}</p>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-800 font-medium flex items-center gap-2">
              📧 {data.email || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-800 font-medium flex items-center gap-2">
              📱 {data.phone || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info Card */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-indigo-500 text-lg">💡</div>
          <div>
            <h3 className="font-semibold text-indigo-800 mb-1">Keep your information up to date</h3>
            <p className="text-indigo-600 text-sm">
              Make sure your contact information is current to receive important updates about your orders and account.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <UpdateUserData setData={setData} data={data} clicked={clicked} setClicked={setClicked} />
    </div>
  );
}