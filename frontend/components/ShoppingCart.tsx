'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import boatImage from '@/public/product-image/boatImage.webp'

type ShoppingCartProps = { isOpen: boolean; close: () => void }

const subscribeToClient = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

const ShoppingCart = ({ isOpen, close }: ShoppingCartProps) => {
  const isMounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot)
  const [quantity, setQuantity] = useState(1)
  const [isItemInCart, setIsItemInCart] = useState(true)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, close])

  if (!isMounted) return null

  const subtotal = quantity * 499
  const cart = (
    <div className={`fixed inset-0 z-100 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <button type="button" onClick={close} className={`absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} aria-label="Close shopping cart" tabIndex={isOpen ? 0 : -1} />
      <aside id="shopping-cart" role="dialog" aria-modal="true" aria-label="Shopping cart" className={`absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col border-l border-slate-700/80 bg-[linear-gradient(160deg,#0f172a,#020617)] shadow-2xl shadow-slate-950 transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/10 text-teal-300"><ShoppingBag size={20} /></span><div><h2 className="font-semibold text-slate-50">Your cart</h2><p className="text-xs text-slate-400">2 carefully selected items</p></div></div><button type="button" onClick={close} className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-slate-50" aria-label="Close cart"><X size={20} /></button></div>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {isItemInCart ? <div className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-3"><Image src={boatImage} alt="boAt wireless headphones" className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-medium text-slate-100">boAt Rockerz Wireless Headphones</p><p className="mt-1 text-sm font-semibold text-teal-300">&#8377;499</p><div className="mt-2 flex items-center justify-between"><div className="flex items-center rounded-lg border border-slate-700"><button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="p-1.5 text-slate-400 hover:text-teal-300" aria-label="Decrease quantity"><Minus size={14} /></button><span className="w-7 text-center text-sm font-semibold">{quantity}</span><button type="button" onClick={() => setQuantity((current) => current + 1)} className="p-1.5 text-slate-400 hover:text-teal-300" aria-label="Increase quantity"><Plus size={14} /></button></div><button type="button" onClick={() => setIsItemInCart(false)} className="text-xs text-slate-500 transition hover:text-rose-300">Remove</button></div></div></div> : <div className="grid min-h-52 place-items-center rounded-2xl border border-dashed border-slate-700 p-6 text-center"><div><ShoppingBag className="mx-auto mb-3 text-slate-500" /><p className="font-semibold text-slate-200">Your cart is empty</p><p className="mt-1 text-sm text-slate-500">Add something you&apos;ll love.</p></div></div>}
      </div>
      <div className="border-t border-slate-800 bg-slate-950/40 p-5"><div className="mb-4 flex justify-between text-sm text-slate-400"><span>Subtotal</span><span className="font-semibold text-slate-100">&#8377;{isItemInCart ? subtotal : 0}</span></div>{isItemInCart ? <Link href="/product_cart" onClick={close} className="brand-btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-lg shadow-teal-500/15 transition hover:brightness-110">Secure checkout <ArrowRight size={17} /></Link> : <button type="button" onClick={close} className="brand-btn flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition hover:brightness-110">Continue shopping</button>}<p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500"><ShieldCheck size={14} className="text-teal-400" /> Encrypted and secure checkout</p></div>
    </aside>
  </div>
  )

  return createPortal(cart, document.body)
}

export default ShoppingCart
