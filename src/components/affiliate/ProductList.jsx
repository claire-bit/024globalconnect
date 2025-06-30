// src/components/affiliate/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { Clipboard, Check } from "lucide-react";
import toast from "react-hot-toast";

const ProductList = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products/");
        console.log("API response:", res.data);

        // Adjust depending on the structure: array, paginated, or object
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res.data.results)) {
          setProducts(res.data.results);
        } else if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          toast.error("Unexpected product data format.");
        }
      } catch (error) {
        toast.error("Failed to load products.");
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCopy = (productId) => {
    const link = `${window.location.origin}/products/${productId}?ref=${user?.username}`;
    navigator.clipboard.writeText(link);
    setCopied(productId);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(products) && products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow border">
          <img
            src={product.image}
            alt={product.name}
            className="h-40 w-full object-cover rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold">KES {product.price}</span>
            <button
              onClick={() => handleCopy(product.id)}
              className="flex items-center text-sm text-blue-500 hover:text-blue-700"
            >
              {copied === product.id ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <Clipboard className="w-4 h-4 mr-1" />
              )}
              {copied === product.id ? "Copied" : "Copy Link"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
