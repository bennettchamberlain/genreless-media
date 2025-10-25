import { client } from '../../sanity/lib/client';
import { allProductsQuery } from '../../sanity/lib/queries';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default async function ProductsPage() {
  const products = await client.fetch(allProductsQuery);

  return (
    <div className="min-h-screen bg-[#dadad6] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Helvetica']">
              Shop
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of products. Each item is carefully selected to bring you the best quality and design.
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products available at the moment. Please check back soon!
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
  );
}
