'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import LoginImage from '@/public/loginImage.png'
import Logo from '@/public/logo.png'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // Call your backend login API here
      console.log('Login attempt:', formData)
      // Example: const response = await fetch('/api/v1/user/login', {...})
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-screen flex overflow-hidden bg-slate-950'>
      {/* Left Section - Marketing */}
      <div className='hidden lg:flex lg:w-1/2  flex-col items-center justify-center'>
        
        <div className='w-full h-full'>
          <Image src={LoginImage}  alt='Login Image' className='m-auto rounde h-full w-full'/>
        </div>
          
      </div>

      {/* Right Section - Form */}
      <div className='w-full h- lg:h-auto lg:w-1/2 flex items-center justify-center lg:p-4'>
        <div className='w-full max-w-md'>
          <div className='bg-slate-900 border border-slate-700 md:rounded-2xl p-8 shadow-2xl'>
            
            {/* Header */}
            <div className='mb-8'>
              <div className='grid mb-4'>
                <Link href={'/'} className='flex items-start'>
                <Image src={Logo} alt='logo' className='w-36'/>  
                </Link>
              <h1 className='text-3xl font-bold text-white mb-2 pt-2'>Log In</h1>
              <p className='text-slate-400'>Please login to continue to your account.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className='mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg'>
                <p className='text-red-400 text-sm'>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-5'>
              
              {/* Email Field */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-slate-300 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='example@email.com'
                  className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition'
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-slate-300 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder='Enter your password'
                    className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition pr-12'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400 transition'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className='flex items-center justify-between'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className='w-4 h-4 rounded border-teal-500 bg-slate-800 border accent-teal-600 cursor-pointer'
                  />
                  <span className='text-sm text-slate-400'>Keep me logged in</span>
                </label>
                <Link href='/forgot-password' className='text-sm text-teal-400 hover:text-teal-300 transition'>
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Divider */}
            <div className='my-6 flex items-center gap-4'>
              <div className='flex-1 h-px bg-slate-700'></div>
              <span className='text-slate-500 text-sm'>or</span>
              <div className='flex-1 h-px bg-slate-700'></div>
            </div>

            {/* Google Login */}
            <button
              type='button'
              className='w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2'
            >
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <image href='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%234285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/%3E%3Cpath fill="%2334A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/%3E%3Cpath fill="%23FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/%3E%3Cpath fill="%23EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/%3E%3Cpath fill="none" d="M1 1h22v22H1z"/%3E%3C/svg%3E' width='20' height='20' />
              </svg>
              Sign in with Google
            </button>

            {/* Sign Up Link */}
            <p className='text-center text-slate-400 text-sm mt-6'>
              New to TechieMart?{' '}
              <Link href='/register' className='text-teal-400 hover:text-teal-300 font-semibold transition'>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage