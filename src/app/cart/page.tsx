"use client";

import Image from "next/image";
import Link from "next/link";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux"; 
import { useRouter } from "next/navigation";


interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  countInStock: number;
  
}

interface CartState {
  loading: boolean;
  itemsPrice: number;
  cartItems: CartItem[];
}

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, cartItems, itemsPrice } = useSelector(
    (state: { cart: CartState }) => state.cart || { loading: false, cartItems: [], itemsPrice: 0 }
  );

 const removeFromCartHandler = (id: string) => {
  if (id) {
    dispatch(removeFromCart(id));
  }
 }

  const addToCartHandler = (product: CartItem, qty: number) => { 
    if (product && qty > 0) {
      dispatch(addToCart({ ...product, qty, paymentMethod:'default' }));
    }
  }


  return (
    <div>
      <h1 className="mb-4 text-xl">Carrinho de compras</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : cartItems.length === 0 ? (
        <div>
          Carrinho vazio. <Link href="/">Comprar</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Produto</th>
                  <th className="p-5 text-right">Quantidade</th>
                  <th className="p-5 text-right">Preço</th>
                  <th className="p-5 text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link href={`/product/${item.id}`} className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="p-1"
                          priority
                        />
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="rounded-md border-gray-300"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">R$ {item.price.toFixed(2)}</td>
                    <td className="p-5 text-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}) : R$ {itemsPrice.toFixed(2)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('/shipping')}
                    className="primary-button w-full"
                  >
                    Ir para checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}