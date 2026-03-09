'use client';

import { ShoppingCart } from 'lucide-react';
import type { MenuItem } from '@/types';

type AddingState = 'idle' | 'adding' | 'error';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
  addingState?: AddingState;
  errorMessage?: string;
  index?: number;
}

export default function MenuItemCard({ item, onAddToCart, addingState = 'idle', errorMessage, index = 0 }: MenuItemCardProps) {
  const outOfStock = item.stock === 0;
  const lowStock = item.stock > 0 && item.stock <= 10;

  return (
    <article
      className="relative bg-offwhite rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
      aria-label={`${item.name}, ${item.tokenPrice} tokens`}
    >
      {/* Featured badge */}
      {item.featured && (
        <span className="absolute top-4 right-4 bg-amber/20 text-amber text-xs font-medium px-2 py-0.5 rounded-full">
          ⭐ Featured
        </span>
      )}

      {/* Name */}
      <h3 className="font-display text-lg text-espresso">{item.name}</h3>

      {/* Description */}
      <p className="text-warmgray text-sm mt-1">{item.description}</p>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="bg-cream text-warmgray text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Price */}
      <p className="font-mono text-xl text-coral font-bold mt-4">
        {item.tokenPrice} tokens
      </p>

      {/* Stock indicator */}
      <div className="mt-2">
        {outOfStock ? (
          <span className="inline-block bg-warmgray/10 text-warmgray text-xs font-medium px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        ) : lowStock ? (
          <span className="inline-block bg-coral/10 text-coral text-xs font-medium px-2 py-0.5 rounded-full">
            Only {item.stock} left!
          </span>
        ) : (
          <span className="text-warmgray text-xs">
            {item.stock} remaining
          </span>
        )}
      </div>

      {/* Error message */}
      {addingState === 'error' && errorMessage && (
        <p className="text-coral text-xs font-medium mt-2">{errorMessage}</p>
      )}

      {/* Add to Cart button */}
      <button
        disabled={outOfStock || addingState === 'adding'}
        onClick={() => onAddToCart?.(item)}
        aria-label={outOfStock ? `${item.name} is sold out` : `Add ${item.name} to cart`}
        className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 w-full mt-4 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-offwhite ${
          outOfStock || addingState === 'error'
            ? 'bg-warmgray/20 text-warmgray cursor-not-allowed'
            : addingState === 'adding'
              ? 'bg-amber text-offwhite scale-95'
              : 'bg-coral text-offwhite hover:bg-amber active:scale-95'
        }`}
      >
        <ShoppingCart className="w-4 h-4" />
        {outOfStock
          ? 'Sold Out'
          : addingState === 'adding'
            ? 'Added!'
            : 'Add to Cart'}
      </button>
    </article>
  );
}
