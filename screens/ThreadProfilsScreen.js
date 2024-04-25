import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../reducers/user";
import { useNavigation } from "@react-navigation/native";

export default function ThreadAnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState([]);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const navigation = useNavigation();
  const userFavorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();
  const defaultAvatar = require("../assets/annonceProfil.jpg");

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/locataire`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAnnouncements(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des profils locataires:",
          error
        )
      );
  }, []);

  // Définir les options de navigation pour le header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#4FAAAF", // Couleur de fond du header
      },
      headerTitle: () => (
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Annonces
        </Text>
      ),
      headerTitleAlign: "center", // Aligne le titre au centre
    });
  }, [navigation]);

  const handleDetailsAnnonce = (announceToken) => {
    // Naviguer vers l'écran de détails de l'annonce et passer les détails de l'annonce
    navigation.navigate("DescriptionProfile", { token: announceToken });
  };

  const handleFavorite = (announcement) => {
    // Vérifie si l'annonce est déjà dans les favoris
    const isFavorite = userFavorites.some(
      (fav) => fav._id === announcement._id
    );
    if (isFavorite) {
      dispatch(removeFavorite(announcement));
    } else {
      // Sinon, ajoutez l'annonce aux favoris
      dispatch(addFavorite(announcement));
    }
  };

  // const handleContact = () => {
  //   // Logique pour contacter l'annonceur
  // };

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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {announcements.map((announcement) => (
          <View style={styles.announcementContainer} key={announcement._id}>
            <TouchableOpacity
              onPress={() => handleFavorite(announcement)}
              style={styles.favoriteButton}
            >
              <Ionicons
                name={
                  userFavorites.some((fav) => fav._id === announcement._id)
                    ? "heart"
                    : "heart-outline"
                }
                size={25}
                color={
                  userFavorites.some((fav) => fav._id === announcement._id)
                    ? "red"
                    : "red"
                }
              />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {announcement.photoProfil?.length > 0 ? (
                <Image
                  source={{ uri: announcement.photoProfil[0] }}
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
              <Text style={styles.title}>{announcement.prenom}</Text>
              <Text style={styles.location}>{announcement.city}</Text>
              <Text style={styles.description}>
                {truncateText(announcement.description, 80)}
              </Text>
              <TouchableOpacity
                // onPress={() => handleContact()}
                onPress={() => handleDetailsAnnonce(announcement.token)}
                style={styles.contactButton}
              >
                <Text style={styles.contactButtonText}>Voir plus</Text>
              </TouchableOpacity>
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
  announcementContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
  },
  imageContainer: {
    width: 120,
    height: 120,
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
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10, // Ajoute du padding pour agrandir la zone cliquable
    borderRadius: 20,
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
    backgroundColor: "#eb7134",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
