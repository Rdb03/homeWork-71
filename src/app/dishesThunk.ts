import axiosApi from '../axiosApi.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, IApiDish, IApiDishesList} from '../type';

export const fetchDishes = createAsyncThunk<IApiDish[]>(
  'dishes/fetch',
  async () => {
    const response = await axiosApi.get<IApiDishesList | null>('pizza/dishes.json');
    const contactsResponse = response.data;
    let contacts: IApiDish[] = [];

    if (contactsResponse) {
      contacts = Object.keys(contactsResponse).map((id) =>({
        ...contactsResponse[id],
        id
      }));
    }

    return contacts;
  });

export const createDish = createAsyncThunk<void, ApiDish>(
    'dishes/create',
    async (contact) =>{
        await axiosApi.post('/pizza/dishes.json', contact);
    }
);

export const deleteDish = createAsyncThunk<void, string>(
    'dishes/delete',
    async (dishID) => {
        await axiosApi.delete(`/pizza/dishes/${dishID}.json`);
    }
);

export const fetchOneDish = createAsyncThunk<IApiDish, string>(
    'dishes/fetchOne',
    async (id) => {
        const response = await axiosApi.get<IApiDish>(`/pizza/dishes/${id}.json`);
        const data: IApiDish = response.data;
        return {
            name: data.name,
            price: data.price,
            photo: data.photo,
            id: id,
        };
    }
);

interface UpdateDishParams {
    id: string,
    dish: ApiDish,
}

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
    'dishes/update',
    async ({id, dish}) => {
        await axiosApi.put(`/pizza/dishes/${id}.json`, dish);
    }
);
