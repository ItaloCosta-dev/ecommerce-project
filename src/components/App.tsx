'use client'

import React, { ReactNode } from 'react'
import Header from './Header'
import CartSideBar from './CartSideBar'

interface AppProps {
    children: ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
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
