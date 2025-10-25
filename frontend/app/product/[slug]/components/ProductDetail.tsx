'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';

interface ProductDetailProps {
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
    category?: string;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, getItemQuantity } = useCart();
  
  const cartQuantity = getItemQuantity(product._id);
  const displayPrice = product.salePrice || product.price;
  const isOnSale = product.salePrice && product.salePrice < product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        _id: product._id,
        title: product.title,
        price: product.price,
        salePrice: product.salePrice,
        slug: product.slug,
        images: product.images
      });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg">
          {product.images && product.images[selectedImageIndex] && product.images[selectedImageIndex].url && (
            <Image
              src={product.images[selectedImageIndex].url}
              alt={product.images[selectedImageIndex].alt || product.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Thumbnail Images */}
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square relative overflow-hidden rounded-md border-2 transition-colors ${
                  selectedImageIndex === index
                    ? 'border-black'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {image.url && (
                  <Image
                    src={image.url}
                    alt={image.alt || product.title}
                    fill
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          <a href="/products" className="hover:text-black">
            Shop
          </a>
          <span className="mx-2">/</span>
          {product.category && (
            <>
              <span>{product.category}</span>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-black">{product.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 font-['Helvetica']">
          {product.title}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-3">
          {isOnSale && (
            <span className="text-lg text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-2xl font-semibold text-gray-900">
            ${displayPrice.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Description */}
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Add to Cart Section */}
        {product.inStock && (
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart / Checkout Button */}
            {cartQuantity > 0 ? (
              <a
                href="/checkout"
                className="block w-full bg-green-600 text-white py-4 px-6 rounded-md font-medium hover:bg-green-700 transition-colors text-center"
              >
                Checkout ({cartQuantity} in cart)
              </a>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>
            )}
          </div>
        )}

        {/* Out of Stock Message */}
        {!product.inStock && (
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-600 text-center">
              This product is currently out of stock. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
