"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

const dummySidebar = {
  favorites: ["My Day", "Important", "Personal", "All", "Completed", "Assigned to me"],
  tags: ["GoPay", "Kretya Studio", "Content Dump"],
}

export default function Sidebar() {
  const [search, setSearch] = useState("")

  // State for favorites counts
  const [favoriteCounts, setFavoriteCounts] = useState<number[]>([])
  // State for tag counts
  const [tagCounts, setTagCounts] = useState<number[]>([])

  useEffect(() => {
    // Generate random counts only on client side after mount
    setFavoriteCounts(dummySidebar.favorites.map(() => Math.floor(Math.random() * 10)))
    setTagCounts(dummySidebar.tags.map(() => Math.floor(Math.random() * 5)))
  }, [])

  return (
    <aside className="w-75 h-screen bg-white border-r px-4 py-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">ToDo App</h2>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Favorites</h3>
        <ul className="space-y-2">
          {dummySidebar.favorites.map((item, index) => (
            <li key={item}>
              <Link
                href="#"
                className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
              >
                <span>{item}</span>
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  {favoriteCounts[index] ?? "-"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Your own tags</h3>
        <ul className="space-y-2">
          {dummySidebar.tags.map((tag, index) => (
            <li key={tag}>
              <Link
                href="#"
                className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600"
              >
                <span>{tag}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                  {tagCounts[index] ?? "-"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
