'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../store/useAuth'
import { setAuthToken } from '../lib/api'

export default function Header() {
  const router = useRouter()
  const { token, setToken, setUser } = useAuth()

  function logout() {
    setToken(null)
    setUser(null)
    setAuthToken(undefined)
    router.push('/signin')
  }

  return (
    <header className="w-full bg-[#8EC5C0] text-[#2B3A3A] px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold tracking-wide">
        <Link href="/signin">Keep Notes</Link>
      </h1>

      <nav className="hidden md:flex gap-6 font-medium">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/notes" className="hover:underline">Notes</Link>
        <Link href="/account" className="hover:underline">Account</Link>

        {token ? (
          <button
            onClick={logout}
          
          >
            Logout
          </button>
        ) : (
          <Link href="/signin" className="hover:underline">Login</Link>
        )}
      </nav>
    </header>
  )
}
