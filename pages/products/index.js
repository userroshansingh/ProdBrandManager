import { useState, useEffect } from 'react';
import ProductTable from '../../components/ProductTable';
import AddProductForm from '../../components/AddProductForm';

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products', {
        method: 'GET',
        credentials: 'include', // To include user session or token
      });
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product Management</h1>
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add a New Product</h2>
        <AddProductForm onSuccess={handleRefresh} />
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Products</h2>
        <ProductTable products={products} onRefresh={handleRefresh} />
      </div>
    </div>
  );
}
