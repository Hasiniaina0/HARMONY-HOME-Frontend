import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

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
  },
  logo: {
    width: 360,
    height: 320,
  },
  slogan: {
    fontSize: 16,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  signUpButton: {
    padding: 10,
    borderRadius: 20,
  },
  signUpButtonText: {
    color: "white",
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
  },
});
