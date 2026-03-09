'use client';

import { useRef, type KeyboardEvent } from 'react';
import { CATEGORY_MAP, type MenuCategory } from '@/types';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  // All tab values: null (All) + each category
  const allTabs: (string | null)[] = [null, ...categories];

  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % allTabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
    } else {
      return;
    }

    e.preventDefault();
    onCategoryChange(allTabs[nextIndex]);

    // Focus the next tab button
    const buttons = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div
      ref={tabsRef}
      role="tablist"
      aria-label="Menu categories"
      className="flex overflow-x-auto gap-2 pb-2"
    >
      {allTabs.map((tab, index) => {
        const isActive = activeCategory === tab;
        const config = tab ? CATEGORY_MAP[tab as MenuCategory] : null;
        const label = tab ? (config ? `${config.emoji} ${config.label}` : tab) : 'All';

        return (
          <button
            key={tab ?? 'all'}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onCategoryChange(tab)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
              isActive
                ? 'bg-coral text-offwhite'
                : 'bg-offwhite text-espresso hover:bg-amber/20'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
