import Link from 'next/link';
import { getMenuItems } from '@/app/actions/menu';
import { STARTING_WALLET_BALANCE } from '@/types';
import type { MenuItem } from '@/types';

export default async function Home() {
  const items = await getMenuItems();
  const featuredItems = (items as MenuItem[]).filter((item) => item.featured);

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-espresso mb-6">
            Welcome to Claude Café
          </h1>
          <p className="text-warmgray text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            The coziest corner of the AI ecosystem. Grab a seat, order a Prompt
            Latte, and let your tokens do the talking.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/menu"
              className="inline-block bg-coral text-offwhite px-8 py-3 rounded-lg font-semibold text-lg hover:bg-amber transition-colors"
            >
              Browse the Menu &rarr;
            </Link>
            <p className="font-mono text-coral text-sm">
              You have{' '}
              <span className="font-semibold">
                {STARTING_WALLET_BALANCE.toLocaleString()}
              </span>{' '}
              tokens to spend
            </p>
            <div className="flex flex-col items-center gap-3 mt-2">
              <h2 className="font-display text-2xl sm:text-3xl text-espresso">
                Building Skills for Claude Tutorial
              </h2>
              <a
                href="https://github.com/patrick-vuong/Claude-Cafe/blob/main/Claude-Skills-Tutorial-Overview-Training-Up-Cafe-Agent/Claude-Skills-Tutorial-Full-Training-Up-Cafe-Agent.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-coral text-offwhite px-8 py-3 rounded-lg font-semibold text-lg hover:bg-amber transition-colors"
              >
                Claude Cafe is Hiring
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-display text-3xl sm:text-4xl text-espresso text-center mb-12">
              Featured Brews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-offwhite rounded-xl p-6 shadow-sm flex flex-col"
                >
                  <h3 className="font-display text-lg text-espresso mb-2">
                    {item.name}
                  </h3>
                  <p className="text-warmgray text-sm mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-mono text-coral font-semibold">
                      {item.tokenPrice.toLocaleString()} tokens
                    </span>
                    <Link
                      href="/menu"
                      className="text-coral text-sm hover:text-amber transition-colors"
                    >
                      View Menu &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
