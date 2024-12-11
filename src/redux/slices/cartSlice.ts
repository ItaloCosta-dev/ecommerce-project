import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"


interface CartItem {
    id: string
    name: string
    price: number
    qty: number
}

interface CartState {
    loading: boolean
    cartItems: CartItem[]
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
}

const initialState: CartState = {
    loading: true,
    cartItems: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
}

const addDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.id === item.id)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => 
                x.id === existItem.id ? item : x
            )
            } else {
                state.cartItems.push(item)
            }
            const itemsPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
            );
            state.itemsPrice = parseFloat(addDecimals(itemsPrice));
            state.shippingPrice = parseFloat(
                addDecimals(itemsPrice > 100 ? 0 : 100)
            );
            state.taxPrice = parseFloat(addDecimals(0.15 * itemsPrice));
            state.totalPrice =
            state.itemsPrice + state.shippingPrice + state.taxPrice;


            Cookies.set("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );

            const itemsPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.qty, 0
            );
            state.itemsPrice = parseFloat(addDecimals(itemsPrice));
            state.shippingPrice = parseFloat(
                addDecimals(itemsPrice > 100 ? 0 : 100)
            );
            state.taxPrice = parseFloat(addDecimals(0.15 * itemsPrice));
            state.totalPrice =
            state.itemsPrice + state.shippingPrice + state.taxPrice;

            Cookies.set("cart", JSON.stringify(state));
        },
        hideLoading: (state) => {
            state.loading = false
        },
    },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;