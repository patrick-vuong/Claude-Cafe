import { Coffee } from 'lucide-react';

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 text-center">
      <Coffee className="w-10 h-10 text-coral animate-pulse mx-auto mb-4" />
      <p className="text-warmgray font-medium">Brewing your page...</p>
    </main>
  );
}
