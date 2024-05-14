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
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import * as Yup from "yup";
import { Formik } from "formik";

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
    nom: Yup.string().required("Le nom est requis"),
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
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
          alert("Une erreur s'est produite lors de l'inscription.");
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
    marginTop: 50,
    padding: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statut: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  toggleText: {
    marginRight: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fieldset: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  legend: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: "90%",
  },
  text1: {
    fontSize: 17,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 7,
  },
  connectWithContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  inputsContainer: {
    width: "100%",
  },
  connectButton: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
    alignSelf: "center",
    width: 130,
  },
  connectButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
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
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4FAAAF",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
