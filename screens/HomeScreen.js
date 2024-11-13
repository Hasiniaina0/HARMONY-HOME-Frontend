import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
      alt="image de fond bleue"
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          alt="logo Harmony Home"
        />
        <Text style={styles.slogan}>L'accord parfait entre jeunes et </Text>
        <Text style={styles.slogan}>sages dans une colocation pleine</Text>
        <Text style={styles.slogan}>de vie et de partage</Text>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("SignIn")}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.signUpButtonText}>Pas encore de compte ?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05, // Padding basé sur la largeur de l'écran
  },
  logo: {
    width: width * 0.8, // 90% de la largeur de l'écran
    height: height * 0.5, // 35% de la hauteur de l'écran
  },
  slogan: {
    fontSize: width * 0.045, // La taille du texte basée sur la largeur
    color: "white",
    textAlign:"center",
  },
  button: {
    backgroundColor: "#4FAAAF",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    marginBottom: height * 0.02,
    marginTop: height * 0.05,
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.04, // Taille dynamique
  },
  signUpButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 20,
  },
  signUpButtonText: {
    color: "white",
    backgroundColor: "#4FAAAF",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    fontSize: width * 0.04,
  },
});
