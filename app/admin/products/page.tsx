"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/components/sideBar/SideBar";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await response.json();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      const updatedProducts = products.filter(
        (product) => product.id !== deleteId
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setDeleteId(null);
      setModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setModalOpen(false);
  };

  return (
    <div className="flex bg-white">
      <SideBar />

      <main className="flex-1 p-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 relative"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h2 className="text-lg line-clamp-1 font-semibold mt-2 text-black hover:text-indigo-600 transition-colors duration-200">
                  {product.title}
                </h2>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-sm line-clamp-2 text-blue-400 mt-2">
                  {product.description.substring(0, 100)}...
                </p>
                <div>
                  <button className="mr-20 mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105">
                    Add to Cart
                  </button>
                  <button
                    className=" top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300 shadow-md"
                    onClick={() => handleDelete(product.id)}
                  >
                    <span className="text-xl">🗑️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-black">
                O'chirishni tasdiqlang
              </h3>
              <p className="mb-4 text-black">
                Siz ushbu mahsulotni o'chirmoqchimisiz?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                  onClick={confirmDelete}
                >
                  O'chirish
                </button>
                <button
                  className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
                  onClick={cancelDelete}
                >
                  Yo'q
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
