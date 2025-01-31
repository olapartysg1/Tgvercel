import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome</h1>
        <div className="space-y-4">
          <Link
            href="/login1"
            className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition duration-300"
          >
            Login Page 1
          </Link>
          <Link
            href="/login2"
            className="block w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-center transition duration-300"
          >
            Login Page 2
          </Link>
        </div>
      </div>
    </div>
  )
}

