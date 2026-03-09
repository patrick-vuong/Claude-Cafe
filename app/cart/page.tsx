'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { placeOrder } from '@/app/actions/orders';

export default function CartPage() {
  const router = useRouter();
  const { state, removeItem, updateQuantity, clearCart, deductTokens } = useCart();
  const { items, totalTokens, wallet } = state;
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCheckout = totalTokens <= wallet.balance && items.length > 0;

  const handlePlaceOrder = async () => {
    if (!canCheckout || placing) return;

    setPlacing(true);
    setError(null);

    try {
      const orderItems = items.map(({ menuItem, quantity }) => ({
        menuItemId: menuItem.id,
        quantity,
      }));

      const result = await placeOrder(orderItems, totalTokens);

      deductTokens(totalTokens);
      clearCart();

      router.push(`/order-confirmed?ref=${result.orderRef}&total=${totalTokens}`);
    } catch {
      setError('Something went wrong placing your order. Please try again.');
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in-up">
        <ShoppingCart className="w-16 h-16 text-warmgray/40 mx-auto mb-4" />
        <h1 className="font-display text-3xl text-espresso mb-2">
          Your cart is empty
        </h1>
        <p className="text-warmgray mb-8">
          Looks like you haven&apos;t added anything yet. Head to the menu and grab something!
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-coral text-offwhite px-6 py-3 rounded-lg font-medium hover:bg-amber transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl sm:text-4xl text-espresso mb-8">Your Cart</h1>

      {/* Cart items */}
      <ul className="space-y-4 mb-8" aria-label="Cart items">
        {items.map(({ menuItem, quantity }) => (
          <li
            key={menuItem.id}
            className="bg-offwhite rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg text-espresso truncate">
                {menuItem.name}
              </h3>
              <p className="font-mono text-sm text-coral">
                {menuItem.tokenPrice} tokens each
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                  aria-label={`Decrease ${menuItem.name} quantity`}
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-cream text-espresso font-bold hover:bg-amber/20 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  -
                </button>
                <span className="font-mono w-8 text-center text-espresso" aria-label={`Quantity: ${quantity}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                  aria-label={`Increase ${menuItem.name} quantity`}
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-cream text-espresso font-bold hover:bg-amber/20 transition flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <p className="font-mono text-lg font-bold text-espresso w-24 sm:w-28 text-right">
                {(menuItem.tokenPrice * quantity).toLocaleString()} tk
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItem(menuItem.id)}
                aria-label={`Remove ${menuItem.name} from cart`}
                className="text-warmgray hover:text-coral transition text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="bg-offwhite rounded-xl p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-warmgray">Cart Total</span>
          <span className="font-mono text-2xl font-bold text-espresso">
            {totalTokens.toLocaleString()} tokens
          </span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-warmgray">Wallet Balance</span>
          <span className="font-mono text-lg text-warmgray">
            {wallet.balance.toLocaleString()} tokens
          </span>
        </div>

        {totalTokens > wallet.balance && (
          <p className="text-coral text-sm font-medium mb-4" role="alert">
            Not enough tokens! Remove some items to proceed.
          </p>
        )}

        {error && (
          <p className="text-coral text-sm font-medium mb-4" role="alert">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={clearCart}
            disabled={placing}
            className="px-4 py-3 sm:py-2 rounded-lg border border-warmgray/30 text-warmgray font-medium hover:bg-cream transition disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            Clear Cart
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={!canCheckout || placing}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-2 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
              !canCheckout || placing
                ? 'bg-warmgray/20 text-warmgray cursor-not-allowed'
                : 'bg-coral text-offwhite hover:bg-amber active:scale-[0.98]'
            }`}
          >
            {placing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Placing Order...
              </>
            ) : (
              `Place Order — ${totalTokens.toLocaleString()} tokens`
            )}
          </button>
        </div>
      </div>

      {/* Back to menu */}
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-warmgray hover:text-coral transition mt-6 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue browsing
      </Link>
    </main>
  );
}
