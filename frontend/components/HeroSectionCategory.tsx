import React from 'react'
import Product from './Product'
import { ProductCategories, createCategorySlug } from '@/lib/product-categories'
import Link from 'next/link'

const HerosectionCategory = () => {
  return (
    <section className='brand-shell w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8'>
      <div className='mx-auto max-w flex items-center flex-col gap-7'>
        {
          ProductCategories.map((category,idx)=>
            {
              if(idx<5) return <div key={idx}>
            <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='brand-pill inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]'>Featured Collection</p>
            <h3 className='brand-section-title mt-3 text-2xl font-semibold sm:text-3xl'>{category.title}</h3>
            <p className='brand-section-subtitle mt-2 max-w-2xl text-sm sm:text-base'>{category.description}</p>
          </div>
          <Link href={`/category/${createCategorySlug(category.title)}`} className='brand-btn-secondary hidden rounded-full px-4 py-2 text-sm font-medium sm:inline-flex hover:scale-95 duration-300'>View all</Link>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        </div>}
          )
        }
      </div>
    </section>
  )
}

export default HerosectionCategory