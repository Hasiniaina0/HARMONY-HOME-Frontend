import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  statut: null,
  photos: [],
  favorites: [],
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.statut = action.payload.statut;
    },

    logout: (state) => {
      state.token = null;
      state.email = null;
      state.statut = null;
      state.photos = [];
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((photo) => photo !== action.payload);
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
    },
  },
});

export const {
  login,
  logout,
  addPhoto,
  removePhoto,
  addFavorite,
  removeFavorite,
} = userSlice.actions;
export default userSlice.reducer;
