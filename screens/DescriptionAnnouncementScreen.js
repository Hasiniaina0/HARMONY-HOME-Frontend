import React, { useState, useEffect,useLayoutEffect} from "react";
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
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function DescriptionAnnouncementScreen() {
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const [userDetails, setUserDetails] = useState(null);
  const route = useRoute();
  const { token } = route.params;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Vérifiez si la réponse contient les données attendues
        setUserDetails(data);
        navigation.setOptions({ headerTitle: `Logement de ${data.prenom}` });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'annonce :",
          error
        );
      });
  }, [,]);

  // Configurer les options de navigation pour le header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#4FAAAF", // Couleur de fond du header
      },
      headerTitle: `Logement de ${userDetails ? userDetails.prenom : ''}`,
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <MaterialIcons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, userDetails]);

  const handleFavorite = () => {
    // Logique pour ajouter l'annonce aux favoris
  };

  const handleContact = () => {
    // Logique pour contacter l'annonceur
    navigation.navigate("MessageScreen");
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
    <Image source={{ uri: item }} style={styles.photo} alt="Photo de logement" />
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
              <View>
                 {/* Conditionally render the gallery or a default image */}
                 {userDetails.photos && userDetails.photos.length > 0 ? (
                 <FlatList
                  data={userDetails.photos}
                  horizontal={true}
                  renderItem={renderPhoto}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  style={styles.gallery}
                />
                ) : (
                  <Image
                    source={require("../assets/annonce.png")}
                    style={styles.gallery}
                    alt="Image par défaut"
                  />
                )}
                <Text style={styles.desc}>A propos du logement : </Text>
                <Text style={styles.apropos}>Situé à {userDetails.city}</Text>
                <Text style={styles.apropos}> {userDetails.description}</Text>
                <Text style={styles.desc}>A propos du propriétaire : </Text>
                <Text style={styles.apropos}>{userDetails.aPropos}</Text>
                <Text style={styles.desc}>Les avis</Text>
                <Image
                  source={require("../assets/avis.png")}
                  alt=" image des avis"
                />
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
    justifyContent: "space-evenly",
    width: "100%",
  },
 
  gallery: {
    marginBottom: 16,
  },
  photo: {
    width: 200, // Ajustez la taille de l'image selon vos besoins
    height: 200,
    marginRight: 10, // Espace entre les images
    borderRadius: 10,
  },
  apropos: {
    textAlign: "justify", // Aligne le texte justifié
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerLeft: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row", // Aligne les boutons côte à côte
    justifyContent: "space-between", // Espace entre les boutons
    paddingVertical: 8, // Espacement vertical si nécessaire
  },
  desc: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    fontSize:17,
   
    
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
    textAlign: "justify",
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
