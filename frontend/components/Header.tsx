'use client'
import Image from 'next/image'
import Logo from '@/public/logo.png'
import Link from 'next/link'
import Search from './Search'
import { ShoppingBag, ShoppingCartIcon, User } from 'lucide-react'
import { useState } from 'react'
import ShoppingCart from './ShoppingCart'


const Header = () => {
  const [openShoppingCart,setOpenShoppingCart] = useState<boolean>(false);

  return (
    <div className='w-full lg:px-5 py-3 bg-slate-950 text-slate-50 border-b border-slate-600'>
      <ul className='flex items-center justify-between px-5'>
        <li className='flex-1'>
          <Link href={'/'}><Image src={Logo} alt='logo' className='w-32 md:w-42'/></Link>
        </li>
        <li className='hidden md:block flex-2'>
          <Search/>
        </li>
        <li className='flex gap-3 flex-1 justify-end'>
          <Link href={'/login'} className='flex px-2 py-1 rounded-sm gap-1 hover:shadow-lg shadow-teal-500 duration-300 hover:scale-95'>
          <User/>
          <span>Register/Login</span>
          </Link>
          <li className='flex gap-1 cursor-pointer px-2 py-1 rounded-sm shadow-lg hover:shadow-teal-500 duration-300 hover:scale-95'>
          <ShoppingBag/>
            <span>Cart</span>
          </li>
        </li>
        <li>
        </li>
        <li className='md:hidden w-full'>
          {/* <Search/> */}
        </li>
      </ul>
      <div>
        {openShoppingCart && <ShoppingCart close = {()=>setOpenShoppingCart(prev=>!prev)}/>}
      </div>
    </div>
  )
}

export default Header