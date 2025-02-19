import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import All from "../pages/All";
import Orders from "../pages/Orders";
import Clothes from "../pages/Clothes";
import Electronics from "../pages/Electronics";
import Furniture from "../pages/Furniture";
import Toys from "../pages/Toys";
import Cart from "../components/Cart";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity?: number;
}

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage when the app loads
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      {/* Pass cart and state functions to Navbar */}
      <Navbar cart={cart} setIsCartOpen={setIsCartOpen} />

      <div className="mt-[70px]">
        <Routes>
          <Route path="/" element={<All cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/clothes" element={<Clothes cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />} />
          <Route path="/electronics" element={<Electronics cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />} />
          <Route path="/furniture" element={<Furniture cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />} />
          <Route path="/toys" element={<Toys cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />} />
        </Routes>
      </div>

      {/* Ensure Cart is always accessible and doesn't get reset */}
      {isCartOpen && <Cart cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />}
    </Router>
  );
};

export default App;
