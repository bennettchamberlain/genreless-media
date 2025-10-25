'use client';

import { useCart } from '../context/CartContext';

export default function CartIndicator() {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <div className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {itemCount}
    </div>
  );
}
