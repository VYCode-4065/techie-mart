import React from 'react'
import { Button } from './ui/button'

const Search = () => {
  return (
    <div className='border border-slate-500 lg:min-w-2xl pl-3 rounded-2xl flex items-center overflow-hidden shadow-teal-500 hover:shadow-lg duration-300'>
        <input type="text" className='w-full outline-none' placeholder='Search the gadget'/>
        <Button className='bg-teal-500 rounded-none text-lg text-slate-50 font-normal'>Search</Button>
    </div>
  )
}

export default Search