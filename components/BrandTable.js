import React from 'react';

export default function BrandTable({ brands, onRefresh }) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border">Logo</th>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Description</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => (
          <tr key={brand._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border">
              <img
                src={brand.logoUrl || '/images/placeholder.png'}
                alt={`${brand.name} Logo`}
                className="h-12 w-12 object-cover"
              />
            </td>
            <td className="px-4 py-2 border">{brand.name}</td>
            <td className="px-4 py-2 border">{brand.description}</td>
            <td className="px-4 py-2 border">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => alert('Edit feature coming soon!')}
              >
                Edit
              </button>{' '}
              <button
                className="text-red-500 hover:underline"
                onClick={() => alert('Delete feature coming soon!')}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
