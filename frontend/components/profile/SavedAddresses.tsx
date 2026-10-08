"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Address = {
  id: string
  label: string
  line1: string
  city: string
  state?: string
  zip?: string
}

export default function SavedAddresses({ initial }: { initial?: Address[] }) {
  const [addresses, setAddresses] = useState<Address[]>(initial || [])
  const [editing, setEditing] = useState<string | null>(null)

  function addAddress() {
    const id = String(Date.now())
    setAddresses(a => [{ id, label: 'New Address', line1: '', city: '' }, ...a])
    setEditing(id)
  }

  function save(id: string, patch: Partial<Address>) {
    setAddresses(a => a.map(x => x.id === id ? { ...x, ...patch } : x))
    setEditing(null)
  }

  function remove(id: string) {
    setAddresses(a => a.filter(x => x.id !== id))
  }

  return (
    <div className='rounded-lg bg-neutral-900 border border-neutral-800 p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Saved Addresses</h3>
        <Button size='sm' onClick={addAddress}>Add</Button>
      </div>

      <div className='space-y-3'>
        {addresses.length === 0 && <div className='text-sm text-gray-400'>No saved addresses yet.</div>}

        {addresses.map(addr => (
          <div key={addr.id} className='p-3 bg-neutral-800 rounded flex flex-col gap-2'>
            {editing === addr.id ? (
              <div className='space-y-2'>
                <input className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' defaultValue={addr.label} onBlur={(e) => save(addr.id, { label: e.currentTarget.value })} />
                <input className='w-full p-2 rounded bg-neutral-900 border border-neutral-700' defaultValue={addr.line1} onBlur={(e) => save(addr.id, { line1: e.currentTarget.value })} />
                <div className='flex gap-2'>
                  <input className='flex-1 p-2 rounded bg-neutral-900 border border-neutral-700' defaultValue={addr.city} onBlur={(e) => save(addr.id, { city: e.currentTarget.value })} />
                  <input className='w-24 p-2 rounded bg-neutral-900 border border-neutral-700' defaultValue={addr.zip} onBlur={(e) => save(addr.id, { zip: e.currentTarget.value })} />
                </div>
                <div className='flex gap-2'>
                  <Button size='sm' onClick={() => setEditing(null)}>Done</Button>
                  <Button variant='destructive' size='sm' onClick={() => remove(addr.id)}>Remove</Button>
                </div>
              </div>
            ) : (
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <div className='text-sm font-medium'>{addr.label}</div>
                  <div className='text-xs text-gray-400'>{addr.line1}, {addr.city} {addr.zip}</div>
                </div>
                <div className='flex flex-col gap-2'>
                  <Button size='sm' onClick={() => setEditing(addr.id)}>Edit</Button>
                  <Button variant='ghost' size='sm' onClick={() => remove(addr.id)}>Delete</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
