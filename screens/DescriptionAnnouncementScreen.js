import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DescriptionAnnouncementScreen() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;


  useEffect(() => {
    fetch(`${BACKEND_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces des utilisateurs:", error)
      );
  }, []);

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
      {users.map((user) => (
        <View style={styles.announcementContainer} key={user._id}>
          <Text>Titre de l'annonce</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: user.photo }} style={styles.image} />
          </View>
          <View >
            <Text >A propos du logement</Text>
            <Text style={styles.title}>{user.description}</Text>
            <Text >A propos du propriétaire</Text>
            <Text style={styles.location}>{user.aPropos}</Text>
            <Text >Les avis</Text>
            <Image source={require("../assets/avis.png")} />
            <View>
              <TouchableOpacity
                onPress={() => handleComment()}
                style={styles.contactButton}
              >
                <Text style={styles.contactButtonText}>Laisser un commentaire</Text>
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
      ))}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => handleMessages()}
          style={styles.bottomButton}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#007BFF"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleProfile()}
          style={styles.bottomButton}
        >
          <Ionicons name="person-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFavorites()}
          style={styles.bottomButton}
        >
          <Ionicons name="heart-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
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
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
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
