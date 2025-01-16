import Link from 'next/link'
import { supabase } from '../../app/lib/supabaseClient'


export default function Header({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
    
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow mb-8">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-gray-900 dark:text-white">
          Discord-like Forum
        </Link>
        {user ? (
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300 mr-4">Welcome, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
            <Link
      href="/auth/sign-in"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      Login
    </Link>
        )}
      </div>
    </header>
  )
}

