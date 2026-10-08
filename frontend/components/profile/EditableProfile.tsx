"use client"
import { useState } from 'react'
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

export default function EditableProfile({ initial }: { initial: User }) {
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState<User>(initial)
  const [draft, setDraft] = useState<User>(initial)

  function start() {
    setDraft(user)
    setEditing(true)
  }

  function cancel() {
    setEditing(false)
  }

  function save() {
    setUser(draft)
    setEditing(false)
  }

  return (
    <section className='rounded-lg bg-neutral-900 border border-neutral-800 p-6'>
      <div className='flex items-start gap-4'>
        <div className='w-20 h-20 rounded-full overflow-hidden shrink-0'>
          <Image src={user.avatar || 'https://picsum.photos/seed/me/200/200'} alt='avatar' unoptimized width={200} height={200} className='object-cover' />
        </div>

        <div className='flex-1'>
          {!editing ? (
            <>
              <h2 className='text-xl font-semibold'>{user.name}</h2>
              <div className='text-sm text-gray-400'>{user.email}</div>
              <div className='text-sm text-gray-400 mt-1'>Member since {user.memberSince ?? 'Jan 2024'}</div>
              <div className='mt-4 flex gap-2'>
                <Button size='sm' onClick={start}>Edit Profile</Button>
                <Button variant='ghost' size='sm'>Account Settings</Button>
              </div>
            </>
          ) : (
            <div className='space-y-3'>
              <div>
                <label className='text-xs text-gray-400'>Name</label>
                <input className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </div>
              <div>
                <label className='text-xs text-gray-400'>Email</label>
                <input className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
              </div>
              <div className='flex gap-2'>
                <div className='flex-1'>
                  <label className='text-xs text-gray-400'>Gender</label>
                  <select className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' value={draft.gender} onChange={(e) => setDraft({ ...draft, gender: e.target.value })}>
                    <option value=''>Prefer not to say</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
                <div style={{ width: 120 }}>
                  <label className='text-xs text-gray-400'>Age</label>
                  <input type='number' className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' value={draft.age ?? ''} onChange={(e) => setDraft({ ...draft, age: e.target.value ? Number(e.target.value) : undefined })} />
                </div>
              </div>

              <div>
                <label className='text-xs text-gray-400'>Avatar URL</label>
                <input className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' value={draft.avatar} onChange={(e) => setDraft({ ...draft, avatar: e.target.value })} />
              </div>

              <div className='flex gap-2'>
                <Button size='sm' onClick={save}>Save</Button>
                <Button variant='outline' size='sm' onClick={cancel}>Cancel</Button>
              </div>
            </div>
          )}
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
    </section>
  )
}
