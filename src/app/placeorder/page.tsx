'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import CheckoutWizard from '@/components/CheckoutWizard';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
  itemPrice: number;
  shippingPrice: number;
  totalPrice: number;
  shippingAddress: {
    fullname: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  loading: boolean;
  taxPrice: number;
}

const PlaceOrderScreen = () => {
  const router = useRouter();

  const {
    cartItems = [],
    itemPrice = 0,
    shippingPrice = 0,
    totalPrice = 0,
    shippingAddress = {} as CartState['shippingAddress'],
    paymentMethod = '',
    loading = false,
    taxPrice = 0,
  } = useSelector((state: { cart: CartState }) => state.cart || {});

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Seu Pedido</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : cartItems.length === 0 ? (
        <div>
          Carrinho vazio. <Link href="/">Ir para loja</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Detalhes do Envio</h2>
              <div>
                {shippingAddress.fullname}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              <div>
                <Link className="default-button inline-block" href="/shipping">
                  Editar
                </Link>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Método de Pagamento</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link className="default-button inline-block" href="/payment">
                  Editar
                </Link>
              </div>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Itens do Pedido</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantidade</th>
                    <th className="p-5 text-right">Preço</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: CartItem) => (
                    <tr key={item.id} className="border-b">
                      <td>
                        <Link
                          className="flex items-center"
                          href={`/product/${item.id}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                          />
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">R${item.price}</td>
                      <td className="p-5 text-right">
                        R${item.qty * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="default-button inline-block" href="/cart">
                  Editar
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Resumo do Pedido</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Itens</div>
                    <div>R${itemPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Taxa</div>
                    <div>R${taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Frete</div>
                    <div>R${shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>
                      <strong>Total</strong>
                    </div>
                    <div>
                      <strong>R${totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => alert('Pedido feito com sucesso!')}  
                    className="primary-button w-full"
                  >
                    Fazer Pedido
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderScreen;