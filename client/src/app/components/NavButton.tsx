'use client'

import Link from 'next/link'

export function NavButton({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-cyan-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-cyan-400/20 outline-none"
    >
      {children}
    </Link>
  )
}