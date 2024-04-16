import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  photos: [],
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },

    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((photo) => photo !== action.payload);
    },
  },
});

export const { login, logout, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
