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

export default function ThreadAnnouncementsScreen() {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState([]);
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/hebergeur`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAnnouncements(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des hebergeurs:", error)
      );
  }, []);

  const handleFavorite = () => {
    // Logique pour ajouter l'annonce aux favoris
  };

  const handleContact = () => {
    // Logique pour contacter l'annonceur
  };

  return (
    <SafeAreaView style={styles.container}>
      {announcements.map((announcement) => (
        <View style={styles.announcementContainer} key={announcement._id}>
          <TouchableOpacity
            onPress={() => handleFavorite()}
            style={styles.favoriteButton}
          >
            <Ionicons name="heart-outline" size={15} color="#007BFF" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image source={{ uri: announcement.photo }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{announcement.prenom}</Text>
            <Text style={styles.location}>{announcement.city}</Text>
            <Text style={styles.description}>{announcement.description}</Text>
            <TouchableOpacity
              onPress={() => handleContact()}
              style={styles.contactButton}
            >
              <Text style={styles.contactButtonText}>Contacter</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
