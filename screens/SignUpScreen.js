import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
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
import { Picker } from "@react-native-picker/picker";
// import { DatePickerInput } from 'react-native-paper-dates';



export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  // Expression régulière pour la validation de l'e-mail
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required("Le nom est requis"),
    prenom: Yup.string().required("Le prénom est requis"),
    email: Yup.string()
      .matches(emailRegex, "Format email invalide")
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

    fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: data.email, token: data.token }));
          navigation.navigate("Home");
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
          statut: "hebergeur",

        }} //définit les valeurs initiales des champs du formulaire.
        validationSchema={validationSchema} //un schéma de validation Yup qui définit les règles de validation pour chaque champ du formulaire.
        onSubmit={(values) => handleConnection(values)} //une fonction appelée lorsque le formulaire sera soumis avec des valeurs valides
      >
        {(
          { handleChange, handleBlur, handleSubmit, values, errors, touched } // une fonction de rendu qui reçoit des propriétés et des fonctions utiles de <Formik>
        ) => (
          <View style={styles.bottomContainer}>
            <View >
              <Text style = {styles.text1} >Se connecter avec :</Text>
            </View>
            <View style={styles.connectWithContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/facebook-icon.png")}
                  style={styles.socialIcon} alt="icon-facebook"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require("../assets/google-icon.png")}
                  style={styles.socialIcon} alt="icon-google"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style = {styles.text1}>Ou créer:</Text>
            </View>

            <View style={styles.inputsContainer}>
          <Text>Choisissez votre statut : </Text>
          <Picker
            selectedValue={values.statut}
            onValueChange={(itemValue, itemIndex) => handleChange("statut")(itemValue)}  style={[styles.input, styles.picker]} // Ajoutez le style pour le picker
          >
            <Picker.Item label="Hébergeur" value="hebergeur" />
            <Picker.Item label="Locataire" value="locataire" />
          </Picker>

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
            />  */}
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
           {/* Confirmation mot de passe */}
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
  text1: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 7,
  },
  bottomContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    marginBottom: 0,
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

