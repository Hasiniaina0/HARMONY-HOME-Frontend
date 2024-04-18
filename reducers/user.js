import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  statut: null,
  photos: [],
  userInfo: null, // Ajoutez userInfo pour stocker les informations de l'utilisateur
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
      state.userInfo = null; // Remettre userInfo à null lors de la déconnexion
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((photo) => photo !== action.payload);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload; // Stocker les informations de l'utilisateur
    },
  },
});

export const { login, logout, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
