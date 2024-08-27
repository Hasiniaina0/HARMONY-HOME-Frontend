import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";

export default function AccountScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(""); // État pour l'adresse e-mail
  const [message, setMessage] = useState("");
  const [photoProfil, setPhotoProfil] = useState("");
  const [prenom, setPrenom] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhotoProfil(data.photoProfil);
        setPrenom(data.prenom);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération de la photo de profil de l'utilisateur:",
          error
        )
      );
  }, [user]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../assets/fond8.jpg")}
      style={styles.backgroundImage}
      alt="image de fond bleu"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <View style={styles.title}>
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      photoProfil.length
                        ? { uri: photoProfil[0] }
                        : require("../assets/photoProfil.png")
                    }
                    style={[styles.logo, styles.profileImage]}
                    alt="image de photo de profil"
                  />
                </View>

                <Text style={styles.textNom}>{prenom}</Text>
              </View>
              <View style={styles.containerText}>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("Information")}
                >
                  Mes informations personnelles
                </Text>
                <Text
                  style={styles.text}
                  onPress={() => {
                    navigation.navigate(
                      user.statut === "hebergeur"
                        ? "HebergeurProfil"
                        : "LocataireProfil"
                    );
                  }}
                >
                  Mon profil
                </Text>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("Preferences")}
                >
                  Mes préférences
                </Text>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("")}
                >
                  Mes avis
                </Text>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate("")}
                >
                  Informations légales- RGPD
                </Text>
                <Text style={styles.text} onPress={() => toggleModal()}>
                  Contactez-nous
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLogout()}
                >
                  <Text style={styles.buttonText}>Se déconnecter</Text>
                </TouchableOpacity>
              </View>
            </View>
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
                    <Text style={styles.modalTitle}>On vous écoute</Text>
                    <TextInput
                      style={styles.modalEmailInput}
                      placeholder="Adresse e-mail"
                      placeholderTextColor="#badbd7"
                      value={email}
                    />
                    <TextInput
                      style={styles.modalMessageInput}
                      placeholder="Rédigez votre message"
                      placeholderTextColor="#badbd7"
                      multiline={true} // Permettre plusieurs lignes de texte
                      // numberOfLines={5} // Définir le nombre de lignes affichées par défaut
                      value={message}
                      onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={() => {
                        setModalVisible(false);
                        setEmail(""); // Réinitialiser l'état email à une chaîne vide
                        setMessage(""); // Réinitialiser l'état message à une chaîne vide
                      }}
                    >
                      <Text style={styles.sendButtonText}>Envoyer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center", // Centrer les éléments verticalement
    alignItems: "center", // Centrer les éléments horizontalement
  },
  logo: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    borderColor: "#4FAAAF",
    borderWidth: 4,
  },
  containerText: {
    flex: 1,
  },
  textNom: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 30,
    textAlign: "center",
    color: "#4FAAAF",
  },
  text: {
    color: "black",
    marginLeft: 40,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  profil: {
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
    marginLeft: 150,
  },
  buttonText: {
    color: "#eb7134",
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
    color: "#eb7134",
  },
  modalEmailInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  modalMessageInput: {
    borderWidth: 1,
    height: 150,
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
    backgroundColor: "#eb7134",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold", 
  },
});
