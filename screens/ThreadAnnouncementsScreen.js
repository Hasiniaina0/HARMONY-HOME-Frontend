import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  CheckBox,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ThreadAnnouncementsScreen() {
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      title: "Magnifique appartement en plein centre-ville",
      city: "Paris",
      description: "Appartement lumineux et moderne avec vue imprenable",
      image: require("../assets/apartment1.jpg"),
    },
    {
      id: 2,
      title: "Charmante maison à la campagne",
      city: "Provence",
      description:
        "Maison rustique entourée de vignobles et de champs de lavande",
      image: require("../assets/house1.jpg"),
    },
  ];

  const handleFavorite = (id) => {
    // Logique pour ajouter l'annonce aux favoris
  };

  const handleContact = (id) => {
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
    <View style={styles.container}>
      {data.map((announcement) => (
        <View style={styles.announcementContainer} key={announcement.id}>
          <TouchableOpacity
            onPress={() => handleFavorite(announcement.id)}
            style={styles.favoriteButton}
          >
            <Ionicons name="heart-outline" size={15} color="#007BFF" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image source={announcement.image} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{announcement.title}</Text>
            <Text style={styles.location}>{announcement.city}</Text>
            <Text style={styles.description}>{announcement.description}</Text>
            <TouchableOpacity
              onPress={() => handleContact(announcement.id)}
              style={styles.contactButton}
            >
              <Text style={styles.contactButtonText}>Contacter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={handleMessages}
              style={styles.bottomButton}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color="#007BFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleProfile}
              style={styles.bottomButton}
            >
              <Ionicons name="person-outline" size={24} color="#007BFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFavorites}
              style={styles.bottomButton}
            >
              <Ionicons name="heart-outline" size={24} color="#007BFF" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomButton: {
    flex: 1,
    alignItems: "center",
  },
});
