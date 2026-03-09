'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartIcon() {
  const { itemCount } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(itemCount);

  // Bounce badge when count changes
  useEffect(() => {
    if (itemCount !== prevCount.current && badgeRef.current) {
      badgeRef.current.classList.remove('animate-badge-bounce');
      // Force reflow to restart animation
      void badgeRef.current.offsetWidth;
      badgeRef.current.classList.add('animate-badge-bounce');
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <Link
      href="/cart"
      className="relative group"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
    >
      <ShoppingCart className="w-5 h-5 text-espresso group-hover:text-coral transition-colors" />
      {itemCount > 0 && (
        <span
          ref={badgeRef}
          aria-hidden="true"
          className="absolute -top-2 -right-2 bg-coral text-offwhite text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
