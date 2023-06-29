"use client"
import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">

            <Link href="/">
              <button className="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </button>
            </Link>

            <Link href="/books">
              <button className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Books
              </button>
            </Link>

            <Link href="/authors">
              <button className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Authors
              </button>
            </Link>

            <Link href="/customers">
              <button className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Customers
              </button>
            </Link>

            <Link href="/publishers">
              <button className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Publishers
              </button>
            </Link>

            <Link href="/shelves">
              <button className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Shelves
              </button>
            </Link>

            <Link href="/trucks">
              <button className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Trucks
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;