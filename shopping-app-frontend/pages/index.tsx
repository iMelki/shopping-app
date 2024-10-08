// shopping-app-frontend/pages/index.tsx

import { useEffect, useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store"; // Use typed hooks
import { fetchCategories } from "@/store/categoriesSlice";
import { addProduct, removeProduct, Product } from "@/store/productsSlice";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // Select categories from Redux
  const categories = useAppSelector((state) => state.categories.items);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  
  // Local component state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  // Fetch categories on component mount
  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  // Handle adding a product
  const handleAddProduct = () => {
    if (selectedCategory && productName.trim()) {
      const newProduct: Product = {
        id: uuidv4(), // Generate unique ID
        category: selectedCategory,
        name: productName.trim(),
      };
      dispatch(addProduct({ product: newProduct }));
      setProductName("");
    }
  };

  // Handle navigating to Order Page
  const handleGoToOrder = () => {
    router.push("/order");
  };

  // Select selectedProducts from Redux
  const selectedProducts = useAppSelector((state) => state.products.selectedProducts);

  // Handle removing a product
  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct({ productId }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="category">Product Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="product">Product Name: </label>
        <input
          id="product"
          type="text"
          value={productName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <hr />
      <h2>Selected Products</h2>
      {selectedProducts.length === 0 ? (
        <p>No products selected.</p>
      ) : (
        <div>
          {/* Group products by category */}
          {Array.from(
            selectedProducts.reduce((acc, product) => {
              if (!acc.has(product.category)) {
                acc.set(product.category, []);
              }
              acc.get(product.category)?.push(product);
              return acc;
            }, new Map<string, Product[]>())
          ).map(([category, products]) => (
            <div key={category} style={{ marginBottom: "15px" }}>
              <h3>{category}</h3>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.name}
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleGoToOrder}
        disabled={selectedProducts.length === 0}
        style={{ marginTop: "20px" }}
      >
        Go to Order Page
      </button>
    </div>
  );
};

export default ShoppingCart;
