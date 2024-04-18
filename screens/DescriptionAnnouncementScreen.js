import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,ScrollView,KeyboardAvoidingView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DescriptionAnnouncementScreen({route}) {
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const userId = '6620f5681c747c239e2f737c'
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    fetch(`${BACKEND_URL}/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des annonces des utilisateurs:", error)
      );
  }, [userId]);



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
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
     {userDetails && (
        <View >
    
          <View style={styles.titre}>
            <Text style={styles.titreAnnonce}>A propos de l'annonce de {userDetails.prenom} </Text>
          </View>
          <View >
            <Image source={require("../assets/avis.png")} />
            <Text style = {styles.desc}>A propos du logement : </Text>
            <Text style={styles.apropos}>{userDetails.description}</Text>
            <Text style = {styles.desc}>A propos du propriétaire : </Text>
            <Text style={styles.location}>{userDetails.aPropos}</Text>
            <Text style = {styles.desc} >Les avis</Text>
            <Image source={require("../assets/avis.png")} />
            <View>
              <TouchableOpacity
                onPress={() => handleComment()}
                style={styles.contactButton}
              >
                <Text style={styles.contactButtonText1}>Laisser un commentaire</Text>
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
      </ScrollView>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    width:"100%",
  },
  titre:{
   marginTop:50, 
  },
  desc:{
    fontWeight:"bold",
    marginTop:10,
    justifyContent:""
    
  },
  titreAnnonce:{
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
    marginBottom:25


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
