'use client'

import React, { ReactNode, useEffect } from 'react'
import Header from './Header'
import CartSideBar from './CartSideBar'
import { hideLoading } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

interface AppProps {
    children: ReactNode;
}



const App: React.FC<AppProps> = ({ children }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch (hideLoading())
  }, [dispatch])

  return (
    <div>
        <div className='mr-32'>
            <Header />
            <main className='p-4'>{children}</main>
        </div>
        <CartSideBar />
    </div>

  )
}

export default App
