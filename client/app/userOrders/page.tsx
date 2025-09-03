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
            alert('Order has been canceled successfully')
            setRefreshOrders(prev => prev + 1);
        } catch (error) {
            alert('Something went wrong, please try again later')
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
            alert('Order has been restored successfully')
            setRefreshOrders(prev => prev + 1);
        } catch (error) {
            alert('Something went wrong, please try again later')
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
            setMessage('Something went wrong, please try again later')
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserOrders(status)
    }, [status, refreshOrders])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200'
            case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-slate-100 text-slate-800 border-slate-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return '⏳'
            case 'shipped': return '🚚'
            case 'delivered': return '✅'
            case 'cancelled': return '❌'
            default: return '📦'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4">
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <Loading />
                </div>
            ) : (
                <>
                    {!orders ? (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-200">
                                <ErrorMessage message={message} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-6xl border border-slate-200">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                                        📦 My Orders
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Filter by status:</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="bg-white border border-slate-300 text-slate-800 px-3 py-2 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition cursor-pointer"
                                        >
                                            {['pending', 'shipped', 'delivered', 'cancelled'].map((s) => (
                                                <option key={s} value={s}>
                                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Orders Content */}
                                {orders.length === 0 ? (
                                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
                                        <div className="text-6xl mb-4">📭</div>
                                        <h3 className="text-lg font-semibold text-slate-600 mb-2">No {status} orders</h3>
                                        <p className="text-slate-500">You don&apos;t have any {status} orders at the moment</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                                                {/* Order Header */}
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
                                                    <div>
                                                        <h2 className="text-lg font-bold text-slate-800 mb-1">
                                                            Order #{order._id.slice(-8)}
                                                        </h2>
                                                        <p className="text-sm text-slate-600">{order._id}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>

                                                {/* Order Details */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                                                        <h3 className="font-semibold text-slate-800 mb-2">💰 Total Price</h3>
                                                        <p className="text-2xl font-bold text-indigo-600">{order.totalPrice} EGP</p>
                                                    </div>
                                                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                                                        <h3 className="font-semibold text-slate-800 mb-2">📊 Total Quantity</h3>
                                                        <p className="text-2xl font-bold text-slate-600">{order.totalQuantity} items</p>
                                                    </div>
                                                </div>

                                                {/* Products */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">🛍️ Products</h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {order.products.map((product) => (
                                                            <div key={product.productId._id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                                                                <img 
                                                                    src={product.productId.imageUrls[0]} 
                                                                    alt={product.productId.title} 
                                                                    className="w-12 h-12 object-cover rounded-lg" 
                                                                />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-medium text-slate-800 text-sm truncate">
                                                                        {product.productId.title}
                                                                    </p>
                                                                    <p className="text-slate-500 text-xs">Qty: {product.quantity}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-3 pt-4 border-t border-slate-200">
                                                    {(status === 'pending' || status === 'shipped') && (
                                                        <button 
                                                            onClick={() => handleCancelOrder(order._id)}
                                                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition shadow-md flex items-center gap-2"
                                                        >
                                                            ❌ Cancel Order
                                                        </button>
                                                    )}
                                                    {status === 'cancelled' && (
                                                        <button 
                                                            onClick={() => handleRestoreOrder(order._id)}
                                                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
                                                        >
                                                            🔄 Restore Order
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}