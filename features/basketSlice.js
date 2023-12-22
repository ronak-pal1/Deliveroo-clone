import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    cleanBasket: state => {
      state.items = [];
    },

    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id,
      );

      const newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove item as ${action.payload.id} is not in the basket`,
        );
      }

      state.items = newBasket;
    },
  },
});

export const {addToBasket, removeFromBasket, cleanBasket} = basketSlice.actions;

export const selectBasketItems = state => state.basket.items;

// export const selectBasketItemsWithID = (state, id) =>
//   state.basket.items.filter(item => item.id === id);

export const selectBasketItemsWithID = createSelector(
  selectBasketItems,
  (state, id) => id,
  (items, id) => items.filter(item => item.id === id),
);

export const selectBasketTotal = state =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

// export const selectBasketTotal = createSelector([selectBasketItems], items =>
//   items.items.reduce((total, item) => (total += item.price), 0),
// );

export default basketSlice.reducer;
