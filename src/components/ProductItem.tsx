import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductRate from './ProductRate';

interface Product {
    id: string;
    image: string;
    name: string;
    rating: number;
    numReviews: number;
    description: string;
    price: number
}

interface ProductItemProps {
    product: Product
}


const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className='card'>
      <Link href={`/product/${product.id}`}>
        <Image 
            src={product.image}
            width={400}
            height={400}
            alt={product.name}
            className='rounded shadow object-cover h-96 w-full'
        />
      </Link>
      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.id}`}>
        <h2 className='text-lg'>{product.name}</h2>
        </Link>
        <ProductRate rate={product.rating} count={product.numReviews} />
        <p className='mb-2'>{product.description}</p>
        <p>R${product.price}</p>
        <button>Adicionar no carrinho</button>
      </div>
    </div>
  )
}

export default ProductItem
