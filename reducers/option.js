import { createSlice } from "@reduxjs/toolkit";
import { options } from "../../HARMONY-HOMY-Backend/routes/updates";

const initialState = {
  options: {},
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    updateOptions: (state, action) => {
      state.value.city = action.payload.city;
      state.value.accommodationType = action.payload.accommodationType;
      state.value.duration = action.payload.duration;
      state.value.smoke = action.payload.smoke;
      state.value.animals = action.payload.animals;
      state.value.visit = action.payload.visit;
      state.value.car = action.payload.car;
      state.value.pool = action.payload.pool;
      state.value.prmAccess = action.payload.prmAccess;
    },
  },
});

export const { updateOptions } = optionSlice.actions;
export default optionSlice.reducer;
