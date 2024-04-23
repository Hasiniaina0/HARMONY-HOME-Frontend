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
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SignInScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numPhone, setNumPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoProfil, setPhotoProfil] = useState("");
  const token = useSelector((state) => state.user.token);
  const navigation = useNavigation();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/token/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
        setNumPhone(data.numPhone);
        setPassword(data.password);
        setConfirmPassword(data.confirmPassword);
        setPhotoProfil(data.photoProfil);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        )
      );
  }, []);
  // save la mise à jour
  const handleSaveProfil = () => {
    fetch(`${BACKEND_URL}/updates/information`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        email,
        numPhone,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Informations mis à jour:", data);
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la mise à jour des informations de l'utilisateur:",
          error
        )
      )
      .finally(() => navigation.navigate("Account"));
  };

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex, "Format email invalide"),
    numPhone: Yup.string().matches(
      /^\+33[0-9]{9}$/,
      "Le numéro de téléphone contenir 9 chiffres"
    ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe doivent correspondre"
      )
      .required("La confirmation du mot de passe est requise"),
  });

  return (
    <SafeAreaView style={styles.inputsContainer}>
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={60}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />

          <Image
            source={
              photoProfil
                ? { uri: photoProfil }
                : require("../assets/ajoutProfil.png")
            }
            style={[styles.logo, styles.profileImage]}
          />
          <Text style={styles.title}>
            {" "}
            Je mets à jour mes informations personnelles{" "}
          </Text>
          <Formik
            initialValues={{
              email: email,
              numPhone: numPhone,
              password: password,
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
          >
            {({ handleBlur, errors, touched }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom"
                  value={nom}
                  editable={false}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  value={prenom}
                  editable={false}
                ></TextInput>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  onBlur={handleBlur("email")}
                ></TextInput>
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Numéro de téléphone"
                  value={numPhone.toString()}
                  onChangeText={(numPhone) => setNumPhone(numPhone)}
                  onBlur={handleBlur("numPhone")}
                ></TextInput>
                {touched.numPhone && errors.numPhone && (
                  <Text style={styles.error}>{errors.numPhone}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  onBlur={handleBlur("password")}
                ></TextInput>
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Confirmer mot de passe"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                  onBlur={handleBlur("confirmPassword")}
                ></TextInput>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSaveProfil}
                >
                  <Text style={styles.buttonText}>Mettre à jour</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  back: {
    alignSelf: "flex-start",
  },
  inputsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  profileImage: {
    borderRadius: 100, // Pour donner une forme circulaire à l'image
    alignSelf: "center",
    borderColor: "#4FAAAF",
    borderWidth: 4,
    backgroundColor: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Poppins",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  inputContainer: {},
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 7,
  },
  button: {
    backgroundColor: "#4FAAAF",
    color: "white",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
    width: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
