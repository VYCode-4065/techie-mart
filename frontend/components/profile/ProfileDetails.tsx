import Image from 'next/image'
import { Button } from '@/components/ui/button'

type User = {
  name: string
  email: string
  gender?: string
  age?: number
  memberSince?: string
  avatar?: string
}

export default function ProfileDetails({ user }: { user: User }) {
  return (
    <section className='rounded-lg bg-neutral-900 border border-neutral-800 p-6'>
      <div className='flex items-center gap-4'>
        <div className='w-20 h-20 rounded-full overflow-hidden bg-neutral-800 shrink-0'>
          <Image src={user.avatar || 'https://picsum.photos/seed/me/200/200'} alt='avatar' unoptimized width={200} height={200} className='object-cover' />
        </div>
        <div>
          <h2 className='text-xl font-semibold'>{user.name}</h2>
          <div className='text-sm text-gray-400'>{user.email}</div>
          <div className='text-sm text-gray-400 mt-1'>Member since {user.memberSince ?? 'Jan 2024'}</div>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-3 gap-4'>
        <div className='p-3 bg-neutral-800 rounded'>
          <div className='text-xs text-gray-400'>Gender</div>
          <div className='font-medium'>{user.gender ?? 'Not specified'}</div>
        </div>
        <div className='p-3 bg-neutral-800 rounded'>
          <div className='text-xs text-gray-400'>Age</div>
          <div className='font-medium'>{user.age ?? '—'}</div>
        </div>
        <div className='p-3 bg-neutral-800 rounded'>
          <div className='text-xs text-gray-400'>Orders</div>
          <div className='font-medium'>View below</div>
        </div>
      </div>

      <div className='mt-6 flex gap-3'>
        <Button variant='outline' size='sm'>Edit Profile</Button>
        <Button variant='ghost' size='sm'>Account Settings</Button>
      </div>
    </section>
  )
}
