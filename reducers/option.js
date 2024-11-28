import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const optionSlice = createSlice({
  name: "option",
  initialState,

  // Définition des reducers
  reducers: {
    // Action qui permet de mettre à jour les options sélectionnées
    updateOptions: (state, action) => {
      // Extraction des différentes options à partir de l'action
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

export const { updateOptions } = optionSlice.actions; // Export de l'action pour pouvoir l'utiliser ailleurs dans l'application
export default optionSlice.reducer; // Export du reducer qui sera utilisé pour mettre à jour l'état dans le store
