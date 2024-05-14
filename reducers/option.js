import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    updateOptions: (state, action) => {
      const {
        city,
        accommodationType,
        duration,
        smoke,
        animals,
        visit,
        car,
        pool,
        prmAccess,
      } = action.payload;
      state.value = {
        city,
        accommodationType,
        duration,
        smoke,
        animals,
        visit,
        car,
        pool,
        prmAccess,
      };
    },
  },
});

export const { updateOptions } = optionSlice.actions;
export default optionSlice.reducer;
