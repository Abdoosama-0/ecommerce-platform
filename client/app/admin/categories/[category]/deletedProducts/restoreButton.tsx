'use client'

import { useState } from "react";

interface RestoreButtonProps {
  productId: string
}

export default function RestoreButton({ productId }: RestoreButtonProps) {
  const [message, setMessage] = useState('')
  const [clicked, setClicked] = useState(false)
  const [quantity, setQuantity] = useState<number>()

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/restoreProduct/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ quantity })
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message)
        return
      }
      alert('restored')
      window.location.reload()

    } catch (error) {
      setMessage('something went wrong please try again later')
      console.log('Error fetching data:', error);
    }
  }

  return (
    <>
      {/* restore button */}
      <button
        onClick={(e) => { e.preventDefault(); setClicked(true) }}
        className="px-3 py-1 w-fit text-sm rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition"
      >
        Restore
      </button>

      {/* modal form */}
      {clicked && (
        <div
          onClick={() => setClicked(false)}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/70"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-gray-700">Restore Product</h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                value={quantity ?? ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {message && (
                <p className="text-sm text-red-600">{message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
            >
              Submit
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setClicked(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </form>
        </div>
      )}
    </>
  );
}
