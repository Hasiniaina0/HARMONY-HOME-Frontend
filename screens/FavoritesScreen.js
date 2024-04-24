import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { removeFavorite } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function FavoritesScreen() {
  const userFavorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const defaultAvatar = require("../assets/annonce.png");
  // Définir les options de navigation pour le header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#4FAAAF", // Couleur de fond du header
      },
      headerTitle: () => (
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Mes favoris
        </Text>
      ),
      headerTitleAlign: "center", // Aligne le titre au centre
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      return "";
    }

    // Tronquez le texte si nécessaire
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }

    // Retourne le texte tel quel s'il n'est pas trop long
    return text;
  }

  return (
    <SafeAreaView style={styles.container}>
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
                size={25}
                color={
                  userFavorites.some((fav) => fav._id === favorite._id)
                    ? "red"
                    : "#4FAAAF"
                }
              />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {favorite.photos?.length > 0 ? (
                <Image
                  source={{ uri: favorite.photos[0] }}
                  alt="photo de profil"
                  style={styles.imageProfil}
                />
              ) : (
                <Image
                  source={defaultAvatar}
                  style={styles.imageProfil}
                  alt="Avatar par défaut"
                />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{favorite.prenom}</Text>
              <Text style={styles.location}>{favorite.city}</Text>
              <Text style={styles.description}>
                {truncateText(favorite.description, 80)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingBottom: 16,
  },
  favoriteContainer: {
    flexDirection: "row",
    marginVertical: 10, // Add vertical margins between announcements
    backgroundColor: "#f0f0f0", // Set light gray background color
    padding: 10, // Add padding around the announcement
    borderRadius: 8, // Add rounded corners to the announcement container
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 8, // Add rounded corners to the image container
    overflow: "hidden", // Hide overflow content
  },
  imageProfil: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Use 'cover' mode to fill the container while preserving aspect ratio
    borderRadius: 8, // Add rounded corners to the image
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute", // Position absolutely within the header container
    top: 0, // Position at the top
    right: 0, // Position at the right
    marginRight: 15,
    marginTop: 5,
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
});
