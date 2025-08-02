"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function WelcomePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl shadow-gray-800/30 rounded-xl p-12 text-center w-full max-w-2xl">
        <Image
          src="/todo1.png"
          alt="Welcome"
          width={400}
          height={300}
          className="mx-auto mb-8"
        />
        <h1 className="text-3xl font-bold mb-6">Welcome to TO DO APP!</h1>
        <button
          onClick={handleContinue}
          className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
