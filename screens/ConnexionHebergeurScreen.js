import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  CheckBox,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../reducers/user";
import * as Yup from "yup";
import { Formik } from "formik";

export default function ConnexionHebergeurScreen({ navigation }) {
  const dispatch = useDispatch();
  const ADRESS_IP = process.env.ADRESS_IP;

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est requis"),
    prenom: Yup.string().required("Le prénom est requis"),
    email: Yup.string()
      .email("Format email invalide")
      .required("L'email est requis"),
    numPhone: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Le numéro de téléphone doit comporter 10 chiffres"
      )
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
    if (values.password !== values.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    fetch(`http://${ADRESS_IP}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: data.email, token: data.token }));
          navigation.navigate("SignUp");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          email: "",
          numPhone: "",
          password: "",
          confirmPassword: "",
        }} //définit les valeurs initiales des champs du formulaire.
        validationSchema={validationSchema} //un schéma de validation Yup qui définit les règles de validation pour chaque champ du formulaire.
        onSubmit={(values) => handleConnection(values)} //une fonction appelée lorsque le formulaire sera soumis avec des valeurs valides
      >
        {(
          { handleChange, handleBlur, handleSubmit, values, errors, touched } // une fonction de rendu qui reçoit des propriétés et des fonctions utiles de <Formik>
        ) => (
          <View style={styles.bottomContainer}>
            <View>
              <Text>Se connecter avec :</Text>
            </View>
            <View style={styles.connectWithContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/facebook-icon.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/google-icon.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text>Ou créer:</Text>
            </View>

            <View style={styles.inputsContainer}>
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
              {/* <DatePickerInput style={styles.date}
                locale="en"
                label="date de naissance"
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="start"
            /> */}
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
              {/* <View style={styles.checkBoxContainer}>
            <CheckBox />
            <Text style={styles.checkBoxText}>J'accepte les termes et les conditions générales</Text>
          </View> */}
            </View>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleSubmit}
            >
              <Text style={styles.connectButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginBottom: 7,
  },
  logoButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  date: {
    marginTop: 400,
  },
  text: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
    width: "90%",
  },
  connectWithContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  inputsContainer: {
    width: "90%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkBoxText: {
    marginLeft: 10,
  },
  connectButton: {
    backgroundColor: "#4FAAAF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
  },
  connectButtonText: {
    color: "white",
    fontSize: 16,
  },
});
