'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';

interface Product {
  id: string;
  name: string;
  countInStock: number;
  price: number;
  image: string;
}

interface AddToCartProps {
  product: Product;
  showQty?: boolean;
  redirect?: boolean;
  increasePerClick?: boolean;
}

interface CartState {
  cartItems: Array<{ id: string; qty: number }>;
}

const AddToCart: React.FC<AddToCartProps> = ({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  const router = useRouter();

  const [qty, setQty] = useState<number>(1);

  const addToCartHandler = async () => {
    let newQty = qty;

    if (increasePerClick) {
      const existItem = cartItems.find((x) => x.id === product.id);
      if (existItem) {
        if (existItem.qty + qty <= product.countInStock) {
          newQty = existItem.qty + qty;
        } else {
          return alert('Quantidade excede o estoque disponível.');
        }
      }
    }

    dispatch(
      addToCart({
        ...product,
        qty: newQty,
        paymentMethod: 'Cartão de crédito',
      })
    );

    if (redirect) {
      router.push('/cart');
    }
  };

  return (
    <>
      {product.countInStock > 0 && showQty && (
        <div className="mb-2 flex justify-between">
          <div>Quantidade</div>
          <div>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div>
        {product.countInStock > 0 ? (
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Adicionar ao carrinho
          </button>
        ) : (
          <button className="primary-button w-full" disabled>
            Fora de estoque
          </button>
        )}
      </div>
    </>
  );
};

export default AddToCart;
