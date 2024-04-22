import React, { useState, useEffect } from "react";
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
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const userFavorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/hebergeur`)
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des annonces des hebergeurs:",
          error
        )
      );
  }, []);

  const handleDetailsAnnonce = (announceToken) => {
    // Naviguer vers l'écran de détails de l'annonce et passer les détails de l'annonce
    navigation.navigate("DescriptionAnnouncement", { token: announceToken });
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
                size={15}
                color={
                  userFavorites.some((fav) => fav._id === announcement._id)
                    ? "red"
                    : "#4FAAAF"
                }
              />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {/* <Image
                source={{ uri: announcement.photo }}
                style={styles.image}
              /> */}

              {/* <Image
                source={require("../assets/profil-annonce.jpg")}
                alt="photo de profil"
                style={styles.imageProfil}
              /> */}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{announcement.prenom}</Text>
              <Text style={styles.location}>{announcement.city}</Text>
              <Text style={styles.description}>
                {" "}
                {truncateText(announcement.description, 80)}
              </Text>
              <TouchableOpacity
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
  announcementContainer: {
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
  imageProfil: {
    width: "100%", // L'image occupe toute la largeur de l'écran
    height: 200, // Hauteur de l'image, ajustez selon vos besoins
    resizeMode: "contain", // Conserve les proportions de l'image
    borderRadius: 8, // Ajoute un effet arrondi si souhaité
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    alignItems: "flex-end",
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
