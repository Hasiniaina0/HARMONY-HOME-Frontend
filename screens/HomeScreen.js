import { StatusBar } from "expo-status-bar";
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
<<<<<<< HEAD
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.slogan}>L'accord parfait entre jeunes et </Text>
        <Text style={styles.slogan}>sages dans une colocation pleine</Text>
        <Text style={styles.slogan}>de vie et de partage</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Connexion")}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Pas encore de compte ?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
=======
    <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.slogan}>L'accord parfait entre jeunes et </Text>
      <Text style={styles.slogan}>sages dans une colocation pleine</Text>
      <Text style={styles.slogan}>de vie et de partage</Text>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpButtonText}>Pas encore de compte ?</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
>>>>>>> ae954a297fb43ad4ff67f0d4f79045d240e543fb
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
