import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  statut: null,
  photos: [],
  favorites: [],
  name: null,
  photoProfil:[],
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.statut = action.payload.statut;
      state.name = action.payload.name;
    },

    logout: (state) => {
      state.token = null;
      state.email = null;
      state.statut = null;
      state.photos = [];
      state.photoProfil = [];
      state.userInfo = null; // Remettre userInfo à null lors de la déconnexion
      state.name = null;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    addPhotoProfil: (state, action) => {
      state.photoProfil.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((photo) => photo !== action.payload);
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite._id !== action.payload._id
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
