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

export default function ThreadAnnouncementsScreen() {
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

  return (
    <View style={styles.container}>
      {data.map((announcement) => (
        <View style={styles.announcementContainer} key={announcement.id}>
          <TouchableOpacity
            onPress={() => handleFavorite(announcement.id)}
            style={styles.favoriteButton}
          >
            {/* Icone de coeur */}
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
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
