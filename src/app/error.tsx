'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Une erreur est survenue !
        </h2>
        <p className="mb-4 text-gray-600">
          {error.message || "Quelque chose s'est mal passé."}
        </p>
        <button
          onClick={reset}
          className="btn btn-primary"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
