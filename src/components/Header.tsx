import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";


interface CartItem {
  qty: number;
}

interface CartState {
  loading: boolean;
  cartItems: CartItem[];
}

const Header = () => {
  const { loading, cartItems } = useSelector((state: { cart: CartState }) => state.cart);

  const totalItems = cartItems?.reduce((a, c) => a + c.qty, 0) || 0;

  return (
    <header>
      <nav className="flex justify-between items-center h-12 px-4 shadow-md bg-gray-800 text-white">
        <Link href="/" className="text-lg font-bold">
          Carrinho de compras
        </Link>
        <div className="flex items-center space-x-4">
                    <Link href="/cart" className="relative">
            <span className="cart-badge absolute top-0 right-0 text-white text-xs rounded-full px-2 py-1">
              {loading ? "..." : totalItems}
            </span>
            <span className="ml-8"><CiShoppingCart size={45}/>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;