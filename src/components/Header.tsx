"use client"

import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Tracker</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <button onClick={() => router.push("/")} className="hover:text-gray-300">
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
