import React from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Modal,
} from "react-native";
import { login, logout } from "../reducers/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

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
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: data.email, token: data.token }));
          setEmail("");
          setPassword("");
          navigation.navigate("HebergeurProfil");
        } else {
          // Erreur de connexion
          setErrorMessage(data.error);
        }
      })
      .catch((error) => {
        // Erreur lors de la connexion au serveur
        console.error("Error:", error);
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
      });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.slogan}>L'accord parfait entre jeunes et </Text>
        <Text style={styles.slogan}>sages dans une colocation pleine</Text>
        <Text style={styles.slogan}>de vie et de partage</Text>

        <View style={styles.inputsContainer}>
          <View>
            <Text>Email :</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <View>
            <Text>Mot de passe :</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity onPress={() => toggleModal()}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleConnection()}
        >
          <Text style={styles.signInButtonText}>Connexion</Text>
        </TouchableOpacity>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </KeyboardAvoidingView>
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
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => {
                  // Ajoutez ici la logique pour envoyer le lien de réinitialisation
                  // et fermer la modal après l'envoi
                  setModalVisible(false);
                }}
              >
                <Text style={styles.sendButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    width: "90%",
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "white",
  },
  forgotPassword: {
    justifyContent: "flex-end",
    margin: 20,
    color: "white",
  },
  signInButton: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
  },
  signInButtonText: {
    color: "white",
    fontSize: 15,
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
    position: "relative",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 25,
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
    width: "100%",
  },
  sendButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#4FAAAF",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
