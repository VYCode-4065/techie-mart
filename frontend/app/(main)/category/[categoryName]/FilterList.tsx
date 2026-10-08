'use client'

import Dropdown from '@/components/Dropdown'
import { IndianRupee, Star } from 'lucide-react'
import { useState } from 'react'

const FilterList = () => {
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isRatingOpen, setIsRatingOpen] = useState(false)

  return (
    <ul className="flex items-center gap-3">
      <li className="relative">
        <div
          aria-expanded={isPriceOpen}
          aria-haspopup="true"
          onClick={() => setIsPriceOpen((current) => !current)}
          className="flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-sm font-semibold text-slate-100 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500"
        >
          <IndianRupee size={16} />
          <span>By Price</span>
        </div>
        <Dropdown title="By Price" items={['Low-To-High', 'High-To-Low']} isOpen={isPriceOpen} />
      </li>
      <li className="relative">
       <div
          aria-expanded={isRatingOpen}
          aria-haspopup="true"
          onClick={() => setIsRatingOpen((current) => !current)}
          className="flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-sm font-semibold text-slate-100 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500"
        >
        <Star size={16} />
          <span>By Ratings</span>
          <Dropdown title="By Ratings" items={[ '5 Star','4 Star','3 Star']} isOpen={isRatingOpen} />
        </div>
          </li>
    </ul>
  )
}

export default FilterList