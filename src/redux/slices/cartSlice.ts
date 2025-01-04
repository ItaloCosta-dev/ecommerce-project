import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  paymentMethod: string;
}

interface CartState {
  loading: boolean;
  cartItems: CartItem[];
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Função auxiliar para arredondar números com duas casas decimais
const addDecimals = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Estado inicial
const initialState: CartState = Cookies.get("cart")
  ? {
      ...JSON.parse(Cookies.get("cart")!),
      loading: false,
    }
  : {
      loading: false,
      cartItems: [],
      itemPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      },
      paymentMethod: "",
    };

// Slice do carrinho
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adicionar item ao carrinho
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      // Atualizar preços
      const itemPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.itemPrice = parseFloat(addDecimals(itemPrice));
      state.shippingPrice = parseFloat(
        addDecimals(itemPrice > 100 ? 0 : 100)
      );
      state.taxPrice = parseFloat(addDecimals(0.15 * itemPrice));
      state.totalPrice =
        state.itemPrice + state.shippingPrice + state.taxPrice;

      // Salvar no cookie
      Cookies.set("cart", JSON.stringify(state));
    },

    // Remover item do carrinho
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      // Atualizar preços
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.itemPrice = parseFloat(addDecimals(itemsPrice));
      state.shippingPrice = parseFloat(
        addDecimals(itemsPrice > 100 ? 0 : 100)
      );
      state.taxPrice = parseFloat(addDecimals(0.15 * itemsPrice));
      state.totalPrice =
        state.itemPrice + state.shippingPrice + state.taxPrice;

      // Salvar no cookie
      Cookies.set("cart", JSON.stringify(state));
    },

    // Salvar endereço de entrega
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },

    // Salvar método de pagamento
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      Cookies.set("cart", JSON.stringify(state));
    },

    // Esconder loading
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

// Exportação das ações e do reducer
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  hideLoading,
} = cartSlice.actions;

export default cartSlice.reducer;