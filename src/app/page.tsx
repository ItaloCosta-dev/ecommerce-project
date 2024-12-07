import { data } from '@/utils/data'

export default function Home() {
  const { products } = data
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
