import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVendorProducts = async () => {
    try {
      const response = await axios.get("/api/vendor/products"); 
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch vendor products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center mt-10 text-gray-500">No products added yet.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Products</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
          >
            <img
              src={product.image_url || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <p className="font-bold text-lg text-blue-600">Ksh {product.price}</p>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
