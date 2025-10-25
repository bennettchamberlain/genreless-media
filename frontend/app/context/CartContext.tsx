'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  salePrice?: number;
  slug: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + (action.payload.salePrice || action.payload.price)
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + (action.payload.salePrice || action.payload.price)
      };
    }
    
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item._id === action.payload);
      if (!item) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        total: state.total - ((item.salePrice || item.price) * item.quantity)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item._id === action.payload._id);
      if (!item) return state;
      
      const pricePerItem = item.salePrice || item.price;
      const quantityDiff = action.payload.quantity - item.quantity;
      
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (pricePerItem * quantityDiff)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
      
    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => 
        sum + ((item.salePrice || item.price) * item.quantity), 0
      );
      
      return {
        items: action.payload,
        total
      };
    }
    
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (_id: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: _id });
  };

  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(_id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { _id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (_id: string) => {
    const item = state.items.find(item => item._id === _id);
    return item ? item.quantity : 0;
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
