'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#dadad6] pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Helvetica']">
              Your Cart
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your cart is empty. Start shopping to add items!
            </p>
            <a
              href="/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dadad6] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 font-['Helvetica']">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Cart Items</h2>
              
              {state.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                  {/* Product Image */}
                  <div className="w-20 h-20 relative flex-shrink-0">
                    {item.images && item.images[0] && item.images[0].url && (
                      <Image
                        src={item.images[0].url}
                        alt={item.images[0].alt || item.title}
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      ${(item.salePrice || item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <a
                href="/checkout"
                className="block w-full bg-black text-white py-3 rounded-md font-medium mt-6 hover:bg-gray-800 transition-colors text-center"
              >
                Proceed to Checkout
              </a>

              <a
                href="/products"
                className="block text-center text-gray-600 hover:text-gray-800 mt-4 text-sm"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
