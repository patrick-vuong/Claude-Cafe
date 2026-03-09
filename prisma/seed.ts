import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const pool = new pg.Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const menuItems = [
  // Espresso & Coffee
  {
    name: 'System Prompt Espresso',
    description: 'Bold, sets the tone for your whole session',
    tokenPrice: 350,
    category: 'espresso',
    featured: true,
    tags: ['hot', 'bold', 'signature'],
    stock: 50,
    available: true,
  },
  {
    name: 'Prompt Latte',
    description: 'Smooth instructions with a frothy finish',
    tokenPrice: 450,
    category: 'espresso',
    featured: false,
    tags: ['hot', 'creamy'],
    stock: 50,
    available: true,
  },
  {
    name: 'Chain-of-Thought Cold Brew',
    description: 'Slow-steeped clarity, served iced',
    tokenPrice: 500,
    category: 'espresso',
    featured: false,
    tags: ['iced', 'strong'],
    stock: 50,
    available: true,
  },
  {
    name: 'Context Window Americano',
    description: 'Wide-open flavor, room for everything',
    tokenPrice: 400,
    category: 'espresso',
    featured: false,
    tags: ['hot', 'classic'],
    stock: 50,
    available: true,
  },
  {
    name: 'Hallucination Hazelnut',
    description: 'Occasionally surprising, always interesting',
    tokenPrice: 475,
    category: 'espresso',
    featured: false,
    tags: ['hot', 'flavored'],
    stock: 50,
    available: true,
  },

  // Teas & Alternatives
  {
    name: 'RAG Refresher Iced Tea',
    description: 'Retrieval-augmented hibiscus, served cold',
    tokenPrice: 425,
    category: 'tea',
    featured: false,
    tags: ['iced', 'fruity'],
    stock: 50,
    available: true,
  },
  {
    name: 'Temperature Zero Matcha',
    description: 'Cool, precise, zero randomness',
    tokenPrice: 450,
    category: 'tea',
    featured: false,
    tags: ['iced', 'smooth'],
    stock: 50,
    available: true,
  },
  {
    name: 'Streaming Chamomile',
    description: 'Arrives token by token, worth the wait',
    tokenPrice: 375,
    category: 'tea',
    featured: false,
    tags: ['hot', 'herbal'],
    stock: 50,
    available: true,
  },

  // Pastries & Bites
  {
    name: 'Token Croissant',
    description: 'Light, flaky, cost-efficient',
    tokenPrice: 250,
    category: 'pastries',
    featured: false,
    tags: ['pastry', 'classic'],
    stock: 50,
    available: true,
  },
  {
    name: 'Fine-Tuned Danish',
    description: 'Customized to your exact taste',
    tokenPrice: 325,
    category: 'pastries',
    featured: false,
    tags: ['pastry', 'sweet'],
    stock: 50,
    available: true,
  },
  {
    name: 'Memory Upgrade Muffin',
    description: 'Helps you retain everything',
    tokenPrice: 300,
    category: 'pastries',
    featured: false,
    tags: ['pastry', 'filling'],
    stock: 50,
    available: true,
  },
  {
    name: 'Embedding Éclair',
    description: 'Dense with meaning on the inside',
    tokenPrice: 350,
    category: 'pastries',
    featured: false,
    tags: ['pastry', 'chocolate'],
    stock: 50,
    available: true,
  },

  // Agent Boosters
  {
    name: 'Parallel Processing Pack',
    description: 'Assorted snacks, run simultaneously',
    tokenPrice: 750,
    category: 'boosters',
    featured: false,
    tags: ['combo', 'shareable'],
    stock: 50,
    available: true,
  },
  {
    name: 'Tool Use Toolkit',
    description: 'Everything you need to take action',
    tokenPrice: 650,
    category: 'boosters',
    featured: false,
    tags: ['combo', 'savory'],
    stock: 50,
    available: true,
  },
  {
    name: 'Max Tokens Energy Shot',
    description: 'Pushes your output to the limit',
    tokenPrice: 200,
    category: 'boosters',
    featured: false,
    tags: ['quick', 'energy'],
    stock: 50,
    available: true,
  },
  {
    name: 'Context Refill',
    description: 'Top off your session with clarity',
    tokenPrice: 150,
    category: 'boosters',
    featured: false,
    tags: ['quick', 'refresh'],
    stock: 50,
    available: true,
  },

  // Claude Specials
  {
    name: 'Opus Blend',
    description: 'The most capable cup we offer',
    tokenPrice: 900,
    category: 'specials',
    featured: true,
    tags: ['hot', 'premium', 'signature'],
    stock: 50,
    available: true,
  },
  {
    name: 'Sonnet Pour-Over',
    description: 'Balanced, thoughtful, beautifully crafted',
    tokenPrice: 600,
    category: 'specials',
    featured: true,
    tags: ['hot', 'artisan'],
    stock: 50,
    available: true,
  },
  {
    name: 'Haiku Espresso Shot',
    description: 'Small but precise — says everything',
    tokenPrice: 250,
    category: 'specials',
    featured: false,
    tags: ['hot', 'quick'],
    stock: 50,
    available: true,
  },
  {
    name: 'The Artifacts Board',
    description: 'A curated seasonal selection',
    tokenPrice: 1200,
    category: 'specials',
    featured: true,
    tags: ['combo', 'seasonal', 'premium'],
    stock: 50,
    available: true,
  },
]

async function main() {
  // Clear existing items (idempotent re-seed)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()

  // Seed all items
  await prisma.menuItem.createMany({ data: menuItems })

  console.log(`Seeded ${menuItems.length} menu items`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
