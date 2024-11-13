import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { removeFavorite } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Obtenir les dimensions de l'écran
const { width, height } = Dimensions.get("window");

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
        <Text
          style={{ color: "white", fontSize: width * 0.05, fontWeight: "bold" }}
        >
          Mes favoris
        </Text>
      ),
      headerTitleAlign: "center", // Aligne le titre au centre
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: width * 0.03 }}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={width * 0.07}
            color="white"
          />
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
                size={width * 0.07}
                color={
                  userFavorites.some((fav) => fav._id === favorite._id)
                    ? "red"
                    : "#4FAAAF"
                }
              />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {favorite.photoProfil?.length > 0 ? (
                <Image
                  source={{ uri: favorite.photoProfil[0] }}
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
    paddingHorizontal: width * 0.05,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingBottom: 16,
  },
  favoriteContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    width: "100%", // Container utilise toute la largeur disponible
    flexWrap: "wrap", // Permet aux éléments de se réorganiser si nécessaire
  },
  imageContainer: {
    width: width * 0.3,
    height: height * 0.15,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageProfil: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: width * 0.04,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 10,
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
  headerTitle: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  headerLeft: {
    marginLeft: 10,
  },
});
