import {IApiDish} from '../type';
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from './dishesThunk.ts';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store.ts';

interface DishesState {
  dishes: IApiDish[] | null;
  dish: IApiDish | null;
  fetchLoading: boolean;
  createDish: boolean;
  deleteLoading: boolean | string;
  updateLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: DishesState = {
  dishes: null,
  dish: null,
  fetchLoading: false,
  createDish: false,
  deleteLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
};

export const dishesSlice = createSlice({
  name : 'dishes',
  initialState,
  reducers: {},
  extraReducers:(builder ) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.dishes = action.payload;
      state.fetchLoading = false;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createDish.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(createDish.fulfilled, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createDish.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteDish.pending, (state, {meta}) => {
      state.deleteLoading = meta.arg;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneDish.pending, (state)=> {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneDish.fulfilled, (state, action) => {
      state.dish = action.payload;
      state.fetchOneLoading = false;
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
  }
});

export const selectDishes = (state: RootState) => state.dishes.dishes;
export const selectDish = (state: RootState) => state.dishes.dish;
export const selectCreateDishLoading = (state:RootState) => state.dishes.createDish;
export const selectDeleteDishLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectUpdateDishLoading = (state: RootState) => state.dishes.updateLoading;
export const selectOneFetchLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const dishesReducer = dishesSlice.reducer;
