'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { stripePublishableKey } from '../../env';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const { state } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToCheckout = async () => {
      if (state.items.length === 0) {
        setError('Your cart is empty');
        setIsLoading(false);
        return;
      }

      try {
        // Create checkout session
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: state.items,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { sessionId } = await response.json();

        // Load Stripe and redirect to checkout
        if (!stripePublishableKey) {
          throw new Error('Stripe publishable key is not configured');
        }
        const stripe = await loadStripe(stripePublishableKey);
        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          throw error;
        }
      } catch (err) {
        console.error('Checkout error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred during checkout');
        setIsLoading(false);
      }
    };

    redirectToCheckout();
  }, [state.items]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#dadad6] pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Helvetica']">
              Checkout Error
            </h1>
            <p className="text-lg text-red-600 mb-8">{error}</p>
            <a
              href="/cart"
              className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Return to Cart
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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Helvetica']">
            Redirecting to Checkout...
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please wait while we redirect you to our secure checkout.
          </p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
