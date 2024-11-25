import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { login } from "../reducers/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window"); // pour obtenir les dimensions de l'écran

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  const handleConnection = () => {
    fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: data.email,
              token: data.token,
              statut: data.statut,
              nom: data.nom,
              prenom: data.prenom,
            })
          );
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Thread" });
        } else {
          // Erreur de connexion
          setErrorMessage(data.error);
        }
      })
      .catch((error) => {
        // Erreur lors de la connexion au serveur
        console.error("SignInError:", error);
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
      });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        alt="logo Harmony Home"
      />
      <View style={styles.sloganTitle}>
        <Text style={styles.slogan}>L'accord parfait entre jeunes et </Text>
        <Text style={styles.slogan}>sages dans une colocation pleine</Text>
        <Text style={styles.slogan}>de vie et de partage</Text>
      </View>

      <View style={styles.inputsContainer}>
        <View>
          <Text style={styles.inputTitle}>Email :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Votre email"
          value={email.toString()}
          onChangeText={(email) => setEmail(email)}
        />
        <View>
          <Text style={styles.inputTitle}>Mot de passe :</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => toggleModal()}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => handleConnection()}
      >
        <Text style={styles.signInButtonText}>Connexion</Text>
      </TouchableOpacity>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Mot de passe oublié</Text>
              <Text>
                Si vous avez oublié votre mot de passe, veuillez entrer votre
                adresse e-mail enregistrée. Nous vous enverrons un lien pour
                réinitialiser votre mot de passe.
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Adresse e-mail"
                value={email.toString()}
                onChangeText={(email) => setEmail(email)}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.sendButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.9, // 90% de la largeur de l'écran
    height: undefined, //La hauteur sera déterminée par le rapport d'aspect
    aspectRatio: 1.5, //  pour maintenir le rapport d'aspect souhaité
    resizeMode: "contain", //  l'image s'ajuste correctement dans le conteneur
  },
  errorMessage: {
    color: "red",
    fontStyle: "italic",
  },
  sloganTitle: {
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  slogan: {
    fontSize: width * 0.04, // le texte reste lisible sur de petits et grands écrans
    color: "black",
    textAlign: "center",
  },
  inputTitle: {
    marginBottom: height * 0.01,
    fontSize: width * 0.04,
  },
  inputsContainer: {
    width: "90%", // S'adapte à la largeur de l'écran
    marginTop: 20,
  },
  input: {
    height: height * 0.05,
    fontSize: width * 0.045,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "white",
    width: "100%", // S'étend sur toute la largeur du conteneur parent
  },
  forgotPassword: {
    color: "#1877F2",
    textDecorationLine: "underline",
    fontSize: width * 0.035,
  },
  forgotPasswordContainer: {
    width: "90%", // Prend toute la largeur disponible
    alignItems: "flex-end", // Aligne le contenu à droite
    marginTop: 10,
  },

  signInButton: {
    backgroundColor: "#4FAAAF",
    padding: height * 0.015, // maintenir un espacement proportionnel à la taille de l'écran
    width: width * 0.4,
    borderRadius: 20,
    marginBottom: height * 0.02, // Espace sous le bouton en fonction de la hauteur de l'écran
    alignItems: "center",
    marginTop: height * 0.03, // Espace supérieur dynamique
  },

  signInButtonText: {
    color: "white",
    fontSize: width * 0.045,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalInnerContainer: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    padding: 20,
    width: width * 0.9, // l'élément prend 90% de la largeur de l'écran, peu importe l'appareil.
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4FAAAF",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%", // S'étend sur toute la largeur du conteneur parent
    height: height * 0.06,
    fontSize: width * 0.045,
  },
  sendButton: {
    backgroundColor: "#4FAAAF",
    borderRadius: 5,
    padding: height * 0.02,
    width: "100%", // S'étend sur toute la largeur
    alignItems: "center",
  },

  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
});
