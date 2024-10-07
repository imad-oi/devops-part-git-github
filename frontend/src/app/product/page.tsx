"use client"
import React, { useState } from 'react'

function page() {
    const [items, setItems] = useState([
        { id: 1, name: "Item 1", price: 100, description: "Description 1", category: "Category 1", quantity: 50 },
        { id: 2, name: "Item 2", price: 200, description: "Description 2", category: "Category 2", quantity: 30 }
      ]);
    
      // Add new item function
      const addItem = () => {
        const newItem = {
          id: items.length + 1,
          name: `Item ${items.length + 1}`,
          price: Math.floor(Math.random() * 500),
          description: `Description ${items.length + 1}`,
          category: `Category ${items.length + 1}`,
          quantity: Math.floor(Math.random() * 100)
        };
        setItems([...items, newItem]);
      };
    
      // Edit item function
      const editItem = (id:any) => {
        const editedItems = items.map((item:any) =>
          item.id === id ? { ...item, name: "Edited Item", price: 999 } : item
        );
        setItems(editedItems);
      };
    
      // Delete item function
      const deleteItem = (id:any) => {
        const filteredItems = items.filter((item:any) => item.id !== id);
        setItems(filteredItems);
      };
    
      return (
        <div className="container mx-auto p-4">
          {/* Button Add */}
          <div className="flex justify-end mb-4">
            <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Item
            </button>
          </div>
    
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item:any) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">${item.price}</td>
                    <td className="px-4 py-2 border">{item.description}</td>
                    <td className="px-4 py-2 border">{item.category}</td>
                    <td className="px-4 py-2 border">{item.quantity}</td>
                    <td className="px-4 py-2 border flex space-x-2">
                      <button
                        onClick={() => editItem(item.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default page