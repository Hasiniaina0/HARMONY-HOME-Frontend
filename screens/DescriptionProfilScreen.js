import React, { useState, useEffect, useLayoutEffect } from "react";
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
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function DescriptionProfilScreen() {
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const [userDetails, setUserDetails] = useState(null);
  const route = useRoute();
  const { token } = route.params;
  const defaultAvatar = require("../assets/annonceProfil.jpg");

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

  // Configurer les options de navigation pour le header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#4FAAAF", // Couleur de fond du header
      },
      headerTitle: `${userDetails ? userDetails.prenom : ""}`,
      headerStyle: {
        backgroundColor: "#4FAAAF",
      },
      headerTitleStyle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, userDetails]);

  const handleContact = () => {
    // Logique pour contacter l'annonceur
    navigation.navigate("Chat");
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

  // Function to render each photo in the gallery
  const renderPhoto = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.photo}
      alt="Photo de logement"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {userDetails && (
            <View>
              <View style={styles.profileContainer}>
                {userDetails.photoProfil?.length > 0 ? (
                  <Image
                    source={{ uri: userDetails.photoProfil[0] }}
                    alt="photo de profil"
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={defaultAvatar}
                    style={styles.profileImage}
                    alt="Avatar par défaut"
                  />
                )}
                <Text style={styles.desc}>A propos du futur colocataire: </Text>
                <Text style={styles.apropos}>{userDetails.aPropos}</Text>
                <Text style={styles.desc}>Ses motivations : </Text>
                <Text style={styles.apropos}>{userDetails.description}</Text>
                {/* Conditionally render the gallery or a default image */}
                {userDetails.photos && userDetails.photos.length > 0 && (
                  <FlatList
                    data={userDetails.photos}
                    horizontal={true}
                    renderItem={renderPhoto}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    style={styles.gallery}
                  />
                )}
                <Text style={styles.desc}>Les avis</Text>
                <Image source={require("../assets/avis1.png")} style />
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

// Définition des styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  desc: {
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 10,
  },
  apropos: {
    textAlign: "justify",
  },

  photo: {
    width: 125,
    height: 125,
    marginRight: 10,
    borderRadius: 10,
  },

  profileImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  reviewImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    backgroundColor: "#4FAAAF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contactButton: {
    backgroundColor: "#4FAAAF", // Couleur de fond définie ici
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
