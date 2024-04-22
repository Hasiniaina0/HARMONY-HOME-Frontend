import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function AnnouncementScreen() {
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const [userDetails, setUserDetails] = useState(null);
  const route = useRoute();
  const { token } = route.params;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/${token}`)
      .then((response) => response.json())
      .then((data) => {
        // Vérifiez si la réponse contient les données attendues
        setUserDetails(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce :",
          error
        );
      });
  }, []);

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

  const handleFavorite = () => {
    // Logique pour ajouter l'annonce aux favoris
  };

  const handleContact = () => {
    // Logique pour contacter l'annonceur
  };

  const handleMessages = () => {
    // Naviguer vers la page des messages
    navigation.navigate("Messages");
  };

  const handleProfile = () => {
    // Naviguer vers la page du profil
    navigation.navigate("Profile");
  };

  const handleFavorites = () => {
    // Naviguer vers la page des favoris
    navigation.navigate("Favorites");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {userDetails && (
            <View>
              <View style={styles.titre}>
                <MaterialIcons
                  name="keyboard-backspace"
                  size={60}
                  onPress={() => navigation.goBack()}
                  style={styles.back}
                />
                <Text style={styles.titreAnnonce}>{userDetails.prenom}</Text>
              </View>
              <View>
                <Image
                  source={require("../assets/profil-user.jpg")}
                  alt="photo de profil"
                />
                <Text style={styles.desc}>A propos du futur colocataire: </Text>
                <Text style={styles.apropos}>{userDetails.aPropos}</Text>
                <Text style={styles.desc}>Ses motivations : </Text>
                <Text style={styles.apropos}>
                  {truncateText(userDetails.description, 80)}
                </Text>
                <Image
                  source={require("../assets/avatar1.jpg")}
                  alt="photo des locataires"
                />

                <Text style={styles.desc}>Les avis</Text>
                <Image source={require("../assets/avis1.png")} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => handleComment()}
                    style={styles.contactButton}
                  >
                    <Text style={styles.contactButtonText}>
                      Laisser un commentaire
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleContact()}
                    style={styles.contactButton}
                  >
                    <Text style={styles.contactButtonText}>Contacter</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
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
    justifyContent: "space-between",
    width: "100%",
  },
  titre: {
    marginTop: 50,
  },

  desc: {
    fontWeight: "bold",
    marginTop: 10,
    justifyContent: "",
  },
  titreAnnonce: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
  announcementContainer: {
    flexDirection: "row",
    marginBottom: 16,
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
    alignSelf: "center",
    backgroundColor: "#4FAAAF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row", // Aligne les boutons côte à côte
    justifyContent: "space-between", // Espace entre les boutons
    paddingVertical: 8, // Espacement vertical si nécessaire
  },
  contactButtonText: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
    alignSelf: "center",
    color: "white",
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
