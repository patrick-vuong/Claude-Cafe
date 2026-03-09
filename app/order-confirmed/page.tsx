'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Coffee, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function OrderConfirmedPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const searchParams = useSearchParams();

  // Focus heading on mount for screen readers
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  const orderRef = searchParams.get('ref') ?? 'ORD-????';
  const total = Number(searchParams.get('total') ?? 0);
  const { state } = useCart();

  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 animate-fade-in-up">
      {/* Success icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-coral/10 mb-4">
          <Coffee className="w-10 h-10 text-coral" />
        </div>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-4xl text-espresso mb-2 outline-none"
        >
          Order Placed!
        </h1>
        <p className="text-warmgray">
          Your brew is on the way. Thanks for stopping by!
        </p>
      </div>

      {/* Terminal-style receipt */}
      <div className="bg-espresso rounded-xl p-6 font-mono text-sm text-cream/90 space-y-3">
        <div className="text-center text-cream border-b border-cream/20 pb-3">
          <p className="text-lg font-bold">CLAUDE CAFE</p>
          <p className="text-cream/50 text-xs">Where every prompt deserves a pour</p>
        </div>

        <div className="flex justify-between">
          <span className="text-cream/50">Order</span>
          <span className="text-coral font-bold">#{orderRef}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-cream/50">Date</span>
          <span>{timestamp}</span>
        </div>

        <div className="border-t border-cream/20 pt-3 flex justify-between">
          <span className="text-cream/50">Total Charged</span>
          <span className="text-coral font-bold text-lg">
            {total.toLocaleString()} tokens
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-cream/50">Remaining Balance</span>
          <span>{state.wallet.balance.toLocaleString()} tokens</span>
        </div>

        <div className="border-t border-cream/20 pt-3 text-center text-cream/40 text-xs">
          <p>--- END OF RECEIPT ---</p>
          <p className="mt-1">Session powered by Claude Opus 4.6</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Link
          href="/menu"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-coral text-offwhite px-6 py-3 rounded-lg font-medium hover:bg-amber transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Order Again
        </Link>
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-warmgray/30 text-espresso px-6 py-3 rounded-lg font-medium hover:bg-offwhite transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
