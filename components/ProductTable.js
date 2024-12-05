import React from 'react';

export default function ProductTable({ products, onRefresh }) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border">Image</th>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Category</th>
          <th className="px-4 py-2 border">Price</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border">
              <img
                src={product.imageUrl || '/images/placeholder.png'}
                alt={`${product.name} Image`}
                className="h-12 w-12 object-cover"
              />
            </td>
            <td className="px-4 py-2 border">{product.name}</td>
            <td className="px-4 py-2 border">{product.category}</td>
            <td className="px-4 py-2 border">${product.price.toFixed(2)}</td>
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
