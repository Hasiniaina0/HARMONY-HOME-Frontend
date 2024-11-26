import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  SafeAreaView,
  Switch,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import * as Yup from "yup"; // pour valider les formulaires en combinaison avec la bibliothèque Formik
import { Formik } from "formik";

const { width, height } = Dimensions.get("window");

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const [isHost, setIsHost] = useState(false);
  const [numPhone, setNumPhone] = useState("");

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    // un objet Yup dans lequel chaque champ a ses propres règles de validation.
    nom: Yup.string().required("Le nom est requis"), // .string(une chaine de caractère), .required(champ obligatoire)
    prenom: Yup.string().required("Le prénom est requis"),
    email: Yup.string()
      .matches(emailRegex, "Format email invalide")
      .required("L'email est requis"),
    numPhone: Yup.string()
      .matches(/[0-9]{10}/, "Le numéro de téléphone doit contenir 10 chiffres")
      .required("Le numéro de téléphone est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("La confirmation du mot de passe est requise"),
  });

  const handleConnection = (values) => {
    values.statut = isHost ? "hebergeur" : "locataire";

    if (values.password !== values.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST", //envoyer les données du formulaire au serveur.
      headers: { "Content-Type": "application/json" }, //le corps de la requête contient des données au format JSON.
      body: JSON.stringify(values), // values sont converties en JSON et envoyées au backend dans le corps de la requête
    })
      .then((response) => response.json())
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
          setModalVisible(true);
        } else {
          // Échec : Afficher un message d'erreur
          alert(
            "Une erreur s'est produite lors de l'inscription. Veuillez vérifier tous les champs et vous assurer que l'email n'est pas déjà utilisé."
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Formik
            initialValues={{
              nom: "",
              prenom: "",
              email: "",
              numPhone: numPhone,
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleConnection(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <Text style={styles.text1}>Se connecter avec :</Text>
                <View style={styles.connectWithContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      source={require("../assets/facebook-icon.png")}
                      style={styles.socialIcon}
                      alt="icon-facebook"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      source={require("../assets/google-icon.png")}
                      style={styles.socialIcon}
                      alt="icon-google"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.text1}>Ou créer</Text>
                <View style={styles.inputsContainer}>
                  <Text style={styles.statut}>Choisissez votre statut : </Text>

                  {/* Toggle Switch pour choisir entre hébergeur ou locataire */}
                  <View style={styles.toggleContainer}>
                    <Text style={styles.toggleText}>
                      {isHost ? "Hébergeur" : "Locataire"}
                    </Text>
                    <Switch value={isHost} onValueChange={setIsHost} />
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    placeholderTextColor="#796D8C"
                    value={values.nom}
                    onChangeText={handleChange("nom")}
                    onBlur={handleBlur("nom")}
                  />
                  {touched.nom && errors.nom && (
                    <Text style={styles.error}>{errors.nom}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    placeholderTextColor="#796D8C"
                    value={values.prenom}
                    onChangeText={handleChange("prenom")}
                    onBlur={handleBlur("prenom")}
                  />
                  {touched.prenom && errors.prenom && (
                    <Text style={styles.error}>{errors.prenom}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#796D8C"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Numéro de téléphone"
                    placeholderTextColor="#796D8C"
                    value={values.numPhone}
                    onChangeText={handleChange("numPhone")}
                    onBlur={handleBlur("numPhone")}
                  />
                  {touched.numPhone && errors.numPhone && (
                    <Text style={styles.error}>{errors.numPhone}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#796D8C"
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmation mot de passe"
                    placeholderTextColor="#796D8C"
                    secureTextEntry={true}
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.connectButtonText}>S'inscrire</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <Text style={styles.modalTitle}>
              Votre inscription a été réussie !
            </Text>
            <Text style={styles.modalText}>
              Voulez-vous compléter votre profil maintenant ou plus tard ?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate(
                  user.statut === "hebergeur"
                    ? "HebergeurProfil"
                    : "LocataireProfil"
                );
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Compléter maintenant</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.navigate("TabNavigator", { screen: "Thread" });
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Plus tard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.05,
    marginTop: height * 0.02,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statut: {
    fontWeight: "bold",
    fontSize: width * 0.04,
    marginTop: height * 0.02,
  },
  toggleText: {
    marginRight: height * 0.02,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: height * 0.06,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
    width: "90%",
  },
  formContainer: {
    width: "90%", // valeurs en pourcentage pour la largeur permettant de s'ajuster en fonction de la taille de l'écran.
  },
  text1: {
    fontSize: width * 0.04,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: height * 0.06,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
    width: "100%",
  },
  error: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
    color: "red",
  },
  connectWithContainer: {
    flexDirection: "row",
    marginBottom: height * 0.02, // Margin proportionnel
    alignItems: "center",
    justifyContent: "center",
  },
  socialButton: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: width * 0.05,
    padding: width * 0.03, // Padding proportionnel
  },
  socialIcon: {
    width: width * 0.12,
    height: width * 0.12, // 12% de la largeur de l'écran pour garder une forme carrée
  },

  connectButton: {
    backgroundColor: "#4FAAAF",
    borderRadius: 20,
    paddingVertical: height * 0.02, // Ajuste le padding en fonction de la hauteur de l'écran
    paddingHorizontal: width * 0.04, // Ajuste le padding horizontal en fonction de la largeur de l'écran
    marginTop: height * 0.03,
    alignSelf: "center",
    width: "45%",
  },
  connectButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalInnerContainer: {
    width: width * 0.9,
    padding: height * 0.03,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    color: "#4FAAAF",
    textAlign: "center",
  },
  modalText: {
    fontSize: width * 0.05,
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#4FAAAF",
    paddingVertical: height * 0.015,
    borderRadius: 5,
    marginBottom: height * 0.02,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
