import {CartDish, IApiDish} from "../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";
import {DELIVERY_PRICE} from "../constans.ts";
import {createOrder, fetchOrders} from "./orderThunk.ts";

interface CartState {
    cartDishes: CartDish[];
    totalPrice: number;
    totalPriceWithDelivery: number;
    fetchLoading: boolean;
    orderID: string;
    fetchOneLoading: boolean;
}

const initialState: CartState ={
    cartDishes: [],
    totalPrice: 0,
    totalPriceWithDelivery: 0,
    fetchLoading: false,
    orderID: '',
    fetchOneLoading: false,
};

const cartSlice  = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addDish: (state, {payload: dish}: PayloadAction<IApiDish>) => {
            const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);
            if (index !== -1) {
                state.cartDishes[index].amount++;
            } else {
                state.cartDishes.push({
                    amount: 1,
                    dish,
                });
            }
        },
        dishesTotalSum: (state, {payload: key}:PayloadAction<boolean>) => {
            if(key) {
                state.totalPriceWithDelivery = state.cartDishes.reduce((acc, v) => {
                    return  acc  + v.amount * v.dish.price;
                }, DELIVERY_PRICE);
            } else {
                state.totalPrice = state.cartDishes.reduce((acc, v) => {
                    return  acc  + v.amount * v.dish.price;
                }, 0);
            }
        },
        clearOrders: (state) => {
            state.totalPrice = 0;
            state.cartDishes = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(createOrder.fulfilled, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createOrder.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchOrders.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.cartDishes = action.payload;
            state.fetchLoading = false;
        });
        builder.addCase(fetchOrders.rejected, (state) => {
            state.fetchLoading = false;
        });
    },
});

export const cartReducer = cartSlice.reducer;

export const {addDish, dishesTotalSum, clearOrders,
} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectTotalPriceWithDelivery = (state: RootState) => state.cart.totalPriceWithDelivery;
