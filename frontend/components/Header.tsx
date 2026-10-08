'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import Logo from '@/public/logo.png'
import Search from './Search'
import ShoppingCart from './ShoppingCart'

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-700/70 bg-slate-950/90 text-slate-50 shadow-[0_10px_40px_-22px_rgba(20,184,166,0.55)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-18 max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="group shrink-0" aria-label="Techie Mart home"><Image src={Logo} alt="Techie Mart" className="w-28 transition-transform duration-300 group-hover:scale-[1.03] sm:w-32" priority /></Link>
        <div className="hidden flex-1 px-5 md:block"><Search /></div>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link href="/login" className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-teal-300 sm:flex"><User size={18} /><span>Login</span></Link>
          <button type="button" onClick={() => setIsCartOpen((isOpen) => !isOpen)} aria-expanded={isCartOpen} aria-controls="shopping-cart" className="group relative flex items-center gap-2 rounded-xl border border-teal-400/20 bg-teal-400/8 px-3 py-2 text-sm font-semibold text-teal-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300/45 hover:bg-teal-400/15 hover:shadow-lg hover:shadow-teal-500/15 active:translate-y-0"><ShoppingBag size={19} className="transition-transform duration-300 group-hover:scale-110" /><span className="hidden sm:inline">Cart</span><span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-slate-950 bg-teal-400 px-1 text-[10px] font-bold text-slate-950">2</span></button>
          <button type="button" onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)} className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition-colors hover:bg-slate-800 hover:text-teal-300 md:hidden" aria-label="Toggle navigation menu" aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      <div className={`overflow-hidden transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'max-h-40 border-t border-slate-800 opacity-100' : 'max-h-0 opacity-0'}`}><div className="space-y-3 px-4 py-4"><Search /><Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-teal-300"><User size={18} /> Register / Login</Link></div></div>
      <ShoppingCart isOpen={isCartOpen} close={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header
