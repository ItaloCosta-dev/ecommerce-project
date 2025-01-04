import { removeFromCart, addToCart } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

interface CartState {
  loading: boolean;
  cartItems: CartItem[];
  itemPrice: number;
}

const CartSideBar = () => {
  const { loading, cartItems, itemPrice } = useSelector(
    (state: { cart: CartState }) => state.cart
  );

  const dispatch = useDispatch();

  const addToCartHandler = (product: CartItem, qty: number) => {
    if (qty > product.countInStock) {
      alert('Quantidade selecionada excede o estoque disponível.');
      return;
    }
    dispatch(addToCart({ ...product, qty, paymentMethod: '' }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const pathname = usePathname()

  return (
    <div className={
      loading 
      ? ''
      : cartItems.length > 0 &&
      (pathname === '/' || pathname.indexOf('/product') >= 0) 
      ? 'fixed top-0 right-0 w-32 h-full shadow-lg border-l border-l-gary-700 overflow-scroll'
      : 'hidden'
    }>
      {loading ? (
        <div className="py-5 px-2 text-center">Carregando...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2 text-center">Carrinho vazio</div>
      ) : (
        <>
          <div className="p-4 flex flex-col items-center border-b border-b-gray-600">
            <div className="text-lg">Subtotal</div>
            <div className="font-bold text-orange-700">
              R${itemPrice.toFixed(2)}
            </div>
            <Link
              href="/cart"
              className="mt-2 w-full text-center p-2 rounded-2xl border-2 border-orange-700 text-orange-700 hover:bg-orange-700 hover:text-white"
            >
              Ir para o carrinho
            </Link>
          </div>
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-col items-center border-b border-b-gray-600"
              >
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                </Link>
                <select
                  className="mt-2 p-1 border border-gray-300 rounded"
                  value={item.qty}
                  onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="default-button mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  Deletar
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CartSideBar;
