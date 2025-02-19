import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
  quantity?: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Product[]>([]);

  // Load orders from localStorage when the page loads
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders placed yet.</p>
      ) : (
        <div className="grid grid-cols-4 gap-x-4 gap-y-6 justify-center">
          {orders.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.images[0]}
              category={product.category.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
