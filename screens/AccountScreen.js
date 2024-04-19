import React, { useState } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function AccountScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(""); // État pour l'adresse e-mail
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.title}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/profil.png")}
                  style={styles.profil}
                  alt="profil de l'utilisateur"
                />
              </View>

              <Text style={styles.textNom}>Prénom de l'utilisateur</Text>
            </View>
            <View style={styles.containerText}>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
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
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Mes avis
              </Text>
              <Text style={styles.text} onPress={() => navigation.navigate("")}>
                Informations légales- RGPD
              </Text>
              <Text style={styles.text} onPress={() => toggleModal()}>
                Contactez-nous
              </Text>
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
  },
  imageContainer: {
    justifyContent: "center", // Centrer les éléments verticalement
    alignItems: "center", // Centrer les éléments horizontalement
  },
  containerText: {
    flex: 1,
  },
  textNom: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 30,
    textAlign: "center",
  },
  text: {
    color: "blue",
    marginLeft: 40,
    marginBottom: 20,
    fontSize: 16,
  },
  profil: {
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#4FAAAF",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
