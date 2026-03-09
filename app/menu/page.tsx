import { getMenuItems } from '@/app/actions/menu';
import MenuGrid from '@/components/MenuGrid';

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl text-espresso">Our Menu</h1>
      <p className="text-warmgray mt-2 mb-8 max-w-2xl">
        Everything&apos;s freshly brewed and priced in tokens. No hidden fees,
        no fine print — just good vibes and great flavors.
      </p>

      <MenuGrid items={items} />
    </main>
  );
}
