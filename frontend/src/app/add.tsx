// src/app/add/page.tsx
import React, { useState } from 'react';

interface ProductForm {
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: string;
}

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    price: 0,
    description: '',
    category: '',
    quantity: '',
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage('Product added successfully!');
      setFormData({
        name: '',
        price: 0,
        description: '',
        category: '',
        quantity: '',
      });
    } else {
      setMessage('Error adding product.');
    }
  };

  return (
    <div>
      <h1>Add a product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name of product</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add the product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
