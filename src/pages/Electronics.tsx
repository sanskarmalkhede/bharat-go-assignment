import { useEffect, useState } from "react";
import axios from "axios";
import Details from "../components/Details";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
  quantity?: number;
}

interface ElectronicsProps {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  setIsCartOpen: (isOpen: boolean) => void;
}

const Electronics: React.FC<ElectronicsProps> = ({ cart, setCart, setIsCartOpen }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/categories/2/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsCartOpen(true);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Electronics</h1>

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
        <p className="text-center text-lg">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <span className="text-6xl">😞</span>
          <p className="text-gray-600 mt-2 text-lg">Nothing Related</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-x-2 gap-y-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white p-3 shadow-lg rounded-lg relative flex flex-col items-center border border-gray-300 w-[260px]"
              >
                {/* Clickable Product Image */}
                <div 
                  className="relative w-full aspect-[4/5] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Price */}
                <h2 className="text-sm font-medium mt-2 text-center">{product.title}</h2>
                <p className="text-black font-bold text-lg">${product.price}</p>

                {/* Add Button */}
                <button 
                  className="mt-2 px-4 py-2 bg-black text-white rounded-md text-sm"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details Pop-Up */}
      {selectedProductId && (
        <Details productId={selectedProductId} setProductId={setSelectedProductId} />
      )}
    </div>
  );
};

export default Electronics;
