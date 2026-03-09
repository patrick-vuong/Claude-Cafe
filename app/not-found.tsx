import Link from 'next/link';
import { Coffee } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Coffee className="w-12 h-12 text-warmgray/40 mx-auto mb-4" />
      <h1 className="font-display text-4xl text-espresso mb-2">404</h1>
      <p className="font-display text-xl text-espresso mb-2">
        This page is off the menu
      </p>
      <p className="text-warmgray mb-8">
        We couldn&apos;t find what you&apos;re looking for. Maybe try something from our menu?
      </p>
      <Link
        href="/menu"
        className="inline-block bg-coral text-offwhite px-6 py-3 rounded-lg font-medium hover:bg-amber transition"
      >
        Browse the Menu
      </Link>
    </main>
  );
}
