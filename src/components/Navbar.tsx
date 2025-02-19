import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Cart from "./Cart";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface NavbarProps {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, setCart, setIsCartOpen }) => {
  const [isCartOpen, setLocalCartOpen] = useState(false);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setLocalCartOpen(!isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="bg-white border-b-2 flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light shadow-md">
        {/* Left - Logo and Tabs */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className="font-bold text-lg">Shopi</NavLink>
          <div className="flex gap-4 text-gray-600">
            {["/", "/clothes", "/electronics", "/furniture", "/toys"].map((path, index) => {
              const labels = ["All", "Clothes", "Electronics", "Furniture", "Toys"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `pb-1 ${isActive ? "border-b-2 border-black font-semibold" : ""}`
                  }
                  aria-current="page"
                >
                  {labels[index]}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Right - User Info and Cart */}
        <div className="flex items-center gap-6 text-gray-600">
          <span className="text-sm">userintheapp@test.com</span>
          <div className="flex gap-4">
            {["/orders", "/account"].map((path, index) => {
              const labels = ["My Orders", "My Account"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `pb-1 ${isActive ? "border-b-2 border-black font-semibold" : ""}`
                  }
                >
                  {labels[index]}
                </NavLink>
              );
            })}
          </div>

          {/* Cart Icon */}
          <div className="relative flex items-center cursor-pointer" onClick={toggleCart}>
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Component - Renders Below Navbar */}
      <div className="mt-[70px]">
        {isCartOpen && <Cart cart={cart} setCart={setCart} setIsCartOpen={setIsCartOpen} />}
      </div>
    </>
  );
};

export default Navbar;
