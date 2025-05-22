'use client'

import ErrorMessage from "@/components/errorMessage"
import Loading from "@/components/loading"
import { useEffect, useState } from "react"

export default function UserOrders() {
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('pending')
    const [orders, setOrders] = useState<userOrder[]>()
    const [refreshOrders, setRefreshOrders] = useState<number>(0)

    const handleCancelOrder = async (orderId: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cancelOrder/${orderId}`, {
                method: 'PATCH',
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
            alert('order has been canceled successfully')
            setRefreshOrders(prev => prev + 1);
        } catch (error) {
            alert('something went wrong please try again later')
            console.error('Error fetching data:', error);
        }

    }
const handleRestoreOrder = async (orderId: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restoreOrder/${orderId}`, {
                method: 'PATCH',
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
            alert('order has been restored successfully')
            setRefreshOrders(prev => prev + 1);
        } catch (error) {
            alert('something went wrong please try again later')
            console.error('Error fetching data:', error);
        }

    }


    const getUserOrders = async (status: string) => {

        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUserOrders/${status}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',

            })
            const data = await res.json()
            if (!res.ok) {
                setMessage(data.message)
                return
            }
            setOrders(data.orders)
        } catch (error) {
            setMessage('something went wrong please try again later')
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }


    }
    useEffect(() => {
        getUserOrders(status)

    }
        , [status,refreshOrders])
    return (
        <>
            {loading ? (<Loading />) : (
                <>
                    {!orders ? (<ErrorMessage message={message} />) : (


                        <div className="p-2">
                            <div className='flex justify-between items-center pr-5 mb-1'>
                                <h1 className="text-4xl font-[fantasy] mb-4">your Orders:</h1>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="bg-slate-300 border-2 text-black border-slate-500 hover:bg-slate-400 px-2 text-sm py-1 rounded-lg cursor-pointer font-bold"
                                >
                                    {['pending', 'shipped', 'delivered', 'cancelled'].map((s) => (
                                        <option key={s} value={s} >
                                            {s}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            {orders.length === 0 ? (

                                <p className=" text-xl font-sans">there is No {status} orders  yet</p>


                            ) : (


                                <div className="grid grid-cols-1   gap-4 m-2 ">
                                    {orders.map((order) => (
                                        <div key={order._id} className="  border-4 break-words overflow-hidden border-gray-300 p-4 rounded-lg   ">
                                            {/**details */}

                                            <h2 className="text-xl font-bold">Order ID: <span className="text-sm font-sans sm:font-bold sm:text-xl">{order._id}</span></h2>
                                            <p>Status: {order.status}</p>
                                            <p>Total Price: {order.totalPrice} EGP</p>
                                            <p>Total Quantity: {order.totalQuantity}</p>
                                            <h3 className="text-lg font-semibold">Products:</h3>
                                            <ul className="gap-2 flex flex-row flex-wrap">
                                                {order.products.map((product) => (
                                                    <li className=" border-4 border-gray-300  rounded-lg flex justify-center items-center w-full sm:max-w-52 p-2 " key={product.productId._id}>
                                                        <img src={product.productId.imageUrls[0]} alt={product.productId.title} className="w-16 h-16 " />
                                                        {product.productId.title} - Quantity: {product.quantity}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/**cancel Order */}
                                            {(status === 'pending' || status === 'shipped') && (
                                                <button onClick={() => { handleCancelOrder(order._id) }} className="bg-red-600 m-2 text-sm font-light sm:text-xl sm:font-bold break-words cursor-pointer  text-white px-4 py-2 rounded hover:bg-red-800">
                                                    Cancel Order
                                                </button>
                                            )}
                                            {/**restore Order */}
                                            {status === 'cancelled' && (
                                                <button onClick={() => { handleRestoreOrder(order._id) }}  className="bg-blue-600 m-2 text-sm font-light sm:text-xl sm:font-bold break-words cursor-pointer  text-white px-4 py-2 rounded hover:bg-blue-800">
                                                    restore Order
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>


                            )}
                        </div>
                    )}
                </>
            )}

        </>

    );
}