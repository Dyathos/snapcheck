// components/common/AddButton.tsx
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'

interface AddButtonProps {
  href: string
  label: string
}

export default function AddButton({ href, label }: AddButtonProps) {
  return (
    <div className="p-4">
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-1" />
        <span>{label}</span>
      </Link>
    </div>
  )
}