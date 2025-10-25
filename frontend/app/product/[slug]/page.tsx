import { client } from '../../../sanity/lib/client';
import { productBySlugQuery } from '../../../sanity/lib/queries';
import { notFound } from 'next/navigation';
import ProductDetail from './components/ProductDetail';
import Footer from '../../components/Footer';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await client.fetch(productBySlugQuery, { slug });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#dadad6] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductDetail product={product} />
      </div>
      <Footer />
    </div>
  );
}
