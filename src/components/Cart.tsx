import { useEffect } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

interface CartProps {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ cart, setCart, setIsCartOpen }) => {
  const navigate = useNavigate();

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to increase quantity
  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map((product) =>
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    );
    setCart(updatedCart);
  };

  // Function to decrease quantity
  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart
      .map((product) =>
        product.id === productId ? { ...product, quantity: product.quantity - 1 } : product
      )
      .filter((product) => product.quantity > 0); // Remove if quantity becomes 0
    setCart(updatedCart);
  };

  // Function to remove product
  const removeProduct = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Checkout function
  const handleCheckout = () => {
    localStorage.setItem("orders", JSON.stringify(cart)); // Store cart items in localStorage
    setCart([]); // Empty the cart after checkout
    localStorage.removeItem("cart"); // Clear the cart from storage
    setIsCartOpen(false); // Close cart
    navigate("/orders"); // Redirect to Orders page
  };

  return (
    <div className="fixed top-[70px] right-0 h-[calc(100vh-70px)] w-80 bg-white shadow-lg border-l border-gray-200 p-5 z-20 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button onClick={() => setIsCartOpen(false)} className="text-gray-600 hover:text-red-500 text-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Cart Items (Scrollable) */}
      <div className="flex-grow overflow-y-auto mt-4 pr-2">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center border-b pb-2">
                <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover rounded-md" />
                <div className="flex-1 ml-2">
                  <span className="text-gray-700">{product.title}</span>
                  <p className="text-black font-semibold">${product.price * product.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQuantity(product.id)} className="p-1 rounded bg-gray-200">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium">{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)} className="p-1 rounded bg-gray-200">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeProduct(product.id)} className="text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart Footer (Always Visible) */}
      <div className="p-4 border-t bg-white">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          className="w-full mt-2 bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
