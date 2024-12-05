import { useState, useEffect } from 'react';
import BrandTable from '../../components/BrandTable';
import AddBrandForm from '../../components/AddBrandForm';

export default function BrandsDashboard() {
  const [brands, setBrands] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch('/api/brands', {
        method: 'GET',
        credentials: 'include', // To include user session or token
      });
      const data = await response.json();
      setBrands(data);
    }
    fetchBrands();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Brand Management</h1>
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add a New Brand</h2>
        <AddBrandForm onSuccess={handleRefresh} />
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Brands</h2>
        <BrandTable brands={brands} onRefresh={handleRefresh} />
      </div>
    </div>
  );
}
