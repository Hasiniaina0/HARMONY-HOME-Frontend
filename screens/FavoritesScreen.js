import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { removeFavorite } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const userFavorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();

  const handleFavorite = (announcement) => {
    // Vérifie si l'annonce est déjà dans les favoris
    const isFavorite = userFavorites.some(
      (fav) => fav._id === announcement._id
    );
    if (isFavorite) {
      dispatch(removeFavorite(announcement));
    }
  };

  function truncateText(text, maxLength) {
    // Vérifiez si le texte est défini et non nul
    if (text === undefined || text === null) {
      return '';
    }
  
    // Tronquez le texte si nécessaire
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
  
    // Retourne le texte tel quel s'il n'est pas trop long
    return text;
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {userFavorites.map((favorite) => (
          <View style={styles.favoriteContainer} key={favorite._id}>
            <TouchableOpacity
              onPress={() => handleFavorite(favorite)}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={
                  userFavorites.some((fav) => fav._id === favorite._id)
                    ? "heart"
                    : "heart-outline"
                }
                size={15}
                color={
                  userFavorites.some((fav) => fav._id === favorite._id)
                    ? "red"
                    : "#4FAAAF"
                }
              />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image source={{ uri: favorite.photo }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{favorite.prenom}</Text>
              <Text style={styles.location}>{favorite.city}</Text>
              <Text style={styles.description}>{truncateText(favorite.description,80)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  favoriteContainer: {
    flexDirection: "row",
    margin: 20,
  },
  favoriteButton: {
    marginRight: 10,
    padding: 5,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    color: "#666",
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  contactButton: {
    alignSelf: "flex-end",
    backgroundColor: "#4FAAAF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4FAAAF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
  },
});
