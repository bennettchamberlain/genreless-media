'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    price: number;
    salePrice?: number;
    slug: string;
    images: Array<{
      url: string;
      alt: string;
    }>;
    description: string;
    inStock: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product._id);

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      slug: product.slug,
      images: product.images
    });
  };

  const displayPrice = product.salePrice || product.price;
  const isOnSale = product.salePrice && product.salePrice < product.price;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Product Image - Clickable Link */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          {product.images && product.images[0] && product.images[0].url && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              SALE
            </div>
          )}
          
          {/* Out of Stock Badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-gray-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          {isOnSale && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-semibold text-gray-900">
            ${displayPrice.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            product.inStock
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
