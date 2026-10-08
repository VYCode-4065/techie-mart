import Image from 'next/image'

type Item = { id: number; name: string; price: string; img: string }

export default function RecentlyViewed({ items }: { items: Item[] }) {
  return (
    <section className='rounded-lg bg-neutral-900 border border-neutral-800 p-6'>
      <h3 className='text-lg font-semibold mb-4'>Recently Viewed</h3>
      <div className='grid grid-cols-3 gap-3'>
        {items.map(it => (
          <div key={it.id} className='rounded overflow-hidden bg-neutral-800 p-2'>
            <div className='relative w-full h-28 mb-2'>
              <Image src={it.img} alt={it.name} unoptimized fill className='object-cover rounded' />
            </div>
            <div className='text-sm'>
              <div className='font-medium'>{it.name}</div>
              <div className='text-xs text-gray-400'>₹{it.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
