'use client';

import { useRouter } from 'next/navigation';
import { Coins, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { restockAll } from '@/app/actions/menu';
import { STARTING_WALLET_BALANCE } from '@/types';

export default function TokenWallet() {
  const router = useRouter();
  const { state, resetWallet } = useCart();
  const formatted = state.wallet.balance.toLocaleString();
  const isFullBalance = state.wallet.balance === STARTING_WALLET_BALANCE;

  const handleReset = async () => {
    resetWallet();
    await restockAll();
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1.5 text-sm" aria-label={`Wallet balance: ${formatted} tokens`}>
      <Coins className="w-4 h-4 text-amber" aria-hidden="true" />
      <span className="font-mono font-medium text-espresso">
        {formatted}
      </span>
      <span className="text-warmgray hidden sm:inline" aria-hidden="true">tokens</span>
      {!isFullBalance && (
        <button
          onClick={handleReset}
          aria-label="Reset wallet, cart, and stock"
          title="Reset wallet, cart, and stock"
          className="ml-1 text-warmgray hover:text-coral transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
