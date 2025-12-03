import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import http from "../lib/http";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category_name: string | null;      
 
};

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const response = await http.get("/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const ok = window.confirm("Yakin mau hapus produk ini?");
    if (!ok) return;

    try {
      await http.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk");
    }
  }

  return (
    <div className="flex">
      <SideBar />

      <main className="flex-1 p-6">
        {/* header + tombol add */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Inventories</h1>

          <button
            onClick={() => navigate("/products/create")}
            className="px-4 py-2 rounded-md bg-[#163c77]   text-white text-sm"
          >
            + Add Product
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left w-16">No</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-right w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{index + 1}</td>

                  <td className="py-3 px-4 font-medium">
                    {product.name}
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {product.stock}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                      {product.price}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {product.category_name ? (
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        {product.category_name}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <NavLink
                        to={`/products/${product.id}/edit`}
                        className="px-3 py-1 text-xs border rounded-md"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 text-xs border rounded-md text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && products.length === 0 && (
                <tr>
                  <td
                    className="py-6 px-4 text-center text-gray-500"
                    colSpan={6}
                  >
                    Belum ada produk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
