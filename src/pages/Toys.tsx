import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface CategoryProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toys: React.FC<CategoryProps> = ({ cart, setCart, setIsCartOpen }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products/?categoryId=5")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    setIsCartOpen(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Toys</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-44 rounded-md focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading toys...</p>
      ) : (
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 justify-center">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.images[0]}
              category="Toys"
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Toys;
