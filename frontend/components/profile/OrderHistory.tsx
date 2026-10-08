import Image from 'next/image'

type Order = {
  id: string
  date: string
  total: string
  status: string
  items: { name: string; qty: number; img?: string }[]
}

export default function OrderHistory({ orders }: { orders: Order[] }) {
  return (
    <section className='rounded-lg bg-neutral-900 border border-neutral-800 p-6'>
      <h3 className='text-lg font-semibold mb-4'>Order History</h3>
      <div className='space-y-4'>
        {orders.map(o => (
          <div key={o.id} className='flex items-center gap-4'>
            <div className='w-16 h-12 rounded overflow-hidden bg-neutral-800 relative'>
              <Image src={o.items[0]?.img || 'https://picsum.photos/seed/order/200/140'} alt={o.items[0]?.name || 'item'} unoptimized fill className='object-cover' />
            </div>
            <div className='flex-1'>
              <div className='text-sm font-medium'>Order {o.id} • {o.date}</div>
              <div className='text-xs text-gray-400'>{o.items.length} items • {o.status}</div>
            </div>
            <div className='text-sm font-medium'>₹{o.total}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
