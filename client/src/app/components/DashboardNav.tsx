'use client'

import Link from 'next/link'
import { UserButton } from "@clerk/nextjs"
import { usePathname } from 'next/navigation'

export default function DashboardNav() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-between gap-4 p-5">
            <div className="links">
                <Link
                    href="/dashboard/create"
                    className={`px-4 py-2 rounded-lg transition-colors ${pathname === '/dashboard/create'
                            ? 'bg-cyan-500 text-white'
                            : 'text-gray-300 hover:bg-cyan-500/10'
                        }`}
                >
                    Create
                </Link>
                <Link
                    href="/dashboard/images"
                    className={`px-4 py-2 rounded-lg transition-colors ${pathname === '/dashboard/images'
                            ? 'bg-cyan-500 text-white'
                            : 'text-gray-300 hover:bg-cyan-500/10'
                        }`}
                >
                    Images
                </Link>
            </div>
            <UserButton />
        </nav>
    )
}