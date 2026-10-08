"use client"
import ProductGallery from '@/components/ProductGallery'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const images = [
  'https://picsum.photos/id/1015/1200/900',
  'https://picsum.photos/id/1016/1200/900',
  'https://picsum.photos/id/1020/1200/900',
  'https://picsum.photos/id/1024/1200/900'
]

const recommended = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  name: `Recommended Product ${i + 1}`,
  price: `${(20 + i * 5).toFixed(2)}`,
  img: `https://picsum.photos/seed/r${i}/400/250`
}))

const comments = [
  { id: 1, user: 'Alice', text: 'Great product, fast shipping.' },
  { id: 2, user: 'Bob', text: 'Works as expected.' }
]

const page = () => {
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const colors = [
    { name: 'Graphite', hex: '#111827' },
    { name: 'Silver', hex: '#E5E7EB' },
    { name: 'Ocean Blue', hex: '#0369A1' },
    { name: 'Crimson', hex: '#DC2626' }
  ]

  return (
    <section className='min-h-screen px-6 py-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-12 gap-8'>
          {/* Left: Gallery (9 cols) */}
          <div className='col-span-9'>
            <ProductGallery images={images} alt='Product' />
          </div>

          {/* Right: Product info (3 cols) */}
          <aside className='col-span-3 flex flex-col gap-6'>
            <div className='sticky top-24'>
              <h1 className='text-lg font-semibold mb-2'>Product Name Placeholder</h1>
              <p className='text-sm text-gray-400 mb-4'>Product short description goes here — a one-liner to summarize key points.</p>

              <div className='flex items-center gap-3 mb-3'>
                <div className='flex items-center gap-1'>
                  <svg className='h-4 w-4 text-yellow-400' viewBox='0 0 20 20' fill='currentColor'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118l-3.377-2.455a1 1 0 00-1.176 0L5.27 17.06c-.784.57-1.84-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L1.286 8.41c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.97z' /></svg>
                  <span className='text-sm font-medium'>4.7</span>
                </div>
                <span className='text-sm text-gray-400'>(256 reviews)</span>
              </div>

              <div className='flex items-center justify-between mb-4 gap-4'>
                <span className='text-xl font-bold'>₹1,299.00</span>
                <Button size='lg' className='px-6 py-3'>Add to Cart</Button>
              </div>

              <div className='mb-4'>
                <h3 className='text-sm font-medium mb-2'>Choose color</h3>
                <div className='flex items-center gap-3'>
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      aria-pressed={selectedColor === i}
                      title={c.name}
                      className={`rounded-full w-8 h-8 ring-2 transition-all ${selectedColor === i ? 'ring-primary' : 'ring-transparent'}`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <div className='text-xs text-gray-400 mt-2'>Selected: <span className='text-sm text-white ml-1'>{colors[selectedColor].name}</span></div>
              </div>

              <div className='mb-4'>
                <h3 className='text-sm font-medium mb-2'>Quantity</h3>
                <div className='flex items-center gap-2'>
                  <button onClick={() => setQuantity((q: number) => Math.max(1, q - 1))} className='px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md'>-</button>
                  <div className='px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-md'>{quantity}</div>
                  <button onClick={() => setQuantity((q: number) => q + 1)} className='px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md'>+</button>
                </div>
              </div>

              <div className='mb-4'>
                <h3 className='text-sm font-medium mb-2'>Highlights</h3>
                <ul className='text-sm text-gray-400 space-y-1'>
                  <li>• 2-year warranty</li>
                  <li>• Free delivery within 3-5 business days</li>
                  <li>• 30-day returns</li>
                </ul>
              </div>

              <div className='flex items-center gap-3 mt-4'>
                <Button variant='outline' size='sm'>Add to Wishlist</Button>
                <Button variant='ghost' size='sm'>Share</Button>
              </div>
            </div>
          </aside>
        </div>

        {/* Recommended products full width */}
        <section className='mt-12'>
          <h4 className='text-base font-semibold mb-6'>Recommended Product</h4>
          <div className='grid grid-cols-4 gap-6'>
            {recommended.map((p) => (
              <div key={p.id} className='rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700 p-4'>
                <div className='relative w-full h-40 mb-4'>
                  <Image src={p.img} alt={p.name} unoptimized fill className='object-cover rounded' />
                </div>
                <div className='text-sm'>
                  <div className='font-medium'>{p.name}</div>
                  <div className='text-sm text-gray-400'>₹{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comments & Reviews */}
        <section className='mt-12'>
          <h4 className='text-base font-semibold mb-4'>Comments & Reviews</h4>
          <div className='flex flex-col gap-4'>
            <textarea placeholder='Write your review...' className='w-full p-3 rounded-md bg-neutral-900 border border-neutral-700 text-sm' rows={4} />
            <button className='self-start bg-indigo-600 text-white px-4 py-2 rounded-md'>Post Review</button>

            <div className='mt-6 space-y-4'>
              {comments.map(c => (
                <div key={c.id} className='p-4 rounded-md bg-neutral-900 border border-neutral-700'>
                  <div className='text-sm font-medium'>{c.user}</div>
                  <div className='text-sm text-gray-400'>{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default page