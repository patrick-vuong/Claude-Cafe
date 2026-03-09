'use client';

import { Coins, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STARTING_WALLET_BALANCE } from '@/types';

export default function TokenWallet() {
  const { state, resetWallet } = useCart();
  const formatted = state.wallet.balance.toLocaleString();
  const isFullBalance = state.wallet.balance === STARTING_WALLET_BALANCE;

  return (
    <div className="flex items-center gap-1.5 text-sm" aria-label={`Wallet balance: ${formatted} tokens`}>
      <Coins className="w-4 h-4 text-amber" aria-hidden="true" />
      <span className="font-mono font-medium text-espresso">
        {formatted}
      </span>
      <span className="text-warmgray hidden sm:inline" aria-hidden="true">tokens</span>
      {!isFullBalance && (
        <button
          onClick={resetWallet}
          aria-label="Reset wallet to 10,000 tokens"
          title="Reset wallet to 10,000 tokens"
          className="ml-1 text-warmgray hover:text-coral transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
