"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'

type Props = {
  images: string[]
  alt?: string
  className?: string
}

export default function ProductGallery({ images, alt, className }: Props) {
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(true)
  const main = images[selected] || images[0] || '/product-image/Laptop1.avif'

  // when selected changes, show loading until image finishes
  useEffect(() => {
    setLoading(true)
  }, [selected])

  return (
    <div className={className}>
      <div className='grid grid-cols-12 w-full gap-4'>
        {/* Large main image */}
        <div className='col-span-10 rounded-2xl overflow-hidden relative'>
          <div className='relative w-full h-[88vh]'>
            <Image
              src={main}
              alt={alt ?? 'Product image'}
              unoptimized
              fill
              onLoadingComplete={() => setLoading(false)}
              className={`object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
              sizes='(min-width:1024px) 75vw, 100vw'
            />

            {/* loading skeleton / spinner overlay */}
            {loading && (
              <div className='absolute inset-0 flex items-center justify-center bg-neutral-900/60'>
                <div className='flex flex-col items-center gap-3'>
                  <svg className='animate-spin h-8 w-8 text-primary' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
                  </svg>
                  <div className='text-sm text-gray-400'>Loading image...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails / previews (narrower column) */}
        <div className='col-span-2 flex flex-col gap-2 items-stretch'>
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              aria-pressed={selected === idx}
              className={`w-full h-16 rounded-md overflow-hidden border focus:outline-none transition-shadow ${selected === idx ? 'shadow-md ring-2 ring-primary' : 'border-neutral-700'}`}>
              <div className='relative w-full h-full'>
                <Image src={src} alt={`${alt ?? 'Preview'} ${idx + 1}`} unoptimized fill className='object-cover' />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
