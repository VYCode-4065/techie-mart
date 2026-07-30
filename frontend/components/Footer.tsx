import { Copyright } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
    
  return (
    <div className='lg:h-14 bg-slate-950 lg:px-10 lg:py-1'>
        <nav className='flex items-center justify-between flex-col lg:flex-row gap-3 lg:gap-0 py-10 lg:py-0 h-full'>
            <h3><Link href={'/'}><Image src={Logo} alt='logo' className='h-10 rounded-xl w-full'/></Link></h3>
            <ul className='flex items-center gap-7 text-slate-300'>
                <li className='hover:underline'>
                    <Link href={'/'}>Home</Link>
                </li>
                <li  className='hover:underline'>
                    <Link href={'/privacy-policy'}>Privacy Policy</Link>
                </li>
                <li className='hover:underline'>
                    <Link href={'/term-condition'}>Term & Conditon </Link>
                </li>
            </ul>
            <h5 className='flex items-center gap-1 text-sm text-slate-300'>
                <Copyright size={18}/>2026 All right reserved to Techie Mart.
            </h5>
        </nav>
    </div>
  )
}

export default Footer