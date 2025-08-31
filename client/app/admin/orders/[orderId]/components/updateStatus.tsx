'use client'

import { useState } from "react";

interface AddProps {
  currentStatus?: string;
}

export default function UpdateStatus({ currentStatus }: AddProps) {
  const [message, setMessage] = useState('');
  const path = window.location.pathname;
  const segments = path.split('/');
  const orderId = segments[3];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const newStatus = formData.get('choice') as string;

    if (!newStatus) {
      console.error('No status selected!');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/updateOrderStatus?id=${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      alert('Status updated successfully!');
      window.location.reload();
    } catch (error) {
      setMessage('Something went wrong, please try again later');
      console.error('Error sending request:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 z-30 m-auto flex w-[90%] max-w-md flex-col gap-6 rounded-2xl h-fit bg-white p-8 shadow-xl text-gray-900"
    >
      <h1 className="text-xl font-semibold text-center">Choose Status</h1>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="pending"
            name="choice"
            value="pending"
            defaultChecked={currentStatus === 'pending'}
            className="accent-indigo-500"
          />
          Pending
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="shipped"
            name="choice"
            value="shipped"
            defaultChecked={currentStatus === 'shipped'}
            className="accent-indigo-500"
          />
          Shipped
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="delivered"
            name="choice"
            value="delivered"
            defaultChecked={currentStatus === 'delivered'}
            className="accent-green-600"
          />
          Delivered
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="cancelled"
            name="choice"
            value="cancelled"
            defaultChecked={currentStatus === 'cancelled'}
            className="accent-red-600"
          />
          Cancelled
        </label>
      </div>

      {message && (
        <p className="text-center text-sm text-red-500">{message}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-500"
      >
        Update Status
      </button>
    </form>
  );
}
