import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h- w-screen py-1 bg-red-600'>
        <nav>
            <Link href={'/'}>Home</Link>
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
            <Link href={'/about-us'}>About Us</Link>
            <Link href={'/search'}>Search</Link>
        </nav>
    </div>
  )
}

export default Navbar