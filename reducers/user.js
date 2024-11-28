import { createSlice } from "@reduxjs/toolkit";

// Définition de l'état initial de l'utilisateur
const initialState = {
  token: null,
  email: null,
  statut: null,
  photos: [],
  favorites: [],
  photoProfil: [],
  nom: null,
  prenom: null,
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    // Action de connexion qui met à jour l'état de l'utilisateur avec les informations reçues
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.statut = action.payload.statut;
      state.nom = action.payload.nom;
      state.prenom = action.payload.prenom;
    },

    // Action de déconnexion qui réinitialise l'état de l'utilisateur
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.statut = null;
      state.photos = [];
      state.photoProfil = [];
      state.userInfo = null; // Remettre userInfo à null lors de la déconnexion
      state.nom = null;
      state.prenom = null;
    },

    // Action pour ajouter une photo à la liste des photos de l'utilisateur
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },

    // Action pour ajouter une photo de profil à la liste des photos de profil
    addPhotoProfil: (state, action) => {
      state.photoProfil.push(action.payload);
    },

    // Action pour supprimer une photo de la liste des photos de l'utilisateur
    removePhoto: (state, action) => {
      state.photos = state.photos.filter((photo) => photo !== action.payload);
    },

    // Action pour ajouter un favori à la liste des favoris de l'utilisateur
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },

    // Action pour supprimer un favori spécifique de la liste des favoris de l'utilisateur
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite._id !== action.payload._id
      );
    },
  },
});

// Export de l'action pour pouvoir l'utiliser ailleurs dans l'application
export const {
  login,
  logout,
  addPhoto,
  removePhoto,
  addFavorite,
  addPhotoProfil,
  removeFavorite,
} = userSlice.actions;

export default userSlice.reducer; // Export du reducer qui sera utilisé pour mettre à jour l'état dans le store
