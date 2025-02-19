import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: { name: string };
}

interface DetailsProps {
  productId: number | null;
  setProductId: (id: number | null) => void;
}

const Details: React.FC<DetailsProps> = ({ productId, setProductId }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      axios
        .get(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => console.error("Error fetching product details:", error));
    }
  }, [productId]);

  if (!productId || !product) return null;

  return (
    <div className="fixed top-16 right-0 h-[80vh] w-[400px] bg-white shadow-lg z-50 flex flex-col border border-gray-300 rounded-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-gray-100">
        <h2 className="text-lg font-semibold">Product Details</h2>
        <button
          className="text-black text-2xl"
          onClick={() => setProductId(null)}
        >
          &times;
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center p-4 overflow-y-auto flex-grow">
        {/* Image */}
        <div className="w-full h-[250px] overflow-hidden rounded-lg">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category */}
        <span className="mt-3 px-3 py-1 bg-gray-200 text-sm rounded-md">
          {product.category.name}
        </span>

        {/* Title & Price */}
        <h2 className="text-xl font-semibold mt-2 text-center">{product.title}</h2>
        <p className="text-lg font-bold mt-1 text-black">${product.price}</p>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 text-center px-4">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default Details;
