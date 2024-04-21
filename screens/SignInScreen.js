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
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: data.email,
              token: data.token,
              statut: data.statut,
              name: data.name,
            })
          );
          setEmail("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Thread" });
          // if (data.statut === "hebergeur") {cd Backen
          //   navigation.navigate("TabNavigator", { screen: "ThreadProfils" });
          // } else {
          //   navigation.navigate("TabNavigator", { screen: "ThreadAnnouncements" });
          // }
        } else {
          // Erreur de connexion
          alert(
            "La connexion n'est pas réussie. Veuillez entrer le bon email et mot de passe !"
          );
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
      <Image source={require("../assets/logo.png")} style={styles.logo} />
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
          placeholder="Email"
          value={email}
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
      <TouchableOpacity onPress={() => toggleModal()}>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
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
    </KeyboardAvoidingView>
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
    marginTop: 50,
    width: 340,
    height: 300,
  },
  sloganTitle: {
    marginBottom: 50,
  },
  slogan: {
    fontSize: 15,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputTitle: {
    marginBottom: 15,
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
    margin: 20,
    color: "#1877F2",
    textDecorationLine: "underline",
    textAlign: "right",
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
  inputsContainer: {
    marginLeft: 10,
  },
});
