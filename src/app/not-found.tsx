import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Page non trouvée
        </h2>
        <p className="mb-4 text-gray-600">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          href="/"
          className="btn btn-primary"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
