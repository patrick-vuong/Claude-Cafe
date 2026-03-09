'use server'

import prisma from '@/lib/db'

// Fetch all available menu items, ordered by category then name
export async function getMenuItems() {
  const items = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: [
      { category: 'asc' },
      { name: 'asc' },
    ],
  })
  return items
}

// Check if an item is in stock
export async function checkStock(itemId: string) {
  const item = await prisma.menuItem.findUnique({
    where: { id: itemId },
    select: { stock: true, available: true },
  })

  if (!item) {
    throw new Error(`Menu item ${itemId} not found`)
  }

  return {
    available: item.available && item.stock > 0,
    stock: item.stock,
  }
}

// Atomically decrement stock by 1
// Uses Prisma's atomic operations to avoid race conditions
export async function decrementStock(itemId: string) {
  // First check current stock
  const item = await prisma.menuItem.findUnique({
    where: { id: itemId },
    select: { stock: true },
  })

  if (!item || item.stock <= 0) {
    throw new Error(`Item ${itemId} is out of stock`)
  }

  // Atomic decrement
  const updated = await prisma.menuItem.update({
    where: { id: itemId },
    data: {
      stock: { decrement: 1 },
      // If stock drops to 0 after decrement, mark as unavailable
      ...(item.stock === 1 ? { available: false } : {}),
    },
  })

  return { stock: updated.stock, available: updated.available }
}
