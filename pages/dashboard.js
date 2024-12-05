// dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import BrandTable from '../components/BrandTable.js';  // For listing and managing brands
import ProductTable from '../components/ProductTable.js';


export default function Dashboard() {
  const [brands, setBrands] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/login');
      } else {
        const res = await fetch('/api/brands');
        const data = await res.json();
        setBrands(data);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <BrandTable brands={brands} />
    </div>
  );
}
