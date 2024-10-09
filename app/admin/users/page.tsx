"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/components/sideBar/SideBar";

interface User {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  phone: string;
  username: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/users");
        const data: User[] = await res.json();
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setLoading(false);
    } else {
      fetchUsers();
    }
  }, []);

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1 p-5">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {users.map((user) => (
              <div
                key={user.id}
                className="border p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-green-400 relative"
              >
                <h2 className="text-lg font-semibold mt-2">
                  {user.name.firstname} {user.name.lastname}
                </h2>
                <p className="text-gray-700">Username: {user.username}</p>
                <p className="text-gray-500">Email: {user.email}</p>
                <p className="text-gray-500">Phone: {user.phone}</p>
                <div className="absolute bottom-2 right-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UsersPage;
