'use client'

import Image from 'next/image'
import { Heart, Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { useState } from 'react'
import boatImage from '@/public/product-image/boatImage.webp'

const ProductCart = () => {
  const [quantity, setQuantity] = useState(1)
  const [isSaved, setIsSaved] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const price = 499
  const originalPrice = 799

  return (
    <article className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-700/70 bg-[linear-gradient(155deg,rgba(15,23,42,0.98),rgba(2,6,23,0.99))] p-3 text-slate-50 shadow-[0_24px_65px_-30px_rgba(20,184,166,0.48)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/45 hover:shadow-[0_32px_80px_-30px_rgba(20,184,166,0.55)]">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900"><Image src={boatImage} alt="boAt Rockerz Wireless Headphones" className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" /><span className="absolute left-3 top-3 rounded-full border border-teal-300/25 bg-slate-950/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-200 backdrop-blur-md">Best seller</span><button type="button" onClick={() => setIsSaved((saved) => !saved)} aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'} className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 ${isSaved ? 'border-rose-400/40 bg-rose-500 text-white' : 'border-white/15 bg-slate-950/50 text-white hover:scale-110 hover:bg-white hover:text-rose-500'}`}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button><div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-950/70 px-2.5 py-1.5 text-xs font-medium backdrop-blur-md"><Star size={14} className="fill-amber-400 text-amber-400" /><span>4.8</span><span className="text-slate-400">(2.4k)</span></div></div>
      <div className="px-2 pb-2 pt-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">boAt Audio</p><h3 className="mt-1 text-lg font-bold leading-tight text-slate-50">Rockerz 450 Pro Wireless Headphones</h3><p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-400">Immersive sound, long battery life and a lightweight fit for every playlist.</p><div className="mt-4 flex items-end justify-between"><div><div className="flex items-baseline gap-2"><span className="text-2xl font-bold text-slate-50">&#8377;{price}</span><span className="text-sm text-slate-500 line-through">&#8377;{originalPrice}</span></div><p className="mt-0.5 text-xs font-semibold text-teal-400">Save &#8377;{originalPrice - price} &middot; 38% off</p></div><span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-300">In stock</span></div><div className="mt-5 flex gap-3"><div className="flex items-center rounded-xl border border-slate-700 bg-slate-900/70"><button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="grid h-11 w-10 place-items-center text-slate-400 transition hover:text-teal-300" aria-label="Decrease quantity"><Minus size={17} /></button><span className="w-7 text-center text-sm font-bold">{quantity}</span><button type="button" onClick={() => setQuantity((current) => current + 1)} className="grid h-11 w-10 place-items-center text-slate-400 transition hover:text-teal-300" aria-label="Increase quantity"><Plus size={17} /></button></div><button type="button" onClick={() => setIsAdded(true)} className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-all duration-300 ${isAdded ? 'bg-teal-300 text-slate-950' : 'brand-btn shadow-lg shadow-teal-500/15 hover:-translate-y-0.5 hover:brightness-110'}`}><ShoppingBag size={17} />{isAdded ? 'Added to cart' : 'Add to cart'}</button></div></div>
    </article>
  )
}

export default ProductCart
