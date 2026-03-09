'use server'

import prisma from '@/lib/db'

interface OrderItemInput {
  menuItemId: string
  quantity: number
}

function generateOrderRef(): string {
  const hex = Math.random().toString(16).substring(2, 6)
  return `ORD-${hex}`
}

// Place an order — creates Order + OrderItems in a transaction
export async function placeOrder(
  items: OrderItemInput[],
  totalTokens: number
) {
  const orderRef = generateOrderRef()

  const order = await prisma.$transaction(async (tx) => {
    // Create the order
    const newOrder = await tx.order.create({
      data: {
        orderRef,
        totalTokens,
        items: {
          create: items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return newOrder
  })

  return { orderRef: order.orderRef }
}
