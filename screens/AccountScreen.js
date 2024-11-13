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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";

const { width, height } = Dimensions.get("window");

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
     
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <SafeAreaView>
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
        </SafeAreaView>
      </KeyboardAvoidingView>
      
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
 
  profileImage: {
    width: width * 0.4, // 40% de la largeur de l'écran
    height: width * 0.4, // 40% de la largeur de l'écran
    borderRadius: width * 0.2, // Cercle parfait
    alignSelf: "center",
    borderColor: "#4FAAAF",
    borderWidth: width*0.01,
  },
 
  textNom: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginBottom: height * 0.04,
    marginTop: height * 0.03,
    textAlign: "center",
    color: "#4FAAAF",
  },
  text: {
    color: "black",
    marginLeft: width * 0.1,
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "white",
    width: width * 0.5,
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
    fontSize: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalInnerContainer: {
    backgroundColor: "#fff",
    margin: width * 0.05,
    borderRadius: 10,
    padding: width * 0.05,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
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
    paddingVertical: height * 0.02,
    borderRadius: 5,
    marginTop: height * 0.02,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#eb7134",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold", 
  },
});
