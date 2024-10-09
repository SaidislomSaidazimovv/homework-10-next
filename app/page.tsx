import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <Link href="admin">
        <span className="bg-white text-green-500 py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 hover:text-white transition duration-300">
          Go to Admin
        </span>
      </Link>
    </div>
  );
}
