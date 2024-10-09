import React from "react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="w-[300px] bg-gray-500 h-[450vh] p-5 shadow-lg">
      <h1 className="text-white text-2xl font-bold mb-6">SideBar</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/admin/products">
          <div className="bg-white text-green-500 py-2 px-4 rounded hover:bg-green-600 hover:text-white transition duration-300">
            Products
          </div>
        </Link>
        <Link href="/admin/users">
          <div className="bg-white text-green-500 py-2 px-4 rounded hover:bg-green-600 hover:text-white transition duration-300">
            Users
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
