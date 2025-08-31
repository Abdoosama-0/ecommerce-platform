'use client'

import { useState } from "react"

interface UserMainDataProps {
  setClicked: (arg0: boolean) => void
  clicked: boolean
  data: userData
  setData: (arg0: userData) => void
}

export default function UpdateUserData({ setClicked, clicked, data, setData }: UserMainDataProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const updateData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/UpdateUserData`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          name: data.name,
          phone: data.phone
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message)
        return;
      }

      alert('Updated successfully');
      window.location.reload()
    } catch (error) {
      setMessage('Something went wrong, please try again later')
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {clicked && (
        <div onClick={() => setClicked(false)} className="fixed inset-0 z-10 bg-slate-900/90 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl max-h-[90%] overflow-y-auto border border-slate-200 relative">
            
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 rounded-2xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-800">✏️ Update Profile</h1>
              <button 
                onClick={() => setClicked(false)} 
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
                disabled={loading}
              >
                ×
              </button>
            </div>

            <form onSubmit={updateData} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name || ''}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={data.username || ''}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email || ''}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter your email address"
                  required
                  disabled={loading}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 text-lg border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  placeholder="Enter your phone number"
                  required
                  disabled={loading}
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
                  {loading ? '⏳ Updating...' : '💾 Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}