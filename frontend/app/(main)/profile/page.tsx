import EditableProfile from '@/components/profile/EditableProfile'
import SavedAddresses from '@/components/profile/SavedAddresses'
import OrderHistory from '@/components/profile/OrderHistory'
import RecentlyViewed from '@/components/profile/RecentlyViewed'
import Image from 'next/image'

const mockUser = {
  name: 'Aman Sharma',
  email: 'aman@example.com',
  gender: 'Male',
  age: 28,
  memberSince: 'Mar 2023',
  avatar: 'https://picsum.photos/seed/user1/300/300'
}

const mockAddresses = [
  { id: 'a1', label: 'Home', line1: '221B Baker Street', city: 'London', zip: 'NW1' },
  { id: 'a2', label: 'Office', line1: '12 Park Ave', city: 'New York', zip: '10016' }
]

const mockOrders = new Array(4).fill(0).map((_, i) => ({
  id: `ORD-00${i + 1}`,
  date: `2026-0${i + 2}-10`,
  total: `${99 + i * 20}`,
  status: i % 2 === 0 ? 'Delivered' : 'Processing',
  items: [{ name: `Product ${i + 1}`, qty: 1, img: `https://picsum.photos/seed/order${i}/200/140` }]
}))

const mockViewed = new Array(6).fill(0).map((_, i) => ({ id: i + 1, name: `Viewed ${i + 1}`, price: `${49 + i * 10}`, img: `https://picsum.photos/seed/view${i}/400/300` }))

export default function Page() {
  return (
    <section className='min-h-screen px-6 py-8'>
      <div className='max-w-6xl mx-auto grid grid-cols-12 gap-8'>
        <main className='col-span-8 space-y-6'>
          <EditableProfile initial={mockUser} />
          <OrderHistory orders={mockOrders} />
          <RecentlyViewed items={mockViewed} />
        </main>

        <aside className='col-span-4 space-y-6'>
          <SavedAddresses initial={mockAddresses} />

          <section className='rounded-lg bg-neutral-900 border border-neutral-800 p-6'>
            <h3 className='text-lg font-semibold mb-4'>Account Summary</h3>
            <div className='text-sm text-gray-400'>
              Orders placed: <span className='font-medium'>24</span>
            </div>
            <div className='text-sm text-gray-400 mt-2'>
              Member since: <span className='font-medium'>{mockUser.memberSince}</span>
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}