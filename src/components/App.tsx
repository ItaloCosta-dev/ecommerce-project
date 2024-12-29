'use client'

import React, { ReactNode, useEffect } from 'react'
import Header from './Header'
import CartSideBar from './CartSideBar'
import { hideLoading } from '@/redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

interface AppProps {
  children: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  const { cartItems, loading } = useSelector((state: { cart: { cartItems: any[], loading: boolean } }) => state.cart);
  const pathname = usePathname();

  const shouldShowCartSideBar = cartItems.length > 0 && (pathname === '/' || pathname.includes('/product'));

  return (
    <div>
      <div className={`${
        loading ? '' : shouldShowCartSideBar ? 'mr-32' : ''
      }`}>
        <Header />
        <main className='p-4'>{children}</main>
      </div>
      <CartSideBar />
    </div>
  );
};

export default App;
