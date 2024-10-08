'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { addProduct } from '../store/productSlice';
import { List, Input, Button, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.selectedProducts);
  const [newProductName, setNewProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  const handleAddProduct = () => {
    if (newProductName && selectedCategory) {
      dispatch(
        addProduct({ name: newProductName, category: selectedCategory })
      );
      setNewProductName('');
      setSelectedCategory('');
    }
  };

  const handleViewDetails = () => {
    router.push('/details');
  };

  return (
    <div>
      <Select
        placeholder="Select Category"
        style={{ width: 200, marginBottom: 10 }}
        onChange={(value) => setSelectedCategory(value)}
        value={selectedCategory}
      >
        <Option value="Dairy">Dairy</Option>
        <Option value="Meat">Meat</Option>
        <Option value="Vegetables">Vegetables</Option>
      </Select>
      <Input
        placeholder="Enter product name"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
        style={{ width: 200, marginRight: 10 }}
      />
      <Button type="primary" onClick={handleAddProduct}>
        הוסף
      </Button>

      <List
        style={{ marginTop: 20, color: '#ffffff' }}
        dataSource={Object.entries(
          products.reduce<
            Record<string, { id: string; name: string; category: string }[]>
          >((acc, product) => {
            if (!acc[product.category]) {
              acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
          }, {})
        )}
        renderItem={([category, items]) => (
          <List.Item>
            <div>
              <h3 style={{ color: '#ffffff' }}>{category}</h3>
              <ul>
                {items.map((product) => (
                  <li key={product.id} style={{ color: '#ffffff' }}>
                    {product.name}
                  </li>
                ))}
              </ul>
            </div>
          </List.Item>
        )}
      />
      <Button
        type="primary"
        onClick={handleViewDetails}
        style={{ marginTop: 20 }}
      >
        Go to Details
      </Button>
    </div>
  );
};

export default ProductList;
