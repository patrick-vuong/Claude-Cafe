'use client';

import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <AlertTriangle className="w-12 h-12 text-coral mx-auto mb-4" />
      <h1 className="font-display text-3xl text-espresso mb-2">
        Something spilled!
      </h1>
      <p className="text-warmgray mb-8">
        Looks like something went wrong brewing this page. Give it another try.
      </p>
      <button
        onClick={reset}
        className="bg-coral text-offwhite px-6 py-3 rounded-lg font-medium hover:bg-amber transition"
      >
        Try Again
      </button>
    </main>
  );
}
