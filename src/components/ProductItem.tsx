import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProductRate from './ProductRate';
import AddToCart from './AddToCart';

interface Product {
  id: string;
  image: string;
  name: string;
  rating: number;
  numReviews: number;
  description: string;
  price: number;
  countInStock: number; 
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.id}`} aria-label={`Ver detalhes do produto ${product.name}`}>
        <Image
          src={product.image || '/placeholder-image.jpg'} // Fallback para imagem padrão
          width={400}
          height={400}
          alt={product.name}
          className="rounded shadow object-cover h-96 w-full"
          priority
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.id}`} aria-label={`Ver mais sobre ${product.name}`}>
          <h2 className="text-lg font-bold text-center">{product.name}</h2>
        </Link>
        {product.rating !== undefined && product.numReviews !== undefined && (
          <ProductRate rate={product.rating} count={product.numReviews} />
        )}
        <p className="mb-2 text-sm text-gray-600">{product.description}</p>
        <p className="text-lg font-semibold text-green-600">R${product.price.toFixed(2)}</p>
        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
};

export default ProductItem;