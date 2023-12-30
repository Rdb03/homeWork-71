import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartDish, IApiOrdersLIst, IOrdersMutation} from "../type";
import axiosApi from "../axiosApi.ts";

export const fetchOrders = createAsyncThunk<CartDish[]>(
    'dishes/fetch',
    async () => {
        const response = await axiosApi.get<IApiOrdersLIst | null>('pizza/orders.json');
        const contactsResponse = response.data;
        let contacts: CartDish[] = [];

        if (contactsResponse) {
            contacts = Object.keys(contactsResponse).map((id) =>({
                ...contactsResponse[id],
                id
            }));
        }
        return contacts;
    });

export const createOrder = createAsyncThunk<void, IOrdersMutation[]>(
    "order/create",
    async (orders) => {
        const formattedOrder: Record<string, number> = {};
        orders.forEach((item) => {
            formattedOrder[item.orderID] = item.amount;
        });
        await axiosApi.post("/pizza/orders.json", formattedOrder);
    }
);


