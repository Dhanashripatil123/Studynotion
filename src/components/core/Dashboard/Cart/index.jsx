
import {useSelector} from "react-redux"
import RenderTotalAmount from "./RenderTotalAmount"
import { RenderCartCourses } from "./RenderCartCourses"

export default function Cart(){

     const {cart, total, totalItems} = useSelector((state)=>state.cart || {cart: [], total: 0, totalItems: 0})
     return(
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Your Cart
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl">
                        {(totalItems || 0)} course{(totalItems !== 1) ? 's' : ''} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-3xl"></div>
                            <div className="relative z-10">
                                {Array.isArray(cart) && cart.length > 0 ? (
                                    <RenderCartCourses />
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🛒</div>
                                        <h3 className="text-2xl font-bold text-gray-300 mb-2">Your cart is empty</h3>
                                        <p className="text-gray-400">Add some courses to get started with your learning journey!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-teal-900/10 rounded-3xl"></div>
                                <div className="relative z-10">
                                    <RenderTotalAmount />
                                    <div className="text-xs text-gray-400 mt-6 flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        Secure checkout • 30-day money-back guarantee
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
     )
}