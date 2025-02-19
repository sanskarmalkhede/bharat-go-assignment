import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  setSelectedProductId: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, setSelectedProductId }) => {
  return (
    <div
      className="bg-white p-3 shadow-lg rounded-lg border border-gray-300 w-[260px] cursor-pointer hover:shadow-xl transition-all duration-200 relative" // Added relative for absolute positioning of category
    >
      {/* Product Image & Clickable Area */}
      <div
        className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-2" // Added margin-bottom
        onClick={() => setSelectedProductId(product.id)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {/* Add to Cart (+) SVG Button */}
        <button
          className="absolute top-2 right-2 bg-white bg-opacity-80 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-100 transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering product details
            addToCart(product);
          }}
          aria-label="Add to cart" // Added aria-label for accessibility
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        {/* Category Label */}
        <span className="absolute bottom-2 left-2 bg-white text-xs text-gray-500 px-2 py-1 rounded-md"> {/* Updated styles */}
          {product.category.name}
        </span>
      </div>

      {/* Product Title & Price */}
      <div className="flex flex-col"> {/* Added flex column for layout */}
        <h2 className="text-sm font-medium line-clamp-2">{product.title}</h2> {/* Added line-clamp */}
        <div className="mt-auto flex justify-between items-center"> {/* Flex for price and rating */}
          <p className="text-black font-bold text-lg">${product.price}</p>
          {/* Add Rating Stars Here */}
          <div className="flex items-center">
            {/* Example star icons - replace with your star rating component */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1.5 1.5 0 01.5 1.5v11.76l4.22-4.22a.75.75 0 111.06 1.06l-5.28 5.28a.75.75 0 01-1.06 0L4.72 13.54a.75.75 0 111.06-1.06l4.22 4.22V4.5A1.5 1.5 0 0110 3z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-500 text-sm ml-1">(4.5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;