'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import TechieRegister from '@/public/registerImage.png'
import Logo from '@/public/logo.png'
import { toast } from 'sonner'
import useRegister from '@/hooks/useRegister.hooks'
import { IRegister } from '@/types/auth.types'
import IResponse from '@/types/response.types'
import { useRouter } from 'next/navigation'
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    gender: 'MALE',
    agreedToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');

  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const validateForm = (): boolean => {
    if (!formData.email || !formData.username || !formData.name || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }
    
    if (!formData.agreedToTerms) {
      toast.error('You must agree to the Terms and Conditions')
      return false
    }
    
    return true
  }

  const handleSubmit = async(e: React.SubmitEvent) => {
    e.preventDefault()
    
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const res = await useRegister(formData as IRegister) as IResponse
     if(!res.success){
        toast.error(res.message);
        return;
      }
      toast.success('User register successfully !')
      router.push('/login')
    } catch (err) {
      setError('Registration failed. Please try again.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen flex overflow-hidden bg-slate-950'>

      {/* Left Section - Marketing */}
      <div className='flex-1 bg-linear-to-br from-teal-900 to-teal-700 flex-col items-center justify-center'>
        
        <Image src={TechieRegister} className='h-screen' alt='register image'/>
          
      </div>  

      {/* Right Section - Form */}
      <aside className='h-screen pt-20 md:w-full lg:pt-80 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]  lg:w-1/2 flex items-center justify-center'>
        <div className='w-full max-w-lg py-8'>
          <div className='bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl'>
            
            {/* Header */}
            <div className='mb-6 grid gap-3'>
              <Link href={'/'} className='flex items-start'>
              <Image src={Logo} alt='logo' className='w-42 items-start'/>  
              </Link>
              <h1 className='text-3xl font-bold text-white mb-2'>Create Account</h1>
              <p className='text-slate-400'>Join TechieMart and start shopping today.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className='mb-4 p-3 bg-red-600 bg-opacity-10 border border-red-400 border-opacity-30 rounded-lg text-blue-800'>
                <p className='text-slate-100 text-sm'>{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className='mb-4 p-3 bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 rounded-lg'>
                <p className='text-green-400 text-sm'>{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-4' method='POST'>
              
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
                  placeholder='your@email.com'
                  className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition'
                />
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-slate-300 mb-2'>
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder='Choose a username'
                  className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition'
                />
              </div>

              {/* Full Name Field */}
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-slate-300 mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='John Doe'
                  className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition'
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label htmlFor='gender' className='block text-sm font-medium text-slate-300 mb-2'>
                  Gender
                </label>
                <select
                  id='gender'
                  name='gender'
                  value={formData.gender}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition'
                >
                  <option value='MALE'>Male</option>
                  <option value='FEMALE'>Female</option>
                  <option value='OTHER'>Other</option>
                </select>
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
                    placeholder='Create a strong password'
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor='confirmPassword' className='block text-sm font-medium text-slate-300 mb-2'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder='Confirm your password'
                    className='w-full px-4 py-3 bg-slate-800 border border-teal-500 border-opacity-30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:border-opacity-100 focus:ring-1 focus:ring-teal-500 focus:ring-opacity-50 transition pr-12'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-400 transition'
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className='flex items-start gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  name='agreedToTerms'
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className='w-4 h-4 mt-1 rounded border-teal-500 bg-slate-800 border accent-teal-600 cursor-pointer shrink-0'
                />
                <span className='text-sm text-slate-400'>
                  I agree to the{' '}
                  <a href='#' className='text-teal-400 hover:text-teal-300 transition'>
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href='#' className='text-teal-400 hover:text-teal-300 transition'>
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Sign Up Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6'
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className='my-6 flex items-center gap-4'>
              <div className='flex-1 h-px bg-slate-700'></div>
              <span className='text-slate-500 text-sm'>or</span>
              <div className='flex-1 h-px bg-slate-700'></div>
            </div>

            {/* Google Sign Up */}
            <button
              type='button'
              className='w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2'
            >
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <image href='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%234285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/%3E%3Cpath fill="%2334A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/%3E%3Cpath fill="%23FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/%3E%3Cpath fill="%23EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/%3E%3Cpath fill="none" d="M1 1h22v22H1z"/%3E%3C/svg%3E' width='20' height='20' />
              </svg>
              Sign up with Google
            </button>

            {/* Login Link */}
            <p className='text-center text-slate-400 text-sm mt-6'>
              Already have an account?{' '}
              <Link href='/login' className='text-teal-400 hover:text-teal-300 font-semibold transition'>
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default RegisterPage