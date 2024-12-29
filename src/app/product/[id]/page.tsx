import AddToCart from '@/components/AddToCart';
import ProductRate from '@/components/ProductRate';
import { data } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params: { id } }: ProductDetailPageProps) {
  const product = data.products.find((x) => x.id === id);

  if (!product) {
    return <div className="text-center text-red-500">Produto não encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="py-2">
        <Link href="/" className="text-blue-500 hover:underline">
          Voltar aos produtos
        </Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        {/* Imagem do produto */}
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg"
          />
        </div>

        {/* Detalhes do produto */}
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-semibold">{product.name}</h1>
            </li>

            <li className="my-2">
              <ProductRate rate={product.rating} count={product.numReviews} />
            </li>

            <li className="my-3">
              <hr className="my-3" />
              <h2 className="font-medium">Descrição:</h2>
              <p>{product.description}</p>
            </li>
          </ul>
        </div>

        {/* Card de preço e adicionar ao carrinho */}
        <div>
          <div className="card p-5 border rounded-lg shadow-md">
            <div className="mb-2 flex justify-between">
              <span className="font-medium">Preço</span>
              <span className="font-bold text-green-600">R${product.price.toFixed(2)}</span>
            </div>
            <AddToCart product={product} redirect={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
