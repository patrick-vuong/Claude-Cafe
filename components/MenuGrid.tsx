'use client';

import { useState, useMemo } from 'react';
import type { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { checkStock, decrementStock } from '@/app/actions/menu';
import CategoryTabs from '@/components/CategoryTabs';
import MenuItemCard from '@/components/MenuItemCard';

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { state, addItem } = useCart();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return unique.sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === null) return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const handleAddToCart = async (item: MenuItem) => {
    // Check wallet balance
    if (state.wallet.balance < item.tokenPrice) {
      setErrorId(item.id);
      setErrorMsg('Not enough tokens');
      setTimeout(() => setErrorId(null), 2000);
      return;
    }

    setAddingId(item.id);
    try {
      // Verify stock server-side
      const stockInfo = await checkStock(item.id);
      if (!stockInfo.available) {
        setErrorId(item.id);
        setErrorMsg('Out of stock');
        setTimeout(() => setErrorId(null), 2000);
        return;
      }

      // Decrement stock server-side
      await decrementStock(item.id);

      // Add to cart client-side
      addItem(item);
    } catch {
      setErrorId(item.id);
      setErrorMsg('Could not add item');
      setTimeout(() => setErrorId(null), 2000);
    } finally {
      // Brief "Added!" feedback, then clear
      setTimeout(() => setAddingId(null), 1000);
    }
  };

  return (
    <div>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <p className="text-warmgray text-sm mt-4 mb-6">
        {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
      </p>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-2xl text-espresso mb-2">
            Nothing brewing here... yet!
          </p>
          <p className="text-warmgray">
            Looks like this category is taking a coffee break. Try another one!
          </p>
        </div>
      ) : (
        <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <MenuItemCard
              key={item.id}
              item={item}
              index={index}
              onAddToCart={handleAddToCart}
              addingState={
                addingId === item.id
                  ? 'adding'
                  : errorId === item.id
                    ? 'error'
                    : 'idle'
              }
              errorMessage={errorId === item.id ? errorMsg : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
